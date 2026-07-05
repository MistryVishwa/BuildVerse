import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Fetch contributors from GitHub
    // Using a 1-hour revalidate cache to avoid rate limits
    const response = await fetch('https://api.github.com/repos/MistryVishwa/BuildVerse/contributors', {
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from GitHub API');
    }

    const githubContributors = await response.json();

    // 2. Scan local projects to count authored projects
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

    // 3. Aggregate data and calculate score
    const contributors = githubContributors.map((c) => {
      const username = c.login.toLowerCase();
      const projectsCount = projectsMap[username] || 0;
      
      // Basic scoring algorithm
      // Commits are worth 10 points, each published project is worth 50 points
      const score = (c.contributions * 10) + (projectsCount * 50);

      return {
        id: c.id,
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
        commits: c.contributions,
        projects: projectsCount,
        score: score
      };
    });

    // 4. Sort by score descending
    contributors.sort((a, b) => b.score - a.score);

    return NextResponse.json(contributors);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch contributors' }, { status: 500 });
  }
}
