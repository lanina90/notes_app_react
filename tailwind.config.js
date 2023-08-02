/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-grey': '#8e9094',
      },
      backgroundImage: {
        'unarchive': "url('/public/images/unarchive_icon.svg')",
        'archive-white': "url('/public/images/archived_white.svg')",
        'remove-white': "url('/public/images/remove_white.svg')",
        'edit': "url('assets/images/edit_icon.svg')",
        'archive': "url('assets/images/archive_dark.svg')",
        'remove': "url('assets/images/remove_dark.svg')",

      }
    },
  },
  plugins: [],
}

