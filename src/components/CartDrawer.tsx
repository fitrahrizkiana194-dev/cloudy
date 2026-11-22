import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { formatRupiah } from '../data/products';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  colorName: string;
  colorHex: string;
  sizeLabel: string;
  unitPrice: number;
  quantity: number;
}

type PaymentMethod = 'cod' | 'qris' | 'transfer';

interface ConfirmedOrder {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 350000;
const STANDARD_SHIPPING = 18000;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && step === 'confirmed' && items.length > 0) {
      setStep('cart');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const discount =
    appliedPromo === 'PINK10' ? Math.round(subtotal * 0.1) : 0;
  const qualifiesFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || appliedPromo === 'CLOUDYFREE';
  const shippingFee =
    items.length === 0 ? 0 : qualifiesFreeShipping ? 0 : STANDARD_SHIPPING;
  const total = Math.max(0, subtotal - discount + shippingFee);
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'PINK10') {
      setAppliedPromo('PINK10');
      setPromoMessage('Kode PINK10 aktif: diskon 10% diterapkan.');
    } else if (code === 'CLOUDYFREE') {
      setAppliedPromo('CLOUDYFREE');
      setPromoMessage('Kode CLOUDYFREE aktif: gratis ongkir diterapkan.');
    } else {
      setPromoMessage('Kode tidak valid. Coba PINK10 atau CLOUDYFREE.');
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !customerName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !postalCode.trim()
    ) {
      setFormError(
        'Mohon lengkapi nama penerima, nomor WhatsApp, alamat, dan kode pos.'
      );
      return;
    }

    setFormError(null);
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setConfirmedOrder({
      orderNumber: `CLD-${randomId}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      discount,
      shippingFee,
      total,
    });
    onClearCart();
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('cart');
      setConfirmedOrder(null);
    }
    onClose();
  };

  const paymentLabels: Record<PaymentMethod, string> = {
    cod: 'COD (Bayar di Tempat)',
    qris: 'QRIS Instan',
    transfer: 'Transfer Bank Virtual Account',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#24191D]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Tas Belanja Cloudy"
    >
      <div
        className="flex-1"
        onClick={handleCloseDrawer}
        aria-hidden="true"
      />

      <aside className="w-full max-w-md bg-white h-full flex flex-col border-l border-[#F1DCE2] shadow-2xl">
        {/* Drawer Header */}
        <div className="px-5 h-16 border-b border-[#F1DCE2] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Kembali ke tas belanja"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#725D64] hover:text-[#24191D] hover:bg-[#FDF2F5] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-xl font-semibold text-[#24191D]">
              {step === 'cart' && 'Tas Belanja'}
              {step === 'checkout' && 'Pengiriman & Pembayaran'}
              {step === 'confirmed' && 'Pesanan Dikonfirmasi'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Tutup tas belanja"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#725D64] hover:text-[#24191D] hover:bg-[#FDF2F5] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Cart Items */}
        {step === 'cart' && (
          <>
            {items.length > 0 && (
              <div className="px-5 py-3 bg-[#FDF6F8] border-b border-[#F1DCE2]">
                <p className="text-xs text-[#24191D] mb-2">
                  {qualifiesFreeShipping ? (
                    <span className="font-medium text-[#C85175]">
                      Selamat! Pesanan Anda mendapatkan Gratis Ongkir.
                    </span>
                  ) : (
                    <span>
                      Tambah{' '}
                      <span className="font-semibold tabular-nums">
                        {formatRupiah(remainingForFreeShipping)}
                      </span>{' '}
                      lagi untuk Gratis Ongkir.
                    </span>
                  )}
                </p>
                <div className="w-full h-1.5 rounded-full bg-[#F1DCE2] overflow-hidden">
                  <div
                    className="h-full bg-[#C85175] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#FDF2F5] flex items-center justify-center text-[#C85175] mb-4">
                    <ShoppingBag className="w-6 h-6 stroke-[1.6]" />
                  </div>
                  <p className="font-display text-xl text-[#24191D] mb-1.5">
                    Tas belanja masih kosong
                  </p>
                  <p className="text-sm text-[#725D64] max-w-xs mb-6">
                    Pilih tas laptop atau pouch Cloudy favorit Anda untuk mulai
                    berbelanja.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="px-5 py-2.5 rounded-lg bg-[#C85175] hover:bg-[#B04163] text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Lihat Koleksi Cloudy
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.key}
                      className="flex gap-4 pb-4 border-b border-[#F7E8ED] last:border-b-0"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#F1DCE2] bg-[#FAF0F3] shrink-0">
                        <ResilientImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-[#24191D] leading-snug">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.key)}
                            aria-label={`Hapus ${item.name}`}
                            className="text-[#9A848B] hover:text-[#C85175] transition-colors shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-[#725D64] mt-0.5">
                          {item.colorName} &middot; {item.sizeLabel}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center border border-[#E7C9D3] rounded-md h-8">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.key, -1)}
                              aria-label="Kurangi jumlah"
                              className="w-7 h-full flex items-center justify-center text-[#725D64] hover:text-[#24191D] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.key, 1)}
                              aria-label="Tambah jumlah"
                              className="w-7 h-full flex items-center justify-center text-[#725D64] hover:text-[#24191D] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <p className="text-sm font-semibold text-[#24191D] tabular-nums">
                            {formatRupiah(item.unitPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-[#F1DCE2] bg-[#FDF6F8] space-y-4 shrink-0">
                {/* Promo Code Input */}
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Kode promo (cth. PINK10)"
                      aria-label="Kode promo"
                      className="flex-1 h-9 px-3 rounded-lg border border-[#E7C9D3] bg-white text-xs text-[#24191D] placeholder:text-[#9A848B] focus:outline-none focus:ring-2 focus:ring-[#C85175]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3.5 h-9 rounded-lg border border-[#E7C9D3] bg-white hover:bg-[#FDF2F5] text-xs font-medium text-[#24191D] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Pakai
                    </button>
                  </div>
                  {promoMessage && (
                    <p className="text-[11px] text-[#C85175] mt-1.5">
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#725D64]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">
                      {formatRupiah(subtotal)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#C85175]">
                      <span>Diskon ({appliedPromo})</span>
                      <span className="tabular-nums">
                        -{formatRupiah(discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#725D64]">
                    <span>Estimasi Ongkir</span>
                    <span className="tabular-nums">
                      {shippingFee === 0 ? 'Gratis' : formatRupiah(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#24191D] pt-2 border-t border-[#E8D0D8]">
                    <span>Total Pembayaran</span>
                    <span className="tabular-nums">{formatRupiah(total)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full h-11 rounded-lg bg-[#C85175] hover:bg-[#B04163] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Lanjut ke Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Checkout Form (COD / QRIS / Transfer) */}
        {step === 'checkout' && (
          <form
            onSubmit={handleCheckoutSubmit}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
              <div className="p-4 rounded-xl bg-[#FDF6F8] border border-[#F1DCE2] space-y-1.5">
                <div className="flex justify-between text-xs text-[#725D64]">
                  <span>Total ({items.reduce((s, i) => s + i.quantity, 0)} produk)</span>
                  <span className="font-semibold text-[#24191D] tabular-nums">
                    {formatRupiah(total)}
                  </span>
                </div>
                <p className="text-[11px] text-[#725D64]">
                  {shippingFee === 0
                    ? 'Gratis ongkir aktif untuk pesanan ini.'
                    : `Termasuk ongkir ${formatRupiah(shippingFee)}.`}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#24191D] mb-2">
                  Metode Pembayaran
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {(
                    [
                      {
                        id: 'cod',
                        label: 'COD (Bayar di Tempat)',
                        sub: 'Bayar tunai ke kurir saat paket Cloudy tiba',
                      },
                      {
                        id: 'qris',
                        label: 'QRIS Instan',
                        sub: 'GoPay, OVO, ShopeePay, Dana, Mobile Banking',
                      },
                      {
                        id: 'transfer',
                        label: 'Transfer Bank Virtual Account',
                        sub: 'BCA, Mandiri, BNI, BRI verifikasi otomatis',
                      },
                    ] as const
                  ).map((method) => {
                    const selected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                          selected
                            ? 'border-[#C85175] bg-[#FDF2F5]'
                            : 'border-[#E7C9D3] bg-white hover:border-[#C85175]'
                        }`}
                      >
                        <p className="text-xs font-semibold text-[#24191D]">
                          {method.label}
                        </p>
                        <p className="text-[11px] text-[#725D64] mt-0.5">
                          {method.sub}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#24191D]">
                  Data Penerima
                </p>

                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs text-[#725D64] mb-1"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Clarissa Putri"
                    className="w-full h-10 px-3 rounded-lg border border-[#E7C9D3] text-sm text-[#24191D] focus:outline-none focus:ring-2 focus:ring-[#C85175]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs text-[#725D64] mb-1"
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full h-10 px-3 rounded-lg border border-[#E7C9D3] text-sm text-[#24191D] focus:outline-none focus:ring-2 focus:ring-[#C85175]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-address"
                    className="block text-xs text-[#725D64] mb-1"
                  >
                    Alamat Lengkap
                  </label>
                  <textarea
                    id="checkout-address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama jalan, nomor rumah, kecamatan, kota"
                    className="w-full p-3 rounded-lg border border-[#E7C9D3] text-sm text-[#24191D] focus:outline-none focus:ring-2 focus:ring-[#C85175]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-postal"
                    className="block text-xs text-[#725D64] mb-1"
                  >
                    Kode Pos
                  </label>
                  <input
                    id="checkout-postal"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="12190"
                    className="w-full h-10 px-3 rounded-lg border border-[#E7C9D3] text-sm text-[#24191D] focus:outline-none focus:ring-2 focus:ring-[#C85175]"
                  />
                </div>

                {formError && (
                  <p className="text-xs text-[#B04163] font-medium">
                    {formError}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-[#F1DCE2] bg-[#FDF6F8] shrink-0">
              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-[#C85175] hover:bg-[#B04163] text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Konfirmasi Pesanan &middot; {formatRupiah(total)}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation Receipt */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
            <div className="p-5 rounded-2xl bg-[#FDF6F8] border border-[#F1DCE2] text-center">
              <CheckCircle2 className="w-10 h-10 text-[#C85175] mx-auto mb-3 stroke-[1.6]" />
              <p className="text-xs font-medium uppercase tracking-wider text-[#C85175] mb-1">
                Pesanan #{confirmedOrder.orderNumber} Dikonfirmasi
              </p>
              <h3 className="font-display text-2xl font-semibold text-[#24191D] mb-1.5">
                Sedang Dikemas dengan Lembut
              </h3>
              <p className="text-xs text-[#725D64] leading-relaxed">
                Ringkasan resi telah dicatat untuk{' '}
                <span className="font-medium text-[#24191D]">
                  {confirmedOrder.customerName}
                </span>{' '}
                ({confirmedOrder.phone}). Estimasi tiba 2–3 hari kerja.
              </p>
            </div>

            <div className="rounded-xl border border-[#F1DCE2] p-4 space-y-3">
              <p className="text-xs font-semibold text-[#24191D]">
                Ringkasan Pesanan
              </p>
              <ul className="space-y-2 text-xs">
                {confirmedOrder.items.map((item) => (
                  <li
                    key={item.key}
                    className="flex justify-between gap-2 text-[#725D64]"
                  >
                    <span>
                      {item.quantity}× {item.name} ({item.colorName},{' '}
                      {item.sizeLabel})
                    </span>
                    <span className="tabular-nums font-medium text-[#24191D] shrink-0">
                      {formatRupiah(item.unitPrice * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-[#F7E8ED] space-y-1 text-xs">
                <div className="flex justify-between text-[#725D64]">
                  <span>Metode Bayar</span>
                  <span className="font-medium text-[#24191D]">
                    {paymentLabels[confirmedOrder.paymentMethod]}
                  </span>
                </div>
                <div className="flex justify-between text-[#725D64]">
                  <span>Alamat Kirim</span>
                  <span className="text-right max-w-[200px] text-[#24191D]">
                    {confirmedOrder.address} ({confirmedOrder.postalCode})
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-sm text-[#24191D] pt-2 border-t border-[#F7E8ED]">
                  <span>Total</span>
                  <span className="tabular-nums">
                    {formatRupiah(confirmedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseDrawer}
              className="w-full h-11 rounded-lg bg-[#C85175] hover:bg-[#B04163] text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Lanjut Belanja
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
