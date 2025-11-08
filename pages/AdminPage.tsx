import React, { useState, useContext, FormEvent, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { AppContextType, Product, Order, HeroSlide } from '../data';

const AdminPage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const { isAdminAuthenticated } = state;
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
        name: '', description: '', price: 0, discountPrice: undefined, discountEndDate: undefined, category: '', images: [], tags: [], isFeatured: false, isLive: true, stock: 0, digitalFile: ''
    });
    
    const [newSlide, setNewSlide] = useState<Omit<HeroSlide, 'id'>>({
        imageUrl: '', title: '', subtitle: '', link: ''
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'password') {
            dispatch({ type: 'SET_ADMIN_AUTH', payload: true });
            setError('');
        } else {
            setError('Invalid password.');
        }
    };
    
    const handleLogout = () => {
        dispatch({ type: 'SET_ADMIN_AUTH', payload: false });
    };
    
    const handleStatusChange = (orderId: string, status: Order['status']) => {
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
    };

    const handleToggleLive = (productId: number) => {
        dispatch({ type: 'TOGGLE_PRODUCT_STATUS', payload: productId });
    };
    
    const handleAddProductSubmit = (e: FormEvent) => {
        e.preventDefault();
        const productToAdd: Product = {
            ...newProduct,
            id: Date.now(),
            price: Number(newProduct.price),
            discountPrice: newProduct.discountPrice ? Number(newProduct.discountPrice) : undefined,
            tags: typeof newProduct.tags === 'string' ? (newProduct.tags as string).split(',').map(t => t.trim()) : [],
            images: typeof newProduct.images === 'string' ? (newProduct.images as string).split(',').map(i => i.trim()) : []
        };
        dispatch({ type: 'ADD_PRODUCT', payload: productToAdd });
        setShowAddProduct(false);
        setNewProduct({ name: '', description: '', price: 0, discountPrice: undefined, discountEndDate: undefined, category: '', images: [], tags: [], isFeatured: false, isLive: true, stock: 0, digitalFile: '' });
    };

    const handleAddSlideSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch({ type: 'ADD_HERO_SLIDE', payload: newSlide });
        setNewSlide({ imageUrl: '', title: '', subtitle: '', link: '' });
    };
    
    const analytics = useMemo(() => {
        const totalRevenue = state.orders
            .filter(o => o.status === 'Delivered')
            .reduce((sum, order) => sum + order.total, 0);
        return {
            totalRevenue: totalRevenue.toFixed(2),
            totalOrders: state.orders.length,
            pendingOrders: state.orders.filter(o => o.status === 'Pending').length,
            totalUsers: state.users.length,
            liveProducts: state.products.filter(p => p.isLive).length,
        };
    }, [state.orders, state.users, state.products]);

    if (!isAdminAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary">
                <div className="w-full max-w-md p-8 space-y-8 bg-primary rounded-lg shadow-lg">
                    <h2 className="text-center text-3xl font-extrabold text-white">Admin Login</h2>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full bg-accent-pink text-white font-bold py-3 px-6 rounded-lg hover:opacity-80 transition-opacity">Login</button>
                    </form>
                    <div className="text-center">
                        <Link to="/" className="font-medium text-sm text-accent-cyan hover:text-accent-pink">
                           ← Back to Site
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'orders', label: 'Orders' },
        { id: 'products', label: 'Products' },
        { id: 'users', label: 'Users' },
        { id: 'requests', label: 'Product Requests' },
        { id: 'hero', label: 'Hero Slides' },
    ];

    return (
        <div className="min-h-screen bg-secondary text-white flex">
            <aside className="w-64 bg-primary flex-shrink-0 p-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>
                <nav className="flex-grow">
                    {menuItems.map(item => (
                         <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id)} 
                            className={`w-full text-left py-3 px-4 rounded-lg mb-2 transition-colors ${activeTab === item.id ? 'bg-accent-cyan text-black font-bold' : 'text-gray-300 hover:bg-secondary'}`}>
                            {item.label}
                        </button>
                    ))}
                </nav>
                 <div className="mt-auto">
                    <Link to="/" className="block text-center text-sm bg-gray-700 py-2 px-3 rounded hover:bg-gray-600 mb-2">Back to Site</Link>
                    <button onClick={handleLogout} className="w-full text-sm bg-accent-pink py-2 px-3 rounded hover:opacity-80">Logout</button>
                </div>
            </aside>
            <main className="flex-grow p-4 md:p-8 overflow-y-auto">
                {activeTab === 'dashboard' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-primary p-6 rounded-lg text-center"><p className="text-3xl font-bold text-accent-cyan">৳{analytics.totalRevenue}</p><p className="text-gray-400">Total Revenue</p></div>
                            <div className="bg-primary p-6 rounded-lg text-center"><p className="text-3xl font-bold">{analytics.totalOrders}</p><p className="text-gray-400">Total Orders</p></div>
                            <div className="bg-primary p-6 rounded-lg text-center"><p className="text-3xl font-bold text-accent-pink">{analytics.pendingOrders}</p><p className="text-gray-400">Pending Orders</p></div>
                            <div className="bg-primary p-6 rounded-lg text-center"><p className="text-3xl font-bold">{analytics.totalUsers}</p><p className="text-gray-400">Total Users</p></div>
                        </div>
                    </div>
                )}
                
                {activeTab === 'orders' && (
                    <div>
                         <h2 className="text-3xl font-bold mb-6">Orders</h2>
                         <div className="space-y-4 overflow-x-auto">
                            {state.orders.map(order => (
                                <div key={order.id} className="bg-primary p-4 rounded-lg min-w-[800px]">
                                    <div className="grid grid-cols-5 gap-4">
                                        <div><p className="font-bold">{order.id}</p><p className="text-sm text-gray-400">{order.customer.name}</p></div>
                                        <div className="text-sm truncate"><p>{order.customer.email}</p><p>{order.customer.phone}</p></div>
                                        <div className="text-sm truncate">{order.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}</div>
                                        <div><p>Total: ৳{order.total.toFixed(2)}</p><p>{order.paymentMethod} {order.transactionId && `(${order.transactionId})`}</p></div>
                                        <div>
                                            <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])} className="bg-secondary p-2 rounded-md w-full">
                                                <option>Pending</option><option>Processing</option><option>On The Way</option><option>Delivered</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Products</h2>
                        <button onClick={() => setShowAddProduct(!showAddProduct)} className="mb-4 bg-accent-cyan text-black font-bold py-2 px-4 rounded">{showAddProduct ? 'Cancel' : 'Add New Product'}</button>
                        {showAddProduct && (
                             <form onSubmit={handleAddProductSubmit} className="bg-primary p-6 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <h3 className="text-xl font-bold col-span-full mb-2">New Product Details</h3>
                                <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="bg-secondary p-2 rounded" required />
                                <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="bg-secondary p-2 rounded" required />
                                <input type="text" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="bg-secondary p-2 rounded" required />
                                <input type="number" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} className="bg-secondary p-2 rounded" required />
                                <input type="number" placeholder="Discount Price (optional)" value={newProduct.discountPrice || ''} onChange={e => setNewProduct({...newProduct, discountPrice: parseFloat(e.target.value) || undefined})} className="bg-secondary p-2 rounded" />
                                <div><label className="text-sm text-gray-400">Discount End Date</label><input type="date" onChange={e => setNewProduct({...newProduct, discountEndDate: new Date(e.target.value)})} className="bg-secondary p-2 rounded w-full" /></div>
                                <input type="text" placeholder="Image URLs (comma separated)" onChange={e => setNewProduct({...newProduct, images: e.target.value})} className="bg-secondary p-2 rounded col-span-full" required />
                                <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="bg-secondary p-2 rounded col-span-full" required />
                                <textarea placeholder="Digital File Content (Code or Link)" value={newProduct.digitalFile} onChange={e => setNewProduct({...newProduct, digitalFile: e.target.value})} className="bg-secondary p-2 rounded col-span-full" required />
                                <input type="text" placeholder="Tags (comma separated)" onChange={e => setNewProduct({...newProduct, tags: e.target.value})} className="bg-secondary p-2 rounded" />
                                <div className="flex items-center gap-2"><input type="checkbox" id="isFeatured" checked={newProduct.isFeatured} onChange={e => setNewProduct({...newProduct, isFeatured: e.target.checked})} /><label htmlFor="isFeatured">Featured?</label></div>
                                <button type="submit" className="bg-accent-pink py-2 px-4 rounded col-span-full">Save Product</button>
                            </form>
                        )}
                         <div className="overflow-x-auto">
                            <table className="min-w-full bg-primary rounded-lg">
                                <thead><tr className="border-b border-gray-700"><th className="text-left p-3">Product</th><th className="text-left p-3">Category</th><th className="text-left p-3">Price</th><th className="text-left p-3">Stock</th><th className="text-left p-3">Status</th><th className="text-left p-3">Actions</th></tr></thead>
                                <tbody>
                                    {state.products.map(product => (
                                        <tr key={product.id} className="border-b border-gray-800">
                                            <td className="p-3">{product.name}</td><td className="p-3">{product.category}</td><td className="p-3">৳{(product.discountPrice || product.price).toFixed(2)}</td><td className="p-3">{product.stock}</td>
                                            <td className={`p-3 font-bold ${product.isLive ? 'text-green-500' : 'text-red-500'}`}>{product.isLive ? 'Live' : 'Not Live'}</td>
                                            <td className="p-3"><button onClick={() => handleToggleLive(product.id)} className={`px-3 py-1 text-sm rounded ${product.isLive ? 'bg-yellow-600' : 'bg-green-600'}`}>{product.isLive ? 'Unlist' : 'Go Live'}</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                 {activeTab === 'users' && (
                     <div className="bg-primary rounded-lg p-4">
                         <h2 className="text-3xl font-bold mb-6">Registered Users</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead><tr className="border-b border-gray-700"><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Phone</th><th className="text-left p-3">Address</th></tr></thead>
                                <tbody>{state.users.map(user => <tr key={user.id} className="border-b border-gray-800"><td className="p-3">{user.name}</td><td className="p-3">{user.email}</td><td className="p-3">{user.phone}</td><td className="p-3">{user.address}</td></tr>)}</tbody>
                            </table>
                        </div>
                    </div>
                 )}
                 {activeTab === 'requests' && (
                     <div>
                        <h2 className="text-3xl font-bold mb-6">Product Requests</h2>
                         <div className="space-y-4">
                             {state.productRequests.map(req => <div key={req.id} className="bg-primary p-4 rounded-lg"><p className="font-bold">{req.name} <span className="font-normal text-gray-400">({req.email})</span></p><p className="mt-2 text-gray-300">{req.message}</p><p className="text-xs text-gray-500 mt-2">{new Date(req.date).toLocaleString()}</p></div>)}
                        </div>
                    </div>
                 )}
                 {activeTab === 'hero' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Manage Hero Slides</h2>
                        <form onSubmit={handleAddSlideSubmit} className="bg-primary p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Title" value={newSlide.title} onChange={e => setNewSlide({...newSlide, title: e.target.value})} className="bg-secondary p-2 rounded" required />
                             <input type="text" placeholder="Subtitle" value={newSlide.subtitle} onChange={e => setNewSlide({...newSlide, subtitle: e.target.value})} className="bg-secondary p-2 rounded" required />
                            <input type="text" placeholder="Image URL" value={newSlide.imageUrl} onChange={e => setNewSlide({...newSlide, imageUrl: e.target.value})} className="bg-secondary p-2 rounded col-span-1 md:col-span-2" required />
                             <input type="text" placeholder="Link (e.g., /shop)" value={newSlide.link} onChange={e => setNewSlide({...newSlide, link: e.target.value})} className="bg-secondary p-2 rounded col-span-1 md:col-span-2" required />
                            <button type="submit" className="bg-accent-pink py-2 px-4 rounded col-span-1 md:col-span-2">Add Slide</button>
                        </form>
                        <div className="space-y-2">
                             {state.heroSlides.map(slide => <div key={slide.id} className="bg-primary p-2 rounded-lg flex items-center justify-between"><img src={slide.imageUrl} className="w-20 h-10 object-cover rounded" alt=""/><span>{slide.title}</span><button onClick={() => dispatch({ type: 'DELETE_HERO_SLIDE', payload: slide.id })} className="bg-red-600 px-2 py-1 text-xs rounded">Delete</button></div>)}
                        </div>
                    </div>
                 )}
            </main>
        </div>
    );
};

export default AdminPage;