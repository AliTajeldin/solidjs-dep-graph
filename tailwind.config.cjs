const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // app theme colors
        "primary" : colors.indigo[300],
        "secondary" : colors.black,
        "primary-bg" : colors.slate[800],
        "secondary-bg" : colors.blue[800],

        "graph-1" : "#F4E0D5",
        "graph-2" : "#CCB8C1",
        "graph-3" : "#8D9FC6",
        "graph-4" : "#E1C5DC",

        // pallete from https://www.schemecolor.com/beached-tones-design.php
        "champagnep-pink" : "#F4E0D5",
        "pale-silver" : "#CCB8C1",
        "ceil" : "#8D9FC6",
        "deep-koamaru" : "#2E3B65",
        "queen-pink" : "#E1C5DC",
      }
    }
  },
  plugins: []
};
