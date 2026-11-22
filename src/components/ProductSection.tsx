import { useState } from 'react';
import { Heart, Plus, Search, X } from 'lucide-react';
import {
  formatRupiah,
  type ColorOption,
  type Product,
  type ProductCategory,
  type SizeOption,
} from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductSectionProps {
  products: Product[];
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product, color: ColorOption) => void;
  onQuickAdd: (product: Product, color: ColorOption, size: SizeOption) => void;
}

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'laptop-sleeve', label: 'Tas Laptop' },
  { id: 'pouch', label: 'Pouch' },
  { id: 'bundle', label: 'Paket Hemat' },
];

type SortOption = 'popular' | 'price-asc' | 'price-desc';

export function ProductSection({
  products,
  activeCategory,
  onCategoryChange,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}: ProductSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products
    .filter((item) => {
      const matchesCat =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.shortDesc.toLowerCase().includes(normalizedQuery) ||
        item.categoryLabel.toLowerCase().includes(normalizedQuery);
      return matchesCat && matchesQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.reviewCount - a.reviewCount;
    });

  const getSelectedColor = (product: Product): ColorOption => {
    const chosenId = selectedColors[product.id];
    return (
      product.colors.find((c) => c.id === chosenId) || product.colors[0]
    );
  };

  return (
    <section id="koleksi" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#C85175] mb-2">
              Katalog Cloudy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#24191D] tracking-tight">
              Koleksi Pilihan
            </h2>
          </div>
          <p className="text-sm text-[#725D64] max-w-md">
            Setiap produk Cloudy dirancang serasi dalam palet pink lembut dan
            putih bersih agar mudah dipadupadankan.
          </p>
        </div>

        {/* Interactive Filter, Search & Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#F1DCE2]">
          <div
            className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF0F3] rounded-lg w-fit"
            role="tablist"
            aria-label="Filter kategori produk"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(tab.id)}
                  className={`px-3.5 py-2 min-h-[36px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#24191D] shadow-sm'
                      : 'text-[#725D64] hover:text-[#24191D]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#725D64] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari sleeve atau pouch..."
                aria-label="Cari produk Cloudy"
                className="w-full h-10 pl-9 pr-8 rounded-lg border border-[#E7C9D3] bg-white text-sm text-[#24191D] placeholder:text-[#9A848B] focus:outline-none focus:ring-2 focus:ring-[#C85175]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#725D64] hover:text-[#24191D]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Urutkan produk"
              className="h-10 px-3 rounded-lg border border-[#E7C9D3] bg-white text-sm text-[#24191D] focus:outline-none focus:ring-2 focus:ring-[#C85175] cursor-pointer"
            >
              <option value="popular">Paling Populer</option>
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-[#F1DCE2] bg-[#FDF6F8]">
            <p className="font-display text-xl text-[#24191D] mb-2">
              Produk tidak ditemukan
            </p>
            <p className="text-sm text-[#725D64] mb-5">
              Coba kata kunci lain atau lihat seluruh koleksi Cloudy.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('all');
              }}
              className="px-4 py-2 rounded-lg bg-[#C85175] text-white text-sm font-medium hover:bg-[#B04163] transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => {
              const activeColor = getSelectedColor(product);
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group flex flex-col rounded-2xl border border-[#F1DCE2] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(200,81,117,0.16)]"
                >
                  {/* 4:3 Image Container */}
                  <div className="relative aspect-[4/3] w-full rounded-t-2xl overflow-hidden bg-[#FAF0F3]">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product, activeColor)}
                      className="block w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C85175]"
                      aria-label={`Lihat detail ${product.name}`}
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        fallbackTitle={product.name}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>

                    {/* Wishlist Toggle */}
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label={
                        isWishlisted
                          ? `Hapus ${product.name} dari favorit`
                          : `Simpan ${product.name} ke favorit`
                      }
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-[#F1DCE2] flex items-center justify-center text-[#24191D] hover:text-[#C85175] transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-[#C85175] text-[#C85175]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#725D64] mb-1.5">
                        <span className="uppercase tracking-wider font-medium">
                          {product.categoryLabel}
                          {product.tag ? ` · ${product.tag}` : ''}
                        </span>
                        <span className="tabular-nums">
                          ★ {product.rating.toFixed(1)} ({product.reviewCount})
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-[#24191D] leading-snug mb-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product, activeColor)}
                          className="text-left hover:text-[#C85175] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="text-sm text-[#725D64] line-clamp-2 leading-relaxed">
                        {product.shortDesc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F7E8ED] flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[15px] font-semibold text-[#24191D] tabular-nums">
                          {formatRupiah(product.price)}
                        </p>
                        {/* Color Swatches */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          {product.colors.map((color) => {
                            const selected = activeColor.id === color.id;
                            return (
                              <button
                                key={color.id}
                                type="button"
                                onClick={() =>
                                  setSelectedColors((prev) => ({
                                    ...prev,
                                    [product.id]: color.id,
                                  }))
                                }
                                title={color.name}
                                aria-label={`Pilih warna ${color.name}`}
                                className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                                  selected
                                    ? 'border-[#C85175] scale-110 ring-1 ring-[#C85175] ring-offset-1'
                                    : 'border-[#D9BFC7] hover:scale-105'
                                }`}
                                style={{ backgroundColor: color.hex }}
                              />
                            );
                          })}
                          <span className="text-[11px] text-[#725D64] ml-1 truncate max-w-[110px]">
                            {activeColor.name}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onQuickAdd(product, activeColor, product.sizes[0])
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-lg bg-[#FDF2F5] hover:bg-[#C85175] text-[#C85175] hover:text-white border border-[#F1DCE2] hover:border-[#C85175] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
