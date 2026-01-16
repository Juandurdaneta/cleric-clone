/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-hover': '#1D4ED8',
        secondary: '#C7D2FE',
        'secondary-dark': '#A5B4FC',
        dark: '#111827',
        body: '#4B5563',
        muted: '#9CA3AF',
        light: '#F9FAFB',
        border: '#E5E7EB',
        'gray-primary': '#EAEAEA',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        'gt-alpina': ['"GT Alpina 2"', 'Georgia', 'serif'],
        'cleric-sans': ['"Cleric Sans"', 'system-ui', 'sans-serif'],
        body: ['"Cleric Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // H1
        'h1-mobile': ['50px', { lineHeight: '46px', letterSpacing: '-0.02em' }],
        'h1-tablet': ['69px', { lineHeight: '64px', letterSpacing: '-0.02em' }],
        'h1-desktop': ['89px', { lineHeight: '83px', letterSpacing: '-0.02em' }],
        // H2
        'h2-mobile': ['49px', { lineHeight: '41px', letterSpacing: '-0.02em' }],
        'h2-tablet': ['60px', { lineHeight: '51px', letterSpacing: '-0.02em' }],
        'h2-desktop': ['66px', { lineHeight: '55px', letterSpacing: '-0.02em' }],
        // H3
        'h3-mobile': ['40px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
        'h3-tablet': ['55px', { lineHeight: '48px', letterSpacing: '-0.01em' }],
        'h3-desktop': ['55px', { lineHeight: '48px', letterSpacing: '-0.01em' }],
        // H4
        'h4-mobile': ['32px', { lineHeight: '30px', letterSpacing: '-0.01em' }],
        'h4-tablet': ['40px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
        'h4-desktop': ['44px', { lineHeight: '38px', letterSpacing: '-0.01em' }],
        // Subtitle
        'subtitle-mobile': ['16px', { lineHeight: '24px' }],
        'subtitle-tablet': ['18px', { lineHeight: '26px' }],
        'subtitle-desktop': ['20px', { lineHeight: '28px' }],
        // Large
        'large-mobile': ['16px', { lineHeight: '24px' }],
        'large-tablet': ['18px', { lineHeight: '26px' }],
        'large-desktop': ['18px', { lineHeight: '26px' }],
        // Medium
        'medium-mobile': ['14px', { lineHeight: '22px' }],
        'medium-tablet': ['16px', { lineHeight: '24px' }],
        'medium-desktop': ['16px', { lineHeight: '24px' }],
      },
      screens: {
        'tablet': '768px',
        'desktop': '1280px',
      },
      maxWidth: {
        'container': '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'slide-out-right': 'slideOutRight 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
