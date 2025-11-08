
import React from 'react';
import { staticPageContent } from '../data';

type PageKey = keyof typeof staticPageContent;

interface StaticPageProps {
    page: PageKey;
}

const StaticPage: React.FC<StaticPageProps> = ({ page }) => {
    const contentData = staticPageContent[page];

    return (
        <div className="bg-secondary py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="bg-primary p-8 md:p-12 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-black text-white mb-8 border-b-2 border-accent-pink pb-4">{contentData.title}</h1>
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        {page === 'faq' && Array.isArray(contentData.content) ? (
                            <div className="space-y-6">
                                {contentData.content.map((item, index) => (
                                    <div key={index}>
                                        <h3 className="text-xl font-semibold text-accent-cyan">{item.q}</h3>
                                        <p>{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        ) : typeof contentData.content === 'string' ? (
                            <p>{contentData.content}</p>
                        ) : null}

                        {page === 'contact' && (
                             <form className="mt-8 space-y-4">
                                <input type="text" placeholder="Your Name" required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                <input type="email" placeholder="Your Email" required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                                <textarea placeholder="Your Message" rows={5} required className="w-full bg-secondary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink"></textarea>
                                <button type="submit" className="bg-accent-pink text-white font-bold py-3 px-8 rounded-lg hover:opacity-80 transition-opacity">Send Message</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticPage;
