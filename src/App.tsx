import { useEffect, useState } from 'react';
import {
  PRODUCTS,
  type ColorOption,
  type Product,
  type ProductCategory,
  type SizeOption,
} from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, type CartItem } from './components/CartDrawer';

const CART_STORAGE_KEY = 'cloudy_cart_v1';
const WISHLIST_STORAGE_KEY = 'cloudy_wishlist_v1';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    color?: ColorOption;
  } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (
    product: Product,
    color: ColorOption,
    size: SizeOption,
    quantity = 1
  ) => {
    const unitPrice = product.price + (size.priceDelta || 0);
    const key = `${product.id}__${color.id}__${size.label}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.image,
          colorName: color.name,
          colorHex: color.hex,
          sizeLabel: size.label,
          unitPrice,
          quantity,
        },
      ];
    });

    setToastMessage(`${product.name} ditambahkan ke Tas Belanja.`);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const scrollToCollection = () => {
    const el = document.getElementById('koleksi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#24191D]">
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategoryNav={(cat) => setActiveCategory(cat)}
      />

      <main className="flex-1">
        <Hero
          featuredProduct={PRODUCTS[0]}
          onExploreCollection={scrollToCollection}
          onViewFeatured={(product) =>
            setSelectedProduct({ product, color: product.colors[0] })
          }
        />

        <ProductSection
          products={PRODUCTS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(product, color) =>
            setSelectedProduct({ product, color })
          }
          onQuickAdd={(product, color, size) =>
            handleAddToCart(product, color, size, 1)
          }
        />

        <CraftsmanshipSection />
      </main>

      <Footer onSelectCategory={setActiveCategory} />

      <ProductDetailModal
        product={selectedProduct?.product || null}
        initialColor={selectedProduct?.color}
        isWishlisted={
          selectedProduct
            ? wishlistIds.includes(selectedProduct.product.id)
            : false
        }
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 max-w-sm rounded-xl bg-[#24191D] text-white px-4 py-3 text-xs font-medium shadow-lg flex items-center justify-between gap-4"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="text-[#F7B2C7] hover:text-white font-semibold whitespace-nowrap cursor-pointer"
          >
            Buka Tas
          </button>
        </div>
      )}
    </div>
  );
}
