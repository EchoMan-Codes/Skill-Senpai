import { analyzeProfile } from '../utils/aiLogic';
import { calculateATSScore } from '../utils/atsLogic';

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

    const [atsResult, setAtsResult] = useState(() => {
        const saved = localStorage.getItem('atsResult');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            const plan = analyzeProfile(userProfile);
            setLearningPlan(plan);
            localStorage.setItem('learningPlan', JSON.stringify(plan));

            const ats = calculateATSScore(userProfile.currentSkills, userProfile.targetRole);
            setAtsResult(ats);
            localStorage.setItem('atsResult', JSON.stringify(ats));
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
        <UserContext.Provider value={{ userProfile, learningPlan, atsResult, updateProfile, clearProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
