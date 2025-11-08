
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, CartItem, Order } from '../data';
import { TrashIcon } from '../components/Icons';

const CheckoutPage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const { cart } = state;
    const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Upay' | 'COD'>('bKash');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', transactionId: ''
    });

    const handleQuantityChange = (productId: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const handleRemove = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;
        
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            customer: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
            },
            items: cart,
            total: subtotal,
            paymentMethod,
            transactionId: paymentMethod !== 'COD' ? formData.transactionId : undefined,
            status: 'Pending',
            date: new Date(),
        };

        dispatch({ type: 'ADD_ORDER', payload: newOrder });
        dispatch({ type: 'CLEAR_CART' });
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
                <div className="bg-secondary p-10 rounded-lg shadow-2xl shadow-accent-cyan/20 max-w-lg">
                    <h2 className="text-3xl font-bold text-accent-cyan mb-4">Order Received!</h2>
                    <p className="text-lg text-gray-300">Thank you for your purchase.</p>
                    <p className="text-gray-400 mt-2">Within 2-4 hours your order update will be sent to your email.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-black tracking-tight text-white text-center mb-12">Shopping Cart & Checkout</h1>
            
            {cart.length === 0 ? (
                <p className="text-center text-xl text-gray-400">Your cart is empty.</p>
            ) : (
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-secondary p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-6">Your Items</h2>
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.product.id} className="flex items-center justify-between p-4 bg-primary rounded-md">
                                        <div className="flex items-center gap-4">
                                            <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                                            <div>
                                                <h3 className="font-semibold">{item.product.name}</h3>
                                                <p className="text-sm text-gray-400">${(item.product.discountPrice || item.product.price).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))} min="1" className="w-16 bg-gray-800 text-center rounded-md" />
                                            <button onClick={() => handleRemove(item.product.id)} className="text-gray-400 hover:text-accent-pink"><TrashIcon /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             <div className="mt-6 text-right">
                                <p className="text-2xl font-bold">Subtotal: <span className="text-accent-cyan">${subtotal.toFixed(2)}</span></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-secondary p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-6">Checkout Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                <input type="tel" name="phone" placeholder="Mobile Number" onChange={handleInputChange} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                
                                <h3 className="font-semibold pt-4">Payment Method</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {['bKash', 'Nagad', 'Rocket', 'Upay', 'COD'].map(method => (
                                        <button key={method} type="button" onClick={() => setPaymentMethod(method as any)} className={`p-2 rounded-md text-sm transition-colors ${paymentMethod === method ? 'bg-accent-cyan text-black' : 'bg-primary hover:bg-gray-800'}`}>{method}</button>
                                    ))}
                                </div>

                                {paymentMethod !== 'COD' && (
                                    <div className="pt-2">
                                        <p className="text-sm text-gray-400 mb-2">Send money to: <span className="font-mono text-accent-cyan">01234567890</span> ({paymentMethod})</p>
                                        <input type="text" name="transactionId" placeholder="Transaction ID" onChange={handleInputChange} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                    </div>
                                )}
                                
                                <button type="submit" className="w-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold py-4 px-6 rounded-lg mt-4 transition-all duration-300 transform hover:scale-105 hover:shadow-glow-pink">
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
