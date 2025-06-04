// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');
    const menuOpen = document.querySelector('.menu-open');
    const menuClose = document.querySelector('.menu-close');
    
    // Helper function to open mobile menu
    const openMobileMenu = () => {
        if (!mainNav) return;
        mainNav.classList.remove('hidden');
        mainNav.classList.add('flex', 'flex-col', 'items-center', 'space-y-4', 'mt-4', 'mobile-menu-active');
        if (menuOpen) menuOpen.classList.add('hidden');
        if (menuClose) menuClose.classList.remove('hidden');
        document.body.classList.add('menu-open');
    };

    // Helper function to close mobile menu
    const closeMobileMenu = () => {
        if (!mainNav) return;
        mainNav.classList.add('hidden');
        mainNav.classList.remove('flex', 'flex-col', 'items-center', 'space-y-4', 'mt-4', 'mobile-menu-active');
        if (menuOpen) menuOpen.classList.remove('hidden');
        if (menuClose) menuClose.classList.add('hidden');
        document.body.classList.remove('menu-open');
    };
    
    // Toggle menu on button click
    mobileMenuButton?.addEventListener('click', () => {
        if (mainNav?.classList.contains('hidden')) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize (if desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mainNav?.classList.contains('mobile-menu-active')) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (mainNav && !mainNav.classList.contains('hidden') && window.innerWidth < 768) {
                closeMobileMenu();
            }
        });
    });
    // Delivery Location Tabs
    const locationTabs = document.querySelectorAll('.location-tab');
    const locationDelivery = document.querySelectorAll('.location-delivery');
    
    // Header scroll effect
    const header = document.querySelector('.floating-header');
    let lastScrollTop = 0;
    
    const handleHeaderScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop > 20) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    };
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Initialize header state on page load
    handleHeaderScroll();
    
    locationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            locationTabs.forEach(t => t.classList.remove('active-tab'));
            // Add active class to clicked tab
            tab.classList.add('active-tab');
            
            // Hide all delivery sections
            locationDelivery.forEach(section => {
                section.classList.remove('active-location');
                section.classList.add('hidden');
            });
            
            // Show the selected delivery section
            const location = tab.getAttribute('data-location');
            const activeSection = document.getElementById(`${location}-delivery`);
            if (activeSection) {
                activeSection.classList.remove('hidden');
                setTimeout(() => {
                    activeSection.classList.add('active-location');
                }, 10);
            }
        });
    });
    // Testimonial Slider Logic - Modernized
    const testimonialSlider = {
        slideIndex: 1,
        slides: document.getElementsByClassName("testimonial-slide"),
        dots: document.getElementsByClassName("dot"),
        autoSlideInterval: null,
        init() {
            this.showSlide(this.slideIndex);
            this.setupAutoSlide();
            this.setupEventListeners();
        },
        nextSlide() { this.showSlide(++this.slideIndex); },
        prevSlide() { this.showSlide(--this.slideIndex); },
        goToSlide(n) { this.slideIndex = n; this.showSlide(this.slideIndex); },
        showSlide(n) {
            if (!this.slides.length) return;
            if (n > this.slides.length) this.slideIndex = 1;
            if (n < 1) this.slideIndex = this.slides.length;
            [...this.slides].forEach(slide => slide.classList.remove('active'));
            [...this.dots].forEach(dot => dot.classList.remove('active'));
            this.slides[this.slideIndex - 1].classList.add('active');
            this.dots[this.slideIndex - 1]?.classList.add('active');
        },
        setupAutoSlide() {
            this.startAutoSlide();
            const sliderElement = document.querySelector('.testimonial-slider');
            sliderElement?.addEventListener('mouseenter', () => this.stopAutoSlide());
            sliderElement?.addEventListener('mouseleave', () => this.startAutoSlide());
        },
        startAutoSlide() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
        },
        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        },
        setupEventListeners() {
            document.querySelector('.prev-button')?.addEventListener('click', () => this.prevSlide());
            document.querySelector('.next-button')?.addEventListener('click', () => this.nextSlide());
            [...this.dots].forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index + 1));
            });
        }
    };
    if (document.querySelector('.testimonial-slider')) {
        testimonialSlider.init();
    }
});
// Location Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Location Slider
    const initLocationSlider = () => {
        const slider = document.querySelector('.location-slider');
        const slides = document.querySelectorAll('.location-slide');
        const prevBtn = document.querySelector('.slider-nav.prev');
        const nextBtn = document.querySelector('.slider-nav.next');
        const dots = document.querySelectorAll('.slider-dot');
        const tabs = document.querySelectorAll('.location-tab');
        
        if (!slider || slides.length === 0) return;
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Touch handling variables
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50; // Minimum swipe distance in pixels
        
        // Check if we're in mobile view (below 1024px)
        const isMobileView = () => window.innerWidth < 1024;
        
        // Update the slider position
        const updateSliderPosition = (index) => {
            // Only apply transform in mobile view
            if (slider && isMobileView()) {
                slider.style.transform = `translateX(-${index * 100}%)`;
            }
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Update tabs
            tabs.forEach((tab, i) => {
                tab.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        };
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateSliderPosition(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % slideCount;
                updateSliderPosition(newIndex);
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateSliderPosition(i);
            });
        });
        
        // Event listeners for tabs
        tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => {
                updateSliderPosition(i);
            });
        });
        
        // Touch events for mobile swipe
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        // Handle the swipe direction
        const handleSwipe = () => {
            const distance = touchEndX - touchStartX;
            
            if (Math.abs(distance) > minSwipeDistance) {
                if (distance > 0) {
                    // Swipe right - show previous
                    const newIndex = (currentIndex - 1 + slideCount) % slideCount;
                    updateSliderPosition(newIndex);
                } else {
                    // Swipe left - show next
                    const newIndex = (currentIndex + 1) % slideCount;
                    updateSliderPosition(newIndex);
                }
            }
        };
        
        // Handle window resize events to adjust between mobile and desktop layouts
        window.addEventListener('resize', () => {
            if (!isMobileView()) {
                // In desktop view, reset any transform
                if (slider) {
                    slider.style.transform = 'none';
                }
            } else {
                // In mobile view, apply the transform for current index
                updateSliderPosition(currentIndex);
            }
        });
        
        // Initialize
        updateSliderPosition(0);
    };
    
    // Initialize location slider
    initLocationSlider();
});
