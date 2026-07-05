"use client";

import { useEffect, useState } from "react";
import ContributorCard from "@/components/ui/ContributorCard";
import styles from "./page.module.css";
import { Users } from "lucide-react";

export default function ContributorsPage() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const res = await fetch("/api/contributors");
        const data = await res.json();
        setContributors(data);
      } catch (error) {
        console.error("Failed to load contributors:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchContributors();
  }, []);

  return (
    <main className={`container ${styles.container}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          The <span className="text-gradient">Builders</span> Behind BuildVerse
        </h1>
        <p className={styles.subtitle}>
          Click any contributor to explore their GitHub profile and see their amazing open-source work.
        </p>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p>Fetching live GitHub data...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {contributors.map((contributor, index) => (
            <ContributorCard 
              key={contributor.id} 
              contributor={contributor} 
              index={index} 
            />
          ))}
        </div>
      )}
    </main>
  );
}
