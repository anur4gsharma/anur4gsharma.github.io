// Scroll-based fade-in for sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, #hero');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(section => observer.observe(section));

    // Navbar subtle shadow on scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.style.borderBottomColor = '#2a2a2a';
        } else {
            nav.style.borderBottomColor = '#222';
        }
    }, { passive: true });
});
