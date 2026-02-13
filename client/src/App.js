@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gradient-to-br from-dark-400 via-dark-300 to-dark-400 text-white min-h-screen;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl;
  }
  
  .gradient-text {
    @apply bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent animate-gradient;
  }
  
  .hover-glow {
    @apply transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25;
  }
}
