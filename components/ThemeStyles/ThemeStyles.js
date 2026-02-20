import appConfig from '../../app.config';

import { getThemeVariables } from './utils';

export default function ThemeStyles() {
  const themeColor = appConfig?.themeColor ?? 'blue';
  const theme = getThemeVariables(themeColor);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <style jsx global>{`
      :root {
        --color-black: ${theme['--color-black']};
        --color-primary: ${theme['--color-primary']};
        --color-secondary: ${theme['--color-secondary']};
        --color-tertiary: ${theme['--color-tertiary']};
        --color-white: ${theme['--color-white']};
      }
    `}</style>
  );
}
