// Personal Data Structure for Ojas Shinde Portfolio
// This file contains all the personal information extracted from the resume
// TODO: Fill in the actual data from "Ojas Shinde Resume.pdf"

export const personalInfo = {
    name: "Ojas Shinde", // Full name
    initials: "OS", // Initials for header logo
    tagline: "Data Analytics & Full Stack Developer", // Professional tagline/title
    description: "MCA graduate with expertise in data analytics, machine learning, and full-stack development. Passionate about building scalable solutions and extracting insights from complex data to drive business decisions.", // Professional summary (2-3 sentences)
    email: "ojasshinde85@gmail.com", // Email address
    phone: "+91-6362475600", // Phone number
    location: "Bangalore, Karnataka", // Location
    resumeFile: "/Ojas Shinde Resume.pdf" // Resume file path
};

export const socialLinks = {
    github: "https://github.com/ojas0720", // GitHub profile URL
    linkedin: "http://www.linkedin.com/in/ojasshinde", // LinkedIn profile URL
    leetcode: null, // LeetCode profile URL (not provided)
    instagram: "https://www.instagram.com/_os_0702_?igsh=d2p1d3g3ZXU2ZXZm" // Instagram profile URL
};

export const projects = [
    {
        title: "AI-Powered Document Assistant (RAG)",
        description: "Developed a Generative AI application using LangChain and OpenAI to enable natural language querying of unstructured PDF data. Containerized with Docker and deployed on AWS EC2 for scalable access.",
        tech: ["Python", "LangChain", "Docker", "AWS EC2", "Git", "OpenAI", "Streamlit"],
        image: "/images/rag-assistant-preview.png",
        liveLink: null,
        githubLink: "https://github.com/ojas0720/ai-document-assistant",
        highlights: [
            "Natural language querying of PDF documents",
            "Containerized deployment with Docker",
            "AWS EC2 scalable hosting",
            "40% reduction in manual lookup time"
        ]
    },
    {
        title: "Customer Churn Prediction with Explainable AI",
        description: "Built a Machine Learning model using XGBoost to predict customer attrition with 88% recall on high-risk accounts. Features a Streamlit dashboard for visualizing retention metrics.",
        tech: ["Python", "Scikit-Learn", "XGBoost", "Streamlit", "Pandas", "Git"],
        image: "/images/churn-prediction-preview.png",
        liveLink: null,
        githubLink: "https://github.com/ojas0720/customer-churn-prediction",
        highlights: [
            "88% recall on high-risk customer accounts",
            "Interactive Streamlit dashboard",
            "Automated data preprocessing pipelines",
            "Explainable AI for model interpretability"
        ]
    },
    {
        title: "Interactive Language Learning SaaS",
        description: "Architected a scalable language learning platform with Next.js 14, PostgreSQL, and Google Cloud TTS. Features user progress tracking, AI-driven features, and Stripe payment integration.",
        tech: ["Next.js 14", "PostgreSQL", "Google Cloud TTS", "Docker", "Clerk Auth", "Stripe API", "Drizzle ORM"],
        image: "/images/language-learning-preview.png",
        liveLink: null,
        githubLink: "https://github.com/ojas0720/language-learning-saas",
        highlights: [
            "Scalable database schema with Neon PostgreSQL",
            "Google Cloud Text-to-Speech integration",
            "Analytics-driven Admin Dashboard",
            "Production-grade Stripe payment system"
        ]
    },
    {
        title: "Voice-Based Messaging System for Visually Impaired",
        description: "Engineered an accessible communication platform using Python and PostgreSQL with real-time Speech Recognition and Text-to-Speech pipelines for automated email dispatching.",
        tech: ["Python", "PostgreSQL", "Speech APIs", "WCAG Standards", "Neon Cloud"],
        image: "/images/voice-messaging-preview.png",
        liveLink: null,
        githubLink: "https://github.com/ojas0720/voice-messaging-system",
        highlights: [
            "WCAG-compliant accessibility standards",
            "Real-time speech recognition and TTS",
            "Secure user session management",
            "Low-latency audio processing"
        ]
    },
    {
        title: "CityLife Insurance Dashboard Project",
        description: "Designed comprehensive Business Intelligence architecture with Power BI featuring 360-degree analysis dashboards for insurance operations and customer acquisition metrics.",
        tech: ["Power BI", "DAX", "Excel", "Data Modeling", "Business Intelligence"],
        image: "/images/insurance-dashboard-preview.png",
        liveLink: null,
        githubLink: null,
        highlights: [
            "360-degree business analysis dashboards",
            "Automated anomaly detection system",
            "Interactive sales performance analytics",
            "Executive-level KPI reporting"
        ]
    }
];

