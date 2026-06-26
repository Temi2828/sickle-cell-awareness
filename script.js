/* =====================
   WORLD SICKLE CELL DAY
   AWARENESS WEBSITE
   JAVASCRIPT
   ===================== */

// =====================================
// UTILITY FUNCTIONS
// =====================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Get element by ID with null check
 */
function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with ID "${id}" not found`);
    }
    return element;
}

/**
 * Smooth scroll to element
 */
function smoothScroll(target) {
    const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
    
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Add class to element
 */
function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Remove class from element
 */
function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

/**
 * Toggle class on element
 */
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

/**
 * Check if element has class
 */
function hasClass(element, className) {
    return element && element.classList.contains(className);
}

// =====================================
// MOBILE MENU
// =====================================

class MobileMenu {
    constructor() {
        this.menuToggle = getElement('menuToggle');
        this.navLinks = getElement('navLinks');
        this.navItems = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        
        if (this.menuToggle) {
            this.init();
        }
    }

    init() {
        // Toggle menu on button click
        this.menuToggle.addEventListener('click', () => this.toggle());
        
        // Close menu when a link is clicked
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (this.isOpen) {
                    this.close();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && this.isOpen) {
                this.close();
            }
        });

        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        }, 250));
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        addClass(this.navLinks, 'active');
        addClass(this.menuToggle, 'active');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
    }

    close() {
        removeClass(this.navLinks, 'active');
        removeClass(this.menuToggle, 'active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    }
}

// =====================================
// SCROLL ANIMATIONS
// =====================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach(element => {
            observer.observe(element);
        });

        // Observe fact cards for special animation
        document.querySelectorAll('.fact-card').forEach(element => {
            observer.observe(element);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.animation = 'none';
        
        // Re-trigger animation
        void element.offsetWidth;
        element.style.animation = '';
    }
}

// =====================================
// NAVBAR SCROLL EFFECT
// =====================================

class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 100));
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            if (scrollTop > this.lastScrollTop) {
                // Scrolling down
                this.navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }
        }
        
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
}

// =====================================
// FORM HANDLING
// =====================================

class ContactForm {
    constructor() {
        this.form = getElement('contactForm');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!this.validateForm(data)) {
            this.showMessage('Please fill out all required fields correctly.', 'error');
            return;
        }

        // Show success message
        this.showMessage('Thank you for your message! We will get back to you soon.', 'success');

        // Log form data (in real app, would send to server)
        console.log('Form submitted:', data);

        // Reset form
        this.form.reset();

        // Remove message after 5 seconds
        setTimeout(() => {
            const message = this.form.parentElement.querySelector('.form-message');
            if (message) {
                message.remove();
            }
        }, 5000);
    }

    validateForm(data) {
        // Check required fields
        if (!data.name || !data.email || !data.subject || !data.message) {
            return false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        return true;
    }

    showMessage(message, type) {
        // Remove existing message if any
        const existingMessage = this.form.parentElement.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            text-align: center;
            font-weight: 600;
            animation: slideInUp 0.3s ease-out;
            ${type === 'success' 
                ? 'background: #D1FAE5; color: #065F46; border: 1px solid #6EE7B7;'
                : 'background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5;'
            }
        `;

        this.form.parentElement.insertBefore(messageEl, this.form);
    }
}

// =====================================
// STATS COUNTER
// =====================================

class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.fact-number');
        this.isAnimating = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounters() {
        this.isAnimating = true;
        
        this.counters.forEach(counter => {
            const text = counter.textContent;
            
            // Skip if not a number
            if (!/\d/.test(text)) {
                return;
            }

            // Extract number
            const match = text.match(/\d+/);
            if (!match) return;

            const target = parseInt(match[0]);
            let current = 0;
            const increment = Math.ceil(target / 50);

            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                counter.textContent = text.replace(/\d+/, current);
            }, 30);
        });

        setTimeout(() => {
            this.isAnimating = false;
        }, 2000);
    }
}

// =====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =====================================

class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href');
                
                if (target !== '#') {
                    smoothScroll(target);
                }
            });
        });
    }
}

// =====================================
// LAZY LOADING IMAGES
// =====================================

