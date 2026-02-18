import { roleTemplates } from '../data/roleTemplates';

export const analyzeProfile = (userProfile) => {
    const { currentSkills = [], targetRole, hoursPerWeek = 10 } = userProfile;
    const template = roleTemplates[targetRole];

    if (!template) {
        return { error: "Role not found" };
    }

    const { requiredSkills, resources } = template;

    // 1. Identify Gaps
    const missingSkills = requiredSkills.filter(skill =>
        !currentSkills.some(userSkill => userSkill.toLowerCase() === skill.name.toLowerCase())
    );

    const matchedSkills = requiredSkills.filter(skill =>
        currentSkills.some(userSkill => userSkill.toLowerCase() === skill.name.toLowerCase())
    );

    // 2. Calculate Progress
    const totalWeight = requiredSkills.reduce((acc, skill) => acc + skill.weight, 0);
    const userScore = matchedSkills.reduce((acc, skill) => acc + skill.weight, 0);
    const progressPercentage = Math.round((userScore / totalWeight) * 100);

    // 3. Generate Roadmap
    // Prioritize based on hardcoded order in template (assuming template is sorted by foundational -> advanced)
    const roadmap = missingSkills.map((skill, index) => {
        const estimatedWeeks = Math.ceil(skill.estimatedHours / hoursPerWeek);
        return {
            step: index + 1,
            skill: skill.name,
            category: skill.category,
            description: `Master the fundamentals of ${skill.name} to build a strong foundation.`,
            estimatedHours: skill.estimatedHours,
            estimatedWeeks: estimatedWeeks,
            status: index === 0 ? 'In Progress' : 'Pending',
            resources: resources[skill.name] || []
        };
    });

    return {
        overview: {
            role: targetRole,
            progress: progressPercentage,
            totalMissing: missingSkills.length,
            estimatedCompletionWeeks: roadmap.reduce((acc, step) => acc + step.estimatedWeeks, 0)
        },
        skillsGap: {
            missing: missingSkills,
            acquired: matchedSkills
        },
        roadmap: roadmap,
        currentFocus: roadmap.length > 0 ? roadmap[0] : null
    };
};
