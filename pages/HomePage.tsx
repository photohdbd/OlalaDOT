import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { AppContextType, Product } from '../data';
import ProductCard from '../components/ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';

const TestimonialCard: React.FC<{ author: string; text: string }> = ({ author, text }) => (
    <div className="bg-secondary p-8 rounded-lg border border-gray-800 flex flex-col w-80 md:w-96 mx-4 flex-shrink-0">
        <p className="text-gray-300 flex-grow">"{text}"</p>
        <p className="font-bold text-accent-cyan mt-4">- {author}</p>
    </div>
);

const HomePage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const [heroIndex, setHeroIndex] = useState(0);

    const { heroSlides } = state;
    const featuredProducts = state.products.filter(p => p.isFeatured && p.isLive).slice(0, 4);
    
    const handleAddToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const nextHeroSlide = useCallback(() => {
        if (heroSlides.length === 0) return;
        setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, [heroSlides.length]);

    const prevHeroSlide = () => {
        if (heroSlides.length === 0) return;
        setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    useEffect(() => {
        if (heroSlides.length > 1) {
            const slideInterval = setInterval(nextHeroSlide, 5000);
            return () => clearInterval(slideInterval);
        }
    }, [heroSlides.length, nextHeroSlide]);

    const testimonials = [
        { author: "Anik Ahmed", text: "অসাধারণ কালেকশন! আমার প্রজেক্টের জন্য যা যা দরকার ছিল, সবই পেয়েছি এখানে। ডেলিভারিও ছিল খুব ফাস্ট।" },
        { author: "Sadia Rahman", text: "OlalaDOT is my go-to for software subscriptions. The process is seamless and their support is top-notch. Highly recommended!" },
        { author: "Imran Khan", text: "Finally, a reliable site for digital products in Bangladesh. আসলেই 'Ajab Site Ka Gajab Jinis'!" },
        { author: "Farhana Chowdhury", text: "The graphics bundle I purchased exceeded my expectations. অনেক প্রিমিয়াম রিসোর্স পেয়েছি। ধন্যবাদ OlalaDOT!" },
        { author: "Rajib Hasan", text: "A great platform with a user-friendly interface. I found their educational combo pack very helpful for upskilling." }
    ];

    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
                <div className="absolute inset-0 w-full h-full">
                    {heroSlides.length > 0 ? heroSlides.map((slide, index) => (
                        <div key={slide.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === heroIndex ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60"></div>
                        </div>
                    )) : (
                         <div className="absolute inset-0 w-full h-full bg-secondary"></div>
                    )}
                </div>

                {heroSlides.length > 1 && (
                    <>
                        <button onClick={prevHeroSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><ChevronLeftIcon /></button>
                        <button onClick={nextHeroSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><ChevronRightIcon /></button>
                    </>
                )}

                <div className="relative z-10 p-4">
                     <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white animate-fade-in-down">
                        {heroSlides[heroIndex]?.title || <>Olala<span className="text-accent-pink">DOT</span></>}
                    </h1>
                     <p className="mt-4 text-xl md:text-2xl font-medium text-accent-cyan tracking-widest animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        {heroSlides[heroIndex]?.subtitle || "“Ajab Site Ka Gajab Jinis”"}
                    </p>
                    <Link
                        to={heroSlides[heroIndex]?.link || "/shop"}
                        className="mt-10 inline-block bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow-pink animate-fade-in-up"
                        style={{ animationDelay: '1s' }}
                    >
                        Explore Now
                    </Link>
                </div>
            </section>
            
            {/* Featured Products Grid */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                {featuredProducts.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No featured products available yet.</p>
                )}
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
            <section className="py-16">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
                <div className="relative w-full overflow-hidden group">
                     <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
                        {testimonials.concat(testimonials).map((testimonial, index) => (
                           <TestimonialCard key={index} author={testimonial.author} text={testimonial.text} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;