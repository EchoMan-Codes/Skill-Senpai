import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Compass, Briefcase, Clock, CheckCircle, Shield, Code, Server, Lock } from 'lucide-react';
import dataset from '../data/dataset.json';
import { calculateATSScore } from '../utils/atsLogic';

const steps = [
    { id: 1, title: 'Your Goal', icon: Briefcase },
    { id: 2, title: 'Current Skills', icon: CheckCircle },
    { id: 3, title: 'Availability', icon: Clock },
];

const RoleIcon = ({ roleId, className }) => {
    switch (roleId) {
        case 'frontend-dev': return <Code className={className} />;
        case 'backend-dev': return <Server className={className} />;
        case 'cybersecurity-analyst': return <Shield className={className} />;
        default: return <Briefcase className={className} />;
    }
};

const Onboarding = () => {
    const { updateProfile } = useUser();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        targetRole: '',
        currentSkills: [],
        hoursPerWeek: 10,
        experienceLevel: 'Beginner',
        isParsing: false,
        parsingSuccess: false,
        atsPreview: null
    });

    const availableSkills = useMemo(() => {
        const skills = new Set();
        dataset.roles.forEach(role => {
            role.skills.forEach(skill => skills.add(skill.name));
        });
        return Array.from(skills).sort();
    }, []);

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            updateProfile(formData);
            navigate('/dashboard');
        }
    };

    const toggleSkill = (skill) => {
        setFormData(prev => ({
            ...prev,
            currentSkills: prev.currentSkills.includes(skill)
                ? prev.currentSkills.filter(s => s !== skill)
                : [...prev.currentSkills, skill]
        }));
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900 text-white">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Progress Bar */}
                <div className="bg-slate-900/50 p-6 border-b border-slate-700 flex justify-between items-center">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;
                        return (
                            <div key={step.id} className="flex flex-col items-center relative z-10 w-1/3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <span className={`text-xs font-medium ${isActive ? 'text-indigo-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>{step.title}</span>
                                {idx < steps.length - 1 && (
                                    <div className="absolute top-5 left-1/2 w-full h-[2px] bg-slate-700 -z-10">
                                        <div
                                            className="h-full bg-emerald-500 transition-all duration-500"
                                            style={{ width: isCompleted ? '100%' : '0%' }}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="p-8 min-h-[400px]">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: TARGET ROLE */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-center mb-8">What is your dream job?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {dataset.roles.map(role => (
                                        <button
                                            key={role.id}
                                            onClick={() => setFormData({ ...formData, targetRole: role.title })}
                                            className={`p-6 rounded-xl border-2 transition-all text-left group ${formData.targetRole === role.title
                                                ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(79,70,229,0.2)]'
                                                : 'border-slate-700 bg-slate-900/50 hover:border-indigo-500/50'
                                                }`}
                                        >
                                            <RoleIcon roleId={role.id} className={`w-8 h-8 mb-3 ${formData.targetRole === role.title ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'}`} />
                                            <h3 className="text-lg font-semibold">{role.title}</h3>
                                            <p className="text-sm text-slate-400 mt-1">{role.description}</p>
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => { }}
                                        className="p-6 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/30 text-left hover:border-slate-500 hover:bg-slate-800 transition-all opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        <Compass className="w-8 h-8 mb-3 text-slate-600" />
                                        <h3 className="text-lg font-semibold text-slate-500">More Roles Coming Soon</h3>
                                        <p className="text-sm text-slate-600 mt-1">Data Scientist, DevOps, AI Engineer...</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: CURRENT SKILLS */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-1">Build Your Skill Profile</h2>
                                    <p className="text-sm text-slate-400">Scan your resume or select your skills manually.</p>
                                </div>

                                {/* AI Resume Parsing Section */}
                                <div className="bg-indigo-500/5 border-2 border-dashed border-indigo-500/20 rounded-2xl p-6 text-center group hover:bg-indigo-500/10 hover:border-indigo-500/40 transition-all cursor-pointer relative overflow-hidden">
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFormData(prev => ({ ...prev, isParsing: true }));
                                                setTimeout(() => {
                                                    const mockSkills = formData.targetRole === 'Frontend Developer'
                                                        ? ['HTML5', 'CSS3', 'JavaScript (ES6+)']
                                                        : formData.targetRole === 'Backend Developer'
                                                            ? ['Node.js', 'PostgreSQL']
                                                            : ['Network Enumeration', 'Linux Internals'];

                                                    const ats = calculateATSScore(mockSkills, formData.targetRole);

                                                    setFormData(prev => ({
                                                        ...prev,
                                                        currentSkills: [...new Set([...prev.currentSkills, ...mockSkills])],
                                                        isParsing: false,
                                                        parsingSuccess: true,
                                                        atsPreview: ats.score
                                                    }));
                                                }, 2500);
                                            }
                                        }}
                                    />
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                            <Shield className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div className="font-semibold text-indigo-300">
                                            {formData.isParsing ? 'Calibrating Engine...' : 'Upload Resume Intelligence'}
                                        </div>
                                        <p className="text-[10px] text-slate-500 italic">Powered by Anti-Gravity Resume Parser</p>
                                    </div>

                                    {formData.isParsing && (
                                        <motion.div
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                            className="absolute bottom-0 left-0 h-1 bg-indigo-500 w-full"
                                        />
                                    )}

                                    {formData.parsingSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 bg-slate-800/95 flex flex-col items-center justify-center border-2 border-emerald-500/50 rounded-2xl"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="text-center">
                                                    <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-1" />
                                                    <p className="text-emerald-400 font-bold text-sm">Skills Extracted!</p>
                                                </div>
                                                <div className="w-[1px] h-10 bg-slate-700" />
                                                <div className="text-center">
                                                    <div className="text-2xl font-black text-indigo-400">{formData.atsPreview}%</div>
                                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter text-center">ATS Score</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFormData(prev => ({ ...prev, parsingSuccess: false, currentSkills: [], atsPreview: null }));
                                                }}
                                                className="text-[10px] text-slate-400 underline"
                                            >
                                                Undo & Select Manually
                                            </button>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
                                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-slate-800 px-2 text-slate-500">OR SELECT MANUALLY</span></div>
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center max-h-[180px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-700">
                                    {availableSkills.map(skill => (
                                        <button
                                            key={skill}
                                            onClick={() => toggleSkill(skill)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${formData.currentSkills.includes(skill)
                                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-indigo-500/50 hover:text-white'
                                                }`}
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: AVAILABILITY */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 max-w-md mx-auto"
                            >
                                <h2 className="text-2xl font-bold text-center mb-8">How much time can you commit?</h2>

                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-4 text-center">
                                            Weekly study hours: <span className="text-indigo-400 text-xl font-bold">{formData.hoursPerWeek} hours</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="5"
                                            max="40"
                                            step="5"
                                            value={formData.hoursPerWeek}
                                            onChange={(e) => setFormData({ ...formData, hoursPerWeek: parseInt(e.target.value) })}
                                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                        />
                                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                                            <span>Casual (5h)</span>
                                            <span>Part-time (20h)</span>
                                            <span>Full-time (40h+)</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-indigo-500/20">
                                        <h4 className="text-indigo-400 font-medium mb-1 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" /> Estimate
                                        </h4>
                                        <p className="text-sm text-slate-400">
                                            Based on {formData.hoursPerWeek} hours/week, you could reach job readiness for
                                            <span className="text-white font-semibold"> {formData.targetRole} </span>
                                            in approximately <span className="text-white font-semibold">3-6 months</span> depending on your current gaps.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-700 flex justify-between">
                    <button
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${currentStep === 1 ? 'invisible' : 'text-slate-400 hover:text-white'}`}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentStep === 1 && !formData.targetRole}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                    >
                        {currentStep === 3 ? 'Generate My Plan' : 'Next Step'}
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default Onboarding;
