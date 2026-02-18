import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Briefcase, MapPin, DollarSign, ChevronDown, CheckCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockJobs = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'TechCorp Inc.',
        location: 'Remote',
        salary: '$120k - $160k',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        demand: 'High',
        roadmap: [
            { step: 1, title: 'Advanced React Patterns', duration: '2 weeks' },
            { step: 2, title: 'State Management (Redux/Zustand)', duration: '1 week' },
            { step: 3, title: 'Performance Optimization', duration: '1 week' },
        ]
    },
    {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartupX',
        location: 'New York, NY',
        salary: '$100k - $140k',
        skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
        demand: 'Very High',
        roadmap: [
            { step: 1, title: 'Backend API Design', duration: '2 weeks' },
            { step: 2, title: 'Database Schema Design', duration: '1 week' },
            { step: 3, title: 'CI/CD Pipelines', duration: '1 week' },
        ]
    },
    {
        id: 3,
        title: 'Data Scientist',
        company: 'DataFlow',
        location: 'San Francisco, CA',
        salary: '$130k - $170k',
        skills: ['Python', 'TensorFlow', 'SQL', 'Tableau'],
        demand: 'Medium',
        roadmap: [
            { step: 1, title: 'Python for Data Analysis', duration: '3 weeks' },
            { step: 2, title: 'Machine Learning Basics', duration: '4 weeks' },
            { step: 3, title: 'Deep Learning with TensorFlow', duration: '4 weeks' },
        ]
    }
];

const JobSearch = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [expandedJob, setExpandedJob] = useState(null);

    const filteredJobs = mockJobs.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Search Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">Find Your Next Role</h1>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Search by job title or skill..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Job List */}
                <div className="space-y-4">
                    {filteredJobs.map((job) => (
                        <motion.div
                            key={job.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all"
                        >
                            <div
                                className="p-6 cursor-pointer"
                                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                                            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.company}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                                            <span className="flex items-center gap-1 text-emerald-400"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {job.skills.slice(0, 3).map((skill, i) => (
                                            <span key={i} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300 border border-slate-600">
                                                {skill}
                                            </span>
                                        ))}
                                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Roadmap */}
                            <AnimatePresence>
                                {expandedJob === job.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="bg-slate-900/50 border-t border-slate-700"
                                    >
                                        <div className="p-6 space-y-6">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-indigo-400">Personalized Learning Roadmap</h4>
                                                <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                                                    Start Learning <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="relative pl-8 border-l-2 border-slate-700 space-y-8">
                                                {job.roadmap.map((step, idx) => (
                                                    <div key={idx} className="relative">
                                                        <span className="absolute -left-[41px] bg-slate-800 border-2 border-indigo-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-indigo-400">
                                                            {idx + 1}
                                                        </span>
                                                        <h5 className="font-medium text-white">{step.title}</h5>
                                                        <p className="text-sm text-slate-400">Estimated time: {step.duration}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-20 text-slate-500">
                            No jobs found matching "{query}". Try "React" or "Python".
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default JobSearch;
