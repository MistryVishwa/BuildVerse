"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import ProjectCard from "@/components/ui/ProjectCard";
import styles from "./page.module.css";

const categories = ["All", "Favorites", "Vanilla-js", "JavaScript", "CSS", "HTML", "Game", "Canvas", "Education", "LocalStorage", "Productivity", "Simulation", "Dashboard", "Utility", "React", "Tool"];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || project.tags.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className={`container ${styles.pageContainer}`} style={{ maxWidth: '1200px', paddingTop: '4rem', paddingBottom: '6rem' }}>
        
        {/* Header matching OpenStudio style */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            Projects in this repo
          </h1>
          <p className="text-muted" style={{ fontSize: '1.15rem' }}>
            Every folder under <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: '500', margin: '0 0.2rem' }}>Projects/</span> shows up here automatically.
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '100px', 
              padding: '0.75rem 1.25rem',
              flex: '1',
              maxWidth: '500px',
              transition: 'all 0.3s ease'
            }}>
              <Search size={18} className="text-muted" style={{ marginRight: '0.75rem' }} />
              <input 
                type="text" 
                placeholder="Search projects, tags, authors..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#fff', 
                  outline: 'none', 
                  width: '100%',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'rgba(255,255,255,0.08)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              padding: '0.75rem 1.25rem', 
              borderRadius: '100px',
              color: '#fff',
              fontWeight: '500',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <Sparkles size={16} /> Surprise Me
            </button>

            <button style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              padding: '0.75rem 1.25rem', 
              borderRadius: '100px',
              color: '#fff',
              fontWeight: '500'
            }}>
              Default <ChevronDown size={16} className="text-muted" />
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#f59e0b' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat ? '#000' : '#a1a1aa',
                  border: activeCategory === cat ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  padding: '0.4rem 1rem',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  fontWeight: activeCategory === cat ? '600' : '400',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  if (activeCategory !== cat) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                }}
                onMouseOut={(e) => {
                  if (activeCategory !== cat) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <button style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            color: '#f59e0b', 
            fontWeight: '600',
            fontSize: '0.9rem',
            background: 'transparent',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '0.4rem 1rem',
            borderRadius: '100px',
            width: 'fit-content',
            marginTop: '0.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Explore All Tags &gt;
          </button>
        </div>

        <div className="grid grid-cols-3">
          {isLoading ? (
            <p className="text-muted">Loading projects...</p>
          ) : (
            filteredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))
          )}
        </div>
        
        {!isLoading && filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p className="heading-3">No projects found.</p>
            <p className="text-muted">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
