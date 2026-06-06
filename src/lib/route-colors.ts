export const LS_ROUTE_COLORS = "fcalendar_route_colors"

export const DEFAULT_ROUTE_COLORS = [
  "#0f172a", // slate-900 (deep neutral)
  "#6b21a8", // violet-700 (rich)
  "#0ea5a4", // teal-500 (calm)
  "#059669", // emerald-600 (balanced)
  "#ef4444", // red-500 (accent)
  "#d97706", // amber-600 (warm)
]

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

function isValidHexColor(s: unknown): s is string {
  return typeof s === "string" && s.trim() !== "" && HEX_RE.test(s.trim())
}

export function getRouteColorPalette(): string[] {
  try {
    const v = localStorage.getItem(LS_ROUTE_COLORS)
    if (v) {
      const parsed = JSON.parse(v)
      if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(isValidHexColor)) {
        return parsed
      }
    }
  } catch {
    // Ignore invalid stored values and fall back to defaults.
  }
  return DEFAULT_ROUTE_COLORS
}
