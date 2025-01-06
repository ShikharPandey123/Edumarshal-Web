/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1440px',  
        'xml': '1310px',  
        'lg': '1024px',    
        'md': '769px',
        'sm': '400px',
        'xmd':'900px'
      },
      colors:{
        'bg-color': '#F2F6FF',
        'CTA' : '#004BB8'
      }
    },
  },
  plugins: [],
}

