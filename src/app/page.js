"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Code2, Users, FolderGit2, Terminal, Cpu } from "lucide-react";
import { FaReact, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import ProjectCard from "@/components/ui/ProjectCard";
import GithubStats from "@/components/ui/GithubStats";
import AboutSection from "@/components/ui/AboutSection";
import ContributeSection from "@/components/ui/ContributeSection";
import ProjectsFilter from "@/components/ui/ProjectsFilter";
import styles from "./page.module.css";

const floatingBadges = [
  { icon: FaJs, label: "JS", top: "25%", left: "15%", delay: 1.5 },
  { icon: FaHtml5, label: "HTML", top: "18%", right: "8%", delay: 0.5 },
  { icon: FaCss3Alt, label: "CSS", top: "65%", right: "12%", delay: 2 },
];

export default function Home() {
  const [projectsData, setProjectsData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjectsData(data.projects);
        }
      } catch (e) {
        console.error("Failed to fetch projects", e);
      }
    };
    fetchProjects();

    const loadFavorites = () => {
      setFavorites(JSON.parse(localStorage.getItem("buildverse_favorites") || "[]"));
    };
    loadFavorites();
    window.addEventListener("favoritesChanged", loadFavorites);
    
    return () => {
      window.removeEventListener("favoritesChanged", loadFavorites);
    };
  }, []);

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || 
                            (activeCategory === "Favorites" ? favorites.includes(project.slug) : project.tags.includes(activeCategory));
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
           <div className={styles.glowSpot} style={{ top: '-10%', left: '-10%' }} />
           <div className={styles.glowSpot} style={{ bottom: '-10%', right: '-10%', background: 'rgba(99, 102, 241, 0.15)' }} />
           <div className={styles.glowSpot} style={{ top: '30%', left: '30%', width: '40vw', height: '40vw', background: 'rgba(168, 85, 247, 0.08)' }} />
           
           <motion.div 
             className={styles.codeWindow}
             style={{ bottom: '15%', left: '5%' }}
             animate={{ y: [0, 20, 0], rotate: [2, -2, 2] }}
             transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           >
             <div className={styles.windowHeader}>
               <div className={styles.dot} style={{ background: '#ef4444' }} />
               <div className={styles.dot} style={{ background: '#eab308' }} />
               <div className={styles.dot} style={{ background: '#22c55e' }} />
             </div>
             <pre><code><span style={{ color: '#98c379' }}>$</span> npm install @buildverse/core{"\n"}
<span style={{ color: '#61afef' }}>[+]</span> Adding packages...{"\n"}
<span style={{ color: '#61afef' }}>[+]</span> Resolving dependencies...{"\n"}
<span style={{ color: '#98c379' }}>✔</span> Success! Ready to build.</code></pre>
           </motion.div>
        </div>
        
        {/* Floating Badges */}
        {floatingBadges.map((badge, index) => (
          <motion.div
            key={index}
            className={styles.floatingBadge}
            style={{ top: badge.top, left: badge.left, right: badge.right }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: badge.delay,
              ease: "easeInOut",
            }}
          >
            <badge.icon size={28} className={styles.badgeIcon} />
            <span>{badge.label}</span>
          </motion.div>
        ))}

        <div className={`container ${styles.heroContainer}`}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.heroContent}
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={styles.badge}
            >
              Welcome to BuildVerse
            </motion.div>
            <h1 className="heading-1">
              Build in public.<br />
              <span className="text-gradient">Elevate your craft.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              BuildVerse is the ultimate open-source ecosystem where developers submit, discover, and collaborate on premium projects.
            </p>
            <div className={styles.heroActions}>
              <Link href="/projects" className="btn btn-primary">
                Explore Projects <ArrowRight size={18} />
              </Link>
              <a href="https://github.com/MistryVishwa/BuildVerse/issues" target="_blank" rel="noreferrer" className="btn btn-outline">
                Add Project
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className="container">
          <GithubStats styles={styles} />
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Featured Projects */}
      <section className={styles.featured}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.sectionHeader}
            style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}
          >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="heading-2">Explore Projects in BuildVerse</h2>
              <Link href="/projects" className={styles.viewAll}>
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <p className="text-muted" style={{ fontSize: '1.05rem', marginTop: '0.25rem' }}>
              Every folder under <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: 'var(--primary)', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '500', margin: '0 0.2rem' }}>Projects/</span> shows up here automatically. Submit your open-source work and get featured in the community!
            </p>
          </motion.div>
          
          <ProjectsFilter 
            search={search} 
            setSearch={setSearch} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            showTitle={false}
          />
          
          <div className="grid grid-cols-3">
            {filteredProjects.length === 0 ? (
               <p className="text-muted" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0' }}>No projects match your filters.</p>
            ) : (
              filteredProjects.slice(0, 6).map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))
            )}
          </div>

          <motion.div 
            className={styles.exploreMoreWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/projects" className="btn btn-outline" style={{ marginTop: '3rem', fontSize: '1.05rem', padding: '0.85rem 2rem', borderRadius: '100px' }}>
              Explore More <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contribute Section */}
      <ContributeSection />
    </PageTransition>
  );
}
