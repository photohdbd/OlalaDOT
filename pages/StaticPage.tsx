import React, { useState, useContext } from 'react';
import { staticPageContent } from '../data';
import { AppContext } from '../App';
import { AppContextType } from '../data';

type PageKey = keyof typeof staticPageContent;

interface StaticPageProps {
    page: PageKey;
}

const StaticPage: React.FC<StaticPageProps> = ({ page }) => {
    const contentData = staticPageContent[page];
    const { dispatch } = useContext(AppContext) as AppContextType;
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: 'ADD_PRODUCT_REQUEST', payload: formState });
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-secondary py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="bg-primary p-8 md:p-12 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-black text-white mb-8 border-b-2 border-accent-pink pb-4">{contentData.title}</h1>
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        {typeof contentData.content === 'string' && <p>{contentData.content}</p>}
                        
                        {page === 'faq' && Array.isArray(contentData.content) && (
                            <div className="space-y-6">
                                {contentData.content.map((item, index) => (
                                    <div key={index}>
                                        <h3 className="text-xl font-semibold text-accent-cyan">{item.q}</h3>
                                        <p>{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {page === 'contact' && (
                             <>
                                {submitted ? (
                                    <div className="text-center p-8 bg-secondary rounded-lg">
                                        <h3 className="text-2xl font-bold text-accent-cyan">Thank You!</h3>
                                        <p className="mt-2 text-gray-300">Your request has been submitted successfully. We will get back to you soon.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                        <input type="text" name="name" placeholder="Your Name" value={formState.name} onChange={handleInputChange} required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                        <input type="email" name="email" placeholder="Your Email" value={formState.email} onChange={handleInputChange} required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                        <textarea name="message" placeholder="Your Message or Product Request" rows={5} value={formState.message} onChange={handleInputChange} required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink"></textarea>
                                        <button type="submit" className="bg-accent-pink text-white font-bold py-3 px-8 rounded-lg hover:opacity-80 transition-opacity">Send Message</button>
                                    </form>
                                )}
                             </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticPage;