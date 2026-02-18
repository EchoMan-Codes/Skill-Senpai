import React, { useState } from 'react';
import { Search, ChevronRight, BarChart2, Briefcase, Map, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const features = [
    {
        icon: <BarChart2 className="w-6 h-6 text-indigo-400" />,
        title: 'Skills Gap Analysis',
        description: 'Compare your current profile with market demands instantly.',
    },
    {
        icon: <Map className="w-6 h-6 text-purple-400" />,
        title: 'Personalized Roadmap',
        description: 'Get a step-by-step learning path tailored to your goal.',
    },
    {
        icon: <Briefcase className="w-6 h-6 text-pink-400" />,
        title: 'Job Demand Insights',
        description: 'Real-time data on job availability and salary trends.',
    },
    {
        icon: <Target className="w-6 h-6 text-emerald-400" />,
        title: 'Progress Tracking',
        description: 'Monitor your growth with intuitive charts and metrics.',
    },
];

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-900 overflow-hidden text-white">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col justify-center min-h-[90vh]">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-8"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Bridge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Skills Gap</span>.
                        <br />
                        Command Your Future.
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
                        AI-driven personalized learning roadmaps to help you land your dream job faster.
                    </p>

                    {/* Search Bar */}
                    <motion.form
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        onSubmit={handleSearch}
                        className="flex items-center w-full max-w-2xl mx-auto bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-700 p-2 shadow-2xl hover:border-indigo-500 transition-colors"
                    >
                        <div className="pl-4">
                            <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for a role (e.g., 'Frontend Developer', 'Data Scientist')..."
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 px-4 py-3 text-lg outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-3 font-semibold transition-all flex items-center gap-2 group"
                        >
                            Analyze
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.form>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800 transition-all group"
                            >
                                <div className="mb-4 p-3 bg-slate-900/50 rounded-xl w-fit group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-slate-200">{feature.title}</h3>
                                <p className="text-sm text-slate-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
