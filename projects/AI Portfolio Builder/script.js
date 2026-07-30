// ==========================================
// 1. DEFAULT DATA DEFINITIONS
// ==========================================
const DEFAULT_PORTFOLIO_DATA = {
  personalInfo: {
    name: "Alex Morgan",
    title: "Senior Full Stack Engineer",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bio: "I am a passionate software engineer with 6+ years of experience building high-performance web applications and beautiful responsive interfaces. I specialize in React, Node.js, modern CSS layouts, and cloud architectures. Focused on clean code, performance optimization, and intuitive user experiences.",
    email: "alex.morgan@dev.io",
    phone: "+1 (555) 342-9871",
    location: "Seattle, WA",
    website: "https://alexmorgan.dev"
  },
  socialLinks: {
    github: "https://github.com/alexmorgan",
    linkedin: "https://linkedin.com/in/alexmorgan",
    twitter: "https://twitter.com/alexmorgan_dev",
    youtube: "https://youtube.com/@alexmorgancodes"
  },
  skills: [
    { name: "JavaScript (ES6+)", level: "Expert" },
    { name: "TypeScript", level: "Expert" },
    { name: "HTML5 & CSS3", level: "Expert" },
    { name: "React & Next.js", level: "Advanced" },
    { name: "Node.js & Express", level: "Advanced" },
    { name: "GraphQL & REST APIs", level: "Advanced" },
    { name: "PostgreSQL & MongoDB", level: "Intermediate" },
    { name: "Docker & AWS", level: "Intermediate" }
  ],
  experience: [
    {
      company: "TechNova Solutions",
      position: "Lead Software Engineer",
      duration: "2023 - Present",
      description: "Leading a team of 5 engineers to rebuild the core enterprise dashboard. Optimized web performance, cutting page load times by 40%. Implemented shared design tokens and modular UI components."
    },
    {
      company: "PixelPerfect Web Studio",
      position: "Senior Frontend Developer",
      duration: "2020 - 2023",
      description: "Crafted stunning responsive interfaces and custom interaction systems for international clients. Managed modular state lifecycles and established CSS layout architecture guidelines."
    }
  ],
  education: [
    {
      institution: "University of Washington",
      degree: "B.S. in Computer Science",
      duration: "2016 - 2020",
      description: "Focused on human-computer interaction, web architectures, and algorithms. Graduated with Honors."
    }
  ],
  projects: [
    {
      title: "DevFlow Project Planner",
      description: "A collaborative project management application featuring interactive Kanban boards, live progress timelines, and visual team workload analysis dashboards.",
      technologies: "TypeScript, React, Node.js, Socket.io",
      github: "https://github.com/alexmorgan/devflow",
      demo: "https://devflow-planner.demo"
    },
    {
      title: "Quantum CSS Library",
      description: "A lightweight, zero-dependency utility CSS module optimized for fast rendering, micro-interactions, and glassmorphic designs.",
      technologies: "JavaScript, CSS3, HTML5",
      github: "https://github.com/alexmorgan/quantum-css",
      demo: "https://quantum-css.org"
    }
  ],
  certifications: [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024-03"
    },
    {
      title: "Google Advanced UX Design Certificate",
      issuer: "Google",
      date: "2022-08"
    }
  ],
  achievements: [
    {
      title: "1st Place - TechNova Hackathon 2024",
      description: "Designed and built an AI-powered code translation tool in under 48 hours, winning first place out of 60 teams."
    },
    {
      title: "Open Source Contributor",
      description: "Contributed critical performance optimization patches to multiple popular frontend utilities and package projects."
    }
  ],
  theme: {
    template: "modern",
    primaryColor: "#4f46e5",
    accentColor: "#06b6d4",
    fontFamily: "Outfit",
    borderRadius: "12px",
    darkMode: true,
    visibility: {
      skills: true,
      experience: true,
      education: true,
      projects: true,
      certifications: true,
      achievements: true
    }
  }
};

// Application State
let appState = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));

// ==========================================
// 2. INITIALIZATION & STATE SYNC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initDashboardTheme();
  loadStateFromLocalStorage();
  bindStaticEventListeners();
  populateFormInputs();
  renderAllDynamicLists();
  triggerLivePreviewUpdate();
  
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Load state from localstorage
function loadStateFromLocalStorage() {
  const savedData = localStorage.getItem("bv_ai_portfolio_data");
  if (savedData) {
    try {
      appState = JSON.parse(savedData);
      
      // Ensure theme object structure matches in case of updates
      if (!appState.theme) appState.theme = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA.theme));
      if (!appState.theme.visibility) appState.theme.visibility = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA.theme.visibility));
      if (!appState.certifications) appState.certifications = [];
      if (!appState.achievements) appState.achievements = [];
    } catch (e) {
      console.error("Error parsing LocalStorage portfolio data", e);
      appState = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    }
  }
}

// Save state to localstorage
function saveStateToLocalStorage() {
  localStorage.setItem("bv_ai_portfolio_data", JSON.stringify(appState));
}

// Reset data
function resetPortfolioData() {
  if (confirm("Are you sure you want to reset all portfolio fields to default? This cannot be undone.")) {
    appState = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    saveStateToLocalStorage();
    populateFormInputs();
    renderAllDynamicLists();
    triggerLivePreviewUpdate();
    alert("Portfolio builder reset successfully!");
  }
}

// Initialize Dashboard (Light/Dark mode)
function initDashboardTheme() {
  const savedDashTheme = localStorage.getItem("bv_dashboard_theme") || "dark";
  if (savedDashTheme === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  }
}

// Toggle Dashboard Theme
function toggleDashboardTheme() {
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem("bv_dashboard_theme", "light");
  } else {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
    localStorage.setItem("bv_dashboard_theme", "dark");
  }
}

