export const student = {
  fullName: "Teta Erssie",
  registrationNumber: "2528255",
  appName: "TetaPortfolio",
  initials: "TE",
  location: "Musanze, Rwanda",
  institution: "INES-Ruhengeri",
  programme: "BSc Software Engineering",
  githubUrl: "https://github.com/tetaerssie90-svg",
  linkedinUrl: "https://www.linkedin.com/in/teta-erssie-0811533b7",
} as const;

export const regDigits = student.registrationNumber.replace(/\D/g, "");

export const verificationCode = `MOB-A2-${regDigits.slice(-4)}`;

export const introSentence = `My name is ${student.fullName}.`;
