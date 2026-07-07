const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const projects = [
  'ai-code-reviewer',
  'crypto-dash',
  'dev-portfolio-template',
  'galactic-runner',
  'markdown-notes-sync',
  'task-master-pro'
];

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: "new" });
  
  for (const slug of projects) {
    console.log(`Taking screenshot for ${slug}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    try {
      await page.goto(`http://localhost:3000/live/${slug}/index.html`, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait a moment for any animations/fonts to load
      await new Promise(r => setTimeout(r, 2000));
      
      const outPath = path.join(__dirname, 'projects', slug, 'preview.png');
      await page.screenshot({ path: outPath, type: 'png' });
      console.log(`Saved screenshot to ${outPath}`);
    } catch (err) {
      console.error(`Failed to screenshot ${slug}:`, err.message);
    }
    
    await page.close();
  }
  
  await browser.close();
  console.log('All screenshots completed!');
}

takeScreenshots();
