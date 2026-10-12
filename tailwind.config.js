/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./global.css"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        lavender: { 100: "#EDE5FD", 400: "#A27CF2", 600: "#7C4DDB", 700: "#6237B8" },
        teal: { 100: "#DDF4F5", 400: "#7FD0D3", 700: "#1F6E73" },
        pink: { 100: "#FCE4EF", 400: "#F29BC0", 600: "#C24A80" },
        periwinkle: { 100: "#E6E9FD", 400: "#A5AEF5", 600: "#5560C9" },
        ink: { 300: "#A9AECB", 500: "#6B7194", 700: "#454B6B", 900: "#232842" },
      },
      fontFamily: {
        sans: ["PlusJakartaSans_400Regular"],
        body: ["PlusJakartaSans_400Regular"],
        "body-medium": ["PlusJakartaSans_500Medium"],
        "body-semibold": ["PlusJakartaSans_600SemiBold"],
        "body-bold": ["PlusJakartaSans_700Bold"],
        title: ["PlusJakartaSans_800ExtraBold"],
      },
    },
  },
  plugins: [],
};
