export const roleTemplates = {
    "Frontend Developer": {
        requiredSkills: [
            { name: "HTML & CSS", category: "Basics", weight: 10, estimatedHours: 20 },
            { name: "JavaScript", category: "Core", weight: 30, estimatedHours: 60 },
            { name: "React", category: "Framework", weight: 40, estimatedHours: 80 },
            { name: "Tailwind CSS", category: "Styling", weight: 10, estimatedHours: 15 },
            { name: "Git", category: "Dev Tools", weight: 10, estimatedHours: 10 }
        ],
        resources: {
            "HTML & CSS": [
                { title: "HTML & CSS Crash Course", creator: "Traversy Media", type: "Video", link: "https://www.youtube.com/watch?v=HD13eq_Pmp8" },
                { title: "Responsive Web Design Certification", creator: "freeCodeCamp", type: "Interactive", link: "https://www.freecodecamp.org/" }
            ],
            "JavaScript": [
                { title: "JavaScript Crash Course for Beginners", creator: "Traversy Media", type: "Video", link: "https://www.youtube.com/watch?v=hdI2bqOjy3c" },
                { title: "Namaste JavaScript", creator: "Akshay Saini", type: "Series", link: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP" }
            ],
            "React": [
                { title: "React JS Crash Course", creator: "Traversy Media", type: "Video", link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" },
                { title: "Complete React Course", creator: "Cosden Solutions", type: "Video", link: "https://www.youtube.com/watch?v=LDB4uaJ87e0" }
            ],
            "Tailwind CSS": [
                { title: "Tailwind CSS Crash Course", creator: "Traversy Media", type: "Video", link: "https://www.youtube.com/watch?v=dFgzHOX84xQ" }
            ],
            "Git": [
                { title: "Git and GitHub for Beginners", creator: "FreeCodeCamp", type: "Video", link: "https://www.youtube.com/watch?v=RGOj5yH7evk" }
            ]
        }
    },
    "Backend Developer": {
        requiredSkills: [
            { name: "JavaScript/Node.js", category: "Core", weight: 30, estimatedHours: 60 },
            { name: "Express.js", category: "Framework", weight: 20, estimatedHours: 30 },
            { name: "Databases (SQL/NoSQL)", category: "Storage", weight: 30, estimatedHours: 50 },
            { name: "API Design (REST/GraphQL)", category: "Architecture", weight: 10, estimatedHours: 25 },
            { name: "Git", category: "Dev Tools", weight: 10, estimatedHours: 10 }
        ],
        resources: {
            "JavaScript/Node.js": [
                { title: "Node.js Crash Course", creator: "Traversy Media", type: "Video", link: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" }
            ],
            "Express.js": [
                { title: "Express.js Crash Course", creator: "Traversy Media", type: "Video", link: "https://www.youtube.com/watch?v=L72fhGm1tfE" }
            ],
            "Databases (SQL/NoSQL)": [
                { title: "SQL vs NoSQL Explained", creator: "Web Dev Simplified", type: "Video", link: "https://www.youtube.com/watch?v=ZS_kXvOeQ5Y" }
            ],
            "API Design (REST/GraphQL)": [
                { title: "REST API Design Best Practices", creator: "FreeCodeCamp", type: "Video", link: "https://www.youtube.com/watch?v=-MTSQjw5DrM" }
            ],
            "Git": [
                { title: "Git and GitHub for Beginners", creator: "FreeCodeCamp", type: "Video", link: "https://www.youtube.com/watch?v=RGOj5yH7evk" }
            ]
        }
    }
};
