export const COLORS = {
  primary: "#039609",
};

const THEME = {
  dark: {
    colors: {
      white: "#fff",
      ...COLORS,
    },
  },
  light: {
    colors: {
      white: "#000",
      ...COLORS,
    },
  },
};

export type THEME_KEY = keyof typeof THEME;


export default THEME