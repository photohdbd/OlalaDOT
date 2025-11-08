import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { AppContextType, Product } from '../data';
import ProductCard from '../components/ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';

const TestimonialCard: React.FC<{ author: string; text: string }> = ({ author, text }) => (
    <div className="bg-secondary p-8 rounded-lg border border-gray-800 h-full flex flex-col">
        <p className="text-gray-300 flex-grow">"{text}"</p>
        <p className="font-bold text-accent-cyan mt-4">- {author}</p>
    </div>
);

const HomePage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const [heroIndex, setHeroIndex] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    const { heroSlides } = state;
    const featuredProducts = state.products.filter(p => p.isFeatured && p.isLive).slice(0, 4);
    
    const handleAddToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const nextHeroSlide = useCallback(() => {
        setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, [heroSlides.length]);

    const prevHeroSlide = () => {
        setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    useEffect(() => {
        if (heroSlides.length > 1) {
            const slideInterval = setInterval(nextHeroSlide, 5000);
            return () => clearInterval(slideInterval);
        }
    }, [heroSlides.length, nextHeroSlide]);

    const testimonials = [
        { author: "Anik Ahmed", text: "Incredible collection of digital goods! Found exactly what I needed for my project at a great price. The delivery was super fast." },
        { author: "Sadia Rahman", text: "OlalaDOT is my go-to for software subscriptions. The process is seamless and the customer support is top-notch. Highly recommended!" },
        { author: "Imran Khan", text: "Finally, a reliable site for digital products in Bangladesh. 'Ajab Site Ka Gajab Jinis' truly fits!" }
    ];

    const nextTestimonial = useCallback(() => {
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

     useEffect(() => {
        const testimonialInterval = setInterval(nextTestimonial, 7000);
        return () => clearInterval(testimonialInterval);
    }, [nextTestimonial]);


    const categories = [...new Set(state.products.map(p => p.category))];

    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
                <div className="absolute inset-0 w-full h-full">
                    {heroSlides.map((slide, index) => (
                        <div key={slide.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === heroIndex ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60"></div>
                        </div>
                    ))}
                </div>

                <button onClick={prevHeroSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><ChevronLeftIcon /></button>
                <button onClick={nextHeroSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><ChevronRightIcon /></button>

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
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </section>

            {/* Category Explorer */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {categories.map(category => (
                        <Link to={`/shop?category=${category}`} key={category} className="group relative block p-8 text-center bg-secondary rounded-lg overflow-hidden border border-gray-800 hover:border-accent-cyan transition-colors duration-300">
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
                 <div className="relative overflow-hidden max-w-2xl mx-auto h-48">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`absolute w-full transition-opacity duration-1000 ease-in-out ${index === testimonialIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <TestimonialCard author={testimonial.author} text={testimonial.text} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;