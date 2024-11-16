module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        NunitoBold: ["Nunito-Bold", "sans-serif"],
        NunitoExtraBold: ["Nunito-ExtraBold", "sans-serif"],
        NunitoExtraLight: ["Nunito-ExtraLight", "sans-serif"],
        NunitoLight: ["Nunito-Light", "sans-serif"],
        NunitoMedium: ["Nunito-Medium", "sans-serif"],
        NunitoSemiBold: ["Nunito-SemiBold", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary-default)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary-default)",
          light: "var(--color-secondary-light)",
        },
        tertiary: {
          DEFAULT: "var(--color-tertiary-default)",
          light: "var(--color-tertiary-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent-default)",
          light: "var(--color-accent-light)",
        },
        grey: {
          DEFAULT: "var(--color-grey-default)",
        },
        slate: {
          DEFAULT: "var(--color-slate-default)",
        },
        dark: {
          DEFAULT: "var(--color-dark-default)",
        },
        light: {
          DEFAULT: "var(--color-light-default)",
        },
        lightsec: {
          DEFAULT: "var(--color-light-sec-default)",
        },
        overlay: "var(--color-overlay)",
        overlay2: "var(--color-overlay2)",
        overlayinv: "var(--color-overlay-inv)",
        overlaydark: "var(--color-overlay-dark)",
        overlaylight: "var(--color-overlay-light)",
        textmain: {
          DEFAULT: "var(--color-text-main)",
        },
        textsecondary: {
          DEFAULT: "var(--color-text-secondary)",
        },
        textmedium: {
          DEFAULT: "var(--color-text-med)",
        },
        inputbg: {
          DEFAULT: "var(--color-input-bg)",
        },
      },
    },
  },
  plugins: [],
};
