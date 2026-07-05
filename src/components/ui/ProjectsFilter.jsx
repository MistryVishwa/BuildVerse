import { Search, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export const categories = ["All", "Favorites", "Vanilla-js", "JavaScript", "CSS", "HTML", "Game", "Canvas", "Education", "LocalStorage", "Productivity", "Simulation", "Dashboard", "Utility", "React", "Tool"];

export default function ProjectsFilter({ search, setSearch, activeCategory, setActiveCategory, showTitle = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
      
      {showTitle && (
        <div style={{ marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            Projects in this repo
          </h1>
          <p className="text-muted" style={{ fontSize: '1.15rem' }}>
            Every folder under <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: '500', margin: '0 0.2rem' }}>Projects/</span> shows up here automatically.
          </p>
        </div>
      )}

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
              background: activeCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat ? '#fff' : '#a1a1aa',
              border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
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
        color: 'var(--primary)', 
        fontWeight: '600',
        fontSize: '0.9rem',
        background: 'transparent',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        padding: '0.4rem 1rem',
        borderRadius: '100px',
        width: 'fit-content',
        marginTop: '0.5rem',
        cursor: 'pointer',
        transition: 'background 0.2s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'}
      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
      >
        Explore All Tags &gt;
      </button>
    </div>
  );
}
