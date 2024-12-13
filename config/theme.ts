export const COLORS = {
  primary: "#039609",
};

export const TYPOGRAPHY = {
  lg: 20,
  sm: 14,
  md: 16,
  title: 25,
  big: 33,
};

const THEME = {
  dark: {
    colors: {
      white: "#fff",
      black: "#000",
      ...COLORS,
    },
  },
  light: {
    colors: {
      white: "#000",
      black: "#fff",
      ...COLORS,
    },
  },
};

export type THEME_KEY = keyof typeof THEME;

export default THEME;
