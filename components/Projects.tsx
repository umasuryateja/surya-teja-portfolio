'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Database, Brain, BarChart3, FileSpreadsheet, Layers, FileText } from 'lucide-react'
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
    id: 'claimpilot-ai',
    number: '#01',
    title: 'ClaimPilot AI',
    description:
      'An AI-powered insurance claims automation platform that extracts structured data from uploaded claim documents using OCR and Gemini AI, validates information with Pydantic schemas, intelligently routes claims using a rule engine, and generates structured JSON outputs through an interactive Streamlit interface.',
    tech: [
      'Python',
      'Google Gemini API',
      'Streamlit',
      'OCR',
      'Pydantic',
      'Document AI',
      'Prompt Engineering',
      'Rule Engine',
      'JSON Extraction',
      'PDF Processing',
      'GitHub',
      'Render',
    ],
    github: 'https://github.com/umasuryateja/ClaimPilot-AI',
    demo: 'https://claimpilot-ai-ylrl.onrender.com/',
    icon: <FileText size={28} className="text-accent" />,
    gradient: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    id: 'resume-ai-pro',
    number: '#02',
    title: 'ResumeAI Pro',
    description:
      'AI-powered ATS Resume Analyzer that performs resume parsing, ATS scoring, semantic skill matching, job-role prediction, and personalized optimization recommendations using NLP and Machine Learning.',
    tech: ['Python', 'Streamlit', 'NLP', 'Machine Learning', 'TF-IDF', 'Naive Bayes', 'Pandas', 'Plotly', 'PDF Processing'],
    github: 'https://github.com/umasuryateja/Resume_AI_Pro',
    demo: 'https://resume-ai-pro-d0by.onrender.com/',
    icon: <Brain size={28} className="text-purple-400" />,
    gradient: 'from-purple-500/20 to-pink-500/10',
  },
  {
    id: 'projectpulse-ai',
    number: '#03',
    title: 'ProjectPulse AI',
    description:
      'AI-powered full-stack enterprise project management platform featuring project health scoring, risk analysis, stakeholder management, milestone tracking, AI-generated reports, and real-time project insights using Gemini AI.',
    tech: [
      'React.js',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Supabase',
      'Gemini AI',
      'REST APIs',
      'Render',
      'Vercel',
    ],
    github: 'https://github.com/umasuryateja/pmo_cockpit_pro',
    demo: 'https://pmo-cockpit-pro.vercel.app/',
    icon: <Layers size={28} className="text-cyan-400" />,
    gradient: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    id: 'misinfo-detector',
    number: '#04',
    title: 'Hybrid Deep Learning System for Misinformation Detection',
    description:
      'Multi-modal deep learning system combining BERT, CNN, and LSTM architectures for real-time misinformation detection across text and image content.',
    tech: ['Python', 'TensorFlow', 'BERT', 'CNN', 'LSTM', 'OpenCV', 'NLP', 'Deep Learning'],
    github: 'https://github.com/umasuryateja/-Hybrid-Deep-Learning-Based-System-for-Real-Time-Misinformation-and-Crime-Detection-',
    demo: 'https://github.com/umasuryateja/-Hybrid-Deep-Learning-Based-System-for-Real-Time-Misinformation-and-Crime-Detection-',
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
    id: 'customer-behavior-analysis',
    number: '#05',
    title: 'Customer Behavior Analysis',
    description:
      'Analyzed customer purchasing patterns using Python, SQL, and Power BI to identify trends, customer segments, and business KPIs. Covers full-cycle data work: cleaning, EDA, segmentation, and an executive Power BI dashboard with actionable business insights.',
    tech: ['Python', 'SQL', 'Power BI', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/umasuryateja/customer_behavior_analysis',
    demo: '#',
    icon: <BarChart3 size={28} className="text-green-400" />,
    gradient: 'from-green-500/20 to-teal-500/10',
  },
  {
    id: 'zepto-sql-analysis',
    number: '#06',
    title: 'Zepto SQL Data Analysis',
    description:
      'Performed SQL-based inventory and pricing analysis on real-world e-commerce data to generate revenue and stock insights. Includes 20+ analytical SQL queries covering inventory analysis, discount breakdowns, revenue insights, and data validation.',
    tech: ['PostgreSQL', 'SQL', 'Data Cleaning', 'BI Reporting'],
    github: 'https://github.com/umasuryateja/Zepto_SQL_Data_Analysis_Project',
    demo: '#',
    icon: <Database size={28} className="text-yellow-400" />,
    gradient: 'from-yellow-500/20 to-amber-500/10',
  },
  {
    id: 'ecommerce-sales-dashboard',
    number: '#07',
    title: 'Ecommerce Sales Dashboard',
    description:
      'Built an interactive Excel dashboard for e-commerce sales reporting, category analysis, and performance tracking. Features dynamic slicers, pivot tables, KPI cards, and sales trend charts to deliver clear business reporting for stakeholders.',
    tech: ['Excel', 'Pivot Tables', 'Charts', 'Slicers', 'KPI Reporting'],
    github: 'https://github.com/umasuryateja/Ecommerce-Sales-Dashboard-Excel',
    demo: '#',
    icon: <FileSpreadsheet size={28} className="text-emerald-400" />,
    gradient: 'from-emerald-500/20 to-green-500/10',
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
                {tab === 'ai' ? '🤖 AI Projects' : '📊 Data Projects'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid — plain div to prevent Framer Motion re-animation on tab switch */}
        <div
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
          role="tabpanel"
          aria-label={activeTab === 'ai' ? 'AI Projects' : 'Data Projects'}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
