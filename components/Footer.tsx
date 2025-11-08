
import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-black tracking-tighter text-white">
                            Olala<span className="text-accent-pink">DOT</span>
                        </h2>
                        <p className="text-gray-400 mt-2">Ajab Site Ka Gajab Jinis</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors"><FacebookIcon /></a>
                            <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors"><InstagramIcon /></a>
                            <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors"><WhatsAppIcon /></a>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-white tracking-wider uppercase">Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                        </ul>
                    </div>
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-white tracking-wider uppercase">Policies</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/refund" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                    <div className="md:col-span-1">
                         <h3 className="font-bold text-white tracking-wider uppercase">Newsletter</h3>
                        <p className="text-gray-400 mt-4">Subscribe for special offers.</p>
                        <form className="mt-4 flex">
                            <input type="email" placeholder="Your email" className="w-full bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <button className="bg-accent-pink text-white font-bold px-4 py-2 rounded-r-md hover:bg-opacity-80 transition-colors">
                                Go
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} OlalaDOT. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
