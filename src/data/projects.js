export const PROJECTS = [
  {
    id: "nova",
    number: "01",
    title: "Nova",
    category: "Full Stack",
    tagline: "Social Platform",
    featured: true,
    inProgress: false,
    shortDescription:
      "Full-stack social networking platform with real-time messaging, posts, stories, and notifications.",
    fullDescription:
      "Nova is a full-stack social networking platform built with React and Node.js. It supports user authentication, personalized profiles, image-based posts, stories, likes, comments, user search, bookmarks, notifications, and real-time one-to-one messaging. The frontend uses Redux for state management and Socket.IO for real-time updates, while the backend follows a modular Express + MongoDB architecture with separate controllers, models, routes, and middleware.",
    highlights:
      "Built a production-style social platform combining JWT auth, media handling, database relationships, real-time communication, notifications, and frontend state management — beyond simple CRUD.",
    images: [
      "/projects/nova1.png",
      "/projects/nova2.png",
      "/projects/nova3.png",
      "/projects/nova4.png",
      "/projects/nova5.png",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Redux"],
    features: [
      "JWT auth with HTTP-only cookies",
      "Social feed — posts, likes, comments",
      "Stories with auto cleanup",
      "Real-time one-to-one messaging",
      "Notifications (likes, comments, messages)",
      "User search & suggestions",
      "Cloudinary image uploads + sharp optimization",
    ],
    liveUrl: "https://nova-lnel.onrender.com/",
    githubUrl: "https://github.com/PARTHA-PATTANAYAK-02/Nova",
  },
  {
    id: "team-task-manager",
    number: "02",
    title: "Team Task Manager",
    category: "Full Stack",
    tagline: "Productivity",
    featured: true,
    inProgress: false,
    shortDescription:
      "MERN-based task management platform for projects, tasks, progress tracking, and dashboard analytics.",
    fullDescription:
      "Team Task Manager is a full-stack productivity application built with the MERN stack. Users can register and log in, create and manage projects, create tasks, track task status, manage due dates, and monitor progress through a dynamic dashboard. JWT authentication protects routes, MongoDB with Mongoose handles persistence, and a React frontend interacts with the backend through a clean REST API.",
    highlights:
      "Built a full-stack task workflow with authentication, project-based task organization, status updates, due-date handling, and dashboard analytics using Recharts.",
    images: [
      "/projects/team-task1.png",
      "/projects/team-task2.png",
      "/projects/team-task3.png",
      "/projects/team-task4.png",
      "/projects/team-task5.png",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Recharts", "JWT"],
    features: [
      "JWT auth with protected routes",
      "Create & manage projects",
      "Task management with status",
      "Due-date handling",
      "Dashboard statistics",
      "Recent tasks overview",
      "Dynamic modal-based forms",
    ],
    liveUrl: "https://team-task-manager-frontend-gnye.onrender.com/",
    githubUrl: "https://github.com/PARTHA-PATTANAYAK-02/Team-Task-Manager",
  },
  {
    id: "recipe-app",
    number: "03",
    title: "Recipe App",
    category: "Frontend",
    tagline: "API Integration",
    featured: false,
    inProgress: false,
    shortDescription:
      "Food and drink discovery app with search, favorites, meal planning, and dynamic recipe details.",
    fullDescription:
      "Recipe App is a React-based food and drink discovery platform designed to help users search, explore, and save recipes. It provides separate experiences for recipes, food, ingredients, and drinks, along with detailed recipe and drink pages. Users can save favorites locally, filter saved items, explore ingredient information, use search suggestions, plan meals, share content, and switch between light and dark themes.",
    highlights:
      "Built a multi-route React application using reusable components, Context API, localStorage persistence, dynamic routing, search interactions, and responsive UI patterns.",
    images: [
      "/projects/recipe1.png",
      "/projects/recipe2.png",
      "/projects/recipe3.png",
      "/projects/recipe4.png",
      "/projects/recipe5.png",
    ],
    tech: ["React", "React Router", "Context API", "CSS Modules", "Vite"],
    features: [
      "Recipe & drink discovery",
      "Recipe / drink detail pages",
      "Ingredient-based exploration",
      "Favorites with localStorage",
      "Meal planner",
      "Search suggestions",
      "Light / dark theme",
    ],
    liveUrl: "https://recipe-app-three-steel.vercel.app/",
    githubUrl: "https://github.com/PARTHA-PATTANAYAK-02/Recipe-App",
  },
  {
    id: "ai-chatbot",
    number: "04",
    title: "Gemini AI Chatbot",
    category: "AI",
    tagline: "Gemini API",
    featured: false,
    inProgress: false,
    shortDescription:
      "AI chatbot powered by Gemini API with saved chats, code formatting, themes, and animated interactions.",
    fullDescription:
      "Gemini AI Chatbot is a React-based conversational app integrated with the Google Gemini API. Users send prompts and receive AI responses in real time, with saved chat history, new-chat creation, chat deletion, prompt suggestions, light/dark themes, loading and error states, code formatting, copy-to-clipboard support, and responsive UI interactions.",
    highlights:
      "Built an interactive AI chat experience with Gemini API integration, persistent chat history, code-aware response rendering, theme switching, animated feedback, and error handling.",
    images: ["/projects/ai-chatbot1.png", "/projects/ai-chatbot2.png"],
    tech: ["React", "Gemini API", "JavaScript", "Lottie", "Vite"],
    features: [
      "Gemini API integration",
      "Saved chat history",
      "New / delete conversations",
      "Prompt suggestions",
      "Markdown-style code formatting",
      "Copy code to clipboard",
      "Dark / light theme",
    ],
    liveUrl: "https://aichatbot-app-five.vercel.app/",
    githubUrl: "https://github.com/PARTHA-PATTANAYAK-02/Aichatbot_App",
  },
];

export const CATEGORIES = ["All", "Full Stack", "Frontend", "AI"];