// ==========================================
// 3. FORM BINDING & ACCORDIONS
// ==========================================
function bindStaticEventListeners() {
  // Accordion Toggles
  const accordions = document.querySelectorAll(".accordion-header");
  accordions.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");
      
      // Close all accordions
      document.querySelectorAll(".accordion-item").forEach(acc => {
        acc.classList.remove("active");
        acc.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
      });
      
      if (!isActive) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Theme Preset Buttons
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const primary = btn.dataset.primary;
      const accent = btn.dataset.accent;
      const font = btn.dataset.font;
      const radius = btn.dataset.radius;

      document.getElementById("theme-primary").value = primary;
      document.getElementById("theme-accent").value = accent;
      document.getElementById("theme-font").value = font;
      document.getElementById("theme-radius").value = parseInt(radius);

      document.getElementById("primary-hex").textContent = primary;
      document.getElementById("accent-hex").textContent = accent;
      document.getElementById("radius-val").textContent = radius;

      appState.theme.primaryColor = primary;
      appState.theme.accentColor = accent;
      appState.theme.fontFamily = font;
      appState.theme.borderRadius = radius;

      saveStateToLocalStorage();
      triggerLivePreviewUpdate();
    });
  });

  // Color Pickers
  const primaryPicker = document.getElementById("theme-primary");
  primaryPicker.addEventListener("input", (e) => {
    const val = e.target.value;
    document.getElementById("primary-hex").textContent = val;
    appState.theme.primaryColor = val;
    saveStateToLocalStorage();
    triggerLivePreviewUpdate();
  });

  const accentPicker = document.getElementById("theme-accent");
  accentPicker.addEventListener("input", (e) => {
    const val = e.target.value;
    document.getElementById("accent-hex").textContent = val;
    appState.theme.accentColor = val;
    saveStateToLocalStorage();
    triggerLivePreviewUpdate();
  });

  // Font Family Selector
  const fontSelector = document.getElementById("theme-font");
  fontSelector.addEventListener("change", (e) => {
    appState.theme.fontFamily = e.target.value;
    saveStateToLocalStorage();
    triggerLivePreviewUpdate();
  });

  // Border Radius Slider
  const radiusSlider = document.getElementById("theme-radius");
  radiusSlider.addEventListener("input", (e) => {
    const val = e.target.value + "px";
    document.getElementById("radius-val").textContent = val;
    appState.theme.borderRadius = val;
    saveStateToLocalStorage();
    triggerLivePreviewUpdate();
  });

  // Output Dark Mode Toggle
  const portfolioDarkCheckbox = document.getElementById("portfolio-dark-mode");
  portfolioDarkCheckbox.addEventListener("change", (e) => {
    appState.theme.darkMode = e.target.checked;
    saveStateToLocalStorage();
    triggerLivePreviewUpdate();
  });

  // Section Visibilities
  const visCheckboxes = ["skills", "experience", "education", "projects", "certifications", "achievements"];
  visCheckboxes.forEach(sec => {
    const el = document.getElementById(`vis-${sec}`);
    if (el) {
      el.addEventListener("change", (e) => {
        appState.theme.visibility[sec] = e.target.checked;
        saveStateToLocalStorage();
        triggerLivePreviewUpdate();
      });
    }
  });

  // Template Radio Buttons
  const templateRadios = document.querySelectorAll('input[name="portfolio-template"]');
  templateRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      appState.theme.template = e.target.value;
      saveStateToLocalStorage();
      triggerLivePreviewUpdate();
    });
  });

  // Personal Info Form Binding
  const personalFields = {
    "p-name": ["personalInfo", "name"],
    "p-title": ["personalInfo", "title"],
    "p-photo": ["personalInfo", "photo"],
    "p-bio": ["personalInfo", "bio"],
    "p-email": ["personalInfo", "email"],
    "p-phone": ["personalInfo", "phone"],
    "p-location": ["personalInfo", "location"],
    "p-website": ["personalInfo", "website"]
  };
  bindFormInputs(personalFields);

  // Social Links Form Binding
  const socialFields = {
    "s-github": ["socialLinks", "github"],
    "s-linkedin": ["socialLinks", "linkedin"],
    "s-twitter": ["socialLinks", "twitter"],
    "s-youtube": ["socialLinks", "youtube"]
  };
  bindFormInputs(socialFields);

  // Dynamic Add Item Buttons
  document.getElementById("add-skill-btn").addEventListener("click", () => addDynamicItem("skills", { name: "", level: "Intermediate" }));
  document.getElementById("add-experience-btn").addEventListener("click", () => addDynamicItem("experience", { company: "", position: "", duration: "", description: "" }));
  document.getElementById("add-education-btn").addEventListener("click", () => addDynamicItem("education", { institution: "", degree: "", duration: "", description: "" }));
  document.getElementById("add-project-btn").addEventListener("click", () => addDynamicItem("projects", { title: "", description: "", technologies: "", github: "", demo: "" }));
  document.getElementById("add-certification-btn").addEventListener("click", () => addDynamicItem("certifications", { title: "", issuer: "", date: "" }));
  document.getElementById("add-achievement-btn").addEventListener("click", () => addDynamicItem("achievements", { title: "", description: "" }));

  // Dashboard Theme Toggle & Reset Actions
  document.getElementById("theme-toggle-btn").addEventListener("click", toggleDashboardTheme);
  document.getElementById("reset-btn").addEventListener("click", resetPortfolioData);

  // Exporters
  document.getElementById("export-html-btn").addEventListener("click", exportHTMLOnly);
  document.getElementById("export-css-btn").addEventListener("click", exportCSSOnly);
  document.getElementById("export-zip-btn").addEventListener("click", exportZipBundle);
  document.getElementById("print-pdf-btn").addEventListener("click", printPortfolioPDF);

  // Device sizer
  const deviceButtons = document.querySelectorAll(".device-btn");
  const wrapper = document.getElementById("iframe-wrapper");
  deviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      deviceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const device = btn.dataset.device;
      wrapper.className = `iframe-wrapper device-${device}`;
    });
  });
}

// Binds basic keyup/change input events to state
function bindFormInputs(mapping) {
  Object.keys(mapping).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", (e) => {
        const path = mapping[id];
        appState[path[0]][path[1]] = e.target.value;
        saveStateToLocalStorage();
        triggerLivePreviewUpdate();
      });
    }
  });
}

// Populate basic form input values from state
function populateFormInputs() {
  // Template Select
  const templateRadio = document.querySelector(`input[name="portfolio-template"][value="${appState.theme.template}"]`);
  if (templateRadio) templateRadio.checked = true;

  // Personal Info
  document.getElementById("p-name").value = appState.personalInfo.name || "";
  document.getElementById("p-title").value = appState.personalInfo.title || "";
  document.getElementById("p-photo").value = appState.personalInfo.photo || "";
  document.getElementById("p-bio").value = appState.personalInfo.bio || "";
  document.getElementById("p-email").value = appState.personalInfo.email || "";
  document.getElementById("p-phone").value = appState.personalInfo.phone || "";
  document.getElementById("p-location").value = appState.personalInfo.location || "";
  document.getElementById("p-website").value = appState.personalInfo.website || "";

  // Socials
  document.getElementById("s-github").value = appState.socialLinks.github || "";
  document.getElementById("s-linkedin").value = appState.socialLinks.linkedin || "";
  document.getElementById("s-twitter").value = appState.socialLinks.twitter || "";
  document.getElementById("s-youtube").value = appState.socialLinks.youtube || "";

  // Theme customizer values
  document.getElementById("theme-primary").value = appState.theme.primaryColor || "#4f46e5";
  document.getElementById("theme-accent").value = appState.theme.accentColor || "#06b6d4";
  document.getElementById("theme-font").value = appState.theme.fontFamily || "Outfit";
  document.getElementById("theme-radius").value = parseInt(appState.theme.borderRadius) || 12;
  document.getElementById("portfolio-dark-mode").checked = appState.theme.darkMode !== false;

  document.getElementById("primary-hex").textContent = appState.theme.primaryColor || "#4f46e5";
  document.getElementById("accent-hex").textContent = appState.theme.accentColor || "#06b6d4";
  document.getElementById("radius-val").textContent = appState.theme.borderRadius || "12px";

  // Section Visibilities
  const visCheckboxes = ["skills", "experience", "education", "projects", "certifications", "achievements"];
  visCheckboxes.forEach(sec => {
    const el = document.getElementById(`vis-${sec}`);
    if (el) {
      el.checked = appState.theme.visibility[sec] !== false;
    }
  });
}

// ==========================================
// 4. DYNAMIC LIST MANAGEMENT
// ==========================================
function renderAllDynamicLists() {
  renderDynamicList("skills", renderSkillItemDOM);
  renderDynamicList("experience", renderExperienceItemDOM);
  renderDynamicList("education", renderEducationItemDOM);
  renderDynamicList("projects", renderProjectItemDOM);
  renderDynamicList("certifications", renderCertificationItemDOM);
  renderDynamicList("achievements", renderAchievementItemDOM);
}

function renderDynamicList(key, domGenerator) {
  const container = document.getElementById(`${key}-list`);
  if (!container) return;
  
  container.innerHTML = "";
  const list = appState[key] || [];
  
  list.forEach((item, index) => {
    const dom = domGenerator(index, item);
    container.appendChild(dom);
  });
}

function addDynamicItem(key, defaultObj) {
  if (!appState[key]) appState[key] = [];
  appState[key].push(defaultObj);
  saveStateToLocalStorage();
  renderAllDynamicLists();
  triggerLivePreviewUpdate();
}

function removeDynamicItem(key, index) {
  if (!appState[key]) return;
  appState[key].splice(index, 1);
  saveStateToLocalStorage();
  renderAllDynamicLists();
  triggerLivePreviewUpdate();
}

