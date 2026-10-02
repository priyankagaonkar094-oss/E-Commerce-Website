import { useState, useMemo } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type Category = "All" | "Men" | "Women" | "Kids";
type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: Category;
  subCategory: string;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
};

// ── Product Data ───────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Floral Wrap Dress",
    brand: "Zara",
    price: 1299,
    originalPrice: 2499,
    category: "Women",
    subCategory: "Dresses",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=520&fit=crop&auto=format",
    rating: 4.5,
    reviews: 312,
    isNew: true,
  },
  {
    id: 2,
    name: "Slim Fit Chinos",
    brand: "H&M",
    price: 899,
    originalPrice: 1799,
    category: "Men",
    subCategory: "Trousers",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=520&fit=crop&auto=format",
    rating: 4.2,
    reviews: 189,
  },
  {
    id: 3,
    name: "Cartoon Print Tee",
    brand: "UCB Kids",
    price: 449,
    originalPrice: 799,
    category: "Kids",
    subCategory: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=520&fit=crop&auto=format",
    rating: 4.6,
    reviews: 95,
  },
  {
    id: 4,
    name: "Oversized Hoodie",
    brand: "Roadster",
    price: 1099,
    originalPrice: 1999,
    category: "Women",
    subCategory: "Sweatshirts",
    image:
      "https://www.bing.com/th?id=OPAC.HeBiP0sjq2TZhg474C474&o=5&pid=21.1&w=140&h=200&rs=1&qlt=100&dpr=0.9&o=2&c=8&pcl=f5f5f5format",
    rating: 4.7,
    reviews: 428,
    isNew: true,
  },
  {
    id: 5,
    name: "Graphic Print Tee",
    brand: "Flying Machine",
    price: 599,
    originalPrice: 999,
    category: "Men",
    subCategory: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=520&fit=crop&auto=format",
    rating: 4.3,
    reviews: 256,
  },
  {
    id: 6,
    name: "Denim Dungaree",
    brand: "H&M Kids",
    price: 699,
    originalPrice: 1299,
    category: "Kids",
    subCategory: "Dungarees",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=520&fit=crop&auto=format",
    rating: 4.4,
    reviews: 143,
  },
  {
    id: 7,
    name: "Boho Midi Skirt",
    brand: "Mango",
    price: 1499,
    originalPrice: 2999,
    category: "Women",
    subCategory: "Skirts",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=520&fit=crop&auto=format",
    rating: 4.8,
    reviews: 367,
  },
  {
    id: 8,
    name: "Linen Shirt",
    brand: "Louis Philippe",
    price: 1299,
    originalPrice: 2499,
    category: "Men",
    subCategory: "Shirts",
    image:
      "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=400&h=520&fit=crop&auto=format",
    rating: 4.5,
    reviews: 201,
  },
  {
    id: 9,
    name: "Floral Jumpsuit",
    brand: "AND",
    price: 1799,
    originalPrice: 3499,
    category: "Women",
    subCategory: "Jumpsuits",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=520&fit=crop&auto=format",
    rating: 4.6,
    reviews: 178,
    isNew: true,
  },
  {
    id: 10,
    name: "Jogger Pants",
    brand: "Puma",
    price: 1199,
    originalPrice: 2199,
    category: "Men",
    subCategory: "Activewear",
    image:
      "https://image.unplash.com/photo-1578662996442-48f60103fc96?w=5400&h=520&fit=crop&auto=format",
    rating: 4.5,
    reviews: 100,
    isNew: true,
  },
  {
    id: 11,
    name: "Frock with bow",
    brand: "Mothercare",
    price: 549,
    originalPrice: 999,
    category: "Kids",
    subCategory: "Frocks",
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=520&fit=crop&auto=format",
    rating: 4.7,
    reviews: 212,
  },
  {
    id: 12,
    name: "Blazer Jacket",
    brand: "Marks & Spencer",
    price: 2499,
    originalPrice: 4999,
    category: "Women",
    subCategory: "Jackets",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRsxF7B45Lf6bU4Bablt-AiQUdmEx9uh4e7UV95buxYvP6DlA06o8H6xJIDNcKyc_WIARDiQUL_SdZxw8pTEBibo3fYQzIXBtqOLgba9p3DD_pVfPiRICtvCA",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 13,
    name: "Blazer Jacket",
    brand: "Marks & Spencer",
    price: 2499,
    originalPrice: 4999,
    category: "Women",
    subCategory: "Jackets",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRsxF7B45Lf6bU4Bablt-AiQUdmEx9uh4e7UV95buxYvP6DlA06o8H6xJIDNcKyc_WIARDiQUL_SdZxw8pTEBibo3fYQzIXBtqOLgba9p3DD_pVfPiRICtvCA",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 14,
    name: "Blazer with pant",
    brand: "Marks & Spencer",
    price: 2499,
    originalPrice: 4999,
    category: "Women",
    subCategory: "Jackets",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRsxF7B45Lf6bU4Bablt-AiQUdmEx9uh4e7UV95buxYvP6DlA06o8H6xJIDNcKyc_WIARDiQUL_SdZxw8pTEBibo3fYQzIXBtqOLgba9p3DD_pVfPiRICtvCA",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 15,
    name: "co-ord Set",
    brand: "Levis",
    price: 1999,
    originalPrice: 2500,
    category: "Women",
    subCategory: "Dresses",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRsxF7B45Lf6bU4Bablt-AiQUdmEx9uh4e7UV95buxYvP6DlA06o8H6xJIDNcKyc_WIARDiQUL_SdZxw8pTEBibo3fYQzIXBtqOLgba9p3DD_pVfPiRICtvCA",
    rating: 4.9,
    reviews: 120,
  },
];

