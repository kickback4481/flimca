document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect — smooth height transition
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // 2. Mobile Menu Toggle — morphing hamburger
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    function toggleMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked (but not dropdowns)
    if (mobileNav) {
        mobileNav.querySelectorAll('a[href]').forEach(link => {
            if (!link.closest('.dropdown') || link.getAttribute('href') !== '#') {
                link.addEventListener('click', () => {
                    if (mobileNav.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            }
        });
    }

    // 3. Scroll Animations — Intersection Observer
    const fadeElements = document.querySelectorAll('.scroll-fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. FAQ Accordion Logic — smooth height animation
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            // Close other open items
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 5. Smooth anchor scrolling with navbar offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});

// Toggle Read More function for therapy cards
function toggleReadMore(btn) {
    const content = btn.previousElementSibling;
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        content.style.maxHeight = content.scrollHeight + 'px';
        btn.textContent = 'Read less';
    } else {
        content.style.maxHeight = '0px';
        content.classList.add('collapsed');
        btn.textContent = 'Read more';
    }
}

// Testimonials Logic
function toggleExpand(id) {
    const allCards = document.querySelectorAll('.testimonial-card');
    const targetCard = document.getElementById(id);
    const overlay = document.getElementById('testimonial-overlay');

    if (!targetCard || !overlay) return;

    allCards.forEach(card => {
        if(card !== targetCard) {
            card.classList.add('shrunk');
            card.classList.remove('expanded');
        }
    });

    targetCard.classList.remove('shrunk');
    targetCard.classList.add('expanded');
    overlay.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeExpanded() {
    const allCards = document.querySelectorAll('.testimonial-card');
    const overlay = document.getElementById('testimonial-overlay');

    if (!overlay) return;

    allCards.forEach(card => {
        card.classList.remove('expanded');
        card.classList.remove('shrunk');
    });
    
    overlay.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Water Video Fade Loop Logic
document.addEventListener('DOMContentLoaded', () => {
    const waterVideo = document.getElementById('water-bg-video');
    if (waterVideo) {
        const fadeOutDuration = 1.5; // 1.5 seconds before end
        const baseOpacity = '0.35';
        
        waterVideo.addEventListener('timeupdate', () => {
            if (waterVideo.duration && waterVideo.currentTime >= waterVideo.duration - fadeOutDuration) {
                // Fade to 0 (which reveals the #ffffff background)
                waterVideo.style.opacity = '0';
            } else {
                // Fade back in to normal opacity
                waterVideo.style.opacity = baseOpacity;
            }
        });

        waterVideo.addEventListener('ended', () => {
            waterVideo.currentTime = 0;
            waterVideo.play();
        });
    }
});

// Global Stroke Animation Loop
let borderAngle = 0;
function animateBorder() {
    borderAngle = (borderAngle + 1.2) % 360;
    document.documentElement.style.setProperty('--border-angle', borderAngle + 'deg');
    requestAnimationFrame(animateBorder);
}
requestAnimationFrame(animateBorder);
