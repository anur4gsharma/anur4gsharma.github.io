const contributionGrid = document.getElementById('contribution-grid');
const contributionSummary = document.getElementById('contribution-summary');

async function loadGitHubContributions() {
    if (!contributionGrid) return;

    try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/anur4gsharma?y=last');
        if (!response.ok) throw new Error('Contribution data was unavailable.');

        const activity = await response.json();
        const contributions = activity.contributions || [];
        const activityByDate = new Map(contributions.map(({ date, level, count }) => [date, { level, count }]));
        const end = new Date();
        const start = new Date(end);
        start.setDate(end.getDate() - 364 - end.getDay());

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
        }

        const total = activity.total?.lastYear ?? contributions.reduce((sum, item) => sum + item.count, 0);
        contributionGrid.setAttribute('aria-label', `${total} GitHub contributions in the last year`);
        contributionSummary.textContent = `${total} contributions in the last year`;
    } catch (error) {
        contributionGrid.setAttribute('aria-label', 'GitHub activity could not be loaded');
        contributionSummary.textContent = 'Live GitHub activity is temporarily unavailable.';
    }
}

loadGitHubContributions();
