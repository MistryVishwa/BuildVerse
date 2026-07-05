"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import ProjectCard from "@/components/ui/ProjectCard";
import { projectsData } from "@/data/projects";
import styles from "./page.module.css";

const categories = ["All", "HTML", "CSS", "JavaScript", "React", "App", "Productivity", "Game", "Tool"];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || project.tags.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className={`container ${styles.pageContainer}`}>
        <div className={styles.header}>
          <h1 className="heading-1 text-gradient">Projects Showcase</h1>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '1rem', fontSize: '1.1rem' }}>
            Discover amazing open-source projects built by the community. 
            Filter by category or search for something specific.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={`glass ${styles.searchBar}`}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categories}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.active : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p className="heading-3">No projects found.</p>
            <p className="text-muted">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
