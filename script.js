/**
 * PROTOCOL Landing Page JavaScript
 * Handles smooth scrolling, animations, and interactions
 */

// Deep Link Handler - Check if this is an event/chat link
(function() {
    const path = window.location.pathname;
    const eventMatch = path.match(/^\/event\/([^\/]+)/);
    const chatMatch = path.match(/^\/chat\/([^\/]+)/);

    if (eventMatch || chatMatch) {
        const type = eventMatch ? 'event' : 'chat';
        const id = eventMatch ? eventMatch[1] : chatMatch[1];

        // Try to open the app via custom scheme
        window.location.href = `com.protocol.social://${type}/${id}`;

        // After delay, if still on page, show download prompt
        setTimeout(() => {
            document.body.innerHTML = `
                <div class="deep-link-fallback">
                    <div class="deep-link-content">
                        <div class="deep-link-logo">
                            <img src="/assets/logo.png" alt="PROTOCOL" width="64" height="64">
                        </div>
                        <h1>View this ${type === 'event' ? 'event' : 'chat'} in PROTOCOL</h1>
                        <p>Download the app to see full details and join the conversation.</p>
                        <div class="deep-link-buttons">
                            <a href="#" class="btn-primary btn-large" onclick="window.location.href='com.protocol.social://${type}/${id}'; return false;">
                                Open in App
                            </a>
                            <a href="https://apps.apple.com/app/protocol" class="btn-secondary btn-large">
                                Download on iOS
                            </a>
                        </div>
                        <p class="deep-link-note">Don't have the app? Download it to discover local events.</p>
                    </div>
                </div>
            `;
        }, 1500);

        return; // Don't run rest of script for deep links
    }
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 0) {
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .step, .pricing-card, .host-feature, .trust-features li'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                animateNumber(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

function animateNumber(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasStar = text.includes('★');
    const number = parseFloat(text.replace(/[^\d.]/g, ''));

    if (isNaN(number)) return;

    const duration = 1500;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;

        if (step >= steps) {
            current = number;
            clearInterval(timer);
        }

        let displayValue;
        if (number >= 1000) {
            displayValue = Math.floor(current / 1000) + 'K';
        } else {
            displayValue = current.toFixed(1);
        }

        element.textContent = displayValue + (hasPlus ? '+' : '') + (hasStar ? '★' : '');
    }, duration / steps);
}

// Mobile menu toggle (placeholder for future implementation)
function toggleMobileMenu() {
    // Add mobile menu functionality here if needed
    console.log('Mobile menu toggle');
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect enhancement for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Pricing card interaction
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.transform = '';
        });

        // Add scale effect to clicked card
        this.style.transform = 'scale(1.02)';

        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Console greeting
console.log('%c🎉 PROTOCOL ', 'font-size: 20px; font-weight: bold; color: #007AFF;');
console.log('%cEvent Discovery, simplified.', 'font-size: 14px; color: #666;');
console.log('%cInterested in joining our team? Check out our careers page!', 'font-size: 12px; color: #999;');

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add confetti or special effect
    document.body.style.animation = 'rainbow 2s linear infinite';

    setTimeout(() => {
        document.body.style.animation = '';
        alert('🎉 You found the secret! Welcome to PROTOCOL early access!');
    }, 2000);
}

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
