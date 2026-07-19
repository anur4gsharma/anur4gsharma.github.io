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
    function renderGitHubGraph() {
        if (window.GitHubGraph) {
            const isLight = root.getAttribute('data-theme') === 'light';
            GitHubGraph.render({
                username: "anur4gsharma",
                target: "#gh-graph",
                theme: isLight ? "light" : "dark"
            });
        }
    }

    // Initial render
    renderGitHubGraph();

    toggle.addEventListener('click', function () {
        const isLight = root.getAttribute('data-theme') === 'light';
        if (isLight) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        renderGitHubGraph();
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
