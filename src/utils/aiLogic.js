import dataset from '../data/dataset.json';

export const analyzeProfile = (userProfile) => {
    const { currentSkills = [], targetRole, hoursPerWeek = 10 } = userProfile;
    const roleData = dataset.roles.find(r => r.title === targetRole || r.id === targetRole);

    if (!roleData) {
        return { error: "Role not found" };
    }

    const { skills: requiredSkills } = roleData;

    // 1. Identify Gaps & Categorize
    const missingSkills = requiredSkills.filter(skill =>
        !currentSkills.some(userSkill => userSkill.toLowerCase() === skill.name.toLowerCase())
    );

    const matchedSkills = requiredSkills.filter(skill =>
        currentSkills.some(userSkill => userSkill.toLowerCase() === skill.name.toLowerCase())
    );

    // 2. Calculate Progress using Weighted Scoring
    const totalWeight = requiredSkills.reduce((acc, skill) => acc + skill.weight, 0);
    const userScore = matchedSkills.reduce((acc, skill) => acc + skill.weight, 0);
    const progressPercentage = Math.round((userScore / totalWeight) * 100);

    // 3. Generate Roadmap with Categories
    const roadmap = missingSkills.map((skill, index) => {
        // Simple heuristic: core core/critical skills take longer, trending/advanced varies
        const estimatedHours = skill.weight * 4; // Mock heuristic: 4 hours per weight point
        const estimatedWeeks = Math.ceil(estimatedHours / hoursPerWeek);

        return {
            step: index + 1,
            skill: skill.name,
            category: skill.category.charAt(0).toUpperCase() + skill.category.slice(1),
            description: `Master ${skill.name} - a ${skill.category} requirement for ${roleData.title}.`,
            estimatedHours: estimatedHours,
            estimatedWeeks: estimatedWeeks,
            status: index === 0 ? 'In Progress' : 'Pending',
            // Resources would ideally come from a separate resource map or be included in dataset
            resources: []
        };
    });

    return {
        overview: {
            role: roleData.title,
            progress: progressPercentage,
            totalMissing: missingSkills.length,
            estimatedCompletionWeeks: roadmap.reduce((acc, step) => acc + step.estimatedWeeks, 0)
        },
        skillsGap: {
            missing: missingSkills,
            acquired: matchedSkills,
            categories: {
                critical: missingSkills.filter(s => s.category === 'critical'),
                competitive: missingSkills.filter(s => s.category === 'competitive'),
                trending: missingSkills.filter(s => s.category === 'trending'),
                advanced: missingSkills.filter(s => s.category === 'advanced')
            }
        },
        roadmap: roadmap,
        currentFocus: roadmap.length > 0 ? roadmap[0] : null
    };
};
