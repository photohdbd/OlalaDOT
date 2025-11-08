import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../App';
import { AppContextType } from '../data';
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from './Icons';

const Header: React.FC = () => {
    const { state } = useContext(AppContext) as AppContextType;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItemCount = state.cart.reduce((count, item) => count + item.quantity, 0);

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `relative text-lg font-medium transition-colors duration-300 ${isActive ? 'text-accent-cyan' : 'text-white hover:text-accent-cyan'} after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-accent-cyan after:transform after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'}`;

    return (
        <header className="bg-primary/80 backdrop-blur-lg sticky top-0 z-50 shadow-lg shadow-black/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-3xl font-black tracking-tighter text-white">
                            Olala<span className="text-accent-pink">DOT</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex md:space-x-8">
                        <NavLink to="/" className={navLinkClasses}>Home</NavLink>
                        <NavLink to="/shop" className={navLinkClasses}>Shop</NavLink>
                        <NavLink to="/contact" className={navLinkClasses}>Product Request</NavLink>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/account" className="p-2 text-white hover:text-accent-pink transition-colors" title={state.isAuthenticated ? 'My Account' : 'Login/Register'}>
                                <UserIcon />
                            </Link>
                            <Link to="/checkout" className="relative p-2 text-white hover:text-accent-cyan transition-colors">
                                <ShoppingCartIcon />
                                {cartItemCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-accent-cyan rounded-full">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                                {isMenuOpen ? <XIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-secondary">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        <NavLink to="/" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/shop" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Shop</NavLink>
                        <NavLink to="/contact" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Product Request</NavLink>
                        <div className="flex items-center space-x-4 pt-4">
                            <Link to="/account" className="p-2 text-white hover:text-accent-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                                <UserIcon />
                            </Link>
                            <Link to="/checkout" className="relative p-2 text-white hover:text-accent-cyan transition-colors" onClick={() => setIsMenuOpen(false)}>
                                <ShoppingCartIcon />
                                {cartItemCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-accent-cyan rounded-full">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;