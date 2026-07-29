const THEME_KEY = 'ng-theme'
const ACCENT_KEY = 'ng-accent'

export const ACCENTS = [
  { id: 'teal', label: 'Teal', hex: '#00b294' },
  { id: 'azure', label: 'Azure', hex: '#0078d4' },
  { id: 'magenta', label: 'Magenta', hex: '#e3008c' },
  { id: 'amber', label: 'Amber', hex: '#e88c00' },
  { id: 'violet', label: 'Violet', hex: '#8764b8' },
  { id: 'lime', label: 'Lime', hex: '#7cbb00' },
]

export const themeState = $state({ theme: 'dark', accent: 'teal' })

function apply() {
  const el = document.documentElement
  el.setAttribute('data-theme', themeState.theme)
  el.setAttribute('data-accent', themeState.accent)
}

export function toggleTheme() {
  themeState.theme = themeState.theme === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem(THEME_KEY, themeState.theme)
  } catch {}
  apply()
}

export function setAccent(id) {
  themeState.accent = id
  try {
    localStorage.setItem(ACCENT_KEY, id)
  } catch {}
  apply()
}

export function initTheme() {
  try {
    themeState.theme = localStorage.getItem(THEME_KEY) || 'dark'
    themeState.accent = localStorage.getItem(ACCENT_KEY) || 'teal'
  } catch {}
  apply()
}
