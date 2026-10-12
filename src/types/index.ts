export type Availability = "open" | "internship" | "busy";

export type EditableProfile = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: Availability;
  /** Local file URI inside the app's document directory, or null for the avatar */
  imageUri: string | null;
};

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type Skill = {
  id: string;
  name: string;
  level: SkillLevel;
  evidence: string;
};

export type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  place: string;
  detail: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  contribution: string[];
  technologies: string[];
  outcome: string;
  /** Optional online link — labelled as needing a connection in the UI */
  link?: string;
};

export type ProfileErrors = Partial<Record<keyof EditableProfile, string>>;
