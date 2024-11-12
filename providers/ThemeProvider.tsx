import { useColorScheme } from "nativewind";
import React, { createContext } from "react";
import { View } from "react-native";

import { baseThemeVars, themes } from "@/constants/color-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export type ThemeType = "light" | "dark" | undefined;
export type EnsuredThemeType = "light" | "dark";

export const ThemeContext = createContext<{
  theme: ThemeType;
  toggleColorScheme: () => void;
  setColorScheme(
    scheme: Parameters<(value: "light" | "dark" | "system") => void>[0],
  ): void;
  getVarColor: (cssvar: string) => string;
}>({
  theme: "light",
  setColorScheme: () => {},
  toggleColorScheme: () => {},
  getVarColor: () => {
    return "";
  },
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  const ensureTheme = (theme: ThemeType): EnsuredThemeType => {
    if (theme === undefined) return "light";
    return theme;
  };

  const getVarColor = (cssvar: string): string => {
    //@ts-expect-error forced var typing
    const theTheme = baseThemeVars[ensureTheme(colorScheme) as string];
    const c = theTheme[cssvar] ?? "";

    return c;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme,
        setColorScheme,
        toggleColorScheme,
        getVarColor,
      }}
    >
      <View style={themes[ensureTheme(colorScheme)]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
