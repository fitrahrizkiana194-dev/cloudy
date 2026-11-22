export type ProductCategory = 'all' | 'laptop-sleeve' | 'pouch' | 'bundle';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export interface SizeOption {
  label: string;
  dimensions: string;
  priceDelta?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: string;
  tag?: string;
  price: number;
  rating: number;
  reviewCount: number;
  shortDesc: string;
  description: string;
  image: string;
  detailImage: string;
  colors: ColorOption[];
  sizes: SizeOption[];
  features: string[];
  stock: number;
}

export const HERO_IMAGE = '/src/assets/images/cloudy_hero_banner_1795349096919.jpg';
export const CRAFT_DETAIL_IMAGE = '/src/assets/images/cloudy_craft_detail_1795349097024.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'cloudy-pufflet-bow',
    slug: 'cloudy-puffy-bow-laptop-sleeve',
    name: 'Cloudy Puffy Bow Laptop Sleeve',
    category: 'laptop-sleeve',
    categoryLabel: 'Tas Laptop',
    tag: 'Terlaris',
    price: 329000,
    rating: 4.9,
    reviewCount: 184,
    shortDesc: 'Sleeve laptop quilted empuk dengan aksen pita satin manis dan lapisan beludru.',
    description:
      'Dirancang untuk melindungi laptop Anda tanpa terasa kaku. Cloudy Puffy Bow Laptop Sleeve memadukan bahan nylon water-repellent yang lembut di tangan dengan busa memory 4 lapis serta interior fleece krem anti-gores.',
    image: '/src/assets/images/cloudy_bow_laptop_sleeve_1795349096604.jpg',
    detailImage: CRAFT_DETAIL_IMAGE,
    colors: [
      { id: 'blush-pink', name: 'Blush Pink', hex: '#F3C6D3' },
      { id: 'cloud-white', name: 'Cloud White', hex: '#FAF7F5' },
      { id: 'dusty-rose', name: 'Dusty Rose', hex: '#D89AA9' },
    ],
    sizes: [
      { label: '13"–14"', dimensions: '34 × 24 × 2.5 cm', priceDelta: 0 },
      { label: '15"–16"', dimensions: '38 × 27 × 2.5 cm', priceDelta: 30000 },
    ],
    features: [
      'Lapisan luar nylon matte tahan percikan air',
      'Busa peredam benturan 4-lapis selembut awan',
      'Interior plush fleece krem mencegah goresan bodi laptop',
      'Resleting logam halus dengan pelindung sudut bagian dalam',
    ],
    stock: 18,
  },
  {
    id: 'cloudy-quilted-pouch',
    slug: 'cloudy-quilted-cloud-pouch',
    name: 'Cloudy Quilted Cloud Pouch',
    category: 'pouch',
    categoryLabel: 'Pouch',
    tag: 'Baru',
    price: 169000,
    rating: 4.9,
    reviewCount: 126,
    shortDesc: 'Pouch serbaguna motif diamond quilt putih krem dengan list pink pastel.',
    description:
      'Teman rapi untuk kabel charger, mouse, powerbank, hingga perlengkapan kosmetik harian. Struktur puff-nya menjaga bentuk pouch tetap tegak dan melindungi barang rapuh di dalam tas Anda.',
    image: '/src/assets/images/cloudy_quilted_pouch_1795349096631.jpg',
    detailImage: '/src/assets/images/cloudy_duo_set_1795349096888.jpg',
    colors: [
      { id: 'cream-pink', name: 'Cream & Pink Trim', hex: '#F9F3EE' },
      { id: 'blush-pink', name: 'Full Blush Pink', hex: '#F3C6D3' },
    ],
    sizes: [
      { label: 'Regular', dimensions: '19 × 13 × 8 cm', priceDelta: 0 },
      { label: 'Large', dimensions: '23 × 15 × 9 cm', priceDelta: 25000 },
    ],
    features: [
      'Bukaan lebar 180 derajat agar isi mudah dijangkau',
      '2 sekat jaring elastis bagian dalam untuk kabel & adaptor',
      'Material ringan dan mudah dibersihkan dengan lap lembap',
      'Piping kontras pink pastel yang mempertegas siluet',
    ],
    stock: 24,
  },
  {
    id: 'cloudy-rosette-bag',
    slug: 'cloudy-rosette-laptop-bag',
    name: 'Cloudy Rosette Laptop Bag',
    category: 'laptop-sleeve',
    categoryLabel: 'Tas Laptop',
    price: 379000,
    rating: 4.8,
    reviewCount: 92,
    shortDesc: 'Tas jinjing dan selempang laptop dengan detail bunga rosette dan tali empuk.',
    description:
      'Fleksibel dibawa sebagai tas jinjing maupun selempang. Cloudy Rosette Laptop Bag hadir dengan tali bahu empuk yang bisa dilepas-pasang serta ruang tambahan untuk buku catatan A4 dan iPad.',
    image: '/src/assets/images/cloudy_rosette_bag_1795349095917.jpg',
    detailImage: CRAFT_DETAIL_IMAGE,
    colors: [
      { id: 'dusty-rose', name: 'Dusty Rose', hex: '#DDA7B5' },
      { id: 'cloud-white', name: 'Cloud White', hex: '#FAF7F5' },
      { id: 'blush-pink', name: 'Blush Pink', hex: '#F3C6D3' },
    ],
    sizes: [
      { label: '13"–14"', dimensions: '36 × 26 × 5 cm', priceDelta: 0 },
      { label: '15"–16"', dimensions: '40 × 29 × 5.5 cm', priceDelta: 35000 },
    ],
    features: [
      'Pegangan atas empuk plus tali selempang adjustable & detachable',
      'Saku belakang tersembunyi untuk paspor atau ponsel',
      'Aksen bunga rosette dijahit tangan dengan kuat',
      'Kait logam berwarna champagne gold anti-karat',
    ],
    stock: 11,
  },
  {
    id: 'cloudy-mini-ribbon-pouch',
    slug: 'cloudy-mini-ribbon-pouch',
    name: 'Cloudy Mini Ribbon Pouch',
    category: 'pouch',
    categoryLabel: 'Pouch',
    price: 119000,
    rating: 5.0,
    reviewCount: 74,
    shortDesc: 'Mini pouch kotak untuk TWS, lip balm, kunci, atau koin dengan pengait tas.',
    description:
      'Ukuran mungil yang bisa digantung langsung di tas laptop atau tote bag Anda. Dilengkapi pita grosgrain putih pada kepala resleting dan gantungan clasp emas yang praktis.',
    image: '/src/assets/images/cloudy_mini_ribbon_pouch_1795349097175.jpg',
    detailImage: '/src/assets/images/cloudy_quilted_pouch_1795349096631.jpg',
    colors: [
      { id: 'pink-dot', name: 'Pink Polka & Cream', hex: '#F5CAD6' },
      { id: 'cloud-white', name: 'Cloud White', hex: '#FAF7F5' },
    ],
    sizes: [
      { label: 'Mini Square', dimensions: '10 × 10 × 4.5 cm', priceDelta: 0 },
    ],
    features: [
      'Dilengkapi key clasp logam yang mudah dikaitkan ke tas utama',
      'Bantalan busa lembut menjaga casing earbud tetap aman',
      'Bordir titik putih halus di atas panel pink pastel',
      'Tarik resleting pita putih yang nyaman digenggam',
    ],
    stock: 30,
  },
  {
    id: 'cloudy-polka-tablet-sleeve',
    slug: 'cloudy-polka-tablet-sleeve',
    name: 'Cloudy Polka Scallop Sleeve',
    category: 'laptop-sleeve',
    categoryLabel: 'Tas Tablet & Laptop',
    price: 259000,
    rating: 4.9,
    reviewCount: 63,
    shortDesc: 'Sleeve putih krem bordir polka pink dengan tepian scallop yang anggun.',
    description:
      'Dibuat khusus untuk iPad, tablet, maupun laptop tipis hingga 13 inci. Tepi bergelombang (scallop trim) berwarna pink lembut berpadu dengan jahitan kotak empuk seperti bantal awan.',
    image: '/src/assets/images/cloudy_polka_tablet_sleeve_1795349096429.jpg',
    detailImage: CRAFT_DETAIL_IMAGE,
    colors: [
      { id: 'cream-blush', name: 'Cream & Pink Scallop', hex: '#FAF3ED' },
      { id: 'blush-pink', name: 'Blush Pink', hex: '#F3C6D3' },
    ],
    sizes: [
      { label: '11" Tablet', dimensions: '28 × 21 × 2 cm', priceDelta: 0 },
      { label: '13" Ultrabook', dimensions: '33 × 24 × 2 cm', priceDelta: 40000 },
    ],
    features: [
      'Slot khusus stylus / Apple Pencil di sisi dalam',
      'Penutup magnet tersembunyi tanpa resleting agar tablet cepat diakses',
      'Lapisan katun-nylon lembut dengan detail bordir polka pink',
      'Bobot sangat ringan hanya 165 gram',
    ],
    stock: 15,
  },
  {
    id: 'cloudy-duo-carry-set',
    slug: 'cloudy-duo-carry-set',
    name: 'Cloudy Duo Carry Set',
    category: 'bundle',
    categoryLabel: 'Paket Hemat',
    tag: 'Hemat Rp 49rb',
    price: 449000,
    rating: 5.0,
    reviewCount: 112,
    shortDesc: 'Set serasi 1 tas laptop quilted pink dan 1 tech pouch putih awan.',
    description:
      'Kombinasi paling favorit untuk kuliah, kerja kafe, dan perjalanan. Dapatkan satu Cloudy Quilted Laptop Sleeve warna Blush Pink dan satu Cloudy Puffy Tech Pouch warna Cloud White dalam satu paket hemat.',
    image: '/src/assets/images/cloudy_duo_set_1795349096888.jpg',
    detailImage: '/src/assets/images/cloudy_hero_banner_1795349096919.jpg',
    colors: [
      { id: 'pink-cream-duo', name: 'Pink Sleeve + White Pouch', hex: '#F3C6D3' },
      { id: 'all-cream-duo', name: 'White Sleeve + Pink Pouch', hex: '#FAF7F5' },
    ],
    sizes: [
      { label: '13"–14" Set', dimensions: 'Sleeve 34×24 cm + Pouch 19×13 cm', priceDelta: 0 },
      { label: '15"–16" Set', dimensions: 'Sleeve 38×27 cm + Pouch 19×13 cm', priceDelta: 30000 },
    ],
    features: [
      'Sudah termasuk 1 Laptop Sleeve + 1 Tech Pouch senada',
      'Dikemas dalam dust bag kain Cloudy siap untuk hadiah',
      'Gratis ongkir otomatis untuk seluruh Pulau Jawa & subsidi luar Jawa',
      'Perlindungan 360 derajat untuk perangkat dan aksesorinya',
    ],
    stock: 9,
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
