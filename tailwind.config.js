import defaultThemes from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx}']
export const theme = {
  screens: {
    ...defaultThemes.screens,
  },
  extend: {},
}
export const plugins = [
  require('@tailwindcss/typography'),
  require('@tailwindcss/line-clamp'),
]
