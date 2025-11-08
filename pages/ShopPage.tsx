
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../App';
import { AppContextType, Product } from '../data';
import ProductCard from '../components/ProductCard';

const ShopPage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(300);

    const handleAddToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const categories = ['All', ...new Set(state.products.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        return state.products
            .filter(p => p.isLive)
            .filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
            .filter(product => (product.discountPrice || product.price) <= priceRange);
    }, [state.products, searchTerm, selectedCategory, priceRange]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black tracking-tight text-white">Our Products</h1>
                <p className="mt-2 text-lg text-gray-400">Find the digital tools and assets you need.</p>
            </div>

            {/* Filters */}
            <div className="bg-secondary p-6 rounded-lg mb-12 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search by name or tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-primary px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-pink"
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-primary px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-pink appearance-none"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-1/3">
                    <label htmlFor="price-range" className="block text-sm font-medium text-gray-300 mb-2">
                        Max Price: ${priceRange}
                    </label>
                    <input
                        id="price-range"
                        type="range"
                        min="0"
                        max="300"
                        step="10"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                    />
                </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-2xl text-gray-400">No products found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default ShopPage;
