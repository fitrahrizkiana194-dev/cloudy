import { useEffect, useState } from 'react';
import { Check, Heart, Minus, Plus, ShieldCheck, Truck, X } from 'lucide-react';
import {
  formatRupiah,
  type ColorOption,
  type Product,
  type SizeOption,
} from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  initialColor?: ColorOption;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    color: ColorOption,
    size: SizeOption,
    quantity: number
  ) => void;
}

export function ProductDetailModal({
  product,
  initialColor,
  isWishlisted,
  onToggleWishlist,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedColor(initialColor || product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setActivePhotoIndex(0);
    }
  }, [product, initialColor]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product || !selectedColor || !selectedSize) return null;

  const photos = [product.image, product.detailImage];
  const unitPrice = product.price + (selectedSize.priceDelta || 0);
  const totalPrice = unitPrice * quantity;

  const handleConfirmAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-[#24191D]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto bg-white sm:rounded-2xl border border-[#F1DCE2] shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="sticky sm:absolute top-4 right-4 ml-auto mr-4 mt-4 sm:m-0 z-10 w-10 h-10 rounded-full bg-white/95 border border-[#F1DCE2] flex items-center justify-center text-[#24191D] hover:bg-[#FDF2F5] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-5 sm:p-8">
          {/* Left Sticky Gallery */}
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#F1DCE2] bg-[#FAF0F3]">
              <ResilientImage
                src={photos[activePhotoIndex]}
                alt={`${product.name} tampilan ${activePhotoIndex + 1}`}
                fallbackTitle={product.name}
                className="w-full h-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {photos.map((photoUrl, idx) => (
                <button
                  key={photoUrl + idx}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? 'border-[#C85175] ring-2 ring-[#C85175]/20'
                      : 'border-[#F1DCE2] opacity-75 hover:opacity-100'
                  }`}
                >
                  <ResilientImage
                    src={photoUrl}
                    alt={`${product.name} pratinjau ${idx + 1}`}
                    className="w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#725D64] mb-2">
                <span className="uppercase tracking-wider font-medium text-[#C85175]">
                  {product.categoryLabel}
                </span>
                <span aria-hidden="true">&middot;</span>
                <span className="tabular-nums">
                  ★ {product.rating.toFixed(1)} ({product.reviewCount} ulasan)
                </span>
                <span aria-hidden="true">&middot;</span>
                <span className="tabular-nums">Stok {product.stock}</span>
              </div>

              <h2
                id="pdp-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#24191D] leading-tight mb-2"
              >
                {product.name}
              </h2>

              <p className="text-xl font-semibold text-[#24191D] tabular-nums mb-4">
                {formatRupiah(unitPrice)}
              </p>

              <p className="text-sm text-[#725D64] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-5">
                <p className="text-xs font-medium text-[#24191D] mb-2">
                  Warna:{' '}
                  <span className="font-normal text-[#725D64]">
                    {selectedColor.name}
                  </span>
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {product.colors.map((color) => {
                    const active = color.id === selectedColor.id;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'border-[#C85175] bg-[#FDF2F5] text-[#24191D]'
                            : 'border-[#E7C9D3] bg-white text-[#725D64] hover:border-[#C85175]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#D9BFC7]"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-[#24191D]">Ukuran</span>
                  <span className="text-[#725D64] tabular-nums">
                    Dimensi: {selectedSize.dimensions}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const active = size.label === selectedSize.label;
                    return (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'border-[#C85175] bg-[#C85175] text-white'
                            : 'border-[#E7C9D3] bg-white text-[#24191D] hover:border-[#C85175]'
                        }`}
                      >
                        {size.label}
                        {size.priceDelta ? ` (+${formatRupiah(size.priceDelta)})` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-1.5 mb-6 text-xs text-[#725D64]">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C85175] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase Actions */}
            <div className="pt-5 border-t border-[#F1DCE2] space-y-4">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="inline-flex items-center border border-[#E7C9D3] rounded-lg h-11 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Kurangi jumlah"
                    className="w-10 h-full flex items-center justify-center text-[#725D64] hover:text-[#24191D] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums text-[#24191D]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    aria-label="Tambah jumlah"
                    className="w-10 h-full flex items-center justify-center text-[#725D64] hover:text-[#24191D] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmAdd}
                  className="flex-1 h-11 px-5 rounded-lg bg-[#C85175] hover:bg-[#B04163] text-white text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Tambah ke Tas &middot; {formatRupiah(totalPrice)}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  aria-label="Simpan ke favorit"
                  className="w-11 h-11 rounded-lg border border-[#E7C9D3] flex items-center justify-center text-[#24191D] hover:bg-[#FDF2F5] transition-colors shrink-0 cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-[#C85175] text-[#C85175]' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#725D64]">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C85175]" />
                  Gratis ongkir belanja &gt; Rp 350.000
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C85175]" />
                  Garansi jahitan 30 hari &amp; tersedia COD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