class LazyLoadImages {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// =====================================
// KEYBOARD NAVIGATION
// =====================================

class KeyboardNavigation {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Close mobile menu on Escape
            if (e.key === 'Escape') {
                const mobileMenu = mobileMenuInstance;
                if (mobileMenu && mobileMenu.isOpen) {
                    mobileMenu.close();
                }
            }
        });
    }
}

// =====================================
// PRINT OPTIMIZATION
// =====================================

class PrintOptimization {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('beforeprint', () => {
            document.body.style.backgroundColor = '#FFFFFF';
        });

        window.addEventListener('afterprint', () => {
            document.body.style.backgroundColor = '';
        });
    }
}

// =====================================
// PERFORMANCE OPTIMIZATION
// =====================================

class PerformanceOptimization {
    constructor() {
        this.init();
    }

    init() {
        // Prefetch DNS for external resources
        this.prefetchDNS();

        // Load analytics
        this.loadAnalytics();
    }

    prefetchDNS() {
        const links = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        links.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    loadAnalytics() {
        // Analytics code would go here
        // Example: Google Analytics, Mixpanel, etc.
    }
}

// =====================================
// ACCESSIBILITY ENHANCEMENTS
// =====================================

class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        // Add ARIA labels dynamically
        this.addAriaLabels();

        // Announce dynamic content changes
        this.setupLiveRegions();

        // Handle focus management
        this.manageFocus();
    }

    addAriaLabels() {
        document.querySelectorAll('button').forEach(button => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim();
                if (text) {
                    button.setAttribute('aria-label', text);
                }
            }
        });
    }

    setupLiveRegions() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        document.body.appendChild(liveRegion);
    }

    manageFocus() {
        document.addEventListener('keydown', (e) => {
            // Handle Tab key for focus management
            if (e.key === 'Tab') {
                // Focus management logic here
            }
        });
    }
}

// =====================================
// INITIALIZATION
// =====================================

// Create global instances
let mobileMenuInstance;
let scrollAnimationsInstance;
let navbarScrollInstance;
let contactFormInstance;
let statsCounterInstance;
let smoothScrollingInstance;
let lazyLoadImagesInstance;
let keyboardNavigationInstance;
let printOptimizationInstance;
let performanceOptimizationInstance;
let accessibilityEnhancementsInstance;

/**
 * Initialize all modules when DOM is ready
 */
function initializeApp() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('Initializing Sickle Cell Day Awareness Website...');

        // Initialize modules
        mobileMenuInstance = new MobileMenu();
        scrollAnimationsInstance = new ScrollAnimations();
        navbarScrollInstance = new NavbarScroll();
        contactFormInstance = new ContactForm();
        statsCounterInstance = new StatsCounter();
        smoothScrollingInstance = new SmoothScrolling();
        lazyLoadImagesInstance = new LazyLoadImages();
        keyboardNavigationInstance = new KeyboardNavigation();
        printOptimizationInstance = new PrintOptimization();
        performanceOptimizationInstance = new PerformanceOptimization();
        accessibilityEnhancementsInstance = new AccessibilityEnhancements();

        console.log('Website initialized successfully!');
    }
}

// Initialize the application
initializeApp();

// =====================================
// UTILITY FUNCTIONS FOR EXTERNAL USE
// =====================================

/**
 * Send message to live region for screen readers
 */
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
    }
}

/**
 * Navigate to section
 */
function navigateToSection(sectionId) {
    smoothScroll(`#${sectionId}`);
    announceToScreenReader(`Navigated to ${sectionId} section`);
}

/**
 * Close mobile menu programmatically
 */
function closeMobileMenu() {
    if (mobileMenuInstance) {
        mobileMenuInstance.close();
    }
}

/**
 * Open mobile menu programmatically
 */
function openMobileMenu() {
    if (mobileMenuInstance) {
        mobileMenuInstance.open();
    }
}

// =====================================
// SERVICE WORKER REGISTRATION
// =====================================

/**
 * Register service worker for offline support
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Uncomment to enable service worker
// window.addEventListener('load', registerServiceWorker);

// =====================================
// ERROR HANDLING
// =====================================

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Send error to logging service in production
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Send error to logging service in production
});

// =====================================
// END OF JAVASCRIPT
// =====================================