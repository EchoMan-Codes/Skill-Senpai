import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, Code, Database, Globe, PlayCircle } from 'lucide-react';

const learningResources = [
    {
        category: 'Frontend Development',
        icon: <Globe className="w-5 h-5 text-blue-400" />,
        channels: [
            { name: 'Web Dev Simplified', description: 'React, CSS, and modern web dev concepts simplified.', subscribers: '1.2M', link: '#' },
            { name: 'Traversy Media', description: 'Full courses on everything from HTML to MERN stack.', subscribers: '2.1M', link: '#' },
            { name: 'Fireship', description: 'Fast-paced tech news and code tutorials.', subscribers: '1.8M', link: '#' },
        ],
        videos: [
            { title: 'React 19 Crash Course', channel: 'Academind', difficulty: 'Beginner', duration: '45m' },
            { title: 'Advanced CSS Animations', channel: 'Kevin Powell', difficulty: 'Advanced', duration: '25m' },
        ]
    },
    {
        category: 'Backend & Systems',
        icon: <Database className="w-5 h-5 text-emerald-400" />,
        channels: [
            { name: 'Hussein Nasser', description: 'Deep dives into backend engineering and databases.', subscribers: '300K', link: '#' },
            { name: 'NeetCode', description: 'Algorithm and Data Structure mastery.', subscribers: '600K', link: '#' },
        ],
        videos: [
            { title: 'System Design Interview Guide', channel: 'HelloInterview', difficulty: 'Intermediate', duration: '1h 20m' },
            { title: 'Docker vs Kubernetes', channel: 'TechWorld with Nana', difficulty: 'Beginner', duration: '35m' },
        ]
    }
];

const projects = [
    {
        title: 'E-commerce API',
        tech: ['Node.js', 'Express', 'MongoDB'],
        description: 'Build a scalable REST API with authentication, product management, and payment integration.',
        difficulty: 'Intermediate'
    },
    {
        title: 'Real-time Chat App',
        tech: ['React', 'Firebase', 'Tailwind'],
        description: 'Create a messaging platform with live updates, read receipts, and media sharing.',
        difficulty: 'Advanced'
    },
    {
        title: 'Personal Portfolio',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description: 'Showcase your skills with a responsive, high-performance personal website.',
        difficulty: 'Beginner'
    }
];

const PersonalizedLearning = () => {
    const [activeTab, setActiveTab] = useState('resources');

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500">
                        Learn & Apply
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Curated content from top creators and real-world project ideas to solidify your knowledge.
                    </p>

                    <div className="flex justify-center gap-4 mt-8 bg-slate-800/50 p-1 rounded-xl w-fit mx-auto border border-slate-700">
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'resources' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Resources
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Project Ideas
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-8">
                    {activeTab === 'resources' ? (
                        <div className="space-y-12">
                            {learningResources.map((section, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-slate-700 pb-2">
                                        {section.icon}
                                        {section.category}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {section.channels.map((channel, cIdx) => (
                                            <div key={cIdx} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-red-500/50 hover:bg-slate-800 transition-all group">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Youtube className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{channel.name}</h3>
                                                        <span className="text-xs text-slate-500">{channel.subscribers} Subscribers</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-4 h-10">{channel.description}</p>
                                                <a href={channel.link} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1">
                                                    Visit Channel <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        ))}
                                        {section.videos.map((video, vIdx) => (
                                            <div key={vIdx} className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-2 opacity-50"><PlayCircle className="w-12 h-12 text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                                                <h4 className="font-medium pr-8">{video.title}</h4>
                                                <div className="flex justify-between items-end mt-4">
                                                    <div className="text-xs text-slate-500">
                                                        <p>{video.channel}</p>
                                                        <p className="mt-1">{video.duration}</p>
                                                    </div>
                                                    <span className={`text-xs px-2 py-1 rounded bg-slate-900 border ${video.difficulty === 'Beginner' ? 'border-emerald-500 text-emerald-400' :
                                                            video.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-400' :
                                                                'border-red-500 text-red-400'
                                                        }`}>
                                                        {video.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-indigo-500/10 rounded-lg">
                                            <Code className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                                                project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                            }`}>
                                            {project.difficulty}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
                                        Start Project
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalizedLearning;