function updateDynamicField(key, index, field, value) {
  if (!appState[key] || !appState[key][index]) return;
  appState[key][index][field] = value;
  saveStateToLocalStorage();
  triggerLivePreviewUpdate();
}

// Generator - Skill DOM
function renderSkillItemDOM(index, skill) {
  const div = document.createElement("div");
  div.className = "dynamic-item-card";
  div.innerHTML = `
    <div class="item-card-header">
      <span class="item-index-label">Skill #${index + 1}</span>
      <button type="button" class="btn-remove-item" title="Delete skill">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
    <div class="form-grid">
      <div class="form-group col-span-2">
        <label>Skill Name <span class="required">*</span></label>
        <input type="text" class="skill-name-input" value="${skill.name || ""}" placeholder="e.g. JavaScript" required>
      </div>
      <div class="form-group col-span-2">
        <label>Skill Level</label>
        <select class="skill-level-input">
          <option value="Beginner" ${skill.level === "Beginner" ? "selected" : ""}>Beginner</option>
          <option value="Intermediate" ${skill.level === "Intermediate" ? "selected" : ""}>Intermediate</option>
          <option value="Advanced" ${skill.level === "Advanced" ? "selected" : ""}>Advanced</option>
          <option value="Expert" ${skill.level === "Expert" ? "selected" : ""}>Expert</option>
        </select>
      </div>
    </div>
  `;
  
  // Attach listeners
  div.querySelector(".btn-remove-item").addEventListener("click", () => removeDynamicItem("skills", index));
  div.querySelector(".skill-name-input").addEventListener("input", (e) => updateDynamicField("skills", index, "name", e.target.value));
  div.querySelector(".skill-level-input").addEventListener("change", (e) => updateDynamicField("skills", index, "level", e.target.value));
  
  if (window.lucide) window.lucide.createIcons({ src: div });
  return div;
}

// Generator - Experience DOM
function renderExperienceItemDOM(index, exp) {
  const div = document.createElement("div");
  div.className = "dynamic-item-card";
  div.innerHTML = `
    <div class="item-card-header">
      <span class="item-index-label">Experience #${index + 1}</span>
      <button type="button" class="btn-remove-item" title="Delete experience">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label>Company <span class="required">*</span></label>
        <input type="text" class="exp-company-input" value="${exp.company || ""}" placeholder="e.g. TechCorp" required>
      </div>
      <div class="form-group">
        <label>Position <span class="required">*</span></label>
        <input type="text" class="exp-position-input" value="${exp.position || ""}" placeholder="e.g. Senior Dev" required>
      </div>
      <div class="form-group col-span-2">
        <label>Duration <span class="required">*</span></label>
        <input type="text" class="exp-duration-input" value="${exp.duration || ""}" placeholder="e.g. Jan 2021 - Present" required>
      </div>
      <div class="form-group col-span-2">
        <label>Description <span class="required">*</span></label>
        <textarea class="exp-desc-input" rows="3" placeholder="Describe your achievements and tasks..." required>${exp.description || ""}</textarea>
      </div>
    </div>
  `;
  
  // Attach listeners
  div.querySelector(".btn-remove-item").addEventListener("click", () => removeDynamicItem("experience", index));
  div.querySelector(".exp-company-input").addEventListener("input", (e) => updateDynamicField("experience", index, "company", e.target.value));
  div.querySelector(".exp-position-input").addEventListener("input", (e) => updateDynamicField("experience", index, "position", e.target.value));
  div.querySelector(".exp-duration-input").addEventListener("input", (e) => updateDynamicField("experience", index, "duration", e.target.value));
  div.querySelector(".exp-desc-input").addEventListener("input", (e) => updateDynamicField("experience", index, "description", e.target.value));
  
  if (window.lucide) window.lucide.createIcons({ src: div });
  return div;
}

// Generator - Education DOM
function renderEducationItemDOM(index, edu) {
  const div = document.createElement("div");
  div.className = "dynamic-item-card";
  div.innerHTML = `
    <div class="item-card-header">
      <span class="item-index-label">Education #${index + 1}</span>
      <button type="button" class="btn-remove-item" title="Delete education">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label>Institution <span class="required">*</span></label>
        <input type="text" class="edu-inst-input" value="${edu.institution || ""}" placeholder="e.g. Stanford University" required>
      </div>
      <div class="form-group">
        <label>Degree <span class="required">*</span></label>
        <input type="text" class="edu-degree-input" value="${edu.degree || ""}" placeholder="e.g. M.S. in Software Engineering" required>
      </div>
      <div class="form-group col-span-2">
        <label>Duration <span class="required">*</span></label>
        <input type="text" class="edu-duration-input" value="${edu.duration || ""}" placeholder="e.g. 2018 - 2020" required>
      </div>
      <div class="form-group col-span-2">
        <label>Description</label>
        <textarea class="edu-desc-input" rows="2" placeholder="Relevant coursework, honors, activities...">${edu.description || ""}</textarea>
      </div>
    </div>
  `;
  
  // Attach listeners
  div.querySelector(".btn-remove-item").addEventListener("click", () => removeDynamicItem("education", index));
  div.querySelector(".edu-inst-input").addEventListener("input", (e) => updateDynamicField("education", index, "institution", e.target.value));
  div.querySelector(".edu-degree-input").addEventListener("input", (e) => updateDynamicField("education", index, "degree", e.target.value));
  div.querySelector(".edu-duration-input").addEventListener("input", (e) => updateDynamicField("education", index, "duration", e.target.value));
  div.querySelector(".edu-desc-input").addEventListener("input", (e) => updateDynamicField("education", index, "description", e.target.value));
  
  if (window.lucide) window.lucide.createIcons({ src: div });
  return div;
}

// Generator - Project DOM
function renderProjectItemDOM(index, proj) {
  const div = document.createElement("div");
  div.className = "dynamic-item-card";
  div.innerHTML = `
    <div class="item-card-header">
      <span class="item-index-label">Project #${index + 1}</span>
      <button type="button" class="btn-remove-item" title="Delete project">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
    <div class="form-grid">
      <div class="form-group col-span-2">
        <label>Project Title <span class="required">*</span></label>
        <input type="text" class="proj-title-input" value="${proj.title || ""}" placeholder="e.g. AI Chatbot" required>
      </div>
      <div class="form-group col-span-2">
        <label>Description <span class="required">*</span></label>
        <textarea class="proj-desc-input" rows="3" placeholder="Briefly describe what this project does..." required>${proj.description || ""}</textarea>
      </div>
      <div class="form-group col-span-2">
        <label>Technologies Used <span class="required">*</span></label>
        <input type="text" class="proj-tech-input" value="${proj.technologies || ""}" placeholder="e.g. React, Node.js, Tailwind" required>
      </div>
      <div class="form-group">
        <label>GitHub Repository Link</label>
        <input type="url" class="proj-git-input" value="${proj.github || ""}" placeholder="https://github.com/...">
      </div>
      <div class="form-group">
        <label>Live Demo Link</label>
        <input type="url" class="proj-demo-input" value="${proj.demo || ""}" placeholder="https://...">
      </div>
    </div>
  `;
  
  // Attach listeners
  div.querySelector(".btn-remove-item").addEventListener("click", () => removeDynamicItem("projects", index));
  div.querySelector(".proj-title-input").addEventListener("input", (e) => updateDynamicField("projects", index, "title", e.target.value));
  div.querySelector(".proj-desc-input").addEventListener("input", (e) => updateDynamicField("projects", index, "description", e.target.value));
  div.querySelector(".proj-tech-input").addEventListener("input", (e) => updateDynamicField("projects", index, "technologies", e.target.value));
  div.querySelector(".proj-git-input").addEventListener("input", (e) => updateDynamicField("projects", index, "github", e.target.value));
  div.querySelector(".proj-demo-input").addEventListener("input", (e) => updateDynamicField("projects", index, "demo", e.target.value));
  
  if (window.lucide) window.lucide.createIcons({ src: div });
  return div;
}

