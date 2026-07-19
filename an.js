// ===== Theme Toggle =====

document.addEventListener('DOMContentLoaded', function () {

    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Load saved preference or default to dark
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        root.setAttribute('data-theme', 'light');
    }

    // ===== GitHub Contributions Graph =====
    // Re-renders the graph when the theme is toggled
    function renderGitHubGraph(isLight) {
        if (window.GitHubGraph) {
            GitHubGraph.render({
                username: "anur4gsharma",
                target: "#gh-graph",
                theme: isLight ? "light" : "dark"
            });
        }
    }

    toggle.addEventListener('click', function () {
        const isLight = root.getAttribute('data-theme') === 'light';
        if (isLight) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        // !isLight = new theme after toggle
        renderGitHubGraph(!isLight);
    });

    // ===== Scroll Fade-In for Sections =====
    const sections = document.querySelectorAll('section, #hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    sections.forEach(s => observer.observe(s));
});
