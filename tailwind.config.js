/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        keyframes: {
            slideFromBottom: {
              '0%': { transform: 'translate3d(0, 100%, 0)' },
              '100%': { transform: 'translate3d(0, 1%, 0)' },
            },
            backgroundFadeIn: {
                '0%': { backgroundColor: '0' },
                '100%': { opacity: '1' },
              }
          },
      animation: {
        slideFromBottom: "slideFromBottom 0.5s cubic-bezier(0.32,0.72,0,1)",
        backgroundFadeIn: "fadeIn "
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.32,0.72,0,1)',
      }
    },
  },
  plugins: [],
};
