// Bistro Luxe - Main JavaScript Module
// Modular restaurant website functionality

const BistroLuxe = {
  // Configuration
  config: {
    animations: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out'
    },
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1200
    }
  },

  // State management
  state: {
    isMenuOpen: false,
    currentSection: 'hero',
    isLoading: false
  },

  // Utility functions
  utils: {
    // Debounce function for performance
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Smooth scroll to element
    scrollTo(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    },

    // Check if element is in viewport
    isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    // Get current screen size
    getScreenSize() {
      const width = window.innerWidth;
      if (width < this.config.breakpoints.mobile) return 'mobile';
      if (width < this.config.breakpoints.tablet) return 'tablet';
      if (width < this.config.breakpoints.desktop) return 'desktop';
      return 'large';
    }
  },

  // Animation handlers
  animations: {
    // Fade in animation
    fadeIn(element, duration = 500) {
      element.style.opacity = '0';
      element.style.transition = `opacity ${duration}ms ease-in-out`;
      
      setTimeout(() => {
        element.style.opacity = '1';
      }, 10);
    },

    // Slide up animation
    slideUp(element, duration = 600) {
      element.style.transform = 'translateY(20px)';
      element.style.opacity = '0';
      element.style.transition = `all ${duration}ms ease-out`;
      
      setTimeout(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
      }, 10);
    },

    // Animate elements on scroll
    initScrollAnimations() {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.dataset.animation || 'fadeIn';
            
            if (animationType === 'slideUp') {
              this.slideUp(element);
            } else {
              this.fadeIn(element);
            }
            
            observer.unobserve(element);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(el => observer.observe(el));
    }
  },

  // UI interactions
  ui: {
    // Initialize all UI components
    init() {
      this.initButtons();
      this.initCards();
      this.initNavigation();
      this.initModal();
    },

    // Button interactions
    initButtons() {
      const buttons = document.querySelectorAll('.btn-gold');
      
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          this.handleButtonClick(e.target);
        });

        // Add ripple effect
        button.addEventListener('click', (e) => {
          this.createRipple(e);
        });
      });
    },

    // Handle button clicks
    handleButtonClick(button) {
      const action = button.dataset.action;
      
      switch(action) {
        case 'reservation':
          this.showReservationModal();
          break;
        case 'menu':
          BistroLuxe.utils.scrollTo('menu');
          break;
        case 'contact':
          BistroLuxe.utils.scrollTo('location');
          break;
        default:
          console.log('Button clicked:', button.textContent);
      }
    },

    // Create ripple effect on button click
    createRipple(e) {
      const button = e.currentTarget;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    },

    // Card hover effects
    initCards() {
      const cards = document.querySelectorAll('.hover-lift');
      
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          if (BistroLuxe.config.animations.enabled) {
            card.style.transform = 'translateY(-8px)';
          }
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
        });
      });
    },

    // Navigation functionality
    initNavigation() {
      // Smooth scroll for anchor links
      const navLinks = document.querySelectorAll('a[href^="#"]');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          BistroLuxe.utils.scrollTo(targetId);
        });
      });
    },

    // Modal functionality
    initModal() {
      // Create modal HTML if it doesn't exist
      if (!document.getElementById('reservation-modal')) {
        this.createReservationModal();
      }
    },

    // Show reservation modal
    showReservationModal() {
      const modal = document.getElementById('reservation-modal');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 100);
        }
      }
    },

    // Hide reservation modal
    hideReservationModal() {
      const modal = document.getElementById('reservation-modal');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    },

    // Create reservation modal
    createReservationModal() {
      const modalHTML = `
        <div id="reservation-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onclick="BistroLuxe.ui.hideReservationModal()"></div>
          <div class="card-glass rounded-2xl p-8 max-w-md w-full relative">
            <button onclick="BistroLuxe.ui.hideReservationModal()" class="absolute top-4 right-4 text-gold-400 hover:text-gold-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 class="text-2xl font-display font-bold text-white mb-6">Make a Reservation</h3>
            <form id="reservation-form" class="space-y-4">
              <input type="text" placeholder="Your Name" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60" required>
              <input type="email" placeholder="Email Address" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60" required>
              <input type="tel" placeholder="Phone Number" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60" required>
              <input type="date" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" required>
              <select class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" required>
                <option value="">Select Time</option>
                <option value="17:00">5:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:30">8:30 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
              <select class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" required>
                <option value="">Party Size</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6 People</option>
                <option value="7">7 People</option>
                <option value="8">8 People</option>
                <option value="8+">8+ People</option>
              </select>
              <textarea placeholder="Special Requests (Optional)" rows="3" class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"></textarea>
              <button type="submit" class="btn-gold w-full h-12 rounded-lg font-bold text-dark-950">
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Add form submission handler
      document.getElementById('reservation-form').addEventListener('submit', this.handleReservationSubmit);
    },

    // Handle reservation form submission
    handleReservationSubmit(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      
      // Show loading state
      BistroLuxe.state.isLoading = true;
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Processing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Reservation data:', data);
        alert('Reservation request submitted! We will contact you shortly to confirm.');
        
        // Reset form and close modal
        e.target.reset();
        BistroLuxe.ui.hideReservationModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        BistroLuxe.state.isLoading = false;
      }, 2000);
    }
  },

  // Performance monitoring
  performance: {
    // Track page load time
    trackPageLoad() {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
      });
    },

    // Track user interactions
    trackInteractions() {
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-gold')) {
          console.log('Button interaction:', e.target.textContent);
        }
      });
    }
  },

  // Initialize the application
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startup());
    } else {
      this.startup();
    }
  },

  // Startup sequence
  startup() {
    console.log('🍽️ Bistro Luxe - Initializing...');
    
    // Initialize modules
    this.ui.init();
    this.animations.initScrollAnimations();
    this.performance.trackPageLoad();
    this.performance.trackInteractions();
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    console.log('✨ Bistro Luxe - Ready!');
  }
};

// Auto-initialize when script loads
BistroLuxe.init();
