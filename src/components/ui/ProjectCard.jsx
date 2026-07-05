"use client";

import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.4)" }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className={`glass-panel ${styles.card}`}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'linear-gradient(145deg, rgba(30,30,35,0.6) 0%, rgba(20,20,25,0.8) 100%)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div 
        style={{ 
          position: 'absolute', 
          top: '-30px', 
          right: '-30px', 
          width: '120px', 
          height: '120px', 
          background: `radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: 0
        }} 
      />
      <div className={styles.cardHeader}>
        <div className={styles.authorInfo}>
          <div className={styles.avatar}>
            {project.author.name.charAt(0)}
          </div>
          <div className={styles.meta}>
            <p className={styles.authorName}>{project.author.name}</p>
            <p className={styles.authorGithub}>@{project.author.github}</p>
          </div>
        </div>
        <div className={styles.links}>
          <a href={`https://github.com/${project.author.github}`} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <Link href={`/projects/${project.slug}`} className={`btn btn-primary ${styles.viewBtn}`}>
          View Details
        </Link>
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className={`btn btn-outline ${styles.demoBtn}`}>
            <ExternalLink size={16} /> Live
          </a>
        )}
      </div>
    </motion.div>
  );
}
