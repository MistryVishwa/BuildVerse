import { Search } from "lucide-react";
import { motion } from "framer-motion";
import styles from './ProjectsFilter.module.css';

export const categories = ["All", "Favorites", "Vanilla-js", "JavaScript", "CSS", "HTML", "Game", "Canvas", "Education", "LocalStorage", "Productivity", "Simulation", "Dashboard", "Utility", "React", "Tool"];

export default function ProjectsFilter({ search, setSearch, activeCategory, setActiveCategory, showTitle = false }) {
  return (
    <div className={styles.filterContainer}>
      
      {showTitle && (
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Explore Projects in BuildVerse
          </h1>
          <p className={`${styles.subtitle} text-muted`}>
            Every folder under <span className={styles.highlight}>Projects/</span> shows up here automatically. Submit your open-source work and get featured in the community!
          </p>
        </div>
      )}

      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <Search size={18} className="text-muted" style={{ marginRight: '0.75rem' }} />
          <input 
            type="text" 
            placeholder="Search projects, tags, authors..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

      </div>

      <div className={styles.categoriesWrapper}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
      
    </div>
  );
}
