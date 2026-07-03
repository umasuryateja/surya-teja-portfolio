'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Award, ExternalLink, Github, Linkedin } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

interface Cert {
  id: string
  name: string
  issuer: string
  year: string
  badge: string
  link: string
  color: string
  duration?: string
  skills?: string[]
  description?: string
  customIcons?: boolean
}

const CERTS: Cert[] = [
  {
    id: 'nptel-python',
    name: 'Programming in Python',
    issuer: 'NPTEL — IIT Madras',
    year: '2024',
    badge: '🐍',
    link: '#',
    color: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    id: 'nptel-dbms',
    name: 'Database Management Systems',
    issuer: 'NPTEL — IIT Madras',
    year: '2024',
    badge: '🗄️',
    link: '#',
    color: 'from-purple-500/20 to-blue-500/10',
  },
  {
    id: 'deloitte-analytics',
    name: 'Data Analytics Simulation',
    issuer: 'Deloitte Australia',
    year: '2024',
    badge: '📊',
    link: '#',
    color: 'from-green-500/20 to-teal-500/10',
  },
  {
    id: 'ssksdp-de',
    name: 'Data Engineering Training',
    issuer: 'Sri Sathya Sai Skill Dev Program',
    year: '2025',
    badge: '⚙️',
    link: '#',
    color: 'from-orange-500/20 to-yellow-500/10',
  },
  {
    id: 'github-essentials',
    name: 'Career Essentials in GitHub Professional Certificate',
    issuer: 'LinkedIn Learning × GitHub',
    year: 'July 2026',
    badge: '🐙',
    link: '/github-certificate.pdf',
    color: 'from-slate-500/20 to-zinc-500/10',
    duration: '4 Hours 20 Minutes',
    skills: [
      'GitHub',
      'Version Control',
      'Repository Management',
      'GitHub Actions',
      'GitHub Copilot',
      'Project Collaboration',
      'Code Search',
    ],
    description:
      'Completed the Career Essentials in GitHub Professional Certificate learning path, gaining practical experience with GitHub workflows, collaboration, automation, repository management, GitHub Actions, Copilot, and Code Search.',
    customIcons: true,
  },
]


/**
 * Certifications Section — 2×2 card grid.
 * Each card: glowing cert icon, issuer, name, shimmer on hover.
 */
export default function Certifications() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-24 relative"
      aria-label="Certifications section"
    >
      <div className="section-container">
        <SectionHeader
          label="Certifications"
          title="Credentials"
          subtitle="Verified certifications from leading institutions in technology and data science."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {CERTS.map((cert, i) => (
            <motion.article
              key={cert.id}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={shouldReduce ? {} : { scale: 1.02, y: -3 }}
              className={`glass-card p-6 flex items-start gap-5 relative overflow-hidden group cursor-default ${
                cert.id === 'github-essentials' ? 'sm:col-span-2' : 'col-span-1'
              }`}
              aria-label={`Certificate: ${cert.name} from ${cert.issuer}`}
            >
              {/* Shimmer overlay on hover */}
              <div
                className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className="relative z-10 w-14 h-14 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 group-hover:border-accent/50 transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(34,211,238,0.1)',
                }}
              >
                {cert.customIcons ? (
                  <div className="flex items-center gap-1 text-accent select-none" role="img" aria-hidden="true">
                    <Linkedin size={16} />
                    <span className="text-xs text-text-muted/60 font-semibold">×</span>
                    <Github size={16} />
                  </div>
                ) : (
                  <span className="text-2xl select-none" role="img" aria-hidden="true">
                    {cert.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-1.5 min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-text-primary leading-snug">
                    {cert.name}
                  </h3>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-all focus-visible:outline-accent"
                    aria-label={`View ${cert.name} certificate`}
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
                <p className="text-accent text-xs font-semibold truncate">{cert.issuer}</p>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1">
                  <div className="flex items-center gap-1">
                    <Award size={12} className="text-text-muted" aria-hidden="true" />
                    <span className="text-text-muted text-xs font-mono">{cert.year}</span>
                  </div>
                  {cert.duration && (
                    <span className="text-text-muted text-xs font-mono">
                      • {cert.duration}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/25 text-green-400 text-[10px] font-medium">
                    Verified
                  </span>
                </div>

                {cert.description && (
                  <p className="text-text-muted text-xs mt-2.5 leading-relaxed">
                    {cert.description}
                  </p>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="tech-badge text-[10px] px-2 py-0.5">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
