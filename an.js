const contributionGrid = document.getElementById('contribution-grid');
const contributionSummary = document.getElementById('contribution-summary');
const mobileContributions = window.matchMedia('(max-width: 600px)');
let contributions = [];

function renderContributions() {
    if (!contributionGrid) return;

    const isMobile = mobileContributions.matches;
    const daysToShow = isMobile ? 90 : 365;
    const end = new Date();
    end.setHours(0, 0, 0, 0);
    const start = new Date(end);
    start.setDate(end.getDate() - (daysToShow - 1));
    if (!isMobile) start.setDate(start.getDate() - start.getDay());

    const activityByDate = new Map(contributions.map(({ date, level, count }) => [date, { level, count }]));
    contributionGrid.replaceChildren();
    let total = 0;

    for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
        const date = day.toISOString().slice(0, 10);
        const cell = document.createElement('span');
        const activityForDay = activityByDate.get(date) || { level: 0, count: 0 };
        const { level, count } = activityForDay;
        cell.className = `graph-cell${level ? ` level-${level}` : ''}`;
        const contributionLabel = `${count} ${count === 1 ? 'contribution' : 'contributions'} on ${new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
        cell.title = contributionLabel;
        cell.setAttribute('aria-label', contributionLabel);
        contributionGrid.appendChild(cell);
        total += count;
    }

    const period = isMobile ? 'last 3 months' : 'last year';
    contributionGrid.setAttribute('aria-label', `${total} GitHub contributions in the ${period}`);
    contributionSummary.textContent = `${total} contributions in the ${period}`;
}

async function loadGitHubContributions() {
    if (!contributionGrid) return;

    try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/anur4gsharma?y=last');
        if (!response.ok) throw new Error('Contribution data was unavailable.');

        const activity = await response.json();
        contributions = activity.contributions || [];
        renderContributions();
    } catch (error) {
        contributionGrid.setAttribute('aria-label', 'GitHub activity could not be loaded');
        contributionSummary.textContent = 'Live GitHub activity is temporarily unavailable.';
    }
}

loadGitHubContributions();
mobileContributions.addEventListener('change', renderContributions);
