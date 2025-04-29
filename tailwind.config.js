/** @type {import('tailwindcss').Config} */

export default {

    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      
    ],
    darkMode: 'class',
    theme: {
      container: {
          center: true,
      },
      extend: {
          animation: {
              fadeInUp: 'fadeInUp 0.5s ease-out',
            },
            keyframes: {
              fadeInUp: {
                '0%': { opacity: '0', transform: 'translateY(20px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
            },
          colors: {
              primary: {
                  DEFAULT: '#f97316',
                  light: '#eaf1ff',
                  'dark-light': 'rgba(67,97,238,.15)',
              },
              secondary: {
                  DEFAULT: '#9a3412',
                  light: '#ebe4f7',
                  'dark-light': 'rgb(128 93 202 / 15%)',
              },
              success: {
                  DEFAULT: '#00ab55',
                  light: '#ddf5f0',
                  'dark-light': 'rgba(0,171,85,.15)',
              },
              danger: {
                  DEFAULT: '#e7515a',
                  light: '#fff5f5',
                  'dark-light': 'rgba(231,81,90,.15)',
              },
              warning: {
                  DEFAULT: '#e2a03f',
                  light: '#fff9ed',
                  'dark-light': 'rgba(226,160,63,.15)',
              },
              info: {
                  DEFAULT: '#2196f3',
                  light: '#e7f7ff',
                  'dark-light': 'rgba(33,150,243,.15)',
              },
              dark: {
                  DEFAULT: '#0f172a',
                  light: '#f8fafc',
                  'dark-light': 'rgba(59,63,92,.15)',
              },
              black: {
                  DEFAULT: '#0e1726',
                  light: '#e3e4eb',
                  'dark-light': 'rgba(14,23,38,.15)',
              },
              white: {
                  DEFAULT: '#ffffff',
                  light: '#e0e6ed',
                  dark: '#888ea8',
              },
          },
          spacing: {
              4.5: '18px',
          },
          boxShadow: {
              '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
          },
      },
  },
  plugins: [
   
  ],
  }
  
  