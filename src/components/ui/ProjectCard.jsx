"use client";

import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`glass-panel ${styles.card}`}
    >
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
