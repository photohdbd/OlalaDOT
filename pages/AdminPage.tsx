
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType, Product, Order } from '../data';

const AdminPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const [activeTab, setActiveTab] = useState('orders');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock authentication
        if (email === 'admin@olaladot.com' && password === 'password') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid credentials.');
        }
    };
    
    const handleStatusChange = (orderId: string, status: Order['status']) => {
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
    };

    const handleToggleLive = (productId: number) => {
        dispatch({ type: 'TOGGLE_PRODUCT_STATUS', payload: productId });
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary">
                <div className="w-full max-w-md p-8 space-y-8 bg-primary rounded-lg shadow-lg">
                    <h2 className="text-center text-3xl font-extrabold text-white">Admin Login</h2>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full bg-accent-pink text-white font-bold py-3 px-6 rounded-lg hover:opacity-80 transition-opacity">Login</button>
                    </form>
                </div>
            </div>
        );
    }
    
    const liveProductsCount = state.products.filter(p => p.isLive).length;
    const pendingOrdersCount = state.orders.filter(o => o.status === 'Pending').length;

    return (
        <div className="min-h-screen bg-secondary text-white">
            <header className="bg-primary p-4 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <div className="flex space-x-4">
                    <p>Live Products: <span className="font-bold text-accent-cyan">{liveProductsCount}</span></p>
                    <p>Pending Orders: <span className="font-bold text-accent-pink">{pendingOrdersCount}</span></p>
                    <button onClick={() => setIsLoggedIn(false)} className="text-sm hover:underline">Logout</button>
                </div>
            </header>
            <div className="p-8">
                <div className="flex border-b border-gray-700 mb-6">
                    <button onClick={() => setActiveTab('orders')} className={`py-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-accent-cyan text-accent-cyan' : 'text-gray-400'}`}>Order Management</button>
                    <button onClick={() => setActiveTab('products')} className={`py-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-accent-cyan text-accent-cyan' : 'text-gray-400'}`}>Product Management</button>
                </div>

                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        {state.orders.map(order => (
                            <div key={order.id} className="bg-primary p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div><p className="font-bold">{order.id}</p><p className="text-sm text-gray-400">{order.customer.name}</p></div>
                                    <div className="text-sm"><p>{order.customer.email}</p><p>{order.customer.phone}</p></div>
                                    <div className="text-sm">{order.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}</div>
                                    <div><p>Total: ${order.total.toFixed(2)}</p><p>{order.paymentMethod} {order.transactionId && `(${order.transactionId})`}</p></div>
                                    <div>
                                        <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])} className="bg-secondary p-2 rounded-md">
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>On The Way</option>
                                            <option>Delivered</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'products' && (
                     <div className="overflow-x-auto">
                        <table className="min-w-full bg-primary rounded-lg">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left p-3">Product</th>
                                    <th className="text-left p-3">Category</th>
                                    <th className="text-left p-3">Price</th>
                                    <th className="text-left p-3">Stock</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.products.map(product => (
                                    <tr key={product.id} className="border-b border-gray-800">
                                        <td className="p-3">{product.name}</td>
                                        <td className="p-3">{product.category}</td>
                                        <td className="p-3">${(product.discountPrice || product.price).toFixed(2)}</td>
                                        <td className="p-3">{product.stock}</td>
                                        <td className={`p-3 font-bold ${product.isLive ? 'text-green-500' : 'text-red-500'}`}>{product.isLive ? 'Live' : 'Not Live'}</td>
                                        <td className="p-3">
                                            <button onClick={() => handleToggleLive(product.id)} className={`px-3 py-1 text-sm rounded ${product.isLive ? 'bg-yellow-600' : 'bg-green-600'}`}>
                                                {product.isLive ? 'Unlist' : 'Go Live'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
