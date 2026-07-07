"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Code, Award } from "lucide-react";

export default function AboutSection() {
  const cards = [
    {
      icon: Rocket,
      title: "What is BuildVerse?",
      desc: "A curated platform designed for discovering and showcasing premium open-source web projects built by the community.",
      color: "#3b82f6", // Blue
    },
    {
      icon: Target,
      title: "Our Mission",
      desc: "To bridge the gap between learning and building, giving developers a robust platform to collaborate, shine, and elevate their craft.",
      color: "#a855f7", // Purple
    },
    {
      icon: Code,
      title: "How It Helps You",
      desc: "Gain real-world experience with Git/GitHub workflows, get your code reviewed by peers, and build a public track record.",
      color: "#22c55e", // Green
    },
    {
      icon: Award,
      title: "Why Participate?",
      desc: "Earn recognition, prepare for major open-source programs like GSoC and Hacktoberfest, and sharpen your development skills.",
      color: "#f59e0b", // Yellow
    }
  ];

  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}
        >
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Empowering the Next Generation of Builders
          </h2>
          <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: '1.6' }}>
            BuildVerse was created out of a simple necessity: developers need a place to ship real projects, not just follow tutorials. We provide the ecosystem for you to build in public and gain true open-source experience.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, boxShadow: `0 15px 30px -10px ${card.color}33` }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              className="glass-panel"
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '-20px', 
                  right: '-20px', 
                  width: '100px', 
                  height: '100px', 
                  background: `radial-gradient(circle, ${card.color}22 0%, transparent 70%)`,
                  borderRadius: '50%'
                }} 
              />
              <div style={{
                padding: '1rem',
                borderRadius: '16px',
                background: `${card.color}15`,
                color: card.color,
                marginBottom: '1.5rem'
              }}>
                <card.icon size={28} />
              </div>
              <h3 className="heading-3" style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>{card.title}</h3>
              <p className="text-muted" style={{ lineHeight: '1.6', margin: 0 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}