// Generator - Certification DOM
function renderCertificationItemDOM(index, cert) {
  const div = document.createElement("div");
  div.className = "dynamic-item-card";
  div.innerHTML = `
    <div class="item-card-header">
      <span class="item-index-label">Certification #${index + 1}</span>
      <button type="button" class="btn-remove-item" title="Delete certification">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
    <div class="form-grid">
      <div class="form-group col-span-2">
        <label>Certification Name <span class="required">*</span></label>
        <input type="text" class="cert-title-input" value="${cert.title || ""}" placeholder="e.g. AWS Solutions Architect" required>
      </div>
      <div class="form-group">
        <label>Issuer <span class="required">*</span></label>
        <input type="text" class="cert-issuer-input" value="${cert.issuer || ""}" placeholder="e.g. Amazon Web Services" required>
      </div>
      <div class="form-group">
        <label>Date Issued</label>
        <input type="text" class="cert-date-input" value="${cert.date || ""}" placeholder="e.g. March 2024">
      </div>
    </div>
  `;
  
  // Attach listeners
  div.querySelector(".btn-remove-item").addEventListener("click", () => removeDynamicItem("certifications", index));
  div.querySelector(".cert-title-input").addEventListener("input", (e) => updateDynamicField("certifications", index, "title", e.target.value));
  div.querySelector(".cert-issuer-input").addEventListener("input", (e) => updateDynamicField("certifications", index, "issuer", e.target.value));
  div.querySelector(".cert-date-input").addEventListener("input", (e) => updateDynamicField("certifications", index, "date", e.target.value));
  
  if (window.lucide) window.lucide.createIcons({ src: div });
  return div;
}

// Generator - Achievement DOM
function renderAchievementItemDOM(index, ach) {
  const div = document.createElement("div");
  div.className = "dynamic-item-card";
  div.innerHTML = `
    <div class="item-card-header">
      <span class="item-index-label">Achievement #${index + 1}</span>
      <button type="button" class="btn-remove-item" title="Delete achievement">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
    <div class="form-grid">
      <div class="form-group col-span-2">
        <label>Title <span class="required">*</span></label>
        <input type="text" class="ach-title-input" value="${ach.title || ""}" placeholder="e.g. Hackathon Winner" required>
      </div>
      <div class="form-group col-span-2">
        <label>Description <span class="required">*</span></label>
        <textarea class="ach-desc-input" rows="2" placeholder="Explain the achievement..." required>${ach.description || ""}</textarea>
      </div>
    </div>
  `;
  
  // Attach listeners
  div.querySelector(".btn-remove-item").addEventListener("click", () => removeDynamicItem("achievements", index));
  div.querySelector(".ach-title-input").addEventListener("input", (e) => updateDynamicField("achievements", index, "title", e.target.value));
  div.querySelector(".ach-desc-input").addEventListener("input", (e) => updateDynamicField("achievements", index, "description", e.target.value));
  
  if (window.lucide) window.lucide.createIcons({ src: div });
  return div;
}

// ==========================================
// 5. LIVE PREVIEW UPDATE WITH TEMPLATES
// ==========================================
let renderDebounceTimer;
function triggerLivePreviewUpdate() {
  clearTimeout(renderDebounceTimer);
  renderDebounceTimer = setTimeout(compileAndLoadPreview, 150);
}

// Renders the chosen template with current custom colors/radius/visibility to the preview iframe
function compileAndLoadPreview() {
  const previewIframe = document.getElementById("portfolio-preview");
  if (!previewIframe) return;
  
  const generatedHTML = compilePortfolioFullHTML(true); // true = preview mode (keeps absolute urls, etc.)
  
  const doc = previewIframe.contentDocument || previewIframe.contentWindow.document;
  doc.open();
  doc.write(generatedHTML);
  doc.close();
}

// Main HTML compiler
function compilePortfolioFullHTML(isPreviewMode = false) {
  const t = appState.theme;
  const p = appState.personalInfo;
  
  // Custom Styles
  const templateCSS = compileTemplateCSS(t.template);
  
  // Generate section markups conditionally based on visibility
  const skillsHTML = t.visibility.skills ? compileSkillsSection() : "";
  const experienceHTML = t.visibility.experience ? compileExperienceSection() : "";
  const educationHTML = t.visibility.education ? compileEducationSection() : "";
  const projectsHTML = t.visibility.projects ? compileProjectsSection() : "";
  const certificationsHTML = t.visibility.certifications ? compileCertificationsSection() : "";
  const achievementsHTML = t.visibility.achievements ? compileAchievementsSection() : "";

  // Dynamic social links rendering
  const socialItemsHTML = compileSocialsList();
  
  // Fallback for photo
  const photoURL = p.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(p.name)} | ${escapeHTML(p.title)} Portfolio</title>
  
  <!-- Font import dynamically linked -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Styled variables & template styling -->
  <style>
    :root {
      --primary: ${t.primaryColor};
      --primary-rgb: ${hexToRgb(t.primaryColor)};
      --accent: ${t.accentColor};
      --accent-rgb: ${hexToRgb(t.accentColor)};
      --font-family: '${t.fontFamily}', sans-serif;
      --radius: ${t.borderRadius};
      
      /* Dark/Light mode tokens */
      ${t.darkMode ? `
        --bg-body: #0a0915;
        --bg-surface: #121124;
        --bg-surface-accent: rgba(255, 255, 255, 0.03);
        --border-color: rgba(255, 255, 255, 0.06);
        --text-main: #f3f4f6;
        --text-muted: #9ca3af;
        --card-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
      ` : `
        --bg-body: #f8fafc;
        --bg-surface: #ffffff;
        --bg-surface-accent: rgba(0, 0, 0, 0.02);
        --border-color: rgba(0, 0, 0, 0.08);
        --text-main: #0f172a;
        --text-muted: #475569;
        --card-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.05);
      `}
    }
    
    ${templateCSS}
  </style>
