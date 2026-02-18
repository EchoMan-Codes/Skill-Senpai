import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { BookOpen, Youtube, CheckCircle, TrendingUp, Edit3, Lock, Play } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { userProfile, learningPlan } = useUser();
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

                    {/* Skill Radar Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <TrendingUp className="text-indigo-400" />
                                Skills Gap Analysis
                            </h2>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={userData}>
                                    <PolarGrid stroke="#374151" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                    <Radar
                                        name="My Skills"
                                        dataKey="A"
                                        stroke="#818cf8"
                                        strokeWidth={2}
                                        fill="#818cf8"
                                        fillOpacity={0.3}
                                    />
                                    <Radar
                                        name="Required"
                                        dataKey="B"
                                        stroke="#34d399"
                                        strokeWidth={2}
                                        fill="#34d399"
                                        fillOpacity={0.1}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-indigo-400" /> My Current Level
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-400" /> Required Level
                            </div>
                        </div>
                    </motion.div>

                    {/* Current Focus / Next Step */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col"
                    >
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <BookOpen className="text-purple-400" />
                            Current Focus
                        </h2>

                        {learningPlan.currentFocus ? (
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="mb-6">
                                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                        Step {learningPlan.currentFocus.step}
                                    </span>
                                    <h3 className="text-3xl font-bold text-white mb-2">{learningPlan.currentFocus.skill}</h3>
                                    <p className="text-slate-400">{learningPlan.currentFocus.description}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                                            <span>Estimated Effort</span>
                                            <span className="text-white">{learningPlan.currentFocus.estimatedHours} Hours</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                            <div className="bg-indigo-500 h-full w-0" /> {/* Dynamic progress could go here */}
                                        </div>
                                    </div>

                                    {learningPlan.currentFocus.resources.length > 0 && (
                                        <a
                                            href={learningPlan.currentFocus.resources[0].link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                                        >
                                            Start Learning Now
                                        </a>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-slate-500 flex-1 flex flex-col items-center justify-center">
                                <CheckCircle className="w-16 h-16 mb-4 text-emerald-500" />
                                <p className="text-lg">You're all caught up!</p>
                            </div>
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
