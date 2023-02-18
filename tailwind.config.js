/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ee4266',
        blue: '#007bff',
        darkBlue100: '#0069d9',
        darkBlue200: '#0062cc',
        gray: '#6c757d',
        darkGray100: '#5a6268',
        darkGray200: '#545b62',
      },
      keyframes: {
        headerMenuFadeIn: {
          from: {
            transform: 'translateY(15px)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        imageScale: {
          from: {
            transform: 'scale(0.8)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        headerMenuFadeIn: 'headerMenuFadeIn 0.2s linear',
        image: 'imageScale 0.9s ease',
      },
    },
    screens: {
      xsm: '440px',
      // => @media (min-width: 440px) { ... }
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 992px) { ... }

      xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }
    },
  },
  plugins: [],
};
