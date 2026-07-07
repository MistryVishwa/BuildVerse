import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED_EXTENSIONS = [
  '.html', '.css', '.js', '.json', 
  '.png', '.jpg', '.jpeg', '.svg', '.ico',
  '.txt', '.md', '.woff', '.woff2', '.ttf'
];

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug;
  
  // Validate slug contains only safe characters (alphanumeric, hyphens, underscores, dots)
  const safeSlug = slugArray.map(s => s.replace(/[^a-zA-Z0-9\-_.]/g, ''));
  
  // Prevent any empty segments or path traversal attempts
  if (slugArray.some((s, i) => s !== safeSlug[i] || s === '..')) {
    return new NextResponse('Invalid characters in path', { status: 400 });
  }
  
  const baseDir = path.join(process.cwd(), 'projects');
  const filePath = path.join(baseDir, ...safeSlug);
  
  // Ensure the resolved path is within the projects directory (prevent path traversal)
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(baseDir)) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    const file = fs.readFileSync(resolvedPath);
    const ext = path.extname(resolvedPath).toLowerCase();
    
    let contentType = 'text/plain';
    if (ext === '.html') contentType = 'text/html; charset=utf-8';
    else if (ext === '.css') contentType = 'text/css; charset=utf-8';
    else if (ext === '.js') contentType = 'application/javascript; charset=utf-8';
    else if (ext === '.json') contentType = 'application/json; charset=utf-8';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.ico') contentType = 'image/x-icon';
    
    return new NextResponse(file, { headers: { 'Content-Type': contentType } });
  }
  
  return new NextResponse('File not found', { status: 404 });
}
