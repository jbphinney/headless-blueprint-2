export const themes = {
  blue: {
    '--color-black': '#000',
    '--color-primary': '#000066',
    '--color-secondary': '#0969da',
    '--color-tertiary': '#CCCCCC',
    '--color-white': '#FFFFFF',
  },
  red: {
    '--color-black': '#000',
    '--color-primary': '#660000',
    '--color-secondary': '#B50505',
    '--color-tertiary': '#CCCCCC',
    '--color-white': '#FFFFFF',
  },
  green: {
    '--color-black': '#000',
    '--color-primary': '#006600',
    '--color-secondary': '#006827',
    '--color-tertiary': '#CCCCCC',
    '--color-white': '#FFFFFF',
  },
};

export function getThemeVariables(themeColor) {
  if (themeColor && themes[themeColor]) {
    return themes[themeColor];
  }
  return themes.blue;
}
