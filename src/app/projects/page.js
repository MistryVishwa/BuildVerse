"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectsFilter from "@/components/ui/ProjectsFilter";
import styles from "./page.module.css";

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
        
        <ProjectsFilter 
          search={search} 
          setSearch={setSearch} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          showTitle={true}
        />

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
