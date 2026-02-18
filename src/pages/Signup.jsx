import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Briefcase } from 'lucide-react';

const Signup = () => {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl"
            >
                <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
                <p className="text-slate-400 text-center mb-6">Join the future of learning.</p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Alex Doe"
                                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Target Role</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                            <select className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none" defaultValue="">
                                <option value="" disabled>Select your goal</option>
                                <option value="frontend">Frontend Developer</option>
                                <option value="backend">Backend Developer</option>
                                <option value="data">Data Scientist</option>
                                <option value="ml">Machine Learning Engineer</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 mt-4 rounded-lg transition-all shadow-lg shadow-indigo-500/30">
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
