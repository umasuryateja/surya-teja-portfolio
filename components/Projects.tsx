'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Database, Brain, BarChart3, Workflow } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

interface Project {
  id: string
  number: string
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  icon: React.ReactNode
  gradient: string
}

const AI_PROJECTS: Project[] = [
  {
    id: 'ai-db-assistant',
    number: '#01',
    title: 'AI Database Assistant',
    description:
      'A production-grade RAG-powered assistant that converts natural language questions into optimized SQL queries. Combines LangChain document retrieval, ChromaDB vector storage, and an OpenAI LLM backend to enable non-technical users to query complex relational databases through a conversational interface.',
    tech: ['LangChain', 'ChromaDB', 'OpenAI', 'FastAPI', 'PostgreSQL', 'RAG'],
    github: 'https://github.com/umasuryateja',
    demo: '#',
    icon: <Database size={28} className="text-accent" />,
    gradient: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    id: 'resume-ai-pro',
    number: '#02',
    title: 'ResumeAI Pro',
    description:
      'An intelligent ATS resume analyzer that leverages multi-domain NLP classifiers and a dynamic scoring engine to evaluate resumes against job descriptions. Provides granular feedback on keyword density, semantic alignment, and formatting quality — helping candidates optimize for real-world ATS systems.',
    tech: ['Python', 'NLP', 'BERT', 'TF-IDF', 'scikit-learn', 'Streamlit'],
    github: 'https://github.com/umasuryateja',
    demo: '#',
    icon: <Brain size={28} className="text-purple-400" />,
    gradient: 'from-purple-500/20 to-pink-500/10',
  },
  {
    id: 'misinfo-detector',
    number: '#03',
    title: 'Hybrid Misinformation Detector',
    description:
      'A cutting-edge hybrid deep learning system combining BERT contextual embeddings, CNN local feature extraction, and LSTM sequence modeling for multi-label misinformation classification. Achieves high accuracy on social media text by fusing complementary architectures into a unified prediction pipeline.',
    tech: ['BERT', 'CNN', 'LSTM', 'PyTorch', 'HuggingFace', 'Python'],
    github: 'https://github.com/umasuryateja',
    demo: '#',
    icon: (
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none" className="text-red-400">
        <path d="M14 3L2 24h24L14 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 11v5M14 19v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-red-500/20 to-orange-500/10',
  },
]

const DATA_PROJECTS: Project[] = [
  {
    id: 'sales-analytics',
    number: '#04',
    title: 'Sales Analytics Dashboard',
    description:
      'An enterprise-grade interactive Power BI dashboard connected to a PostgreSQL data warehouse via optimized SQL ETL pipelines. Provides real-time sales KPIs, regional performance heatmaps, trend forecasting, and executive-level drill-through reporting across product categories and time dimensions.',
    tech: ['Power BI', 'PostgreSQL', 'SQL', 'Python', 'ETL', 'Pandas'],
    github: 'https://github.com/umasuryateja',
    demo: '#',
    icon: <BarChart3 size={28} className="text-green-400" />,
    gradient: 'from-green-500/20 to-teal-500/10',
  },
  {
    id: 'etl-pipeline',
    number: '#05',
    title: 'ETL Pipeline Automation',
    description:
      'A fully automated, fault-tolerant ETL framework built with Python and Pandas that orchestrates data ingestion from heterogeneous sources (REST APIs, CSV, databases) into a normalized PostgreSQL schema. Features incremental loading, data quality validation, error alerting, and scheduling via cron.',
    tech: ['Python', 'PostgreSQL', 'Pandas', 'SQLAlchemy', 'Docker', 'Cron'],
    github: 'https://github.com/umasuryateja',
    demo: '#',
    icon: <Workflow size={28} className="text-yellow-400" />,
    gradient: 'from-yellow-500/20 to-amber-500/10',
  },
]

/** Individual project card — CSS hover transitions, no Framer Motion initial/animate */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="glass-card gradient-border-top flex flex-col gap-5 p-6 relative overflow-hidden group hover:scale-[1.01] hover:-translate-y-1 transition-transform duration-200"
      aria-label={`Project: ${project.title}`}
    >
      {/* Background gradient blob */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            {project.icon}
          </div>
          <span className="text-xs font-mono text-accent/60 font-semibold tracking-widest">
            {project.number}
          </span>
        </div>
        <div className="flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200 focus-visible:outline-accent"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={16} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200 focus-visible:outline-accent"
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary relative z-10 leading-snug">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed relative z-10 flex-1">
        {project.description}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tech.map((t) => (
          <span key={t} className="tech-badge">
            {t}
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div className="flex gap-3 pt-1 relative z-10">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/30 text-accent text-xs font-semibold hover:bg-accent/10 hover:border-accent/60 transition-all duration-200 focus-visible:outline-accent"
          aria-label={`Open ${project.title} on GitHub`}
        >
          <Github size={13} />
          GitHub ↗
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-text-muted text-xs font-semibold hover:bg-white/5 hover:text-text-primary hover:border-white/20 transition-all duration-200 focus-visible:outline-accent"
          aria-label={`Open ${project.title} live demo`}
        >
          <ExternalLink size={13} />
          Live Demo ↗
        </a>
      </div>
    </article>
  )
}

/**
 * Projects Section — two sub-tabs: AI/ML and Data & Analytics.
 * 2-column grid on desktop.
 */
export default function Projects() {
  const [activeTab, setActiveTab] = useState<'ai' | 'data'>('ai')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const projects = activeTab === 'ai' ? AI_PROJECTS : DATA_PROJECTS

  return (
    <section id="projects" ref={ref} className="py-24 relative" aria-label="Projects section">
      <div className="section-container">
        <SectionHeader
          label="Projects"
          title="Featured Work"
          subtitle="A selection of AI/ML and data engineering projects built for production impact."
        />

        {/* Sub-tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
          role="tablist"
          aria-label="Project categories"
        >
          <div className="flex gap-1 p-1 rounded-xl bg-surface border border-[rgba(34,211,238,0.12)]">
            {(['ai', 'data'] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-accent ${
                  activeTab === tab
                    ? 'bg-accent text-background shadow-lg shadow-accent/20'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {tab === 'ai' ? '🤖 AI/ML Projects' : '📊 Data & Analytics'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid — plain div to prevent Framer Motion re-animation on tab switch */}
        <div
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
          role="tabpanel"
          aria-label={activeTab === 'ai' ? 'AI/ML Projects' : 'Data & Analytics Projects'}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
