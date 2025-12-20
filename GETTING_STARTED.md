# Getting Started - Echo Maze Protocol Devlog

## Overview

The Echo Maze Protocol devlog features a beautiful left sidebar navigation, smooth scroll animations, and enhanced visual effects. This guide covers everything you need to know to set up, navigate, and customize the site.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The site will open at `http://localhost:5173` (or another port if 5173 is busy)

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## Key Features

### 🎨 Left Sidebar Navigation

- **Fixed Position** - Sidebar stays visible while scrolling through content
- **Nested Navigation** - Home section expands to show all content sections:
  - Overview
  - Story Development
  - Moodboard
  - Storyboard
  - Branching Narrative
  - Technical Experiments
  - Inspirations
  - Production & Reflection
  - References
- **Page Links** - Assets, About, and Extras pages below the Home section
- **Active State Tracking** - Automatically highlights the current section/page
- **Smooth Scrolling** - Click any section link to smoothly scroll to that content

### ✨ Visual Enhancements

#### Animated Elements
- **Scroll-triggered Animations** - Sections fade in and slide up as you scroll
- **Hover Effects** - Cards and elements respond to mouse interaction
- **Page Transitions** - Smooth fade transitions when navigating between pages
- **Particle Background** - Subtle animated particles with connecting lines

#### Design Polish
- **Frosted Glass Effects** - Backdrop blur on sidebar and content containers
- **Purple Accent Theme** - Consistent #8a2be2 (BlueViolet) color throughout
- **Glowing Text** - Logo and headings with soft purple glow effects
- **Enhanced Cards** - Shimmer effects and dynamic shadows on hover
- **Custom Scrollbars** - Styled scrollbars matching the theme

### 🎯 Interactive Features

#### Sidebar Behavior
- **Auto-expand on Home** - Home section automatically expands when on homepage
- **Scroll Spy** - Tracks which section is in view and highlights it
- **Click Navigation** - Click section names to jump to content
- **Collapsible Sections** - Toggle the Home section to show/hide subsections

---

## Navigation Guide

### How to Navigate

1. **Sidebar Navigation** - Click on any page or section in the sidebar
2. **Smooth Scrolling** - Sections scroll smoothly into view
3. **Active Tracking** - Current section is highlighted in purple
4. **Collapse/Expand** - Click "Home" to toggle section visibility

### Navigation Flow

1. **Click sidebar link** → Smooth scroll/navigate
2. **Scroll manually** → Active section updates automatically
3. **Hover over items** → Visual feedback with glow
4. **Click Home** → Toggle section list visibility

### Section Scrolling Features

- Sections have proper scroll offset (140px from top)
- Smooth scroll behavior enabled globally
- Hash URLs update when clicking sections
- Deep linking works (you can bookmark specific sections)

---

## Responsive Behavior

### Desktop (wider than 1024px)
- Full 280px sidebar visible at all times
- All text and navigation items visible
- Full feature set enabled

### Tablet (768px - 1024px)
- Slightly narrower 240px sidebar
- All features work the same
- Optimized spacing for tablets

### Small Screens (480px - 768px)
- Sidebar collapses to 70px (icon mode)
- Expands to full width when you hover over it
- Gives more screen space for content

### Mobile (under 480px)
- Sidebar is hidden by default
- Content takes full width
- (Consider adding hamburger menu for mobile in future)

---

## Visual Effects Breakdown

### Sidebar Styling
- **Gradient background** with transparency
- **Glowing purple border** on the right
- **Logo with text glow** effect
- **Active state** shows with gradient and left border
- **Hover effects** - Slight scale and background change

### Content Sections
- **Scroll-triggered animations** using Framer Motion
- **Fade in from bottom** as sections come into view
- **Stagger effect** on list items
- All animations use consistent timing

### Cards and Elements
- **Shimmer effect** on hover (light sweeps across)
- **Scale transform** on hover
- **Purple glow shadows** when active or hovered
- **Smooth transitions** (0.2-0.3 seconds)

### Background Effects
- **Animated particles** moving slowly
- **Connection lines** between nearby particles
- **Low opacity** (30%) so it doesn't distract from content

---

## Component Structure

### New Components Created

```
src/components/
├── Sidebar.jsx              # Main navigation sidebar with nested sections
├── AnimatedSection.jsx      # Wrapper for scroll-triggered animations
├── ParticleBackground.jsx   # Canvas-based particle animation
├── Layout.jsx               # Updated layout with sidebar
├── Lightbox.jsx             # Shared lightbox for image galleries
├── SearchBar.jsx            # Site-wide search functionality
├── TableOfContents.jsx      # Collapsible TOC for long pages
└── StoryTimeline.jsx        # Interactive branching narrative viz
```

### Page Components

