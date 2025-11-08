
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { AppContextType, Product } from '../data';
import ProductCard from '../components/ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';

// Helper component defined outside Parent to prevent re-renders
const TestimonialCard: React.FC<{ author: string; text: string }> = ({ author, text }) => (
    <div className="bg-secondary p-8 rounded-lg border border-gray-800 h-full flex flex-col">
        <p className="text-gray-300 flex-grow">"{text}"</p>
        <p className="font-bold text-accent-cyan mt-4">- {author}</p>
    </div>
);

const HomePage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const [currentIndex, setCurrentIndex] = useState(0);

    const featuredProducts = state.products.filter(p => p.isFeatured && p.isLive);
    
    const handleAddToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredProducts.length) % featuredProducts.length);
    };
    
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featuredProducts.length]);


    const categories = [...new Set(state.products.map(p => p.category))];
    const testimonials = [
        { author: "Anik Ahmed", text: "Incredible collection of digital goods! Found exactly what I needed for my project at a great price. The delivery was super fast." },
        { author: "Sadia Rahman", text: "OlalaDOT is my go-to for software subscriptions. The process is seamless and the customer support is top-notch. Highly recommended!" },
        { author: "Imran Khan", text: "Finally, a reliable site for digital products in Bangladesh. 'Ajab Site Ka Gajab Jinis' truly fits!" }
    ];

    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative text-center pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary to-secondary opacity-50"></div>
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-accent-pink rounded-full filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent-cyan rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-purple rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white animate-fade-in-down">
                        Olala<span className="text-accent-pink">DOT</span>
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl font-medium text-accent-cyan tracking-widest animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        “Ajab Site Ka Gajab Jinis”
                    </p>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                        Discover exclusive digital products, from software subscriptions to unique graphic resources, all in one place.
                    </p>
                    <Link
                        to="/shop"
                        className="mt-10 inline-block bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow-pink animate-fade-in-up"
                        style={{ animationDelay: '1.5s' }}
                    >
                        Explore Products
                    </Link>
                </div>
            </section>
            
            {/* Featured Products Carousel */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                <div className="relative">
                    <div className="overflow-hidden relative h-[28rem]">
                        {featuredProducts.map((product, index) => (
                           <div key={product.id} className={`absolute w-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="max-w-sm mx-auto">
                                    <ProductCard product={product} onAddToCart={handleAddToCart} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={prevSlide} className="absolute top-1/2 left-0 sm:left-10 md:left-20 transform -translate-y-1/2 bg-secondary p-3 rounded-full hover:bg-accent-pink transition-colors z-10">
                        <ChevronLeftIcon />
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-0 sm:right-10 md:right-20 transform -translate-y-1/2 bg-secondary p-3 rounded-full hover:bg-accent-pink transition-colors z-10">
                        <ChevronRightIcon />
                    </button>
                </div>
            </section>

            {/* Category Explorer */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {categories.map(category => (
                        <Link to="/shop" key={category} className="group relative block p-8 text-center bg-secondary rounded-lg overflow-hidden border border-gray-800 hover:border-accent-cyan transition-colors duration-300">
                             <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <h3 className="relative text-xl font-semibold">{category}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* How to Buy */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <h2 className="text-3xl font-bold text-center mb-12">How To Buy</h2>
                 <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-secondary p-8 rounded-lg border border-gray-800">
                        <div className="text-5xl font-black text-accent-pink mx-auto mb-4">1</div>
                        <h3 className="text-xl font-bold mb-2">Choose Product</h3>
                        <p className="text-gray-400">Browse our collection and add your desired items to the cart.</p>
                    </div>
                    <div className="bg-secondary p-8 rounded-lg border border-gray-800">
                        <div className="text-5xl font-black text-accent-cyan mx-auto mb-4">2</div>
                        <h3 className="text-xl font-bold mb-2">Checkout & Pay</h3>
                        <p className="text-gray-400">Fill in your details and complete the payment using our secure methods.</p>
                    </div>
                    <div className="bg-secondary p-8 rounded-lg border border-gray-800">
                        <div className="text-5xl font-black text-accent-purple mx-auto mb-4">3</div>
                        <h3 className="text-xl font-bold mb-2">Receive Order</h3>
                        <p className="text-gray-400">Get your product details via email within 2-4 hours. It's that simple!</p>
                    </div>
                 </div>
            </section>

            {/* Testimonials */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => <TestimonialCard key={i} author={t.author} text={t.text} />)}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
