'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Briefcase, CheckCircle } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const EXPERIENCE = {
  company: 'Sri Sathya Sai Skill Development Program',
  role: 'Data Engineer Trainee',
  period: 'Jul 2025 – Oct 2025',
  location: 'Hyderabad, India',
  bullets: [
    'Designed and implemented scalable ETL pipelines using Python and Pandas, ingesting heterogeneous data from CSV files, REST APIs, and relational databases into a centralized PostgreSQL data warehouse.',
    'Performed extensive SQL optimization — including query tuning, index design, and stored procedure creation — reducing average query execution time by over 40% across critical reporting workflows.',
    'Developed interactive Power BI dashboards and drill-through reports for business stakeholders, visualizing sales trends, KPIs, and operational metrics across regional divisions.',
    'Conducted exploratory data analysis (EDA) on large datasets using Pandas, Matplotlib, and Seaborn to identify patterns, outliers, and actionable business insights for the analytics team.',
    'Documented ETL architecture, data dictionaries, and transformation logic to ensure reproducibility and ease of handover, contributing to a production-grade data engineering knowledge base.',
  ],
}

/**
 * Experience Section — animated vertical timeline with a single entry.
 * Includes pulsing cyan dot, bullets with check icons, and "Available for work" badge.
 */
export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const shouldReduce = useReducedMotion()

  return (
    <section id="experience" ref={ref} className="py-24 relative" aria-label="Experience section">
      <div className="section-container">
        <SectionHeader
          label="Experience"
          title="Work History"
          subtitle="Real-world data engineering experience building production ETL systems and BI dashboards."
        />

        {/* Available for work badge */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-400/10 border border-green-400/30 text-green-400 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for New Opportunities
          </span>
        </motion.div>

        {/* Timeline */}
        <div className="mt-12 relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <motion.div
            initial={shouldReduce ? {} : { scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{ originY: 0 }}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent"
            aria-hidden="true"
          />

          {/* Timeline entry */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="relative pl-16 md:pl-20"
          >
            {/* Pulsing dot */}
            <div
              className="absolute left-3.5 md:left-5 top-6 w-5 h-5 rounded-full bg-accent animate-glow-pulse border-2 border-background"
              aria-hidden="true"
            />

            {/* Card */}
            <div className="glass-card p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-accent" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-text-primary">{EXPERIENCE.role}</h3>
                  </div>
                  <p className="text-accent font-semibold text-sm">{EXPERIENCE.company}</p>
                  <p className="text-text-muted text-xs font-mono">{EXPERIENCE.location}</p>
                </div>
                <span className="self-start sm:self-auto px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono whitespace-nowrap">
                  {EXPERIENCE.period}
                </span>
              </div>

              {/* Bullet points */}
              <ul className="flex flex-col gap-3" role="list">
                {EXPERIENCE.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={shouldReduce ? {} : { opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm text-text-muted leading-relaxed"
                  >
                    <CheckCircle
                      size={15}
                      className="text-accent shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Future placeholder note */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="relative pl-16 md:pl-20 mt-6"
          >
            <div
              className="absolute left-3.5 md:left-5 top-4 w-5 h-5 rounded-full border-2 border-dashed border-accent/30"
              aria-hidden="true"
            />
            <p className="text-text-muted/50 text-sm font-mono italic">
              Next chapter — seeking AI/ML engineering roles...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
