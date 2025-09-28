import React, { createContext, useContext, useMemo, useState } from "react";
import { COLORS as LCOLORS } from "./tokens";
const ThemeContext = createContext({
  colors: LCOLORS,
  mode: "light",
  setMode: () => {},
});
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const colors = useMemo(() => {
    if (mode === "light") return LCOLORS;
    return {
      ...LCOLORS,
      bg: "#0B1220",
      card: "#0F172A",
      text: "#F8FAFC",
      textMuted: "#CBD5E1",
      border: "#1F2937",
    };
  }, [mode]);
  const value = useMemo(() => ({ colors, mode, setMode }), [colors, mode]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