const SUBCATEGORIES: Record<Category, string[]> = {
  All: ["Trending", "New Arrival", "Sale"],
  Women: ["Dresses", "Tops", "Skirts", "Jeans", "Sweatshirts", "Jumpsuits"],
  Men: ["T-Shirts", "Shirts", "Trousers", "Jeans", "Activewear", "Jackets"],
  Kids: ["T-Shirts", "Frocks", "Dungarees", "Shorts", "Jackets"],
};

// ── Icons ──────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "#e91e8c" : "none"}
    stroke={filled ? "#e91e8c" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill={filled ? "#fbbf24" : "none"}
    stroke="#fbbf24"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);
const MenuIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const OrderIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

// ── Discount helper ────────────────────────────────────────────────────────
function discount(price: number, original: number) {
  return Math.round((1 - price / original) * 100);
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= Math.round(rating)} />
      ))}
    </span>
  );
}

// ── Product Card ───────────────────────────────────────────────────────────
function ProductCard({
  product,
  wishlisted,
  onWishlist,
  onAddToCart,
}: {
  product: Product;
  wishlisted: boolean;
  onWishlist: () => void;
  onAddToCart: () => void;
}) {
  const disc = discount(product.price, product.originalPrice);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-100 flex flex-col">
      <div
        className="relative overflow-hidden bg-pink-50"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-[#e91e8c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            New
          </span>
        )}
        <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {disc}% OFF
        </span>
        <button
          onClick={onWishlist}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[11px] text-[#e91e8c] font-bold uppercase tracking-wider">
          {product.brand}
        </p>
        <p className="text-sm font-600 text-gray-800 line-clamp-1 mt-0.5">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-800 text-gray-900 text-base">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-gray-400 line-through text-xs">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>
        <button
          onClick={onAddToCart}
          className="mt-3 w-full py-2 rounded-xl bg-[#e91e8c] text-white text-sm font-700 hover:bg-[#c2185b] active:scale-95 transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ── Login Modal ────────────────────────────────────────────────────────────
function LoginModal({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: (name: string) => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    onLogin(mode === "signup" ? name : email.split("@")[0]);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(30,0,20,0.5)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-[slideUp_0.3s_ease]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#e91e8c] transition-colors"
        >
          <CloseIcon />
        </button>
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl font-900 text-[#e91e8c]">
            TRENDÉ
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {mode === "login" ? "Welcome back!" : "Join the fashion tribe"}
          </p>
        </div>
        <div className="flex bg-pink-50 rounded-xl p-1 mb-6">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError("");
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-700 transition-all ${mode === m ? "bg-[#e91e8c] text-white shadow" : "text-gray-500"}`}
            >
              {m === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e91e8c] focus:ring-2 focus:ring-pink-100 transition"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e91e8c] focus:ring-2 focus:ring-pink-100 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e91e8c] focus:ring-2 focus:ring-pink-100 transition"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-[#e91e8c] text-white rounded-xl font-700 hover:bg-[#c2185b] transition-all active:scale-95"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          By continuing, you agree to our{" "}
          <span className="text-[#e91e8c] cursor-pointer">Terms</span> &amp;{" "}
          <span className="text-[#e91e8c] cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

// ── Cart Drawer ────────────────────────────────────────────────────────────
function CartDrawer({
  items,
  onClose,
  onRemove,
}: {
  items: { product: Product; qty: number }[];
  onClose: () => void;
  onRemove: (id: number) => void;
}) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="flex-1"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
      />
      <div className="w-full max-w-sm bg-white flex flex-col shadow-2xl animate-[slideInRight_0.3s_ease]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-pink-100">
          <h2 className="font-800 text-lg text-gray-800">
            Shopping Bag{" "}
            <span className="text-[#e91e8c]">({items.length})</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#e91e8c] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
              <CartIcon />
            </div>
            <p className="font-700 text-gray-700">Your bag is empty</p>
            <p className="text-sm text-gray-400 mt-1">
              Add items to get started
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex gap-3 bg-pink-50 rounded-xl p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#e91e8c] font-700 uppercase">
                      {product.brand}
                    </p>
                    <p className="text-sm font-600 text-gray-800 line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {qty}</p>
                    <p className="font-700 text-gray-900 text-sm mt-1">
                      ₹{(product.price * qty).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-pink-100">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600 font-600">Total</span>
                <span className="font-800 text-lg text-gray-900">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              <button className="w-full py-3.5 bg-[#e91e8c] text-white rounded-xl font-700 hover:bg-[#c2185b] transition-all active:scale-95">
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Wishlist Drawer ────────────────────────────────────────────────────────
function WishlistDrawer({
  products,
  wishlist,
  onClose,
  onToggleWishlist,
  onAddToCart,
}: {
  products: Product[];
  wishlist: Set<number>;
  onClose: () => void;
  onToggleWishlist: (id: number) => void;
  onAddToCart: (p: Product) => void;
}) {
  const wishlisted = products.filter((p) => wishlist.has(p.id));
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="flex-1"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
      />
      <div className="w-full max-w-sm bg-white flex flex-col shadow-2xl animate-[slideInRight_0.3s_ease]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-pink-100">
          <h2 className="font-800 text-lg text-gray-800">
            Wishlist{" "}
            <span className="text-[#e91e8c]">({wishlisted.length})</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#e91e8c] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        {wishlisted.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
              <HeartIcon />
            </div>
            <p className="font-700 text-gray-700">Nothing here yet</p>
            <p className="text-sm text-gray-400 mt-1">Save items you love</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlisted.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 bg-pink-50 rounded-xl p-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#e91e8c] font-700 uppercase">
                    {product.brand}
                  </p>
                  <p className="text-sm font-600 text-gray-800 line-clamp-1">
                    {product.name}
                  </p>
                  <p className="font-700 text-gray-900 text-sm mt-1">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="mt-2 text-xs px-3 py-1.5 bg-[#e91e8c] text-white rounded-lg font-600 hover:bg-[#c2185b] transition-all"
                  >
                    Move to Cart
                  </button>
                </div>
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Orders Modal ───────────────────────────────────────────────────────────
function OrdersModal({ onClose }: { onClose: () => void }) {
  const mockOrders = [
    {
      id: "#TRD2890",
      item: "Floral Wrap Dress",
      brand: "Zara",
      date: "Sep 20, 2026",
      status: "Delivered",
      price: 1299,
    },
    {
      id: "#TRD2756",
      item: "Oversized Hoodie",
      brand: "Roadster",
      date: "Sep 14, 2026",
      status: "In Transit",
      price: 1099,
    },
    {
      id: "#TRD2644",
      item: "Slim Fit Chinos",
      brand: "H&M",
      date: "Sep 5, 2026",
      status: "Delivered",
      price: 899,
    },
  ];
  const statusColor: Record<string, string> = {
    Delivered: "text-green-600 bg-green-50",
    "In Transit": "text-blue-600 bg-blue-50",
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(30,0,20,0.5)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#e91e8c] transition-colors"
        >
          <CloseIcon />
        </button>
        <h2 className="font-800 text-xl text-gray-800 mb-5">My Orders</h2>
        <div className="space-y-3">
          {mockOrders.map((o) => (
            <div
              key={o.id}
              className="flex items-center gap-4 p-4 bg-pink-50 rounded-2xl"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-600">{o.id}</span>
                  <span
                    className={`text-[10px] font-700 px-2 py-0.5 rounded-full ${statusColor[o.status]}`}
                  >
                    {o.status}
                  </span>
                </div>
                <p className="text-sm font-700 text-gray-800 mt-0.5 line-clamp-1">
                  {o.item}
                </p>
                <p className="text-[11px] text-[#e91e8c] font-600">{o.brand}</p>
                <p className="text-xs text-gray-400 mt-0.5">{o.date}</p>
              </div>
              <div className="text-right">
                <p className="font-800 text-gray-900">
                  ₹{o.price.toLocaleString()}
                </p>
                <button className="text-xs text-[#e91e8c] font-600 mt-1 hover:underline">
                  Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Hero Banner ────────────────────────────────────────────────────────────
function HeroBanner({
  onCategorySelect,
}: {
  onCategorySelect: (c: Category) => void;
}) {
  const slides = [
    {
      label: "Women",
      headline: "Dress to\nExpress",
      sub: "New arrivals — up to 60% off",
      bg: "from-[#fce4f3] to-[#f8bbd9]",
      img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=700&fit=crop&auto=format",
      cat: "Women" as Category,
    },
    {
      label: "Men",
      headline: "Define\nYour Style",
      sub: "Premium menswear, curated",
      bg: "from-[#e3f2fd] to-[#bbdefb]",
      img: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=600&h=700&fit=crop&auto=format",
      cat: "Men" as Category,
    },
    {
      label: "Kids",
      headline: "Tiny Trends\nBig Fun",
      sub: "Bright colours for bright minds",
      bg: "from-[#fff9c4] to-[#fff176]",
      img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=700&fit=crop&auto=format",
      cat: "Kids" as Category,
    },
  ];
  const [active, setActive] = useState(0);
  const s = slides[active];

  return (
    <div
      className={`bg-gradient-to-br ${s.bg} rounded-3xl overflow-hidden relative`}
      style={{ minHeight: "340px" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-10 md:py-12">
        <div className="flex-1 z-10">
          <span className="inline-block bg-[#e91e8c] text-white text-[11px] font-700 uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {s.label} Collection
          </span>
          <h1
            className="font-display text-4xl md:text-5xl font-900 text-gray-900 leading-tight"
            style={{ whiteSpace: "pre-line" }}
          >
            {s.headline}
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base">{s.sub}</p>
          <button
            onClick={() => onCategorySelect(s.cat)}
            className="mt-6 px-7 py-3 bg-[#e91e8c] text-white rounded-full font-700 text-sm hover:bg-[#c2185b] transition-all active:scale-95 shadow-lg shadow-pink-300"
          >
            Shop Now →
          </button>
        </div>
        <div className="w-48 md:w-56 flex-shrink-0">
          <img
            src={s.img}
            alt={s.label}
            className="w-full h-64 md:h-72 object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
      {/* Slide dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-[#e91e8c] w-6" : "bg-pink-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set([1, 4]));
  const [cart, setCart] = useState<Map<number, number>>(new Map());
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubCat, setActiveSubCat] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<
    "default" | "price-asc" | "price-desc" | "discount"
  >("default");

  const cartCount = Array.from(cart.values()).reduce((a, b) => a + b, 0);
  const cartItems = Array.from(cart.entries()).map(([id, qty]) => ({
    product: PRODUCTS.find((p) => p.id === id)!,
    qty,
  }));

  function toggleWishlist(id: number) {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function addToCart(product: Product) {
    setCart((prev) => {
      const next = new Map(prev);
      next.set(product.id, (next.get(product.id) || 0) + 1);
      return next;
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }

  function handleLogin(name: string) {
    setUser(name);
    setShowLogin(false);
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== "All")
      list = list.filter((p) => p.category === activeCategory);
    if (activeSubCat) list = list.filter((p) => p.subCategory === activeSubCat);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q),
      );
    }
    if (sortBy === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "discount")
      list = [...list].sort(
        (a, b) =>
          discount(b.price, b.originalPrice) -
          discount(a.price, a.originalPrice),
      );
    return list;
  }, [activeCategory, activeSubCat, searchQuery, sortBy]);

  const subCats = SUBCATEGORIES[activeCategory];

  return (
    <div className="min-h-screen" style={{ background: "#fff9fc" }}>
      {/* ── Topbar ── */}
      <div className="bg-[#e91e8c] text-white text-center text-xs py-2 font-600 tracking-wide">
        🎉 FREE DELIVERY on orders above ₹499 · Use code{" "}
        <strong>TRENDÉ20</strong> for extra 20% off
      </div>

      {/* ── Navbar ── */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-2xl font-900 text-[#e91e8c] tracking-tight flex-shrink-0"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            TRENDÉ
          </a>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-2 hidden sm:block">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveCategory("All");
                  setActiveSubCat(null);
                }}
                placeholder="Search for clothes, brands..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-sm focus:outline-none focus:border-[#e91e8c] focus:ring-2 focus:ring-pink-100 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          {/* Nav actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* User */}
            <button
              onClick={() => (user ? setShowOrders(true) : setShowLogin(true))}
              className="flex flex-col items-center px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors"
              aria-label="Login / Profile"
            >
              <UserIcon />
              <span className="text-[10px] font-600 hidden sm:block mt-0.5">
                {user ? user.split(" ")[0] : "Login"}
              </span>
            </button>

            {/* Orders */}
            <button
              onClick={() => (user ? setShowOrders(true) : setShowLogin(true))}
              className="flex flex-col items-center px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors hidden sm:flex"
              aria-label="My Orders"
            >
              <OrderIcon />
              <span className="text-[10px] font-600 mt-0.5">Orders</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setShowWishlist(true)}
              className="relative flex flex-col items-center px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors"
              aria-label="Wishlist"
            >
              <HeartIcon />
              {wishlist.size > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#e91e8c] text-white text-[9px] rounded-full flex items-center justify-center font-700 px-1">
                  {wishlist.size}
                </span>
              )}
              <span className="text-[10px] font-600 hidden sm:block mt-0.5">
                Wishlist
              </span>
            </button>

            {/* Cart */}
            <button
              onClick={() => setShowCart(true)}
              className="relative flex flex-col items-center px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors"
              aria-label="Cart"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#e91e8c] text-white text-[9px] rounded-full flex items-center justify-center font-700 px-1">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] font-600 hidden sm:block mt-0.5">
                Cart
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="sm:hidden px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors ml-1"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveCategory("All");
                setActiveSubCat(null);
              }}
              placeholder="Search for clothes, brands..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-sm focus:outline-none focus:border-[#e91e8c] transition"
            />
          </div>
        </div>

        {/* Category nav */}
        <nav className="border-t border-pink-50 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1.5">
            {(["All", "Men", "Women", "Kids"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveSubCat(null);
                  setSearchQuery("");
                }}
                className={`px-5 py-2 rounded-xl text-sm font-700 whitespace-nowrap transition-all ${activeCategory === cat ? "bg-[#e91e8c] text-white" : "text-gray-600 hover:bg-pink-50"}`}
              >
                {cat === "All" ? "✦ All" : cat}
              </button>
            ))}
            <div className="w-px h-5 bg-pink-200 mx-2" />
            <button
              onClick={() => {
                setSortBy("discount");
                setActiveCategory("All");
              }}
              className="px-4 py-2 rounded-xl text-sm font-700 text-[#e91e8c] hover:bg-pink-50 whitespace-nowrap transition-all"
            >
              Sale 🔥
            </button>
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveSubCat(null);
                setSortBy("default");
              }}
              className="px-4 py-2 rounded-xl text-sm font-700 text-gray-600 hover:bg-pink-50 whitespace-nowrap transition-all"
            >
              New Arrivals
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-pink-100 bg-white px-4 py-3 space-y-2">
            <button
              onClick={() => {
                setShowOrders(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-600 text-gray-700 hover:bg-pink-50"
            >
              My Orders
            </button>
            <button
              onClick={() => {
                setUser(null);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-600 text-gray-700 hover:bg-pink-50"
            >
              {user ? `Logout (${user})` : "Login"}
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero */}
        {!searchQuery && (
          <HeroBanner
            onCategorySelect={(cat) => {
              setActiveCategory(cat);
              setActiveSubCat(null);
            }}
          />
        )}

 
        {/* Subcategory pills */}
        {!searchQuery && (
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-1">
              <button
                onClick={() => setActiveSubCat(null)}
                className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap border transition-all ${
                  !activeSubCat
                    ? "bg-[#e91e8c] text-white border-[#e91e8c]"
                    : "bg-white text-gray-600 border-pink-200 hover:border-[#e91e8c]"
                }`}
              >
                All
              </button>

              {subCats.map((sc) => (
                <button
                  key={sc}
                  onClick={() =>
                    setActiveSubCat(sc === activeSubCat ? null : sc)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap border transition-all ${
                    activeSubCat === sc
                      ? "bg-[#e91e8c] text-white border-[#e91e8c]"
                      : "bg-white text-gray-600 border-pink-200 hover:border-[#e91e8c]"
                  }`}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Filters bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-800 text-lg text-gray-800">
            {searchQuery
              ? `Results for "${searchQuery}" (${filtered.length})`
              : `${activeCategory === "All" ? "All Products" : activeCategory}${activeSubCat ? ` · ${activeSubCat}` : ""} (${filtered.length})`}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-600">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-pink-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-[#e91e8c] font-600 text-gray-700"
            >
              <option value="default">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-700 text-xl text-gray-700">No results found</p>
            <p className="text-gray-400 mt-2">
              Try different keywords or browse categories
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setActiveSubCat(null);
              }}
              className="mt-6 px-6 py-3 bg-[#e91e8c] text-white rounded-full font-700 hover:bg-[#c2185b] transition-all"
            >
              Browse All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlisted={wishlist.has(product.id)}
                onWishlist={() => toggleWishlist(product.id)}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3
                className="font-display text-xl font-900 text-[#e91e8c] mb-3"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                TRENDÉ
              </h3>
              <p className="text-sm text-gray-500">
                Fashion for the bold. Style for every story.
              </p>
            </div>
            {[
              {
                title: "Shop",
                links: ["Men", "Women", "Kids", "Sale", "New Arrivals"],
              },
              {
                title: "Help",
                links: ["My Orders", "Returns", "Size Guide", "Contact Us"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-700 text-gray-800 mb-3 text-sm">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-[#e91e8c] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-pink-100 mt-8 pt-6 text-center text-xs text-gray-400">
            © 2026 TRENDÉ. All rights reserved. Made with ♡ for fashion lovers.
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
      {showCart && (
        <CartDrawer
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
        />
      )}
      {showWishlist && (
        <WishlistDrawer
          products={PRODUCTS}
          wishlist={wishlist}
          onClose={() => setShowWishlist(false)}
          onToggleWishlist={toggleWishlist}
          onAddToCart={(p) => {
            addToCart(p);
            setShowWishlist(false);
          }}
        />
      )}
      {showOrders && <OrdersModal onClose={() => setShowOrders(false)} />}
    </div>
  );
}
