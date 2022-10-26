import { createTheme } from "@mui/material";

export const colors = {
  typographyBlack: "#0d0d0d",
  typographyWhite: "#ffffff",
  typographyGray: "#999999",

  primary: "#045AFF",
  primaryLight: "#2E7DAF",
  primaryDark: "#013598",
  secondary: "#E0F7FA",
  secondaryLight: "#E1BEE7",
  warning: "#ef4444",
  warningDark: "#b30f0f",
  backgroundLightGray: "#fafafa",
};

// Create a theme instance.
export const theme = createTheme({
  // set font
  // fontWeight is set to regular, so variant is to set size only, set the weight when using it
  typography: {
    fontFamily: "Poppins",
    h1: {
      color: colors.typographyBlack,
      fontSize: "4.5rem",
      lineHeight: 1.6,
      fontWeight: 400,
      "@media (max-width:1000px)": {
        fontSize: "3.5rem",
      },
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      color: colors.typographyBlack,
      fontSize: "3rem",
      lineHeight: 1.6,
      fontWeight: 400,
      "@media (max-width:1000px)": {
        fontSize: "2.5rem",
      },
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      color: colors.typographyBlack,
      fontSize: "2em",
      lineHeight: 1.6,
      fontWeight: 400,
      "@media (max-width:1000px)": {
        fontSize: "1.75rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h4: {
      color: colors.typographyBlack,
      fontSize: "1.5rem",
      lineHeight: 1.6,
      fontWeight: 400,
      "@media (max-width:1000px)": {
        fontSize: "1.35rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      color: colors.typographyBlack,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      fontWeight: 400,
      "@media (max-width:1000px)": {
        fontSize: "1.15rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    h6: {
      color: colors.typographyBlack,
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400,
      "@media (max-width:1000px)": {
        fontSize: "0.9rem",
      },
      "@media (max-width:600px)": {
        fontSize: "0.85rem",
      },
    },
    subtitle1: {
      color: colors.typographyBlack,
      fontSize: "0.875rem",
      lineHeight: 1.6,
      fontWeight: 400,
      "@media (max-width:1000px)": {
        fontSize: "0.75rem",
      },
      "@media (max-width:600px)": {
        fontSize: "0.7rem",
      },
    },
  },

  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    text: {
      primary: colors.typographyBlack,
      secondary: colors.typographyGray,
    },
  },
});
