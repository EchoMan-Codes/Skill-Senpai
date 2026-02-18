import React, { createContext, useContext, useState, useEffect } from 'react';
import { analyzeProfile } from '../utils/aiLogic';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : null;
    });

    const [learningPlan, setLearningPlan] = useState(() => {
        const saved = localStorage.getItem('learningPlan');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            const plan = analyzeProfile(userProfile);
            setLearningPlan(plan);
            localStorage.setItem('learningPlan', JSON.stringify(plan));
        }
    }, [userProfile]);

    const updateProfile = (newData) => {
        setUserProfile((prev) => ({ ...prev, ...newData }));
    };

    const clearProfile = () => {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('learningPlan');
        setUserProfile(null);
        setLearningPlan(null);
    };

    return (
        <UserContext.Provider value={{ userProfile, learningPlan, updateProfile, clearProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
