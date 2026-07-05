import Link from "next/link";
import { Heart } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerTop}>
          <div className={styles.brandInfo}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" alt="BuildVerse Logo" style={{ width: 28, height: 28, borderRadius: 6 }} />
              <span className="text-gradient">BuildVerse</span>
            </Link>
            <p className="text-muted" style={{ marginTop: '1rem', maxWidth: '300px', lineHeight: '1.6' }}>
              BuildVerse is the ultimate open-source ecosystem for developers to submit, discover, and collaborate on real-world projects.
            </p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Platform</h4>
              <Link href="/projects">Showcase</Link>
              <Link href="/contributors">Contributors</Link>
              <a href="https://github.com/MistryVishwa/BuildVerse/issues" target="_blank" rel="noreferrer">Add Project</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>Community</h4>
              <Link href="/about">About Us</Link>
              <Link href="/faq">FAQ</Link>
              <a href="https://github.com/MistryVishwa/BuildVerse" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} BuildVerse. Built with <Heart size={14} className={styles.heart} /> by MistryVishwa & the community.
          </p>
          <div className={styles.socials}>
            <a href="https://github.com/MistryVishwa/BuildVerse" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
