const fs = require('fs');
const path = require('path');
const baseDir = path.join(process.cwd(), 'projects');

const projects = {
  'galactic-runner': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Galactic Runner</title>
    <style>
        body { margin: 0; overflow: hidden; background: #000; color: #fff; font-family: sans-serif; }
        canvas { display: block; }
        #ui { position: absolute; top: 20px; left: 20px; font-size: 24px; font-weight: bold; }
    </style>
</head>
<body>
    <div id="ui">Score: <span id="score">0</span></div>
    <canvas id="game"></canvas>
    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let score = 0;
        let frame = 0;
        const player = { x: 50, y: canvas.height/2, w: 30, h: 30, dy: 0 };
        const obstacles = [];
        
        window.addEventListener('keydown', (e) => { if (e.code === 'Space') player.dy = -10; });
        
        function loop() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Player
            player.y += player.dy;
            player.dy += 0.5; // gravity
            if (player.y > canvas.height - player.h) { player.y = canvas.height - player.h; player.dy = 0; }
            if (player.y < 0) { player.y = 0; player.dy = 0; }
            ctx.fillStyle = '#0f0';
            ctx.fillRect(player.x, player.y, player.w, player.h);
            
            // Obstacles
            if (frame % 100 === 0) {
                obstacles.push({ x: canvas.width, y: Math.random() * (canvas.height - 50), w: 30, h: 50 });
            }
            
            for (let i = 0; i < obstacles.length; i++) {
                let obs = obstacles[i];
                obs.x -= 5;
                ctx.fillStyle = '#f00';
                ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
                
                // Collision
                if (player.x < obs.x + obs.w && player.x + player.w > obs.x &&
                    player.y < obs.y + obs.h && player.y + player.h > obs.y) {
                    score = 0;
                    obstacles.length = 0;
                }
                
                if (obs.x + obs.w < 0) {
                    obstacles.splice(i, 1);
                    i--;
                    score++;
                    document.getElementById('score').innerText = score;
                }
            }
            
            frame++;
            requestAnimationFrame(loop);
        }
        loop();
    </script>
</body>
</html>`,

  'task-master-pro': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Task Master Pro</title>
    <style>
        body { margin: 0; font-family: system-ui, sans-serif; background: #f4f4f5; display: flex; padding: 40px; gap: 20px; }
        .col { flex: 1; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); min-height: 400px; }
        .col h2 { margin-top: 0; font-size: 1.2rem; color: #3f3f46; border-bottom: 2px solid #e4e4e7; padding-bottom: 10px; }
        .task { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; margin-bottom: 10px; border-radius: 6px; cursor: grab; }
        .task:active { cursor: grabbing; }
    </style>
</head>
<body>
    <div class="col" id="todo" ondragover="allowDrop(event)" ondrop="drop(event, 'todo')">
        <h2>To Do</h2>
        <div class="task" draggable="true" ondragstart="drag(event)" id="t1">Design UI Mockups</div>
        <div class="task" draggable="true" ondragstart="drag(event)" id="t2">Setup Next.js</div>
    </div>
    <div class="col" id="doing" ondragover="allowDrop(event)" ondrop="drop(event, 'doing')">
        <h2>In Progress</h2>
        <div class="task" draggable="true" ondragstart="drag(event)" id="t3">API Integration</div>
    </div>
    <div class="col" id="done" ondragover="allowDrop(event)" ondrop="drop(event, 'done')">
        <h2>Done</h2>
    </div>

    <script>
        function allowDrop(ev) { ev.preventDefault(); }
        function drag(ev) { ev.dataTransfer.setData('text', ev.target.id); }
        function drop(ev, colId) {
            ev.preventDefault();
            const data = ev.dataTransfer.getData('text');
            document.getElementById(colId).appendChild(document.getElementById(data));
        }
    </script>
</body>
</html>`,

  'markdown-notes-sync': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Markdown Notes Sync</title>
    <style>
        body { margin: 0; display: flex; height: 100vh; font-family: sans-serif; background: #18181b; color: #fff; }
        textarea { flex: 1; background: #27272a; color: #fff; border: none; padding: 20px; font-size: 16px; font-family: monospace; outline: none; resize: none; }
        #preview { flex: 1; padding: 20px; overflow-y: auto; background: #18181b; }
        #preview h1 { margin-top: 0; color: #a855f7; }
    </style>
</head>
<body>
    <textarea id="editor" placeholder="Type Markdown here..."></textarea>
    <div id="preview"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" integrity="sha256-XrRj5aRLLKl45+4aGqh9cR6ZBwS7TRb3I4AP1cX1c=" crossorigin="anonymous"></script>
    <script>
        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview');
        
        editor.value = localStorage.getItem('md-notes') || '# Hello World\\n\\nStart typing...';
        preview.innerHTML = marked.parse(editor.value);
        
        editor.addEventListener('input', (e) => {
            const val = e.target.value;
            preview.innerHTML = marked.parse(val);
            localStorage.setItem('md-notes', val);
        });
    </script>
</body>
</html>`,

  'crypto-dash': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Crypto Dashboard</title>
    <style>
        body { margin: 0; padding: 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: white; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .card { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
        .price { font-size: 3rem; font-weight: bold; margin: 10px 0; color: #22c55e; }
        .chart-box { height: 200px; border-bottom: 2px solid rgba(255,255,255,0.1); border-left: 2px solid rgba(255,255,255,0.1); margin-top: 30px; position: relative; }
        .bar { position: absolute; bottom: 0; width: 40px; background: #3b82f6; border-radius: 4px 4px 0 0; transition: height 0.5s; }
    </style>
</head>
<body>
    <div class="header">
        <h1>CryptoTracker Pro</h1>
        <div>User: <strong>Vishwa</strong></div>
    </div>
    
    <div class="card">
        <h3>Bitcoin (BTC)</h3>
        <div class="price" id="btc-price">$64,230.00</div>
        <div class="chart-box" id="chart"></div>
    </div>

    <script>
        const chart = document.getElementById('chart');
        const price = document.getElementById('btc-price');
        
        for(let i=0; i<10; i++) {
            let bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.left = (i * 50 + 10) + 'px';
            bar.style.height = (Math.random() * 150 + 20) + 'px';
            chart.appendChild(bar);
        }
        
        setInterval(() => {
            let current = 64230 + (Math.random() * 1000 - 500);
            price.innerText = '$' + current.toFixed(2);
            price.style.color = current > 64230 ? '#22c55e' : '#ef4444';
        }, 2000);
    </script>
</body>
</html>`,

  'ai-code-reviewer': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Code Reviewer CLI</title>
    <style>
        body { margin: 0; height: 100vh; display: flex; justify-content: center; align-items: center; background: #1e1e1e; font-family: monospace; }
        .terminal { background: #000; width: 80%; max-width: 800px; height: 500px; border-radius: 10px; padding: 20px; color: #0f0; overflow-y: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #333; }
        .prefix { color: #f0f; }
        .warn { color: #ff0; }
        .err { color: #f00; }
        .btn { display: inline-block; padding: 5px 15px; background: #333; color: #fff; cursor: pointer; border-radius: 4px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="terminal" id="term">
        <div><span class="prefix">~</span> $ ai-review ./src/components</div>
        <div style="margin-top:10px; color:#aaa;">Analyzing 14 files...</div>
    </div>
    
    <script>
        const term = document.getElementById('term');
        const logs = [
            "<span class='warn'>[WARN]</span> Button.jsx: Unused import 'React'.",
            "<span class='err'>[ERROR]</span> auth.js: Possible injection vulnerability detected on line 42.",
            "<span style='color:#0f0'>[OK]</span> Sidebar.jsx looks perfectly optimized.",
            "<br/><b>AI Summary:</b>",
            "I found 1 critical security flaw and 1 minor styling issue. Recommend fixing auth.js immediately before merging."
        ];
        
        let i = 0;
        const int = setInterval(() => {
            if (i >= logs.length) {
                clearInterval(int);
                term.innerHTML += '<div class="btn" onclick="alert(\\'Fixing...\\')">Auto-Fix All</div>';
                return;
            }
            term.innerHTML += '<div style="margin-top:8px;">' + logs[i] + '</div>';
            term.scrollTop = term.scrollHeight;
            i++;
        }, 800);
    </script>
</body>
</html>`,

  'dev-portfolio-template': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dev Portfolio Template</title>
    <style>
        body { margin: 0; font-family: 'Helvetica Neue', sans-serif; color: #333; background: #fafafa; }
        .hero { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: linear-gradient(135deg, #a855f7, #3b82f6); color: white; }
        h1 { font-size: 4rem; margin: 0; letter-spacing: -2px; }
        p { font-size: 1.5rem; opacity: 0.9; max-width: 600px; }
        .btn { padding: 15px 30px; background: white; color: #a855f7; border-radius: 50px; text-decoration: none; font-weight: bold; margin-top: 20px; transition: transform 0.2s; display: inline-block; }
        .btn:hover { transform: scale(1.05); }
    </style>
</head>
<body>
    <div class="hero">
        <h1>Hi, I'm Vishwa</h1>
        <p>I build exceptional digital experiences. Currently focused on open-source, React, and beautiful UIs.</p>
        <a href="#" class="btn">View My Work</a>
    </div>
</body>
</html>`
};

for (const [slug, html] of Object.entries(projects)) {
  const p = path.join(baseDir, slug, 'index.html');
  fs.writeFileSync(p, html);
  
  // Also remove demoUrl from project.json so it safely defaults to our local /live/ route
  const jsonPath = path.join(baseDir, slug, 'project.json');
  if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    delete data.demoUrl;
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  }
}

console.log('Successfully generated 6 HTML projects and updated configs!');
