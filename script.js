/**
 * LiegeWriters - JavaScript Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');

    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll);

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });

    // ========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ========================================
    // SMOOTH SCROLL (additional support)
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SEND MESSAGE BUTTONS - OPEN WHATSAPP
    // ========================================
    const chatBtn = document.querySelector('.btn-chat');

    chatBtn.addEventListener('click', () => {
        window.open('https://wa.me/254757214551', '_blank');
    });

    // Contact form mailto submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const mailtoLink = `mailto:liegewriters6000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        window.location.href = mailtoLink;

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Opening Email...';
        submitBtn.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // ========================================
    // WRITER CARD INTERACTIONS
    // ========================================
    const writerButtons = document.querySelectorAll('.btn-writer');

    writerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const writerName = btn.closest('.writer-card').querySelector('.writer-info h3').textContent;
            window.open('https://wa.me/254757214551?text=' + encodeURIComponent(`Hi, I would like to work with ${writerName} on my assignment.`), '_blank');
        });
    });

    // ========================================
    // TOOL BUTTONS - OPEN WHATSAPP
    // ========================================
    const toolButtons = document.querySelectorAll('.btn-tool');

    toolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const toolName = btn.closest('.tool-card').querySelector('h3').textContent;
            window.open('https://wa.me/254757214551?text=' + encodeURIComponent(`Hi, I'm interested in using the ${toolName} tool.`), '_blank');
        });
    });
});