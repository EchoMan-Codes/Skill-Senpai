import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { BookOpen, Youtube, CheckCircle, TrendingUp, Edit3, Lock, Play } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { userProfile, learningPlan, atsResult } = useUser();
    const [userData, setUserData] = useState([]);

    // Use a default state if no profile is found, or redirect
    if (!userProfile || !learningPlan) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-3xl font-bold mb-4">No Profile Found</h2>
                <p className="text-slate-400 mb-8">Please complete your onboarding to see your dashboard.</p>
                <Link to="/onboarding" className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                    Start Onboarding
                </Link>
            </div>
        );
    }

    // Transform data for Radar Chart
    useEffect(() => {
        if (learningPlan && learningPlan.skillsGap) {
            // Create a merged list of all required skills for the radar chart
            const allSkills = [...learningPlan.skillsGap.acquired, ...learningPlan.skillsGap.missing];
            const formattedData = allSkills.map(skill => ({
                subject: skill.name,
                A: learningPlan.skillsGap.acquired.find(s => s.name === skill.name) ? 120 : 50, // Mock "current" proficiency
                B: 120, // Target proficiency
                fullMark: 150
            }));
            setUserData(formattedData);
        }
    }, [learningPlan]);


    return (
        <div className="min-h-screen bg-slate-900 text-white pt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-end border-b border-slate-800 pb-6"
                >
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Welcome back, User
                        </h1>
                        <p className="text-slate-400 mt-2">Target Role: <span className="text-white font-medium">{userProfile.targetRole}</span></p>
                        <div className="flex gap-4 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-slate-300">{learningPlan.overview.progress}% Goal Completion</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                <span className="text-slate-300">{learningPlan.overview.estimatedCompletionWeeks} Weeks to Job Ready</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <Link to="/onboarding" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center justify-end gap-1">
                            <Edit3 className="w-4 h-4" /> Edit Profile
                        </Link>
                    </div>
                </motion.div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ATS Compatibility Engine (Bot Screening Simulation) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Shield className="w-24 h-24 text-indigo-400" />
                        </div>

                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Shield className="text-indigo-400 w-5 h-5" />
                            ATS Compatibility Engine
                        </h2>

                        <div className="flex items-center gap-8 mb-8">
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-slate-700"
                                    />
                                    <motion.circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 58}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - (atsResult?.score || 0) / 100) }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="text-indigo-500"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold">{atsResult?.score || 0}%</span>
                                    <span className="text-[10px] uppercase text-slate-500 font-bold">Match</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Bot-Ready Score</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {atsResult?.analysis || "Analyzing your profile against industry standards..."}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Matched Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {atsResult?.matchedKeywords?.map(kw => (
                                        <span key={kw} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-medium uppercase">
                                            {kw}
                                        </span>
                                    ))}
                                    {(!atsResult?.matchedKeywords || atsResult.matchedKeywords.length === 0) && (
                                        <span className="text-xs text-slate-500 italic">No keywords detected yet.</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Missing Critical Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {atsResult?.missingKeywords?.filter(k => k.impact === 'High').map(kw => (
                                        <span key={kw.name} className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[10px] font-medium uppercase flex items-center gap-1">
                                            <Lock className="w-3 h-3" /> {kw.name}
                                        </span>
                                    ))}
                                    {(!atsResult?.missingKeywords || atsResult.missingKeywords.filter(k => k.impact === 'High').length === 0) && (
                                        <span className="text-xs text-slate-500 italic">Resume is keyword-optimized!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Skill Gap Intelligence */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col"
                    >
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <TrendingUp className="text-purple-400" />
                            Skill Gap Intelligence
                        </h2>

                        <div className="space-y-4 flex-1">
                            {/* Critical Gaps */}
                            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                                <h3 className="text-red-400 text-sm font-bold flex items-center gap-2 mb-2 uppercase tracking-tight">
                                    <Lock className="w-4 h-4" /> 🚨 Critical Gaps (High Impact)
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {learningPlan.skillsGap.categories.critical.length > 0 ? (
                                        learningPlan.skillsGap.categories.critical.map(s => (
                                            <span key={s.name} className="px-3 py-1 bg-red-500/10 text-red-300 rounded-full text-xs border border-red-500/20">{s.name}</span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-slate-500 italic">No critical gaps! You're ready.</span>
                                    )}
                                </div>
                            </div>

                            {/* Competitive Gaps */}
                            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4">
                                <h3 className="text-indigo-400 text-sm font-bold flex items-center gap-2 mb-2 uppercase tracking-tight">
                                    <TrendingUp className="w-4 h-4" /> ⚔️ Competitive Advantage
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {learningPlan.skillsGap.categories.competitive.length > 0 ? (
                                        learningPlan.skillsGap.categories.competitive.map(s => (
                                            <span key={s.name} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs border border-indigo-500/20">{s.name}</span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-slate-500 italic">Core skills complete.</span>
                                    )}
                                </div>
                            </div>

                            {/* Trending & Advanced */}
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                                <h3 className="text-emerald-400 text-sm font-bold flex items-center gap-2 mb-2 uppercase tracking-tight">
                                    <TrendingUp className="w-4 h-4" /> 📈 Market Trending
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[...learningPlan.skillsGap.categories.trending, ...learningPlan.skillsGap.categories.advanced].length > 0 ? (
                                        [...learningPlan.skillsGap.categories.trending, ...learningPlan.skillsGap.categories.advanced].map(s => (
                                            <span key={s.name} className="px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded-full text-xs border border-emerald-500/20">{s.name}</span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-slate-500 italic">Profile up to date.</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {learningPlan.currentFocus && (
                            <Link to="/learning" className="mt-4 w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
                                View Learning Roadmap
                            </Link>
                        )}
                    </motion.div>

                </div>

                {/* Full Roadmap */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <TrendingUp className="text-emerald-500" />
                            Your Personalized Learning Roadmap
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700" />

                        <div className="space-y-8">
                            {learningPlan.roadmap.map((step, idx) => (
                                <div key={idx} className="relative flex gap-6 group">
                                    {/* Step Circle */}
                                    <div className={`
                            relative z-10 w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-xl border-4 transition-colors
                            ${step.status === 'In Progress' ? 'bg-indigo-600 border-slate-900 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 border-slate-900 text-slate-500'}
                        `}>
                                        {step.step}
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 bg-slate-800/60 p-6 rounded-xl border border-slate-700 group-hover:border-indigo-500/50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={`text-xl font-bold ${step.status === 'In Progress' ? 'text-indigo-400' : 'text-slate-200'}`}>
                                                {step.skill}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-slate-400">
                                                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {step.category}</span>
                                                <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {step.estimatedWeeks} Weeks</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 mb-4">{step.description}</p>

                                        {/* Resources */}
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Recommended Resources</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {step.resources.map((res, rIdx) => (
                                                    <a
                                                        key={rIdx}
                                                        href={res.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-transparent transition-all group/res"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white">
                                                                <Play className="w-4 h-4 fill-current" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-slate-200 group-hover/res:text-indigo-300">{res.title}</p>
                                                                <p className="text-xs text-slate-500">{res.creator}</p>
                                                            </div>
                                                        </div>
                                                        <Youtube className="w-4 h-4 text-slate-600 group-hover/res:text-red-500 transition-colors" />
                                                    </a>
                                                ))}
                                                {step.resources.length === 0 && (
                                                    <div className="p-3 text-sm text-slate-500 italic">No specific resources found.</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Dashboard;
