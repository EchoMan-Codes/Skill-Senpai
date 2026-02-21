import dataset from '../data/dataset.json';

/**
 * Calculates ATS (Applicant Tracking System) compatibility score based on keyword matching.
 * 
 * @param {string[]} currentSkills - List of user's current skills.
 * @param {string} targetRoleTitle - Title of the target career role.
 * @returns {object} ATS result containing score, matches, and gaps.
 */
export const calculateATSScore = (currentSkills = [], targetRoleTitle) => {
    const roleData = dataset.roles.find(r => r.title === targetRoleTitle || r.id === targetRoleTitle);

    if (!roleData) {
        return { score: 0, matchedKeywords: [], missingKeywords: [], error: "Role not found" };
    }

    const { skills: requiredSkills } = roleData;
    const normalizedUserSkills = currentSkills.map(s => s.toLowerCase());

    const matchedKeywords = [];
    const missingKeywords = [];
    let weightedScore = 0;
    let totalPossibleWeight = 0;

    requiredSkills.forEach(skill => {
        const skillNameLower = skill.name.toLowerCase();
        totalPossibleWeight += skill.weight;

        if (normalizedUserSkills.includes(skillNameLower)) {
            matchedKeywords.push(skill.name);
            weightedScore += skill.weight;
        } else {
            missingKeywords.push({
                name: skill.name,
                category: skill.category,
                impact: skill.weight >= 8 ? 'High' : (skill.weight >= 5 ? 'Medium' : 'Low')
            });
        }
    });

    const finalScore = Math.round((weightedScore / totalPossibleWeight) * 100);

    return {
        score: finalScore,
        matchedKeywords,
        missingKeywords: missingKeywords.sort((a, b) => b.weight - a.weight), // Sort gaps by impact
        analysis: getAnalysisMessage(finalScore)
    };
};

const getAnalysisMessage = (score) => {
    if (score >= 80) return "Excellent! Your resume is highly optimized for this role.";
    if (score >= 60) return "Good. Your resume has core keywords but lacks competitive edge.";
    if (score >= 40) return "Fair. Significant keyword gaps detected. Consider upskilling.";
    return "Poor. Your resume mismatch is high. Add critical keywords to pass the initial screening.";
};
