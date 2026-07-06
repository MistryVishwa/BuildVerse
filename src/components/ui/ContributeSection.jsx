"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./ContributeSection.module.css";

const steps = [
  {
    num: "01",
    title: "Fork & branch",
    desc: "Fork the repo, create a branch named after your project, e.g. add-your-project."
  },
  {
    num: "02",
    title: "Create your folder",
    desc: "Under Projects/, in Title Case with real spaces — like To Do Web App."
  },
  {
    num: "03",
    title: "Add the required files",
    desc: "README.md, project.json and index.html. No build step, ever."
  },
  {
    num: "04",
    title: "Open a pull request",
    desc: "Use the New Project template. Once merged, the showcase rebuilds automatically."
  }
];

export default function ContributeSection() {
  const renderDescription = (desc) => {
    // Basic parser to wrap specific keywords in codeBadge class to match the design exactly
    const parts = desc.split(/(add-your-project|Projects\/|To Do Web App|README\.md|project\.json|index\.html)/);
    
    return parts.map((part, index) => {
      if (['add-your-project', 'Projects/', 'To Do Web App', 'README.md', 'project.json', 'index.html'].includes(part)) {
        return <span key={index} className={styles.codeBadge}>{part}</span>;
      }
      return part;
    });
  };

  return (
    <section id="contribute" className={styles.section}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Contribute in four steps</h2>
        </motion.div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={styles.card}
            >
              <div className={styles.stepNumber}>{step.num}</div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>
                {renderDescription(step.desc)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={styles.footer}
        >
          <p className={styles.ctaText}>
            Contribute in Steps — Read the full guide in <span className={styles.codeBadge} style={{ color: '#a855f7', background: 'rgba(168, 85, 247, 0.15)' }}>CONTRIBUTING.md</span>.
          </p>
          <a 
            href="https://github.com/MistryVishwa/BuildVerse?tab=contributing-ov-file" 
            target="_blank" 
            rel="noreferrer" 
            className={styles.ctaButton}
          >
            Read Contributing Guide <ArrowRight size={20} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
