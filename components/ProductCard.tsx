
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data';
import { ShoppingCartIcon } from './Icons';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-secondary rounded-lg overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-pink/20 border border-transparent hover:border-accent-pink/50">
            <Link to={`/product/${product.id}`}>
                <div className="relative">
                    <img src={product.images[0]} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
                     {product.discountPrice && (
                        <span className="absolute top-3 left-3 bg-accent-pink text-white text-xs font-bold px-3 py-1 rounded-full">SALE</span>
                     )}
                     {product.tags.includes('New') && (
                        <span className="absolute top-3 left-3 bg-accent-cyan text-black text-xs font-bold px-3 py-1 rounded-full">NEW</span>
                     )}
                </div>
            </Link>
            <div className="p-5">
                <h3 className="text-lg font-bold text-white truncate">
                   <Link to={`/product/${product.id}`} className="hover:text-accent-cyan transition-colors">{product.name}</Link>
                </h3>
                <p className="text-gray-400 text-sm mt-1">{product.category}</p>
                <div className="flex items-baseline justify-between mt-4">
                    <div>
                        {product.discountPrice ? (
                            <div className="flex items-baseline space-x-2">
                                <p className="text-2xl font-bold text-accent-cyan">${product.discountPrice.toFixed(2)}</p>
                                <p className="text-md text-gray-500 line-through">${product.price.toFixed(2)}</p>
                            </div>
                        ) : (
                            <p className="text-2xl font-bold text-accent-cyan">${product.price.toFixed(2)}</p>
                        )}
                    </div>
                    <button 
                        onClick={() => onAddToCart(product)}
                        className="bg-gray-800 p-3 rounded-full text-white hover:bg-accent-pink hover:text-white transition-all duration-300 transform hover:scale-110"
                        aria-label="Add to cart"
                    >
                        <ShoppingCartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
