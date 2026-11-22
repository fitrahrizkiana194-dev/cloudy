import { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import type { ProductCategory } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategoryNav: (category: ProductCategory) => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onSelectCategoryNav,
}: HeaderProps) {
  const [showPromo, setShowPromo] = useState(true);

  const scrollToSection = (id: string, category?: ProductCategory) => {
    if (category) {
      onSelectCategoryNav(category);
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
      {showPromo && (
        <div className="bg-[#FDF2F5] border-b border-[#F1DCE2] px-4 h-9 flex items-center justify-between text-xs text-[#24191D]">
          <span className="w-5 shrink-0" aria-hidden="true" />
          <p className="truncate text-center font-medium">
            Gratis ongkir di atas Rp 350.000 &middot; Diskon 10% dengan kode{' '}
            <span className="font-semibold text-[#C85175]">PINK10</span>
          </p>
          <button
            type="button"
            onClick={() => setShowPromo(false)}
            aria-label="Tutup pengumuman"
            className="w-5 h-5 flex items-center justify-center text-[#725D64] hover:text-[#24191D] transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="border-b border-[#F1DCE2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-2xl font-semibold tracking-tight text-[#24191D] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85175] rounded"
          >
            Cloudy
          </a>

          {/* Zone 2: 4 single-line nav links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#725D64]"
          >
            <button
              type="button"
              onClick={() => scrollToSection('koleksi', 'all')}
              className="hover:text-[#24191D] hover:underline underline-offset-4 decoration-[#C85175] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Semua Koleksi
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('koleksi', 'laptop-sleeve')}
              className="hover:text-[#24191D] hover:underline underline-offset-4 decoration-[#C85175] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Tas Laptop
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('koleksi', 'pouch')}
              className="hover:text-[#24191D] hover:underline underline-offset-4 decoration-[#C85175] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pouch
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('material')}
              className="hover:text-[#24191D] hover:underline underline-offset-4 decoration-[#C85175] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Material
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-[#C85175] hover:bg-[#B04163] text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85175] focus-visible:ring-offset-2"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Tas Belanja</span>
              <span className="tabular-nums font-semibold">({cartCount})</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
