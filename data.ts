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


export const initialProducts: Product[] = [
    {
        id: 1,
        name: 'Premium Graphics Bundle',
        description: 'A massive collection of over 10,000 premium graphics resources, including vectors, icons, and templates. Perfect for designers and content creators.',
        price: 49.99,
        discountPrice: 29.99,
        discountEndDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
        images: ['https://picsum.photos/seed/gfx1/800/600', 'https://picsum.photos/seed/gfx2/800/600'],
        category: 'Graphics Resources',
        tags: ['Graphics Tools', 'VIP', 'Sale'],
        isFeatured: true,
        isLive: true,
        stock: 100,
        digitalFile: 'DOWNLOAD_LINK_OR_CODE_FOR_GFX_BUNDLE'
    },
    {
        id: 2,
        name: 'Streaming Service 1-Year Subscription',
        description: 'Enjoy unlimited access to thousands of movies and TV shows with this 1-year subscription to our premium streaming service.',
        price: 120.00,
        images: ['https://picsum.photos/seed/stream1/800/600', 'https://picsum.photos/seed/stream2/800/600'],
        category: 'Subscription',
        tags: ['Subscription', 'Entertainment'],
        isFeatured: true,
        isLive: true,
        stock: 50,
        digitalFile: 'ACTIVATION_KEY: XXXX-YYYY-ZZZZ-AAAA'
    },
    {
        id: 3,
        name: 'Ultimate Developer Software Pack',
        description: 'A suite of essential software for developers, including IDEs, testing tools, and project management applications.',
        price: 250.00,
        discountPrice: 199.99,
        discountEndDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
        images: ['https://picsum.photos/seed/dev1/800/600'],
        category: 'Software',
        tags: ['Software', 'Development', 'VIP'],
        isFeatured: false,
        isLive: true,
        stock: 30,
        digitalFile: 'LICENSE_KEY_FOR_DEV_PACK: DEV-123-ABC-456'
    },
    {
        id: 4,
        name: '$50 Universal Gift Card',
        description: 'The perfect gift for any occasion. This gift card can be redeemed for any product on our site.',
        price: 50.00,
        images: ['https://picsum.photos/seed/gift1/800/600'],
        category: 'Gift Card',
        tags: ['Gift Card', 'New'],
        isFeatured: true,
        isLive: true,
        stock: 200,
        digitalFile: 'GIFT_CARD_CODE: OLALA-GIFT-50-XYZ'
    },
    {
        id: 5,
        name: 'Educational Combo Pack',
        description: 'Access to over 200 online courses on various subjects, from programming to digital marketing. A complete learning solution.',
        price: 99.99,
        images: ['https://picsum.photos/seed/edu1/800/600', 'https://picsum.photos/seed/edu2/800/600'],
        category: 'Education',
        tags: ['Educational Combo', 'Learning'],
        isFeatured: true,
        isLive: true,
        stock: 100,
        digitalFile: 'ACCESS_INSTRUCTIONS_AND_LOGIN_FOR_EDU_PACK'
    },
     {
        id: 6,
        name: 'Pro Video Editing Software',
        description: 'Industry-standard video editing software with advanced features like 4K support, motion tracking, and color grading.',
        price: 299.00,
        images: ['https://picsum.photos/seed/video1/800/600'],
        category: 'Software',
        tags: ['Software', 'Video Editing'],
        isFeatured: true,
        isLive: true,
        stock: 45,
        digitalFile: 'SERIAL_NUMBER_FOR_VIDEO_SOFTWARE: VID-PRO-987-ZYX'
    }
];

export const initialOrders: Order[] = [
    {
        id: 'ORD-12345',
        userId: 1,
        customer: { name: 'Rohan Ahmed', email: 'rohan@example.com', phone: '01712345678', address: 'Dhaka, Bangladesh' },
        items: [{ product: initialProducts[0], quantity: 1 }, { product: initialProducts[3], quantity: 2 }],
        total: 29.99 + (50 * 2),
        paymentMethod: 'bKash',
        transactionId: 'BK123XYZ',
        status: 'Delivered',
        date: new Date(new Date().setDate(new Date().getDate() - 5)),
    },
    {
        id: 'ORD-12346',
        userId: 2,
        customer: { name: 'Farah Islam', email: 'farah@example.com', phone: '01812345678', address: 'Chittagong, Bangladesh' },
        items: [{ product: initialProducts[1], quantity: 1 }],
        total: 120.00,
        paymentMethod: 'Nagad',
        transactionId: 'NG456ABC',
        status: 'Processing',
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
    }
];

export const initialHeroSlides: HeroSlide[] = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/slide1/1200/600', title: 'Biggest Sale of the Year', subtitle: 'Get up to 50% off on all software packs!', link: '/shop' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/slide2/1200/600', title: 'New Arrivals: Gift Cards', subtitle: 'The perfect gift for any occasion.', link: '/shop' },
    { id: 3, imageUrl: 'https://picsum.photos/seed/slide3/1200/600', title: 'Exclusive Graphics Bundles', subtitle: 'Unlock your creativity with our premium resources.', link: '/shop' },
];

export const initialUsers: User[] = [
    { id: 1, name: 'Customer One', email: 'customer1@example.com', phone: '01111111111', address: 'Dhaka', password: 'password123' },
    { id: 2, name: 'Customer Two', email: 'customer2@example.com', phone: '02222222222', address: 'Chittagong', password: 'password123' },
];

export const initialProductRequests: ProductRequest[] = [
    { id: 1, name: 'Test User', email: 'test@example.com', message: 'I would love to see a pro-level audio editing suite available.', date: new Date() }
];

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