</head>
<body class="portfolio-theme-${t.template}">
  <div class="portfolio-container">
    
    <!-- Hero / Header Section -->
    <header class="portfolio-hero">
      <div class="hero-content">
        <div class="hero-intro">
          <div class="profile-pic-container">
            <img src="${escapeHTML(photoURL)}" alt="${escapeHTML(p.name)}" class="profile-pic" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'">
          </div>
          <div class="profile-info">
            <h1 class="dev-name">${escapeHTML(p.name)}</h1>
            <p class="dev-title">${escapeHTML(p.title)}</p>
            ${p.location ? `<p class="dev-location"><i data-lucide="map-pin"></i> ${escapeHTML(p.location)}</p>` : ""}
          </div>
        </div>
        
        <p class="dev-bio">${escapeHTML(p.bio)}</p>
        
        <div class="hero-actions">
          <a href="mailto:${escapeHTML(p.email)}" class="btn-cta"><i data-lucide="mail"></i> Get In Touch</a>
          ${p.website ? `<a href="${escapeHTML(p.website)}" target="_blank" class="btn-sec"><i data-lucide="globe"></i> Website</a>` : ""}
        </div>

        ${socialItemsHTML ? `<div class="social-links">${socialItemsHTML}</div>` : ""}
      </div>
    </header>

    <!-- Main Content Sections -->
    <main class="portfolio-main">
      
      <!-- Skills Section -->
      ${skillsHTML}
      
      <!-- Work Experience Section -->
      ${experienceHTML}
      
      <!-- Education Section -->
      ${educationHTML}
      
      <!-- Projects Section -->
      ${projectsHTML}
      
      <!-- Certifications Section -->
      ${certificationsHTML}
      
      <!-- Achievements Section -->
      ${achievementsHTML}

      <!-- Contact Info Section -->
      <section class="section contact-section" id="contact-info">
        <h2 class="section-title"><i data-lucide="send"></i> Contact Details</h2>
        <div class="contact-card">
          <p class="contact-pitch">Feel free to reach out for project opportunities, open roles, or just to say hello!</p>
          <div class="contact-details-grid">
            <div class="contact-item">
              <i data-lucide="mail" class="contact-icon"></i>
              <div>
                <span class="contact-label">Email</span>
                <a href="mailto:${escapeHTML(p.email)}" class="contact-value">${escapeHTML(p.email)}</a>
              </div>
            </div>
            ${p.phone ? `
            <div class="contact-item">
              <i data-lucide="phone" class="contact-icon"></i>
              <div>
                <span class="contact-label">Phone</span>
                <a href="tel:${escapeHTML(p.phone)}" class="contact-value">${escapeHTML(p.phone)}</a>
              </div>
            </div>
            ` : ""}
            ${p.location ? `
            <div class="contact-item">
              <i data-lucide="map-pin" class="contact-icon"></i>
              <div>
                <span class="contact-label">Location</span>
                <span class="contact-value">${escapeHTML(p.location)}</span>
              </div>
            </div>
            ` : ""}
            ${p.website ? `
            <div class="contact-item">
              <i data-lucide="globe" class="contact-icon"></i>
              <div>
                <span class="contact-label">Website</span>
                <a href="${escapeHTML(p.website)}" target="_blank" class="contact-value">${escapeHTML(p.website)}</a>
              </div>
            </div>
            ` : ""}
          </div>
        </div>
      </section>
      
    </main>

    <!-- Footer -->
    <footer class="portfolio-footer">
      <p>&copy; ${new Date().getFullYear()} ${escapeHTML(p.name)}. Generated with AI Portfolio Builder.</p>
    </footer>

  </div>

  <!-- Lucide Icons -->
  <script src="https://cdn.jsdelivr.net/npm/lucide@0.435.0/dist/umd/lucide.min.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      if(window.lucide) {
        window.lucide.createIcons();
      }
    });
    setTimeout(() => {
      if(window.lucide) window.lucide.createIcons();
    }, 150);
  </script>
