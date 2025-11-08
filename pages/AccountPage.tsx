import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../App';
import { AppContextType, Order } from '../data';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderItem: React.FC<{order: Order}> = ({ order }) => {
    const [contentVisible, setContentVisible] = useState<{[key: number]: boolean}>({});

    const toggleContent = (productId: number) => {
        setContentVisible(prev => ({ ...prev, [productId]: !prev[productId] }));
    }

    return (
        <div className="bg-primary p-4 rounded-lg">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold text-white">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="font-bold text-white">৳{order.total.toFixed(2)}</p>
                    <p className={`text-sm text-right font-semibold ${
                        order.status === 'Delivered' ? 'text-green-500' : 
                        order.status === 'Processing' ? 'text-yellow-500' : 'text-gray-400'
                    }`}>{order.status}</p>
                </div>
            </div>
            <div className="mt-4 border-t border-gray-700 pt-4 space-y-3">
                {order.items.map(({ product, quantity }) => (
                    <div key={product.id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-200">{product.name} (x{quantity})</p>
                            </div>
                            {order.status === 'Delivered' && product.digitalFile && (
                                <button onClick={() => toggleContent(product.id)} className="text-sm bg-accent-cyan text-black font-bold px-3 py-1 rounded">
                                    {contentVisible[product.id] ? 'Hide Content' : 'View Content'}
                                </button>
                            )}
                        </div>
                        {contentVisible[product.id] && (
                            <div className="mt-2 p-3 bg-gray-800 rounded">
                                <pre className="text-accent-cyan text-sm whitespace-pre-wrap break-words">{product.digitalFile}</pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AccountPage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoginView, setIsLoginView] = useState(true);
    
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupPhone, setSignupPhone] = useState('');
    const [signupAddress, setSignupAddress] = useState('');

    const [error, setError] = useState('');
    const [message, setMessage] = useState(location.state?.message || '');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const user = state.users.find(u => u.email === loginEmail && u.password === loginPassword);
        if (user) {
            dispatch({ type: 'SET_CURRENT_USER', payload: user });
            navigate('/');
        } else {
            setError('Invalid email or password.');
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (state.users.some(u => u.email === signupEmail)) {
            setError('An account with this email already exists.');
            return;
        }
        dispatch({
            type: 'REGISTER_USER',
            payload: {
                id: 0,
                name: signupName,
                email: signupEmail,
                password: signupPassword,
                phone: signupPhone,
                address: signupAddress,
            }
        });
        navigate('/');
    };

    const userOrders = useMemo(() => {
        if (!state.currentUser) return [];
        return state.orders
            .filter(order => order.userId === state.currentUser?.id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [state.orders, state.currentUser]);

    if (state.isAuthenticated && state.currentUser) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">Welcome, <span className="text-accent-cyan">{state.currentUser.name}</span>!</h2>
                        <button 
                            onClick={() => dispatch({ type: 'LOGOUT' })}
                            className="bg-accent-pink text-white font-bold py-2 px-5 rounded-lg transition-opacity hover:opacity-80">
                            Logout
                        </button>
                    </div>

                    <div className="bg-secondary p-6 rounded-lg shadow-2xl shadow-black/20">
                        <h3 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4">My Order History</h3>
                        {userOrders.length > 0 ? (
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                {userOrders.map(order => <OrderItem key={order.id} order={order} />)}
                            </div>
                        ) : (
                            <p className="text-gray-400">You haven't placed any orders yet.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-md mx-auto bg-secondary rounded-lg overflow-hidden shadow-lg">
                <div className="flex">
                    <button onClick={() => setIsLoginView(true)} className={`w-1/2 p-4 font-bold text-center ${isLoginView ? 'bg-accent-pink text-white' : 'bg-primary text-gray-400'}`}>Login</button>
                    <button onClick={() => setIsLoginView(false)} className={`w-1/2 p-4 font-bold text-center ${!isLoginView ? 'bg-accent-pink text-white' : 'bg-primary text-gray-400'}`}>Sign Up</button>
                </div>
                <div className="p-8">
                    {message && <p className="bg-accent-cyan/20 text-accent-cyan p-3 rounded-md mb-4 text-center text-sm">{message}</p>}
                    {isLoginView ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <h2 className="text-2xl font-bold text-center text-white mb-6">Welcome Back</h2>
                            <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button type="submit" className="w-full bg-accent-pink text-white font-bold py-3 px-6 rounded-lg mt-4 hover:opacity-80 transition-opacity">Login</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <h2 className="text-2xl font-bold text-center text-white mb-6">Create Account</h2>
                            <input type="text" placeholder="Full Name" value={signupName} onChange={e => setSignupName(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="email" placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="password" placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="tel" placeholder="Phone Number" value={signupPhone} onChange={e => setSignupPhone(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="text" placeholder="Address" value={signupAddress} onChange={e => setSignupAddress(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button type="submit" className="w-full bg-accent-pink text-white font-bold py-3 px-6 rounded-lg mt-4 hover:opacity-80 transition-opacity">Create Account</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;