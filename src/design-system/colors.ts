/** Pastel teal → lavender → pink, frosted white surfaces and deep ink text */

export const palette = {
  lavender: { 50: "#F5F0FF", 100: "#EDE5FD", 200: "#D9C9FB", 400: "#A27CF2", 500: "#8B5CF0", 600: "#7C4DDB", 700: "#6237B8" },
  teal: { 100: "#DDF4F5", 300: "#9EDDE0", 400: "#7FD0D3", 600: "#2F8C91", 700: "#1F6E73" },
  pink: { 100: "#FCE4EF", 300: "#F7B5D2", 400: "#F29BC0", 600: "#C24A80" },
  periwinkle: { 100: "#E6E9FD", 300: "#BDC4F8", 400: "#A5AEF5", 600: "#5560C9" },
  ink: { 900: "#232842", 700: "#454B6B", 500: "#6B7194", 300: "#A9AECB" },
} as const;

/** Body text colours keep at least 4.5:1 contrast on `surface`. */
export const colors = {
  gradient: ["#A9E7EA", "#BFB8F3", "#F6C7E5"] as const,
  surface: "rgba(255,255,255,0.86)",
  surfaceSolid: "#FFFFFF",
  surfaceSoft: "rgba(255,255,255,0.55)",
  surfaceBorder: "rgba(255,255,255,0.95)",
  dots: "#B3B0D6",
  dotsStrong: palette.lavender[400],
  primary: palette.lavender[600],
  primaryGradient: [palette.lavender[400], palette.lavender[600]] as const,
  primarySoft: palette.lavender[100],
  onPrimary: "#FFFFFF",
  text: palette.ink[900],
  textSecondary: palette.ink[700],
  textMuted: palette.ink[500],
  accentText: palette.lavender[700],
  success: "#1E7A4E",
  successSoft: "#E1F5EA",
  warning: "#8A5A00",
  warningSoft: "#FFF2D6",
  error: "#B42318",
  errorSoft: "#FDEBEA",
} as const;

/** Rotating tile / card accents taken from the reference design */
export const accents = [
  { name: "pink", bg: palette.pink[400], soft: palette.pink[100], text: palette.pink[600] },
  { name: "teal", bg: palette.teal[400], soft: palette.teal[100], text: palette.teal[700] },
  { name: "periwinkle", bg: palette.periwinkle[400], soft: palette.periwinkle[100], text: palette.periwinkle[600] },
  { name: "lavender", bg: palette.lavender[400], soft: palette.lavender[100], text: palette.lavender[700] },
] as const;

export type Accent = (typeof accents)[number];

export function accentAt(index: number): Accent {
  return accents[index % accents.length];
}

export type AppColors = typeof colors;
