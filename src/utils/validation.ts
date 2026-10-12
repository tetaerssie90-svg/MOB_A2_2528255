import type { EditableProfile, ProfileErrors } from "../types";

export const limits = {
  headlineMin: 10,
  headlineMax: 80,
  bioMin: 40,
  bioMax: 300,
  skillMin: 2,
  skillMax: 40,
} as const;

const urlOrEmail = /(https?:\/\/|www\.|\S+@\S+\.\S+)/i;
const onlyLettersAndSkillSymbols = /^[\p{L}\p{N} .+#\-/&]+$/u;

export function validateProfile(profile: EditableProfile): ProfileErrors {
  const errors: ProfileErrors = {};
  const headline = profile.headline.trim();
  const bio = profile.bio.trim();
  const skill = profile.primarySkill.trim();

  if (!headline) {
    errors.headline = "Headline is required.";
  } else if (headline.length < limits.headlineMin) {
    errors.headline = `Headline must be at least ${limits.headlineMin} characters.`;
  } else if (headline.length > limits.headlineMax) {
    errors.headline = `Headline must be ${limits.headlineMax} characters or fewer.`;
  }

  if (!bio) {
    errors.bio = "Short biography is required.";
  } else if (bio.length < limits.bioMin) {
    errors.bio = `Biography needs at least ${limits.bioMin} characters (${bio.length} so far).`;
  } else if (bio.length > limits.bioMax) {
    errors.bio = `Biography must be ${limits.bioMax} characters or fewer.`;
  } else if (urlOrEmail.test(bio)) {
    errors.bio = "Keep links and email addresses out of the biography — they belong on the About screen.";
  }

  if (!skill) {
    errors.primarySkill = "Primary skill is required.";
  } else if (skill.length < limits.skillMin || skill.length > limits.skillMax) {
    errors.primarySkill = `Primary skill must be ${limits.skillMin}–${limits.skillMax} characters.`;
  } else if (!onlyLettersAndSkillSymbols.test(skill)) {
    errors.primarySkill = "Use letters, numbers and + # . - / & only (e.g. C#, Node.js).";
  }

  if (!profile.availability) {
    errors.availability = "Choose your availability status.";
  }

  return errors;
}

export function hasErrors(errors: ProfileErrors): boolean {
  return Object.values(errors).some(Boolean);
}