</body>
</html>`;
}

// Compile Section: Skills
function compileSkillsSection() {
  if (!appState.skills || appState.skills.length === 0) return "";
  
  const skillCards = appState.skills.map(s => {
    if (!s.name) return "";
    let lvlClass = "lvl-intermediate";
    if (s.level === "Beginner") lvlClass = "lvl-beginner";
    if (s.level === "Advanced") lvlClass = "lvl-advanced";
    if (s.level === "Expert") lvlClass = "lvl-expert";
    
    return `<div class="skill-badge ${lvlClass}">
      <span class="skill-name">${escapeHTML(s.name)}</span>
      <span class="skill-level">${escapeHTML(s.level)}</span>
    </div>`;
  }).join("\n");

  return `<section class="section skills-section" id="skills-info">
    <h2 class="section-title"><i data-lucide="code"></i> Skills & Expertise</h2>
    <div class="skills-grid">
      ${skillCards}
    </div>
  </section>`;
}

// Compile Section: Experience
function compileExperienceSection() {
  const validExp = (appState.experience || []).filter(e => e.company && e.position);
  if (validExp.length === 0) return "";
  
  const timelineHTML = validExp.map((exp, idx) => {
    return `<div class="timeline-item">
      <div class="timeline-indicator"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="role-title">${escapeHTML(exp.position)}</h3>
            <h4 class="company-name">${escapeHTML(exp.company)}</h4>
          </div>
          <span class="timeline-duration">${escapeHTML(exp.duration)}</span>
        </div>
        <p class="timeline-desc">${escapeHTML(exp.description)}</p>
      </div>
    </div>`;
  }).join("\n");

  return `<section class="section experience-section" id="experience-info">
    <h2 class="section-title"><i data-lucide="briefcase"></i> Work Experience</h2>
    <div class="timeline">
      ${timelineHTML}
    </div>
  </section>`;
}

// Compile Section: Education
function compileEducationSection() {
  const validEdu = (appState.education || []).filter(e => e.institution && e.degree);
  if (validEdu.length === 0) return "";
  
  const itemsHTML = validEdu.map(edu => {
    return `<div class="edu-card">
      <div class="edu-header">
        <div>
          <h3 class="edu-degree">${escapeHTML(edu.degree)}</h3>
          <h4 class="edu-school">${escapeHTML(edu.institution)}</h4>
        </div>
        <span class="edu-duration">${escapeHTML(edu.duration)}</span>
      </div>
      ${edu.description ? `<p class="edu-desc">${escapeHTML(edu.description)}</p>` : ""}
    </div>`;
  }).join("\n");

  return `<section class="section education-section" id="education-info">
    <h2 class="section-title"><i data-lucide="graduation-cap"></i> Education</h2>
    <div class="edu-grid">
      ${itemsHTML}
    </div>
  </section>`;
}

// Compile Section: Projects
function compileProjectsSection() {
  const validProj = (appState.projects || []).filter(p => p.title && p.description);
  if (validProj.length === 0) return "";
  
  const cardsHTML = validProj.map(proj => {
    const techBadges = proj.technologies ? proj.technologies.split(",").map(t => `<span class="proj-badge">${escapeHTML(t.trim())}</span>`).join("") : "";
    
    return `<div class="project-card">
      <div class="project-info">
        <h3 class="project-name">${escapeHTML(proj.title)}</h3>
        <p class="project-desc">${escapeHTML(proj.description)}</p>
        ${techBadges ? `<div class="project-badges">${techBadges}</div>` : ""}
      </div>
      <div class="project-footer-links">
        ${proj.github ? `<a href="${escapeHTML(proj.github)}" target="_blank" class="proj-link"><i data-lucide="github"></i> Repository</a>` : ""}
        ${proj.demo ? `<a href="${escapeHTML(proj.demo)}" target="_blank" class="proj-link demo-link"><i data-lucide="external-link"></i> Live Demo</a>` : ""}
      </div>
    </div>`;
  }).join("\n");

  return `<section class="section projects-section" id="projects-info">
    <h2 class="section-title"><i data-lucide="folder-git-2"></i> Featured Projects</h2>
    <div class="projects-grid">
      ${cardsHTML}
    </div>
  </section>`;
}

// Compile Section: Certifications
function compileCertificationsSection() {
  const validCert = (appState.certifications || []).filter(c => c.title && c.issuer);
  if (validCert.length === 0) return "";
  
  const listHTML = validCert.map(cert => {
    return `<div class="cert-item-card">
      <div class="cert-icon-wrapper">
        <i data-lucide="award"></i>
      </div>
      <div class="cert-info">
        <h3 class="cert-name">${escapeHTML(cert.title)}</h3>
        <p class="cert-meta">${escapeHTML(cert.issuer)} ${cert.date ? `&bull; ${escapeHTML(cert.date)}` : ""}</p>
      </div>
    </div>`;
  }).join("\n");

  return `<section class="section certifications-section" id="certifications-info">
    <h2 class="section-title"><i data-lucide="award"></i> Certifications</h2>
    <div class="certifications-grid">
      ${listHTML}
    </div>
  </section>`;
}

// Compile Section: Achievements
function compileAchievementsSection() {
  const validAch = (appState.achievements || []).filter(a => a.title && a.description);
  if (validAch.length === 0) return "";
  
  const cardsHTML = validAch.map(ach => {
    return `<div class="achievement-card">
      <div class="ach-icon-wrapper">
        <i data-lucide="trophy"></i>
      </div>
      <div>
        <h3 class="achievement-name">${escapeHTML(ach.title)}</h3>
        <p class="achievement-desc">${escapeHTML(ach.description)}</p>
      </div>
    </div>`;
  }).join("\n");

  return `<section class="section achievements-section" id="achievements-info">
    <h2 class="section-title"><i data-lucide="trophy"></i> Achievements</h2>
    <div class="achievements-grid">
      ${cardsHTML}
    </div>
  </section>`;
}

// Compile Social Links list
function compileSocialsList() {
  const s = appState.socialLinks;
  let html = "";
  if (s.github) html += `<a href="${escapeHTML(s.github)}" target="_blank" aria-label="GitHub"><i data-lucide="github"></i></a>`;
  if (s.linkedin) html += `<a href="${escapeHTML(s.linkedin)}" target="_blank" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>`;
  if (s.twitter) html += `<a href="${escapeHTML(s.twitter)}" target="_blank" aria-label="Twitter"><i data-lucide="twitter"></i></a>`;
  if (s.youtube) html += `<a href="${escapeHTML(s.youtube)}" target="_blank" aria-label="YouTube"><i data-lucide="youtube"></i></a>`;
  return html;
}

// ==========================================
// 6. TEMPLATES INDIVIDUAL CSS STYLINGS
// ==========================================
function compileTemplateCSS(template) {
  const commonCSS = `
    /* Common Reset & Styles inside preview */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg-body);
      color: var(--text-main);
      font-family: var(--font-family);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      transition: background 0.3s, color 0.3s;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    a {
      color: var(--primary);
      text-decoration: none;
      transition: color 0.2s;
    }
    a:hover {
      color: var(--accent);
    }
    
    .portfolio-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }
    
    /* Section Defaults */
    .section {
      margin-bottom: 4rem;
    }
    .section-title {
      font-size: 1.65rem;
      font-weight: 700;
      margin-bottom: 1.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
    }
    .section-title svg {
      width: 1.35rem;
      height: 1.35rem;
      color: var(--primary);
    }
    
    /* Skills styling */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .skill-badge {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 1rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
    }
    .skill-name {
      font-size: 0.9rem;
      font-weight: 600;
    }
    .skill-level {
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    
    /* Timeline styling */
    .timeline {
      position: relative;
      border-left: 2px solid var(--border-color);
      margin-left: 0.5rem;
      padding-left: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .timeline-item {
      position: relative;
    }
    .timeline-indicator {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--primary);
      left: calc(-1.5rem - 7px);
      top: 6px;
      box-shadow: 0 0 0 4px var(--bg-body);
    }
    .timeline-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--card-shadow);
    }
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }
    .role-title {
      font-size: 1.1rem;
      font-weight: 700;
    }
    .company-name {
      font-size: 0.95rem;
      color: var(--primary);
      font-weight: 500;
    }
    .timeline-duration {
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;
      background: var(--bg-surface-accent);
      border-radius: var(--radius);
      color: var(--text-muted);
      white-space: nowrap;
    }
    .timeline-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
    }
    
    /* Education styling */
    .edu-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .edu-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--card-shadow);
    }
    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }
    .edu-degree {
      font-size: 1.1rem;
      font-weight: 700;
    }
    .edu-school {
      font-size: 0.95rem;
      color: var(--primary);
      font-weight: 500;
    }
    .edu-duration {
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;
      background: var(--bg-surface-accent);
      border-radius: var(--radius);
      color: var(--text-muted);
    }
    .edu-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-top: 0.5rem;
    }

    /* Projects styling */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .project-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      box-shadow: var(--card-shadow);
      transition: transform 0.2s;
    }
    .project-card:hover {
      transform: translateY(-4px);
    }
    .project-info {
      padding: 1.5rem;
    }
    .project-name {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .project-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    .project-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .proj-badge {
      font-size: 0.75rem;
      padding: 0.15rem 0.45rem;
      background: var(--bg-surface-accent);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      color: var(--text-muted);
    }
    .project-footer-links {
      display: flex;
      border-top: 1px solid var(--border-color);
      background: var(--bg-surface-accent);
    }
    .proj-link {
      flex: 1;
      padding: 0.75rem 0.5rem;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      border-right: 1px solid var(--border-color);
    }
    .proj-link:last-child {
      border-right: none;
    }
    .proj-link svg {
      width: 0.9rem;
      height: 0.9rem;
    }
    
    /* Certifications styling */
    .certifications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }
    .cert-item-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: var(--card-shadow);
    }
    .cert-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      background: rgba(var(--primary-rgb), 0.1);
      color: var(--primary);
      flex-shrink: 0;
    }
    .cert-icon-wrapper svg {
      width: 1.1rem;
      height: 1.1rem;
    }
    .cert-name {
      font-size: 0.95rem;
      font-weight: 600;
    }
    .cert-meta {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    
    /* Achievements styling */
    .achievements-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .achievement-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 1.25rem;
      display: flex;
      gap: 0.75rem;
      box-shadow: var(--card-shadow);
    }
    .ach-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      background: rgba(var(--accent-rgb), 0.1);
      color: var(--accent);
      flex-shrink: 0;
    }
    .ach-icon-wrapper svg {
      width: 1.1rem;
      height: 1.1rem;
    }
    .achievement-name {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .achievement-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    
    /* Contact and Footer */
    .contact-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: var(--card-shadow);
    }
    .contact-pitch {
      font-size: 1rem;
      margin-bottom: 1.5rem;
      color: var(--text-muted);
    }
    .contact-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .contact-icon {
      width: 1.1rem;
      height: 1.1rem;
      color: var(--primary);
      margin-top: 0.2rem;
    }
    .contact-label {
      display: block;
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .contact-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .portfolio-footer {
      text-align: center;
      padding: 2rem 0;
      border-top: 1px solid var(--border-color);
      margin-top: 4rem;
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    /* Print styles */
    @media print {
      body {
        background: white !important;
        color: black !important;
      }
      .portfolio-container {
        padding: 0 !important;
        margin: 0 !important;
      }
      .btn-cta, .btn-sec, .project-footer-links {
        display: none !important;
      }
      .project-card, .timeline-card, .edu-card, .contact-card, .skill-badge {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
        background: white !important;
      }
      .section {
        page-break-inside: avoid;
        margin-bottom: 2rem !important;
      }
    }
  `;

  let specificCSS = "";

  if (template === "modern") {
    specificCSS = `
      /* Modern: Sleek gradients & modern shadows */
      .portfolio-hero {
        padding: 4rem 2rem;
        background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.08), rgba(var(--accent-rgb), 0.05));
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        margin-bottom: 4rem;
        box-shadow: var(--card-shadow);
      }
      .hero-intro {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .profile-pic {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 3px solid var(--primary);
        box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.25);
        object-fit: cover;
      }
      .dev-name {
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.1;
      }
      .dev-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--accent);
      }
      .dev-location {
        font-size: 0.85rem;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.25rem;
      }
      .dev-location svg {
        width: 0.85rem;
        height: 0.85rem;
      }
      .dev-bio {
        font-size: 1.05rem;
        color: var(--text-muted);
        max-width: 750px;
        margin-bottom: 2rem;
      }
      .hero-actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .btn-cta, .btn-sec {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        font-size: 0.9rem;
        border-radius: var(--radius);
        transition: all 0.2s;
        cursor: pointer;
      }
      .btn-cta {
        background: linear-gradient(135deg, var(--primary), var(--accent));
        color: white;
        box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.3);
      }
      .btn-cta:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 15px rgba(var(--primary-rgb), 0.4);
      }
      .btn-sec {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        color: var(--text-main);
      }
      .btn-sec:hover {
        background: var(--bg-surface-accent);
      }
      .social-links {
        display: flex;
        gap: 0.75rem;
        border-top: 1px solid var(--border-color);
        padding-top: 1.25rem;
        margin-top: 1rem;
      }
      .social-links a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        color: var(--text-muted);
        transition: all 0.2s;
      }
      .social-links a:hover {
        color: var(--primary);
        border-color: var(--primary);
        transform: translateY(-2px);
      }
      .social-links a svg {
        width: 1.05rem;
        height: 1.05rem;
      }
      
      /* Level styling badges */
      .lvl-expert { border-left: 3px solid var(--primary); }
      .lvl-advanced { border-left: 3px solid var(--accent); }
      .lvl-intermediate { border-left: 3px solid var(--text-muted); }
      .lvl-beginner { border-left: 3px solid transparent; }
      
      @media (max-width: 768px) {
        .hero-intro {
          flex-direction: column;
          align-items: flex-start;
        }
        .dev-name {
          font-size: 2rem;
        }
      }
    `;
  } else if (template === "minimal") {
    specificCSS = `
      /* Minimal: Fine typography, massive whitespace, raw borders */
      .portfolio-hero {
        padding: 4rem 0;
        border-bottom: 2px solid var(--text-main);
        margin-bottom: 4rem;
      }
      .hero-intro {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      .profile-pic {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        object-fit: cover;
        margin-bottom: 0.5rem;
      }
      .dev-name {
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 1.05;
      }
      .dev-title {
        font-size: 1.35rem;
        font-weight: 400;
        color: var(--text-muted);
      }
      .dev-location {
        font-size: 0.85rem;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .dev-location svg { width: 0.85rem; height: 0.85rem; }
      .dev-bio {
        font-size: 1.1rem;
        color: var(--text-main);
        max-width: 720px;
        margin-bottom: 2rem;
        line-height: 1.7;
      }
      .hero-actions {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .btn-cta, .btn-sec {
        font-weight: 700;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 0.5rem 0;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
      }
      .btn-cta {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
      }
      .btn-cta:hover {
        color: var(--accent);
        border-bottom-color: var(--accent);
      }
      .btn-sec {
        color: var(--text-muted);
        border-bottom: 2px solid transparent;
      }
      .btn-sec:hover {
        color: var(--text-main);
        border-bottom-color: var(--text-main);
      }
      .social-links {
        display: flex;
        gap: 1.25rem;
        margin-top: 1.5rem;
      }
      .social-links a {
        color: var(--text-muted);
        font-size: 0.85rem;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      }
      .social-links a:hover {
        color: var(--text-main);
      }
      .social-links a svg {
        width: 1rem;
        height: 1rem;
      }
      
      /* Section adjustments */
      .section-title {
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
      }
      .section-title::after {
        content: "";
        position: absolute;
        width: 40px;
        height: 2px;
        background: var(--primary);
        bottom: -1px;
        left: 0;
      }
      
      /* Reset card styling to transparent borders */
      .timeline-card, .edu-card, .project-card, .contact-card {
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--border-color);
        border-radius: 0 !important;
        padding: 1.5rem 0;
        box-shadow: none;
      }
      .project-card:hover {
        transform: none;
      }
      .project-footer-links {
        background: transparent;
        border: none;
        justify-content: flex-start;
        gap: 1.5rem;
        margin-top: 1rem;
      }
      .proj-link {
        flex: none;
        padding: 0;
        color: var(--primary);
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.75rem;
        border: none;
      }
      
      .skill-badge {
        background: transparent;
        border: 1px solid var(--border-color);
        border-radius: 0;
      }
    `;
  } else if (template === "creative") {
    specificCSS = `
      /* Creative: Bold, asymmetry, unique timelines, custom shapes */
      .portfolio-hero {
        padding: 5rem 2.5rem;
        background: var(--bg-surface);
        border-radius: var(--radius);
        margin-bottom: 4rem;
        position: relative;
        overflow: hidden;
        border: 2px solid var(--primary);
        box-shadow: 10px 10px 0px var(--primary);
      }
      .portfolio-hero::before {
        content: "";
        position: absolute;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%);
        top: -150px;
        right: -100px;
        z-index: 0;
      }
      .hero-content {
        position: relative;
        z-index: 1;
      }
      .hero-intro {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2rem;
      }
      .profile-pic {
        width: 130px;
        height: 130px;
        border-radius: 20px;
        transform: rotate(-3deg);
        border: 4px solid var(--accent);
        object-fit: cover;
        box-shadow: var(--shadow-lg);
        transition: transform 0.3s;
      }
      .profile-pic:hover {
        transform: rotate(3deg) scale(1.05);
      }
      .dev-name {
        font-size: 3.25rem;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .dev-title {
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--text-main);
        margin-top: 0.5rem;
      }
      .dev-location {
        font-size: 0.9rem;
        color: var(--text-muted);
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background: var(--bg-surface-accent);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        border: 1px solid var(--border-color);
        margin-top: 0.5rem;
      }
      .dev-location svg { width: 0.9rem; height: 0.9rem; }
      .dev-bio {
        font-size: 1.1rem;
        color: var(--text-muted);
        margin-bottom: 2.5rem;
        border-left: 4px solid var(--accent);
        padding-left: 1.25rem;
      }
      .hero-actions {
        display: flex;
        gap: 1.25rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }
      .btn-cta, .btn-sec {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.9rem 1.8rem;
        font-weight: 700;
        border-radius: var(--radius);
        transition: all 0.2s;
      }
      .btn-cta {
        background: var(--primary);
        color: white;
        border: 2px solid var(--text-main);
        box-shadow: 4px 4px 0 var(--text-main);
      }
      .btn-cta:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0 var(--text-main);
      }
      .btn-sec {
        background: var(--bg-body);
        color: var(--text-main);
        border: 2px solid var(--border-color);
      }
      .btn-sec:hover {
        background: var(--bg-surface);
        border-color: var(--text-main);
      }
      .social-links {
        display: flex;
        gap: 1rem;
      }
      .social-links a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 10px;
        background: var(--bg-body);
        border: 2px solid var(--border-color);
        color: var(--text-main);
        transition: all 0.2s;
      }
      .social-links a:hover {
        border-color: var(--primary);
        background: var(--primary);
        color: white;
        transform: translateY(-3px) rotate(5deg);
      }
      .social-links a svg { width: 1.1rem; height: 1.1rem; }
      
      /* Skill layout styling */
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
      }
      .skill-badge {
        padding: 1rem;
        align-items: center;
        text-align: center;
        border: 2px solid var(--border-color);
        border-radius: var(--radius);
        transition: all 0.2s;
      }
      .skill-badge:hover {
        border-color: var(--accent);
        transform: translateY(-2px);
      }
      .lvl-expert { background: rgba(var(--primary-rgb), 0.05); }
      .lvl-advanced { background: rgba(var(--accent-rgb), 0.05); }
      
      /* Project cards styling - asymmetric layout */
      .project-card {
        border: 2px solid var(--border-color);
        transition: all 0.2s;
      }
      .project-card:hover {
        border-color: var(--accent);
        box-shadow: 6px 6px 0 rgba(var(--accent-rgb), 0.2);
      }
      
      @media (max-width: 768px) {
        .hero-intro {
          flex-direction: column;
          text-align: center;
        }
        .dev-name {
          font-size: 2.5rem;
        }
        .dev-bio {
          border-left: none;
          border-top: 3px solid var(--accent);
          padding-left: 0;
          padding-top: 1rem;
        }
      }
    `;
  }

  return commonCSS + "\n" + specificCSS;
}

// Helper: Escape HTML
function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper: Hex to RGB string for custom alphas
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "79, 70, 229";
}

// ==========================================
// 7. EXPORT PROCEDURES
// ==========================================

// Helper to trigger direct text file download
function downloadFile(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

// Exporter: Standing HTML
function exportHTMLOnly() {
  const fullHTML = compilePortfolioFullHTML(false); // False = production mode
  downloadFile(fullHTML, "index.html", "text/html;charset=utf-8");
}

// Exporter: Standing CSS
function exportCSSOnly() {
  const css = compileTemplateCSS(appState.theme.template);
  
  // Inject customized theme variables block on top for export
  const t = appState.theme;
  const finalCSS = `:root {
  --primary: ${t.primaryColor};
  --primary-rgb: ${hexToRgb(t.primaryColor)};
  --accent: ${t.accentColor};
  --accent-rgb: ${hexToRgb(t.accentColor)};
  --font-family: '${t.fontFamily}', sans-serif;
  --radius: ${t.borderRadius};
  
  /* Dark/Light mode tokens */
  ${t.darkMode ? `
  --bg-body: #0a0915;
  --bg-surface: #121124;
  --bg-surface-accent: rgba(255, 255, 255, 0.03);
  --border-color: rgba(255, 255, 255, 0.06);
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --card-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
  ` : `
  --bg-body: #f8fafc;
  --bg-surface: #ffffff;
  --bg-surface-accent: rgba(0, 0, 0, 0.02);
  --border-color: rgba(0, 0, 0, 0.08);
  --text-main: #0f172a;
  --text-muted: #475569;
  --card-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.05);
  `}
}

