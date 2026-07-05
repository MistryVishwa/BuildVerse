"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Users, Code2, GitCommit } from "lucide-react";
import { projectsData } from "@/data/projects";

export default function GithubStats({ styles }) {
  const [stats, setStats] = useState({
    projects: projectsData.length,
    contributors: 0,
    contributions: 0,
    pullRequests: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        // Fetch Contributors & Total Contributions
        const contribRes = await fetch("https://api.github.com/repos/MistryVishwa/BuildVerse/contributors");
        let contributorsCount = 0;
        let totalContributions = 0;
        
        if (contribRes.ok) {
          const contributors = await contribRes.json();
          contributorsCount = contributors.length;
          totalContributions = contributors.reduce((acc, curr) => acc + (curr.contributions || 0), 0);
        }

        // Fetch Total Pull Requests
        const prRes = await fetch("https://api.github.com/search/issues?q=repo:MistryVishwa/BuildVerse+is:pr");
        let pullRequestsCount = 0;
        if (prRes.ok) {
          const prData = await prRes.json();
          pullRequestsCount = prData.total_count;
        }

        setStats(prev => ({
          ...prev,
          contributors: contributorsCount,
          contributions: totalContributions,
          pullRequests: pullRequestsCount,
          loading: false
        }));

      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGithubStats();
  }, []);

  const statItems = [
    { icon: FolderGit2, label: "Total Projects", value: stats.projects },
    { icon: Users, label: "Active Contributors", value: stats.loading ? "..." : stats.contributors },
    { icon: GitCommit, label: "Total Contributions", value: stats.loading ? "..." : stats.contributions },
    { icon: Code2, label: "Total Pull Requests", value: stats.loading ? "..." : stats.pullRequests }
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${styles?.statsGrid || ''}`}>
      {statItems.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          className={`glass-panel ${styles?.statCard || ''}`}
          style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}
        >
          <stat.icon size={32} className={styles?.statIcon || ''} style={!styles?.statIcon ? { color: '#a855f7', marginBottom: '0.5rem' } : {}} />
          <h3 className="heading-2" style={{ margin: 0 }}>
            {stat.value}{!stats.loading && stat.value > 0 ? '+' : ''}
          </h3>
          <p className="text-muted" style={{ margin: 0 }}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
