import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
    ],
    theme: {
      extend: {
        backgroundImage: {
        'soft-gradient': 'linear-gradient(90deg, #f9fafb 0%, #e0e7ff 50%, #f9fafb 100%)',
      },
      },
    },
    plugins: [
      flowbitePlugin,
    ],
    
  };