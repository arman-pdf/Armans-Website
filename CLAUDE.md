# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Arman Kanorwalla's Environmental Science Portfolio" - a React-based personal portfolio website showcasing environmental science projects. The project uses modern 2025 web design trends including glassmorphism, animated backgrounds, glowing effects, and interactive particles.

## Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.1.4
- **Styling:** Tailwind CSS 3.4.1 + custom CSS
- **UI Library:** lucide-react (icons)
- **Node:** Uses ES modules (`"type": "module"` in package.json)

## Common Commands

```bash
npm run dev        # Start dev server at http://localhost:3000 (auto-opens)
npm run build      # Production build to /dist directory
npm run preview    # Preview production build locally
```

## Project Structure

```
src/
├── index.jsx                           # Entry point - renders EnvironmentalPortfolioEnhanced
├── index.css                           # Global styles (Tailwind + custom CSS)
├── EnvironmentalPortfolioEnhanced.jsx  # Main portfolio component with all enhancements
├── EnvironmentalPortfolio.jsx          # Original portfolio component (fallback)
└── components/
    ├── AnimatedBackground.jsx          # Canvas-based gradient mesh background
    ├── GlowingCard.jsx                 # Cards with mouse-tracking glow effects
    ├── FloatingParticles.jsx           # Particle system with physics animation
    ├── GlassNavigation.jsx             # Glassmorphism navigation bar
    ├── MagneticButton.jsx              # Buttons that follow mouse cursor
    ├── ProjectModal.jsx                # Modal for displaying project details
    ├── ExperienceModal.jsx             # Modal for experience/education details
    ├── FloatingChatButton.jsx          # Floating action button
    └── ScrollIndicator.jsx             # Visual scroll progress indicator
```

## Architecture & Key Design Patterns

### Component Hierarchy

```
EnvironmentalPortfolioEnhanced (Main)
├── AnimatedBackground (fullscreen canvas background)
├── FloatingParticles (ambient particle animation)
├── GlassNavigation (sticky header)
├── Main content sections
│   ├── Hero section with GlowingCard
│   ├── Projects section with multiple GlowingCard + ProjectModal
│   ├── Experience section with ExperienceModal
│   └── Skills section
├── MagneticButton (scattered throughout)
└── FloatingChatButton (fixed bottom-right)
```

### Core Interactive Components

1. **GlowingCard** - Base component for all content cards. Features:
   - Mouse position tracking via `onMouseMove`
   - Radial gradient glow that follows cursor
   - Configurable glow colors (green, blue, cyan, purple, orange)
   - CSS transitions for smooth effects

2. **FloatingParticles** - Canvas-based animation system. Uses:
   - `requestAnimationFrame` for 60fps animation
   - Physics calculations for particle movement
   - Optional mouse proximity detection (particles flee from cursor)
   - Responsive particle count based on screen size

3. **GlassNavigation** - Scroll-aware header. Implements:
   - Dynamic blur effect based on scroll position
   - Active link highlighting with smooth transitions
   - Sticky positioning with CSS backdrop-filter

4. **MagneticButton** - Interactive button with mouse magnetism effect. Uses:
   - Distance calculation from cursor to button
   - CSS transform for smooth following motion
   - Ripple animation on click

### Styling Approach

- **Tailwind CSS** for utility-first styling
- **Custom CSS** in `index.css` for:
  - Canvas animations (AnimatedBackground, FloatingParticles)
  - Complex gradients and glowing effects
  - Glassmorphism effects (blur, backdrop-filter)
  - CSS animations and keyframes
- **Inline styles** for dynamic values (mouse-tracked gradients in GlowingCard)

### Performance Considerations

- Canvas-based components (AnimatedBackground, FloatingParticles) run GPU-accelerated animations at ~0.5-2% CPU
- GlowingCard uses CSS transforms (GPU-accelerated) rather than repositioning elements
- Particle count automatically reduces on smaller screens
- `prefers-reduced-motion` media query respected for accessibility

## Development Workflow

### Testing & Debugging

**IMPORTANT: Always use Playwright MCP tools when developing, debugging, or testing the website.**

- Use `mcp__playwright__browser_navigate` to open the dev server (http://localhost:3000)
- Use `mcp__playwright__browser_snapshot` to capture accessibility snapshots (better than screenshots)
- Use `mcp__playwright__browser_take_screenshot` for visual verification when needed
- Use `mcp__playwright__browser_click` to test interactive components (GlowingCard, MagneticButton, modals)
- Use `mcp__playwright__browser_hover` to verify hover effects and animations
- Use `mcp__playwright__browser_console_messages` to check for JavaScript errors
- Use `mcp__playwright__browser_evaluate` to test JavaScript functionality in real-time

This ensures accurate testing of interactive features like mouse-tracking glows, particle animations, and glassmorphism effects.

### Adding New Sections

1. Create content in `EnvironmentalPortfolioEnhanced.jsx`
2. Wrap content in `<GlowingCard>` for consistent styling
3. Use `glowColor` prop to match category (green=environmental, blue=water, orange=geology, etc.)
4. Use `MagneticButton` for CTAs
5. Use modals (ProjectModal, ExperienceModal) for detailed information

### Customizing Visual Effects

- **Particle Count:** Adjust `particleCount` prop in FloatingParticles (reduce to ~20 for mobile)
- **Glow Intensity:** Modify CSS in `index.css` (search for `radial-gradient`)
- **Animation Speed:** Adjust duration values in `index.css` keyframes
- **Colors:** Update environmental color palette in component files (currently: emerald, blue, cyan, teal)

### Modals

- `ProjectModal` - displays project details with descriptions, technologies, links
- `ExperienceModal` - displays experience/education info
- Both controlled via state in parent component with `isOpen` and `onClose` props

## Important Files

- [QUICK_START.md](QUICK_START.md) - Quick reference for design features and customization tips
- [DESIGN_UPGRADE_README.md](DESIGN_UPGRADE_README.md) - Comprehensive documentation of all components and advanced customization
- [vite.config.js](vite.config.js) - Dev server runs on port 3000 with auto-open
- [tailwind.config.js](tailwind.config.js) - Tailwind configuration (minimal, uses defaults)
- [postcss.config.js](postcss.config.js) - PostCSS config for Tailwind

## Current Status

- ✅ Enhanced design fully implemented with all modern effects
- ✅ Two versions available: EnvironmentalPortfolio (basic) and EnvironmentalPortfolioEnhanced (with effects)
- ✅ Production-ready with optimized performance
- ✅ Fully responsive (particles and layout adapt to mobile)
- ✅ Accessibility features included (reduced-motion support, proper contrast)
