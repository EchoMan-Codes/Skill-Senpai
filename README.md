# SkillCompass 🧭

An AI-driven platform for skills gap analysis and personalized learning roadmaps. Built for the modern developer.

## 🚀 Features

1.  **Skills Gap Analysis**: Visualize your current skills vs. market requirements using interactive radar charts.
2.  **Personalized Roadmaps**: Step-by-step learning paths tailored to specific job roles.
3.  **Job Demand Insights**: Real-time data visualization of job market trends.
4.  **Smart Recommendations**: Curated YouTube channels, videos, and project ideas to bridge your skill gaps.
5.  **Progress Tracking**: Monitor your learning journey with intuitive dashboards.

## 🛠 Tech Stack

-   **Frontend**: React.js (Vite)
-   **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite` plugin)
-   **Animations**: Framer Motion
-   **Charts**: Recharts
-   **Icons**: Lucide React
-   **Routing**: React Router DOM v6

## 📂 Project Structure

-   `src/pages/Home.jsx`: Landing page with search and feature overview.
-   `src/pages/Dashboard.jsx`: User dashboard with skill radar charts and progress tracking.
-   `src/pages/JobSearch.jsx`: Job search interface with expandable learning roadmaps.
-   `src/pages/PersonalizedLearning.jsx`: Resource feed with YouTube recommendations and project ideas.
-   `src/pages/Login.jsx` & `Signup.jsx`: Authentication pages with glassmorphism UI.
-   `src/components/Navbar.jsx`: Responsive navigation bar.

## 🎨 Design Philosophy

-   **Glassmorphism**: Translucent panels and blurs for a premium feel.
-   **Dark Mode**: Deep slate background with vibrant indigo/purple accents.
-   **Micro-interactions**: Hover effects and smooth transitions using Framer Motion.

## 🔧 Setup & Run

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:5173](http://localhost:5173) in your browser.