```
src/pages/
├── Home.jsx      # Main devlog with all sections
├── MyJourney.jsx # Personal development journey
├── Theories.jsx  # Theoretical frameworks
├── About.jsx     # Project timeline and bio
├── Assets.jsx    # Media and resources
└── Extras.jsx    # Bonus content
```

### Updated Components
- **`App.jsx`** - Now includes React Router setup
- **`Home.jsx`** - Enhanced with AnimatedSection wrappers and motion effects
- All page components use consistent animation patterns

---

## Styling and Theme

### Color Palette
- **Background**: `#0a0b0d` (Near black)
- **Panel**: `#0f1115` (Dark gray)
- **Text**: `#e6e7ea` (Light gray)
- **Muted**: `#9aa0a6` (Medium gray)
- **Accent**: `#8a2be2` (BlueViolet/Purple)
- **Success**: `#3ddc97` (Green)
- **Warning**: `#ffb703` (Orange)
- **Error**: `#e63946` (Red)

### Main CSS Features (`index.css`)
- Comprehensive sidebar styling with gradients and shadows
- Page container styles for all routes
- Enhanced card hover effects with shimmer animation
- Responsive breakpoints for all screen sizes
- Custom animations and transitions

---

## Customization Tips

### Change Accent Color

In `src/index.css`, modify the `--accent` variable:

```css
:root {
  --accent: #8a2be2;  /* Change this to any color */
}
```

### Adjust Animation Speed

In components, modify `transition.duration`:

```jsx
transition={{ duration: 0.6 }}  // Slower
transition={{ duration: 0.3 }}  // Faster
```

### Disable Particles

In `Layout.jsx`, comment out:

```jsx
// <ParticleBackground />
```

### Change Sidebar Width

In `src/index.css`:

```css
.sidebar {
  width: 280px;  /* Change this */
}
```

### Adjust Scroll Offset

In `TableOfContents.jsx`, modify the constant:

```jsx
const SCROLL_OFFSET = 140; // Change this value
```

---

## Technical Details

### React Router Setup

```jsx
<Router>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="my-journey" element={<MyJourney />} />
      <Route path="theories" element={<Theories />} />
      <Route path="about" element={<About />} />
      <Route path="assets" element={<Assets />} />
      <Route path="extras" element={<Extras />} />
    </Route>
  </Routes>
</Router>
```

### Framer Motion Animations

- Uses `motion` components for declarative animations
- `useInView` hook for scroll-triggered effects
- Custom variants for consistent animation timing
- Stagger children for sequential reveals

### Scroll Spy Implementation

- IntersectionObserver for scroll tracking
- Automatically updates active section
- Works with both click navigation and manual scrolling
- Configurable root margins and thresholds

---

## Troubleshooting

### Sidebar not showing
- Make sure `npm install` was run successfully
- Check browser console for errors
- Verify you're accessing via dev server (not opening HTML directly)

### Animations not working
- Framer Motion might not be installed - run `npm install` again
- Check that imports are correct
- Verify component is wrapped in appropriate motion elements

### Routing not working
- Make sure react-router-dom is installed
- Check that you're accessing via dev server
- URLs should be `localhost:5173`, not `file:///`

### Performance issues
- Reduce particle count in [ParticleBackground.jsx](src/components/ParticleBackground.jsx)
- Disable blur effects (remove `backdrop-filter` from CSS)
- Simplify animations by reducing transition durations
- Use browser DevTools Performance tab to identify bottlenecks

### Scroll position issues
- Check SCROLL_OFFSET value in [TableOfContents.jsx](src/components/TableOfContents.jsx)
- Verify no conflicting scroll behavior CSS
- Test with browser's scroll restoration disabled

---

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **JavaScript**: ES6+ features
- **CSS**: Grid, Flexbox, backdrop-filter
- **APIs**: IntersectionObserver, Canvas API

---

## Future Enhancement Ideas

### Potential Additions
- [ ] Mobile hamburger menu for sidebar
- [ ] Keyboard shortcuts for navigation (e.g., `/` for search)
- [ ] Search functionality improvements
- [ ] Dark/Light theme toggle
- [ ] Save scroll position on navigation
- [ ] Share/Bookmark specific sections

### Performance Optimizations
- [ ] Lazy load images
- [ ] Code splitting for routes
- [ ] Optimize particle rendering with requestAnimationFrame
- [ ] Debounce scroll events
- [ ] Implement virtual scrolling for long lists

---

## Additional Resources

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Cloudflare Pages deployment guide
- **[HOW_TO_ADD_CONTENT.md](HOW_TO_ADD_CONTENT.md)** - Adding new content and sections
- **[OPTIMIZATIONS.md](OPTIMIZATIONS.md)** - Performance optimization notes
- **[STORYBOARD_PROMPTS.md](STORYBOARD_PROMPTS.md)** - Creative reference material

---

**Enjoy your beautiful devlog site!** 🎨✨

**Version**: 2.0
**Stack**: React 18, Vite, Framer Motion, React Router v6
**Updated**: December 2025