${css}`;

  downloadFile(finalCSS, "style.css", "text/css;charset=utf-8");
}

// Exporter: Unified ZIP structure
function exportZipBundle() {
  if (typeof JSZip === "undefined") {
    alert("ZIP generator library is loading, please try again in a moment.");
    return;
  }

  const p = appState.personalInfo;
  const t = appState.theme;

  // Build the clean index.html file linking to style.css
  const skillsHTML = t.visibility.skills ? compileSkillsSection() : "";
  const experienceHTML = t.visibility.experience ? compileExperienceSection() : "";
  const educationHTML = t.visibility.education ? compileEducationSection() : "";
  const projectsHTML = t.visibility.projects ? compileProjectsSection() : "";
  const certificationsHTML = t.visibility.certifications ? compileCertificationsSection() : "";
  const achievementsHTML = t.visibility.achievements ? compileAchievementsSection() : "";
  const socialItemsHTML = compileSocialsList();
  
  const photoURL = p.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

  const zipIndexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(p.name)} | ${escapeHTML(p.title)} Portfolio</title>
  
  <!-- Font imports -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Separate linked stylesheet -->
  <link rel="stylesheet" href="style.css">
</head>
<body class="portfolio-theme-${t.template}">
  <div class="portfolio-container">
    
    <header class="portfolio-hero">
      <div class="hero-content">
        <div class="hero-intro">
          <div class="profile-pic-container">
            <img src="${escapeHTML(photoURL)}" alt="${escapeHTML(p.name)}" class="profile-pic" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'">
          </div>
          <div class="profile-info">
            <h1 class="dev-name">${escapeHTML(p.name)}</h1>
            <p class="dev-title">${escapeHTML(p.title)}</p>
            ${p.location ? `<p class="dev-location"><i data-lucide="map-pin"></i> ${escapeHTML(p.location)}</p>` : ""}
          </div>
        </div>
        
        <p class="dev-bio">${escapeHTML(p.bio)}</p>
        
        <div class="hero-actions">
          <a href="mailto:${escapeHTML(p.email)}" class="btn-cta"><i data-lucide="mail"></i> Get In Touch</a>
          ${p.website ? `<a href="${escapeHTML(p.website)}" target="_blank" class="btn-sec"><i data-lucide="globe"></i> Website</a>` : ""}
        </div>

        ${socialItemsHTML ? `<div class="social-links">${socialItemsHTML}</div>` : ""}
      </div>
    </header>

    <main class="portfolio-main">
      ${skillsHTML}
      ${experienceHTML}
      ${educationHTML}
      ${projectsHTML}
      ${certificationsHTML}
      ${achievementsHTML}

      <section class="section contact-section" id="contact-info">
        <h2 class="section-title"><i data-lucide="send"></i> Contact Details</h2>
        <div class="contact-card">
          <p class="contact-pitch">Feel free to reach out for project opportunities, open roles, or just to say hello!</p>
          <div class="contact-details-grid">
            <div class="contact-item">
              <i data-lucide="mail" class="contact-icon"></i>
              <div>
                <span class="contact-label">Email</span>
                <a href="mailto:${escapeHTML(p.email)}" class="contact-value">${escapeHTML(p.email)}</a>
              </div>
            </div>
            ${p.phone ? `
            <div class="contact-item">
              <i data-lucide="phone" class="contact-icon"></i>
              <div>
                <span class="contact-label">Phone</span>
                <a href="tel:${escapeHTML(p.phone)}" class="contact-value">${escapeHTML(p.phone)}</a>
              </div>
            </div>
            ` : ""}
            ${p.location ? `
            <div class="contact-item">
              <i data-lucide="map-pin" class="contact-icon"></i>
              <div>
                <span class="contact-label">Location</span>
                <span class="contact-value">${escapeHTML(p.location)}</span>
              </div>
            </div>
            ` : ""}
            ${p.website ? `
            <div class="contact-item">
              <i data-lucide="globe" class="contact-icon"></i>
              <div>
                <span class="contact-label">Website</span>
                <a href="${escapeHTML(p.website)}" target="_blank" class="contact-value">${escapeHTML(p.website)}</a>
              </div>
            </div>
            ` : ""}
          </div>
        </div>
      </section>
      
    </main>

    <footer class="portfolio-footer">
      <p>&copy; ${new Date().getFullYear()} ${escapeHTML(p.name)}. Generated with AI Portfolio Builder.</p>
    </footer>

  </div>

  <!-- Lucide Icons -->
  <script src="https://cdn.jsdelivr.net/npm/lucide@0.435.0/dist/umd/lucide.min.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      if(window.lucide) {
        window.lucide.createIcons();
      }
    });
    setTimeout(() => {
      if(window.lucide) window.lucide.createIcons();
    }, 150);
  </script>
</body>
</html>`;

  const templateCSS = compileTemplateCSS(t.template);
  const zipStyleCSS = `:root {
  --primary: ${t.primaryColor};
  --primary-rgb: ${hexToRgb(t.primaryColor)};
  --accent: ${t.accentColor};
  --accent-rgb: ${hexToRgb(t.accentColor)};
  --font-family: '${t.fontFamily}', sans-serif;
  --radius: ${t.borderRadius};
  
  /* Dark/Light mode tokens */
  ${t.darkMode ? `
  --bg-body: #0a0915;
  --bg-surface: #121124;
  --bg-surface-accent: rgba(255, 255, 255, 0.03);
  --border-color: rgba(255, 255, 255, 0.06);
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --card-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
  ` : `
  --bg-body: #f8fafc;
  --bg-surface: #ffffff;
  --bg-surface-accent: rgba(0, 0, 0, 0.02);
  --border-color: rgba(0, 0, 0, 0.08);
  --text-main: #0f172a;
  --text-muted: #475569;
  --card-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.05);
  `}
}

${templateCSS}`;

  const readmeContent = `# Generated Static Portfolio Website

This portfolio was generated using the BuildVerse AI Portfolio Builder.

## Files Included

- \`index.html\` - The semantic HTML skeleton containing your portfolio sections.
- \`style.css\` - Customized stylesheet styling matching your theme options.

## Running Locally

To view the generated portfolio, double-click \`index.html\` to open it directly in any modern browser.

## Customization

You can open the \`style.css\` file and adjust primary colors or fonts directly if you wish to do further customization.
`;

  // Create zip
  const zip = new JSZip();
  zip.file("index.html", zipIndexHTML);
  zip.file("style.css", zipStyleCSS);
  zip.file("README.md", readmeContent);

  zip.generateAsync({ type: "blob" }).then((content) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `${p.name.toLowerCase().replace(/\s+/g, "-")}-portfolio.zip`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  }).catch((err) => {
    console.error("ZIP Generation Failed", err);
    alert("ZIP Generation Failed, please export HTML & CSS separately.");
  });
}

// Print to PDF (calls print on iframe)
function printPortfolioPDF() {
  const iframe = document.getElementById("portfolio-preview");
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  } else {
    alert("Preview frame is unavailable. Please try again.");
  }
}
