'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'

interface Skill {
  name: string
  icon: string
  level: number // 1–5
}

interface SkillTab {
  id: string
  label: string
  skills: Skill[]
}

const SKILL_TABS: SkillTab[] = [
  {
    id: 'ai-ml',
    label: 'AI & ML',
    skills: [
      { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', level: 5 },
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', level: 4 },
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', level: 4 },
      { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', level: 5 },
      { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', level: 5 },
      { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg', level: 4 },
      { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', level: 3 },
    ],
  },
  {
    id: 'dl-nlp',
    label: 'Deep Learning & NLP',
    skills: [
      { name: 'BERT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
      { name: 'Transformers', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
      { name: 'NLTK', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 5 },
      { name: 'spaCy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
      { name: 'CNN', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', level: 4 },
      { name: 'LSTM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', level: 4 },
      { name: 'Word2Vec', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
    ],
  },
  {
    id: 'genai-llm',
    label: 'GenAI & LLMs',
    skills: [
      { name: 'LangChain', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 5 },
      { name: 'OpenAI API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 5 },
      { name: 'RAG Systems', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
      { name: 'Vector DBs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
      { name: 'Prompt Eng.', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 5 },
      { name: 'HuggingFace', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
      { name: 'ChromaDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
    ],
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    skills: [
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 5 },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 4 },
      { name: 'Power BI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg', level: 4 },
      { name: 'ETL Pipelines', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 4 },
      { name: 'Excel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg', level: 5 },
      { name: 'Tableau', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 3 },
    ],
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    skills: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 4 },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 5 },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', level: 5 },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', level: 4 },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', level: 4 },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', level: 3 },
    ],
  },
  {
    id: 'langs-tools',
    label: 'Languages & Tools',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 5 },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 3 },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 3 },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 3 },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', level: 5 },
      { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', level: 5 },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', level: 3 },
    ],
  },
]

/** Proficiency dots display */
function ProficiencyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Proficiency: ${level} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < level ? 'bg-accent' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  )
}

/**
 * Skills Section — tabbed interface with 6 categories.
 * Tab panel uses CSS opacity transition (not Framer Motion) to avoid
 * re-animation issues with useInView(once:true) + key-based re-renders.
 */
export default function Skills() {
  const [activeTab, setActiveTab] = useState('ai-ml')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const shouldReduce = useReducedMotion()

  const currentTab = SKILL_TABS.find((t) => t.id === activeTab)!

  return (
    <section id="skills" ref={ref} className="py-24 relative" aria-label="Skills section">
      <div className="section-container">
        <SectionHeader
          label="Skills"
          title="Technical Expertise"
          subtitle="A comprehensive stack spanning AI/ML, data engineering, and modern development tools."
        />

        {/* Tab switcher — Framer Motion fade-in on mount only */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-wrap gap-2 justify-center"
          role="tablist"
          aria-label="Skill categories"
        >
          {SKILL_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-accent ${
                activeTab === tab.id
                  ? 'text-accent bg-accent/10 border border-accent/30'
                  : 'text-text-muted border border-transparent hover:text-text-primary hover:border-white/10 hover:bg-white/5'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-accent rounded-full"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/*
          Skills grid — rendered WITHOUT Framer Motion initial/animate to avoid
          the Framer Motion v11 bug where key-based re-mounts inside a
          once:true useInView parent cause permanent opacity:0 state.
          Uses CSS transition for the smooth fade instead.
        */}
        <div
          className="mt-10"
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          style={{ transition: 'opacity 0.2s ease' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentTab.skills.map((skill) => (
              <div
                key={`${activeTab}-${skill.name}`}
                className="glass-card p-4 flex flex-col items-center gap-3 cursor-default text-center hover:scale-[1.02] hover:-translate-y-0.5 transition-transform duration-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={skill.icon}
                  alt={`${skill.name} logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
                <span className="text-sm font-medium text-text-primary font-mono leading-tight">
                  {skill.name}
                </span>
                <ProficiencyDots level={skill.level} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
