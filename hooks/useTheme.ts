import { useContext } from "react";

import { ThemeContext } from "@/providers/ThemeProvider";

const useTheme = () => {
  const con = useContext(ThemeContext);
  if (!con)
    throw new Error("useTheme must only be used inside ThemeContextProvider");
  return con;
};

export default useTheme;
