import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const projectsDir = path.join(process.cwd(), 'projects');
  
  if (!fs.existsSync(projectsDir)) {
    return NextResponse.json({ projects: [] });
  }

  const projectFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());
    
  const projects = projectFolders.map(folder => {
    const projectJsonPath = path.join(projectsDir, folder.name, 'project.json');
    if (fs.existsSync(projectJsonPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
        return {
          ...data,
          slug: folder.name,
        };
      } catch (e) {
        console.error(`Error parsing project.json for ${folder.name}`, e);
        return null;
      }
    }
    return null;
  }).filter(Boolean);

  return NextResponse.json({ projects });
}
