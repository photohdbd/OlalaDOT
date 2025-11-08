
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { AppContextType, Product } from '../data';

const CountdownTimer: React.FC<{ endDate: Date }> = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
        if (value === undefined) return null;
        return (
            <div key={interval} className="text-center">
                <span className="text-2xl font-bold">{String(value).padStart(2, '0')}</span>
                <span className="block text-xs uppercase">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex space-x-4 text-accent-cyan">
            {Object.keys(timeLeft).length ? timerComponents : <span>Offer expired!</span>}
        </div>
    );
};

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const product = state.products.find(p => p.id === Number(id));
    const [selectedImage, setSelectedImage] = useState(product?.images[0]);

    useEffect(() => {
        if (product) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    if (!product) {
        return <div className="text-center py-20 text-2xl">Product not found.</div>;
    }

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const handleBuyNow = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        navigate('/checkout');
    };

    const relatedProducts = state.products.filter(
        p => p.category === product.category && p.id !== product.id && p.isLive
    ).slice(0, 4);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div>
                    <div className="bg-secondary rounded-lg mb-4 overflow-hidden">
                        <img src={selectedImage} alt={product.name} className="w-full h-auto object-cover aspect-video" />
                    </div>
                    <div className="flex space-x-2">
                        {product.images.map((img, index) => (
                            <button key={index} onClick={() => setSelectedImage(img)} className={`w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-accent-pink' : 'border-transparent'}`}>
                                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-4xl font-bold text-white">{product.name}</h1>
                    <p className="text-gray-400 mt-2">{product.category}</p>
                    
                    <div className="my-6">
                        {product.discountPrice ? (
                            <div className="flex items-baseline space-x-3">
                                <p className="text-4xl font-bold text-accent-cyan">${product.discountPrice.toFixed(2)}</p>
                                <p className="text-2xl text-gray-500 line-through">${product.price.toFixed(2)}</p>
                            </div>
                        ) : (
                            <p className="text-4xl font-bold text-accent-cyan">${product.price.toFixed(2)}</p>
                        )}
                    </div>
                    
                    {product.discountPrice && product.discountEndDate && (
                        <div className="bg-secondary p-4 rounded-lg my-6 border border-accent-pink/50">
                            <h4 className="text-sm font-bold text-accent-pink mb-2">LIMITED TIME OFFER</h4>
                            <CountdownTimer endDate={product.discountEndDate} />
                        </div>
                    )}
                    
                    <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>
                    
                    <div className="flex items-center space-x-2 mb-6">
                        {product.tags.map(tag => (
                            <span key={tag} className="bg-gray-800 text-accent-cyan text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                    
                    <div className="flex space-x-4">
                        <button onClick={handleAddToCart} className="flex-1 bg-gray-800 text-white font-bold py-4 px-6 rounded-lg hover:bg-gray-700 transition-colors">Add to Cart</button>
                        <button onClick={handleBuyNow} className="flex-1 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow-pink">Buy Now</button>
                    </div>
                </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">You may also like</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map(p => (
                            <div key={p.id} className="bg-secondary p-4 rounded-lg text-center">
                                <Link to={`/product/${p.id}`}>
                                    <img src={p.images[0]} alt={p.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                    <h3 className="font-semibold hover:text-accent-cyan transition-colors">{p.name}</h3>
                                    <p className="text-accent-cyan font-bold mt-2">${(p.discountPrice || p.price).toFixed(2)}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
