/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const colors = {
  // system
  primary: '#35A7FF',
  secondary: '#FF645A',

  primaryHover: '#9774F9',
  secondaryHover: '#FF938C',
  success: '#14C57A',
  error: '#FF3434',

  // primary color variation
  primaryD1: '#402294',
  primaryD2: '#562EC6',
  primaryL1: '#7A4DF8',
  primaryL2: '#9774F9',
  primaryL3: '#B59CFB',
  primaryL4: '#DDD1FF',
  primaryL5: '#F4F0FF',
  primaryL6: '#F7F4FF',

  // secondary color variation
  secondaryD1: '#993C36',
  secondaryD2: '#CC5048',
  secondaryL1: '#FF746B',
  secondaryL2: '#FF938C',
  secondaryL3: '#FFB2AD',
  secondaryL4: '#FFD8D6',
  secondaryL5: '#FFE1DF',
  secondaryL6: '#FFF1F0',

  // other colors
  green: '#21D272',
  gold: '#F9AB2D',

  // dark shades
  black: '#000',
  gray1: '#626262',
  gray2: '#7B7B7B',
  gray3: '#858585',
  gray4: '#B0B7C3',

  // light shades
  white: '#fff',
  lightGray: '#F1F1F1',
  lightGray1: '#CFD9E2',
  lightGray2: '#F3F3F3',
  lightGray3: '#F9F9F9',
  lightGray4: '#FAFBFC',
  lightGray5: '#FBFBFB',

  sidebarTopBg: '#FBE9EE',
  sidebarBottomBg: '#DECCFF',
  collapseBg: '#FAF8FF',

  // ------------------ below is for dark theme
  // black shades
  black2: '#191A1D',
  black3: '#1D1F22',
  black4: '#272A30',
  black5: '#30353E',
  black6: '#3A404A',

  gray: {
    100: '#f7fafc',
    200: '#edf2f7',
    300: '#e2e8f0',
    400: '#cbd5e0',
    500: '#a0aec0',
    600: '#718096',
    700: '#4a5568',
    800: '#2d3748',
    900: '#1a202c',
  },
  blue: {
    100: '#ebf8ff',
    200: '#bee3f8',
    300: '#90cdf4',
    400: '#63b3ed',
    500: '#4299e1',
    600: '#3182ce',
    700: '#2b6cb0',
    800: '#2c5282',
    900: '#2a4365',
  },
};

module.exports = {
  // prefix: 'y',
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        DEFAULT: '1200px',
        sm: '1200px',
        lg: '1200px',
        xl: '1200px',
        '2xl': '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      spacing: {
        'navigation-height': 'var(--navigation-height)',
      },
      minHeight: {
        screen: '100vh',
      },
      minWidth: {
        screen: '100vw',
      },
      screens: {
        mobile: { max: '767px' },
        '3xl': '1440px',
        '4xl': '1920px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        ...colors,
      },
      borderRadius: {
        box: '20px',
      },
      backgroundImage: () => ({
        dunes: "url('https://zklink.io/fusion-dance-parade/banner.svg')",
      }),
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
        reveal: {
          '0%, 100%': {
            opacity: 0,
          },
          '10%': {
            'background-size': '0% 100%',
            opacity: 0,
          },
          '15%': {
            opacity: 1,
          },
          '30%': {
            'background-size': '200% 100%',
          },
          '90%': {
            'background-size': '200% 100%',
            opacity: 1,
          },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'none' },
        },
        'image-rotate': {
          '0%': { transform: 'rotateX(25deg)' },
          '25%': { transform: 'rotateX(25deg) scale(0.9)' },
          '60%': { transform: 'none' },
          '100%': { transform: 'none' },
        },
        'image-glow': {
          '0%': {
            opacity: 0,
            'animation-timing-function': 'cubic-bezier(0.74,0.25,0.76,1)',
          },
          '10%': {
            opacity: 1,
            'animation-timing-function': 'cubic-bezier(0.12,0.01,0.08,0.99)',
          },
          '100%': {
            opacity: 0.2,
          },
        },
        'sketch-lines': {
          '0%': { 'stroke-dashoffset': 1 },
          '50%': { 'stroke-dashoffset': 0 },
          '99%': { 'stroke-dashoffset': 0 },
          '100%': { visiblity: 'hidden' },
        },
        'glow-line-horizontal': {
          '0%': { opacity: 0, transform: 'translateX(0)' },
          '5%': { opacity: 1, transform: 'translateX(0)' },
          '90%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateX(min(60vw, 45rem))' },
        },
        'glow-line-vertical': {
          '0%': { opacity: 0, transform: 'translateY(0)' },
          '5%': { opacity: 1, transform: 'translateY(0)' },
          '90%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateY(min(21vw, 45rem))' },
        },
        zap: {
          '0%, 9%, 11%, 100% ': {
            fill: 'transparent',
          },
          '10%': {
            fill: 'white',
          },
        },
        bounce: {
          '50%': {
            transform: 'scale(0.98)',
          },
        },
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
        'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease forwards',
        'image-rotate': 'image-rotate 1400ms ease forwards',
        'image-glow': 'image-glow 4100ms 600ms ease-out forwards',
        'sketch-lines': 'sketch-lines 1200ms ease-out forwards',
        'glow-line-horizontal': 'glow-line-horizontal var(--animation-duration) ease-in forwards',
        'glow-line-vertical': 'glow-line-vertical var(--animation-duration) ease-in forwards',
        zap: 'zap 2250ms calc(var(--index) * 20ms) linear infinite',
        bounce: '240ms ease 0s 1 running bounce',
        reveal: 'reveal 8s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(({ addVariant }) => {
      addVariant('radix-side-top', '&[data-side="top"]');
      addVariant('radix-side-bottom', '&[data-side="bottom"]');
    }),
  ],
};
