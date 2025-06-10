# Bistro Luxe - Restaurant Website

A modern, elegant restaurant website with premium golden styling, glassmorphic design, and sophisticated user interactions.

## 🏗️ Architecture Overview

The project has been refactored into a modular, maintainable structure with separation of concerns:

### 📁 File Structure

```
restaurant_v2/
├── index.html          # Original main HTML file
├── index_built.html    # Generated HTML from modular sections
├── styles.css          # Custom CSS with design system
├── script.js           # Modular JavaScript functionality
├── tailwind.config.js  # Tailwind CSS configuration
├── build.py           # Build script for assembling sections
├── sections/          # Modular HTML sections
│   ├── header.html    # Navigation header
│   ├── hero.html      # Hero section with CTA
│   ├── menu.html      # Menu showcase
│   ├── private-dining.html  # Private dining section
│   ├── events.html    # Events section
│   ├── about.html     # About section with location/hours
│   └── cta.html       # Call-to-action section
└── README.md          # This documentation
```

## 🔧 Modular Development

### Building the Site
The site is now built from modular sections for better maintainability:

```bash
python3 build.py
```

This generates `index_built.html` by combining all section files.

### Section Management
Each major section is now in its own file under `/sections/`:
- **header.html** - Navigation and branding
- **hero.html** - Main hero section with restaurant intro
- **menu.html** - Featured menu items
- **private-dining.html** - Private dining options
- **events.html** - Wine tastings and chef collaborations
- **about.html** - Restaurant story, team, location, and hours
- **cta.html** - Final call-to-action button

### Benefits of Modular Structure
- **Maintainability**: Each section can be edited independently
- **Reusability**: Sections can be reused across different pages
- **Team Collaboration**: Multiple developers can work on different sections
- **Testing**: Individual sections can be tested in isolation
- **Version Control**: Changes to specific sections are easier to track

## 🚀 Development Workflow

### Quick Start
```bash
# Build the site
python3 dev.py build

# Serve locally with auto-open browser
python3 dev.py serve

# Watch for changes (rebuilds automatically)
python3 dev.py watch
```

### Manual Build Process
```bash
# Basic build
python3 build.py

# Serve with Python's built-in server
python3 -m http.server 8000
# Then visit: http://localhost:8000/index_built.html
```

### Development Commands
- `python3 dev.py build` - Build site from sections
- `python3 dev.py serve` - Start development server
- `python3 dev.py serve --port 8001` - Use custom port
- `python3 dev.py watch` - Auto-rebuild on changes
- `python3 dev.py help` - Show all commands

## 🎨 Design System

### Color Palette
- **Gold**: Elegant gold tones (#D4AF37 to #713f12)
- **Dark**: Rich dark tones (#f8f7f4 to #171612)
- **CSS Variables**: Consistent theming with custom properties

### Typography
- **Display Font**: Playfair Display (headers, elegant text)
- **Body Font**: Inter (readable body text)
- **Accent Font**: Cormorant Garamond (special elements)

### Components
- **Glass Cards**: Glassmorphic design with backdrop blur
- **Golden Buttons**: Premium button styling with hover effects
- **Hover Lift**: Smooth elevation animations
- **Animations**: Fade-in, slide-up, and glow effects

## 🛠️ JavaScript Architecture

### Modular Structure
The JavaScript is organized into logical modules within the `BistroLuxe` namespace:

```javascript
BistroLuxe = {
  config: {},      // Configuration settings
  state: {},       // Application state
  utils: {},       // Utility functions
  animations: {}, // Animation handlers
  ui: {},         // UI interactions
  performance: {} // Performance monitoring
}
```

### Key Features

#### 🎯 Smooth Navigation
- Automatic smooth scrolling to sections
- Hash-based navigation with proper IDs
- Mobile-responsive navigation

#### 🎨 Scroll Animations
- Intersection Observer for performance
- Configurable animation types
- Progressive enhancement

#### 💫 Interactive Elements
- Ripple effects on button clicks
- Hover animations with transform
- Loading states and feedback

#### 📱 Reservation System
- Dynamic modal creation
- Form validation and submission
- Accessibility features (focus management)

#### ⚡ Performance Optimizations
- Debounced scroll events
- Intersection Observer for animations
- Minimal DOM queries with caching

## 🚀 Usage

### Basic Setup
```html
<!-- Include in HTML head -->
<link rel="stylesheet" href="styles.css">
<script src="https://cdn.tailwindcss.com"></script>
<script src="tailwind.config.js"></script>

<!-- Include before closing body tag -->
<script src="script.js"></script>
```

### Adding Interactive Elements
```html
<!-- Reservation buttons -->
<button data-action="reservation" class="btn-gold">
  Make a Reservation
</button>

<!-- Scroll animations -->
<div class="animate-on-scroll" data-animation="slideUp">
  Content to animate
</div>

<!-- Navigation links -->
<a href="#menu">Menu</a>
```

### Customizing Animations
```javascript
// Disable animations
BistroLuxe.config.animations.enabled = false;

// Custom animation duration
BistroLuxe.config.animations.duration = 500;
```

## 🎛️ Configuration Options

### Animation Settings
```javascript
BistroLuxe.config.animations = {
  enabled: true,        // Enable/disable animations
  duration: 300,        // Default animation duration
  easing: 'ease-in-out' // Animation timing function
};
```

### Responsive Breakpoints
```javascript
BistroLuxe.config.breakpoints = {
  mobile: 768,   // Mobile breakpoint
  tablet: 1024,  // Tablet breakpoint
  desktop: 1200  // Desktop breakpoint
};
```

## 🔧 Customization

### Adding New Sections
1. Add HTML section with proper ID
2. Include in navigation links
3. Apply animation classes if desired

### Custom Buttons
```html
<button data-action="custom" class="btn-gold">
  Custom Action
</button>
```

Then handle in JavaScript:
```javascript
// Add to BistroLuxe.ui.handleButtonClick
case 'custom':
  // Your custom logic here
  break;
```

### New Animation Types
```javascript
// Add to BistroLuxe.animations
customAnimation(element) {
  // Your animation logic
}
```

## 🎭 Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling in modals
- **ARIA Labels**: Screen reader friendly
- **High Contrast**: Works with system preferences
- **Reduced Motion**: Respects prefers-reduced-motion

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: CSS Grid and Flexbox layouts
- **Adaptive Components**: Components scale appropriately
- **Touch-Friendly**: Proper touch targets and interactions

## 🔍 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **CSS Features**: CSS Grid, Flexbox, Custom Properties
- **JavaScript**: ES6+ features with fallbacks
- **Progressive Enhancement**: Works without JavaScript

## 🚀 Performance

- **Lazy Loading**: Images load as needed
- **Efficient Animations**: GPU-accelerated transforms
- **Minimal Dependencies**: Lightweight vanilla JavaScript
- **Optimized Assets**: Compressed images and minified code

## 🛠️ Development

### Local Development
```bash
# Serve files locally
python -m http.server 8000
# or
npx serve .
```

### Testing
- Cross-browser testing recommended
- Mobile device testing
- Accessibility testing with screen readers
- Performance testing with Lighthouse

## 📚 Dependencies

- **Tailwind CSS**: Utility-first CSS framework
- **Google Fonts**: Typography (Playfair Display, Inter, Cormorant Garamond)
- **No JavaScript Libraries**: Pure vanilla JavaScript for performance

## 🔮 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced form validation
- [ ] Online reservation integration
- [ ] Menu filtering and search
- [ ] Customer reviews section
- [ ] Social media integration
- [ ] Newsletter subscription

---

Built with ❤️ for premium dining experiences.