export const skills = {
    frontend: [
        "Next.js 14",
        "React",
        "JavaScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3"
    ],
    backend: [
        "Python",
        "Flask",
        "Java",
        "SQL",
        "Bash (Shell Scripting)",
        "C++"
    ],
    database: [
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Apache Spark (PySpark)",
        "Apache Kafka",
        "Hadoop"
    ],
    devopsAndTools: [
        "AWS (EC2, S3)",
        "Docker",
        "Git",
        "Google Cloud (TTS)",
        "Clerk Auth",
        "Stripe API"
    ],
    dataAnalytics: [
        "Pandas",
        "NumPy",
        "Tableau",
        "Power BI",
        "Matplotlib",
        "Seaborn",
        "Jupyter Notebooks",
        "Apache Zeppelin"
    ],
    machineLearning: [
        "Scikit-learn",
        "TensorFlow",
        "PyTorch",
        "OpenCV",
        "XGBoost",
        "LangChain"
    ]
};

export const education = [
    {
        institution: "Visvesvaraya Technological University",
        degree: "Master of Computer Applications (MCA)",
        field: "Computer Applications",
        graduationDate: "2025",
        gpa: "9.02/10.0",
        honors: null,
        location: "Belagavi, Karnataka"
    },
    {
        institution: "Govindram Seksaria Science Degree College",
        degree: "Bachelor of Computer Applications (BCA)",
        field: "Computer Applications",
        graduationDate: "2023",
        gpa: "7.81/10.0",
        honors: null,
        location: "Belagavi, Karnataka"
    }
];

export const workExperience = [
    {
        company: "Leosias Technologies",
        position: "Data Analytics Intern",
        duration: "Nov 2024 – Apr 2025",
        location: "Belagavi",
        responsibilities: [
            "Engineered data pipelines and ETL workflows using Python (Pandas, NumPy) and SQL",
            "Developed interactive Power BI/Tableau dashboards, improving decision-making efficiency",
            "Implemented advanced data processing and analytics solutions"
        ]
    },
    {
        company: "MedTourEasy",
        position: "Data Analytics Trainee",
        duration: "Sept 2024 – Oct 2024",
        location: "Remote",
        responsibilities: [
            "Executed real-world analytics projects focusing on predictive modeling and chemical component analysis",
            "Applied advanced data wrangling and visualization techniques to solve complex data problems",
            "Developed analytical solutions for healthcare industry challenges"
        ]
    }
];

export const achievements = [
    "Google Data Analytics Professional Certificate - Coursera, 2025",
    "AWS Solutions Architecture Job Simulation - Forage, 2025",
    "Tata GenAI Powered Data Analytics Job Simulation - Forage, 2025",
    "Deloitte Data Analytics Virtual Job Simulation - Forage, 2025",
    "Deloitte Technology Consulting Virtual Job Simulation - Forage, 2025",
    "Internshala Web Development Training - 2024",
    "MCA with 9.02/10.0 CGPA from Visvesvaraya Technological University"
];

export const certifications = [
    {
        name: "Google Data Analytics Professional Certificate",
        issuer: "Coursera",
        date: "2025",
        credentialId: null
    },
    {
        name: "AWS - Solutions Architecture Job Simulation",
        issuer: "Forage",
        date: "2025",
        credentialId: null
    },
    {
        name: "Tata - GenAI Powered Data Analytics Job Simulation",
        issuer: "Forage",
        date: "2025",
        credentialId: null
    },
    {
        name: "Deloitte Data Analytics Virtual Job Simulation",
        issuer: "Forage",
        date: "2025",
        credentialId: null
    },
    {
        name: "Deloitte Technology Consulting Virtual Job Simulation",
        issuer: "Forage",
        date: "2025",
        credentialId: null
    },
    {
        name: "Internshala Web Development Training",
        issuer: "Internshala",
        date: "2024",
        credentialId: null
    }
];

// EmailJS Configuration
export const emailConfig = {
    recipientEmail: "ojasshinde85@gmail.com", // Updated with actual email
    userLogin: "ojasshinde" // Updated username
};