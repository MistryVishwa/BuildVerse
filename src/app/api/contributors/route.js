import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Fetch contributors from GitHub
    const [contributorsRes, pullsRes] = await Promise.all([
      fetch('https://api.github.com/repos/MistryVishwa/BuildVerse/contributors', { next: { revalidate: 3600 } }),
      fetch('https://api.github.com/search/issues?q=repo:MistryVishwa/BuildVerse+is:pr+is:merged+merged-by:MistryVishwa&per_page=100', { next: { revalidate: 3600 } })
    ]);

    if (!contributorsRes.ok) throw new Error('Failed to fetch contributors from GitHub API');
    if (!pullsRes.ok) throw new Error('Failed to fetch pulls from GitHub API');

    const githubContributors = await contributorsRes.json();
    const githubPullsData = await pullsRes.json();
    const githubPulls = githubPullsData.items || [];

    // 2. Aggregate PRs
    const prsMap = {}; // Maps username to PR count
    const uniqueContributors = new Map(); // Maps username to contributor object

    // Add people from the contributors endpoint
    for (const c of githubContributors) {
      const username = c.login.toLowerCase();
      uniqueContributors.set(username, { ...c });
    }

    // Add PR counts and include people who only made PRs
    for (const pr of githubPulls) {
      if (!pr.user) continue;
      const username = pr.user.login.toLowerCase();
      prsMap[username] = (prsMap[username] || 0) + 1;
      
      if (!uniqueContributors.has(username)) {
        uniqueContributors.set(username, {
          id: pr.user.id,
          login: pr.user.login,
          avatar_url: pr.user.avatar_url,
          html_url: pr.user.html_url,
          contributions: 0 // They have no direct commits on the default branch
        });
      }
    }

    // 3. Scan local projects to count authored projects
    const projectsDir = path.join(process.cwd(), 'projects');
    const projectsMap = {}; // Maps github username to count

    if (fs.existsSync(projectsDir)) {
      const folders = fs.readdirSync(projectsDir);
      for (const folder of folders) {
        const jsonPath = path.join(projectsDir, folder, 'project.json');
        if (fs.existsSync(jsonPath)) {
          try {
            const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            if (data.author && data.author.github) {
              const username = data.author.github.toLowerCase();
              projectsMap[username] = (projectsMap[username] || 0) + 1;
            }
          } catch (e) {
            console.error('Error parsing project config', e);
          }
        }
      }
    }

    // 4. Aggregate data and calculate score
    const contributors = Array.from(uniqueContributors.values()).map((c) => {
      const username = c.login.toLowerCase();
      const projectsCount = projectsMap[username] || 0;
      const prsCount = prsMap[username] || 0;
      
      // Basic scoring algorithm
      // Commits are worth 10 points, each published project is worth 50 points, each PR is worth 20 points
      const score = (c.contributions * 10) + (projectsCount * 50) + (prsCount * 20);

      return {
        id: c.id,
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
        commits: c.contributions,
        projects: projectsCount,
        prs: prsCount,
        score: score
      };
    });

    // 5. Sort by score descending
    contributors.sort((a, b) => b.score - a.score);

    return NextResponse.json(contributors);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch contributors' }, { status: 500 });
  }
}
