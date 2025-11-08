import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType } from '../data';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext) as AppContextType;
    const navigate = useNavigate();
    const [isLoginView, setIsLoginView] = useState(true);
    
    // Login form state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    // Signup form state
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupPhone, setSignupPhone] = useState('');
    const [signupAddress, setSignupAddress] = useState('');

    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const user = state.users.find(u => u.email === loginEmail && u.password === loginPassword);
        if (user) {
            dispatch({ type: 'SET_CURRENT_USER', payload: user });
            navigate('/');
        } else {
            setError('Invalid email or password.');
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (state.users.some(u => u.email === signupEmail)) {
            setError('An account with this email already exists.');
            return;
        }
        dispatch({
            type: 'REGISTER_USER',
            payload: {
                id: 0, // will be set by reducer
                name: signupName,
                email: signupEmail,
                password: signupPassword,
                phone: signupPhone,
                address: signupAddress,
            }
        });
        navigate('/');
    };

    if (state.isAuthenticated && state.currentUser) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="bg-secondary p-10 rounded-lg shadow-2xl shadow-accent-cyan/20 max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Welcome, <span className="text-accent-cyan">{state.currentUser.name}</span>!</h2>
                    <p className="text-lg text-gray-300">You are logged in.</p>
                    <button 
                        onClick={() => dispatch({ type: 'LOGOUT' })}
                        className="mt-8 w-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow-pink">
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-md mx-auto bg-secondary rounded-lg overflow-hidden shadow-lg">
                <div className="flex">
                    <button onClick={() => setIsLoginView(true)} className={`w-1/2 p-4 font-bold text-center ${isLoginView ? 'bg-accent-pink text-white' : 'bg-primary text-gray-400'}`}>Login</button>
                    <button onClick={() => setIsLoginView(false)} className={`w-1/2 p-4 font-bold text-center ${!isLoginView ? 'bg-accent-pink text-white' : 'bg-primary text-gray-400'}`}>Sign Up</button>
                </div>
                <div className="p-8">
                    {isLoginView ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <h2 className="text-2xl font-bold text-center text-white mb-6">Welcome Back</h2>
                            <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button type="submit" className="w-full bg-accent-pink text-white font-bold py-3 px-6 rounded-lg mt-4 hover:opacity-80 transition-opacity">Login</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <h2 className="text-2xl font-bold text-center text-white mb-6">Create Account</h2>
                            <input type="text" placeholder="Full Name" value={signupName} onChange={e => setSignupName(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="email" placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="password" placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="tel" placeholder="Phone Number" value={signupPhone} onChange={e => setSignupPhone(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                            <input type="text" placeholder="Address" value={signupAddress} onChange={e => setSignupAddress(e.target.value)} required className="w-full bg-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-pink" />
                             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button type="submit" className="w-full bg-accent-pink text-white font-bold py-3 px-6 rounded-lg mt-4 hover:opacity-80 transition-opacity">Create Account</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
