import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

type ThemeToggleProps = {
  className?: string
  bordered?: boolean
}

export function ThemeToggle({ className, bordered = true }: ThemeToggleProps) {
  const { mode, toggleTheme } = useTheme()

  const base = "ml-2 inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:bg-muted/40 transition-colors"
  const borderClass = bordered ? "border border-input" : "border-0"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`${base} ${borderClass} ${className ?? ""}`.trim()}
    >
      {mode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

export default ThemeToggle
