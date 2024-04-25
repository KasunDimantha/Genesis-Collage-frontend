/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'h29': '29px',
        'h100' : '100vh',
        'h25' : '25px',
        'h500': '500px',
        'h500': '500px',
        'h0': '0px',
      },
      width: {
        'w250': '250px',
        'w450': '450px',
        'w29': '29px',
        'w100%' : '100%',
        'w90%' : '90%',
      },
      margin: {
        'top': '510px',
      }
    },
  },
  plugins: [ ],
}

