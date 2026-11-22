import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE, type Product } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  featuredProduct: Product;
  onExploreCollection: () => void;
  onViewFeatured: (product: Product) => void;
}

export function Hero({
  featuredProduct,
  onExploreCollection,
  onViewFeatured,
}: HeroProps) {
  return (
    <section
      id="top"
      className="border-b border-[#F1DCE2] bg-gradient-to-b from-white to-[#FDF6F8]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#C85175] mb-4">
                Koleksi Cloudy &middot; Pink &amp; White Edition
              </p>

              <h1
                className="font-display text-4xl sm:text-5xl font-semibold text-[#24191D] leading-[1.12] tracking-tight mb-5"
                style={{ textWrap: 'balance' }}
              >
                Pelindung laptop dan pouch selembut awan.
              </h1>

              <p className="text-base text-[#725D64] leading-relaxed max-w-md mb-8">
                Dirancang dengan siluet puffy quilted bernuansa blush pink dan
                putih krem. Melindungi laptop, tablet, serta esensial harian
                Anda dengan busa empuk empat lapis dan lapisan beludru
                anti-gores.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onExploreCollection}
                  className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-[#C85175] hover:bg-[#B04163] text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85175] focus-visible:ring-offset-2"
                >
                  <span>Belanja Koleksi</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => onViewFeatured(featuredProduct)}
                  className="inline-flex items-center justify-center px-5 py-3 min-h-[44px] rounded-lg border border-[#E7C9D3] bg-white hover:bg-[#FDF2F5] text-[#24191D] text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85175]"
                >
                  Lihat Cloudy Bow Sleeve
                </button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#F1DCE2] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#725D64]">
              <span>Ukuran 11&quot;–16&quot;</span>
              <span aria-hidden="true">&middot;</span>
              <span>Bahan Water-Repellent</span>
              <span aria-hidden="true">&middot;</span>
              <span>Dukung Bayar di Tempat (COD)</span>
            </div>
          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-7 flex">
            <div className="w-full rounded-2xl overflow-hidden border border-[#F1DCE2] bg-[#FAF0F3] aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] lg:min-h-[440px]">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Cloudy Puffy Bow Laptop Sleeve warna blush pink dan putih krem di atas meja kerja minimalis"
                fallbackTitle="Cloudy Puffy Bow Laptop Sleeve"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
