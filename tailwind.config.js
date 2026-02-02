/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        wsu: {
          // Primary
          crimson: '#A60F2D',
          gray: '#4D4D4D',

          // Secondary
          red: '#CA1237',
          black: '#000000',
          white: '#FFFFFF',

          // Accents (flattened under wsu for theme() resolution)
          autumn: '#FF6727',
          goldfinch: '#F3E700',
          vineyard: '#AADC24',
          pacificSky: '#5BC3F5',
          midnight: '#002D61'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
      }
    }
  }
}
