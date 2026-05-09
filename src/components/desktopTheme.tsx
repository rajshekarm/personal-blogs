import { createContext, useContext } from "react"

export type DesktopTheme = "light" | "dark"

export type DesktopThemeContextValue = {
  theme: DesktopTheme
  isDark: boolean
}

const DesktopThemeContext = createContext<DesktopThemeContextValue | null>(null)

export const DesktopThemeProvider = DesktopThemeContext.Provider

export const useDesktopTheme = () => {
  const context = useContext(DesktopThemeContext)

  if (!context) {
    return { theme: "light" as DesktopTheme, isDark: false }
  }

  return context
}
