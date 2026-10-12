import type { EditableProfile, Project, Skill, TimelineEntry } from "../types";



export const defaultProfile: EditableProfile = {
  headline: "Software Engineering student building mobile apps",
  bio:
    "I enjoy turning everyday problems in my community into simple, reliable apps. " +
    "I am currently focused on React Native and TypeScript.",
  primarySkill: "React Native",
  availability: "internship",
  imageUri: null,
};


export const skills: Skill[] = [
  {
    id: "react-native",
    name: "React Native & Expo",
    level: "Intermediate",
    evidence:
      "Built this portfolio app and the class exercises from Days 1 to 10.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: "Intermediate",
    evidence:
      "Typed components, navigation params and stored data in this app.",
  },
  {
    id: "ui-design",
    name: "UI / UX design",
    level: "Beginner",
    evidence:
      "Designed the wireframes and accessibility decisions in the UI/UX PDF.",
  },
  {
    id: "git",
    name: "Git & GitHub",
    level: "Intermediate",
    evidence: "Version control with meaningful commits and tagged releases.",
  },
  {
    id: "databases",
    name: "Databases (SQL)",
    level: "Intermediate",
    evidence:
      "Used SQL and PostgreSQL for database design, management, and querying.",
  },

  {
    id: "javascript",
    name: "JavaScript",
    level: "Intermediate",
    evidence:
      "Used JavaScript to build interactive web applications and dynamic user interfaces.",
  },

  {
    id: "react",
    name: "React",
    level: "Intermediate",
    evidence:
      "Built reusable components and interactive user interfaces using React and hooks.",
  },
];


export const education: TimelineEntry[] = [
  {
    id: "ines",
    period: "2024 – present",
    title: "BSc Software Engineering",
    place: "INES-Ruhengeri",
    detail:
      "BSc in Software Engineering focusing on web development, databases, software design, and mobile application development.",
  },
  {
    id: "KDA",
    period: "2017 – 2023",
    title: "Advanced level certificate",
    place: "King David Academy",
    detail:
      "Completed Advanced Level studies in Mathematics, Chemistry, and Biology.",
  },
  {
    id: "training",
    period: "2025",
    title: "AI and Machine learning",
    place: "CMU",
    detail:
      "Learned AI and machine learning fundamentals, data analysis, and intelligent systems.",
  },
];


export const projects: Project[] = [
  {
    id: "portfolio-app",
    title: "TetaPortfolio mobile app",
    summary:
      "A responsive offline mobile portfolio showcasing my professional profile, technical skills, education, and projects in one accessible application.",
    problem:
      "Recruiters rarely have time for a paper CV. I needed a fast, offline way to introduce " +
      "myself and show what I can build during a two-minute meeting.",
    contribution: [
      "Designed the UI/UX flow and wireframes",
      "Built tab and stack navigation with Expo Router",
      "Implemented the validated profile editor with AsyncStorage persistence",
      "Added camera and gallery profile photo handling",
      "Packaged and tested the Android APK with EAS Build",
    ],
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "AsyncStorage",
      "EAS Build",
    ],
    outcome: "An installable APK that works in Airplane Mode.",
  },
  {
    id: "milk-check",
    title: "MilkCheck mobile app",
    summary:
      "A mobile application designed to help users monitor milk quality and access reliable milk-related information.",
    problem:
      "People buying milk often have no simple way to judge whether it is still safe before they use it.",
    contribution: [
      "Designed the app structure and user interface.",
      "Implemented core features to support milk quality monitoring.",
    ],
    technologies: ["React Native", "Python"],
    outcome:
      "Strengthened mobile app development problem-solving and user-centered design skills.",
    link: "https://github.com/tetaerssie90-svg",
  },
];
