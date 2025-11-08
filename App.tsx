
import React, { useState, useReducer, useCallback, useMemo } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Product, CartItem, Order, AppState, AppContextType, Action } from './data';
import { initialProducts, initialOrders, staticPageContent } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import StaticPage from './pages/StaticPage';

export const AppContext = React.createContext<AppContextType | null>(null);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product: action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId ? { ...order, status: action.payload.status } : order
        ),
      };
    case 'ADD_PRODUCT':
        return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
        return {
            ...state,
            products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
        };
    case 'TOGGLE_PRODUCT_STATUS':
        return {
            ...state,
            products: state.products.map(p => p.id === action.payload ? { ...p, isLive: !p.isLive } : p)
        };
    default:
      return state;
  }
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {!isAdminRoute && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/about" element={<StaticPage page="about" />} />
                    <Route path="/contact" element={<StaticPage page="contact" />} />
                    <Route path="/faq" element={<StaticPage page="faq" />} />
                    <Route path="/privacy" element={<StaticPage page="privacy" />} />
                    <Route path="/refund" element={<StaticPage page="refund" />} />
                    <Route path="/terms" element={<StaticPage page="terms" />} />
                </Routes>
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    );
};


const App: React.FC = () => {
  const [initialState] = useState({
    products: initialProducts,
    cart: [],
    orders: initialOrders,
  });

  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
