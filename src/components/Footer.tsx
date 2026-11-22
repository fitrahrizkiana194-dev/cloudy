import type { ProductCategory } from '../data/products';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const jumpToCollection = (cat: ProductCategory) => {
    onSelectCategory(cat);
    const el = document.getElementById('koleksi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#F1DCE2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#F1DCE2]">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold text-[#24191D] mb-2">
              Cloudy
            </p>
            <p className="text-sm text-[#725D64] leading-relaxed max-w-sm">
              Tas laptop dan pouch puffy bernuansa pink dan putih yang dirancang
              untuk melindungi perangkat kerja harian dengan sentuhan lembut dan
              ringan.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#24191D]">
              Kategori
            </p>
            <ul className="space-y-2 text-[#725D64]">
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCollection('all')}
                  className="hover:text-[#C85175] transition-colors cursor-pointer"
                >
                  Semua Koleksi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCollection('laptop-sleeve')}
                  className="hover:text-[#C85175] transition-colors cursor-pointer"
                >
                  Tas Laptop Cloudy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCollection('pouch')}
                  className="hover:text-[#C85175] transition-colors cursor-pointer"
                >
                  Pouch &amp; Mini Case
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCollection('bundle')}
                  className="hover:text-[#C85175] transition-colors cursor-pointer"
                >
                  Paket Hemat Duo
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#24191D]">
              Layanan Pelanggan
            </p>
            <p className="text-[#725D64]">
              Pengiriman setiap hari kerja dari Studio Jakarta Selatan.
            </p>
            <p className="text-[#725D64]">
              Mendukung QRIS, Virtual Account, dan Bayar di Tempat (COD).
            </p>
            <p className="text-[#725D64]">
              Email: halo@cloudystudio.id &middot; IG: @cloudy.carry
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#725D64]">
          <p>&copy; 2026 Cloudy Studio. Seluruh hak cipta dilindungi.</p>
          <p>Dirancang dalam nuansa Blush Pink &amp; Cloud White</p>
        </div>
      </div>
    </footer>
  );
}
