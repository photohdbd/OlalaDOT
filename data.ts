import type { Dispatch } from 'react';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  discountEndDate?: Date;
  images: string[];
  category: string;
  tags: string[];
  isFeatured: boolean;
  isLive: boolean;
  stock: number;
  digitalFile?: string; // Link or code to be delivered
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  userId: number; // Link order to a user
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: CartItem[];
  total: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Upay' | 'COD';
  transactionId?: string;
  status: 'Pending' | 'Processing' | 'On The Way' | 'Delivered';
  date: Date;
};

export type HeroSlide = {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  link: string;
};

export type User = {
  id: number;
  name:string;
  email: string;
  phone: string;
  address: string;
  password?: string; // Should not be stored in frontend state in a real app
};

export type ProductRequest = {
  id: number;
  name: string;
  email: string;
  message: string;
  date: Date;
};

export type AppState = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  heroSlides: HeroSlide[];
  users: User[];
  productRequests: ProductRequest[];
  isAuthenticated: boolean;
  currentUser: User | null;
  isAdminAuthenticated: boolean;
};

export type AppContextType = {
  state: AppState;
  dispatch: Dispatch<Action>;
};

export type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'TOGGLE_PRODUCT_STATUS'; payload: number }
  | { type: 'ADD_HERO_SLIDE'; payload: Omit<HeroSlide, 'id'> }
  | { type: 'DELETE_HERO_SLIDE'; payload: number }
  | { type: 'REGISTER_USER'; payload: User }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'LOGOUT' }
  | { type: 'SET_ADMIN_AUTH'; payload: boolean }
  | { type: 'ADD_PRODUCT_REQUEST'; payload: Omit<ProductRequest, 'id' | 'date'> };


export const initialProducts: Product[] = [];

export const initialOrders: Order[] = [];

export const initialHeroSlides: HeroSlide[] = [];

export const initialUsers: User[] = [];

export const initialProductRequests: ProductRequest[] = [];

export const staticPageContent = {
  about: {
    title: "About OlalaDOT",
    content: "OlalaDOT was born from a simple idea: to bring the most unique and amazing digital products ('Gajab Jinis') to everyone. We are a team of passionate tech enthusiasts and digital curators dedicated to finding and offering the best subscriptions, software, graphics, and more. Our mission is to make premium digital goods accessible and affordable. We believe in quality, customer satisfaction, and the magic of a great find. Welcome to our 'Ajab Site'!"
  },
  contact: {
    title: "Contact Us & Product Request",
    content: "Have a question, need support, or want to request a new product? We're here to help! Reach out to us via the form below or through our social media channels. Our team will get back to you as soon as possible."
  },
  faq: {
    title: "Frequently Asked Questions",
    content: [
      { q: "How do I receive my digital product?", a: "Once your order is confirmed and payment is verified, you will receive an email within 2-4 hours containing the product details. You can also access your purchased content directly from your 'My Account' page after the order is marked as delivered." },
      { q: "What payment methods do you accept?", a: "We accept bKash, Nagad, Rocket, and Upay. You must be logged in to place an order." },
      { q: "What is your refund policy?", a: "Please refer to our Refund Policy page for detailed information. Generally, due to the nature of digital products, refunds are handled on a case-by-case basis." }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    content: "Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. We are committed to protecting your personal data and ensuring transparency in how we handle it."
  },
  refund: {
    title: "Refund Policy",
    content: "At OlalaDOT, we strive for customer satisfaction. If you are not satisfied with your purchase, please contact us within 7 days. For digital products, refunds are reviewed on a case-by-case basis and are generally issued only if the product is defective or not as described. Please read the product description carefully before purchasing."
  },
  terms: {
    title: "Terms & Conditions",
    content: "By accessing and using OlalaDOT, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern OlalaDOT's relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website."
  }
};