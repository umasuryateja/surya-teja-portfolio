'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { BrainCircuit, Database, Award, Briefcase, MapPin, Wifi, GraduationCap, Download } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

/** Stats shown as floating badges overlaid on the photo */
const PHOTO_STATS = [
  { icon: BrainCircuit, value: '3+', label: 'AI Projects',      color: 'text-accent',     bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)' },
  { icon: Database,     value: '2+', label: 'Data Projects',    color: 'text-cyan-300',   bg: 'rgba(103,232,249,0.10)', border: 'rgba(103,232,249,0.25)' },
  { icon: Briefcase,    value: '1',  label: 'Internship',       color: 'text-blue-400',   bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.25)' },
  { icon: Award,        value: '4',  label: 'Certifications',   color: 'text-purple-400', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.25)' },
]

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
})

const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
})

const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
})

/**
 * About Section — Premium editorial layout.
 *
 * LEFT  : Large tall portrait photo (520px) with:
 *         - soft rounded corners (2rem)
 *         - animated cyan glow border
 *         - cinematic gradient overlay (bottom)
 *         - 4 floating stat badges embedded on the photo
 *         - "● Open to Work" status chip
 *
 * RIGHT : Bio intro tag, bio paragraphs with highlights,
 *         education strip, quick-fact chips, download CTA.
 */
export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const shouldReduce = useReducedMotion()

  const v = (variants: ReturnType<typeof fadeUp>) =>
    isInView ? variants : { hidden: variants.hidden }

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden" aria-label="About me section">

      {/* Decorative background blob — subtle radial behind the photo */}
      <div
        className="absolute -left-32 top-1/4 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionHeader
          label="About"
          title="Who I Am"
          subtitle="Building the next generation of intelligent AI/ML systems — from research to production."
        />

        {/*
          Main grid — 5:8 ratio on desktop.
          Photo column is deliberately wider to give it editorial prominence.
        */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[5fr_8fr] gap-10 xl:gap-16 items-start">

          {/* ════════════════════════════════════════
              LEFT — Large portrait photo
          ════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeLeft(0)}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[340px] lg:max-w-full">

              {/* ── Animated outer glow ring ── */}
              <motion.div
                className="absolute -inset-2 rounded-[2.25rem] pointer-events-none"
                animate={shouldReduce ? {} : {
                  boxShadow: [
                    '0 0 30px rgba(34,211,238,0.12)',
                    '0 0 65px rgba(34,211,238,0.30)',
                    '0 0 30px rgba(34,211,238,0.12)',
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />

              {/* ── Photo frame ── */}
              <motion.div
                whileHover={shouldReduce ? {} : { scale: 1.015 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] rounded-[2rem] overflow-hidden"
                style={{
                  border: '2px solid rgba(34,211,238,0.35)',
                  boxShadow:
                    '0 0 50px rgba(34,211,238,0.12), 0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                {/* Actual photo */}
                <Image
                  src="/profile.jpg"
                  alt="Jakka Uma Surya Teja — AI/ML Engineer based in Hyderabad"
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 480px"
                  className="object-cover object-center"
                  priority
                  quality={92}
                />

                {/* Cinematic gradient — dark fade at bottom so badges are readable */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 30%, rgba(5,8,16,0.5) 70%, rgba(5,8,16,0.88) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Subtle top-right cyan specular tint */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 80% 10%, rgba(34,211,238,0.12) 0%, transparent 50%)',
                  }}
                  aria-hidden="true"
                />

                {/* ── Floating stat badges — 2 columns at photo bottom ── */}
                <div className="absolute bottom-0 left-0 right-0 p-4 grid grid-cols-2 gap-2">
                  {PHOTO_STATS.map(({ icon: Icon, value, label, color, bg, border }, i) => (
                    <motion.div
                      key={label}
                      initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                      style={{
                        background: bg,
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: `1px solid ${border}`,
                      }}
                    >
                      <Icon size={15} className={color} aria-hidden="true" />
                      <div className="min-w-0">
                        <span className={`block text-base font-extrabold leading-none ${color}`}>
                          {value}
                        </span>
                        <span className="block text-[10px] text-white/55 font-mono truncate leading-tight mt-0.5">
                          {label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ── Status chip — floats below photo ── */}
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.45 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10"
              >
                <div
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                  style={{
                    background: 'rgba(10,15,30,0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(34,211,238,0.4)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 20px rgba(34,211,238,0.1)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-text-primary">Open to AI/ML Roles</span>
                  <span className="text-accent font-mono text-xs">· Hyderabad</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════
              RIGHT — Bio content
          ════════════════════════════════════════ */}
          <div className="flex flex-col gap-7 lg:pt-2">

            {/* Intro code-tag */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeRight(0.15)}
              className="inline-flex items-center gap-2"
            >
              <span className="text-accent font-mono text-sm opacity-70">&lt;</span>
              <span className="text-accent font-mono text-sm font-semibold tracking-wide">
                AI/ML Engineer
              </span>
              <span className="text-accent font-mono text-sm opacity-70">/&gt;</span>
            </motion.div>

            {/* Headline */}
            <motion.h3
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeRight(0.2)}
              className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight"
            >
              Building AI that{' '}
              <span className="gradient-text">actually works</span>
              <br className="hidden sm:block" /> in production.
            </motion.h3>

            {/* Bio paragraphs */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeRight(0.28)}
              className="space-y-4"
            >
              <p className="text-text-muted leading-relaxed text-[0.96rem]">
                I&apos;m <span className="text-text-primary font-semibold">Uma Surya Teja</span> — a
                B.Tech Computer Science graduate (AI & ML, CGPA{' '}
                <span className="text-accent font-semibold font-mono">8.82</span>) from
                Hyderabad, passionate about building end-to-end AI systems that solve
                real-world problems.
              </p>
              <p className="text-text-muted leading-relaxed text-[0.96rem]">
                I specialize in{' '}
                <span className="text-text-primary font-medium">
                  Generative AI, LLMs, NLP, and RAG architectures
                </span>{' '}
                — from designing LangChain pipelines to fine-tuning BERT models and building
                conversational AI interfaces. I&apos;m equally comfortable with{' '}
                <span className="text-accent">data engineering</span> — ETL pipelines, SQL
                optimization, and Power BI dashboards.
              </p>
              <p className="text-text-muted leading-relaxed text-[0.96rem]">
                Currently seeking fresher roles in{' '}
                <span className="text-text-primary font-medium">
                  AI Engineering, GenAI Development, and Data Science
                </span>{' '}
                at companies pushing the frontier of intelligent systems.
              </p>
            </motion.div>

            {/* Education strip */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeRight(0.35)}
            >
              <div
                className="flex items-start gap-4 p-4 rounded-2xl"
                style={{
                  background: 'rgba(34,211,238,0.04)',
                  border: '1px solid rgba(34,211,238,0.15)',
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0">
                  <GraduationCap size={18} className="text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-text-primary font-semibold text-sm leading-snug">
                    B.Tech — Computer Science & Engineering (AI & ML)
                  </p>
                  <p className="text-text-muted text-xs mt-0.5 font-mono">
                    JNTUK · Raghu Engineering College · 2021–2025 ·{' '}
                    <span className="text-accent">CGPA 8.82 / 10.0</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick-fact chips */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeRight(0.42)}
              className="flex flex-wrap gap-2.5"
            >
              {[
                { icon: MapPin,  label: 'Hyderabad, India' },
                { icon: Wifi,    label: 'Open to Remote'   },
                { icon: BrainCircuit, label: 'AI / ML / GenAI' },
                { icon: Database, label: 'Data Engineering'  },
              ].map(({ icon: ChipIcon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-text-muted border border-white/10 bg-white/3 hover:text-text-primary hover:border-white/20 transition-colors"
                >
                  <ChipIcon size={12} className="text-accent shrink-0" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA — Resume download */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp(0.5)}
              className="flex items-center gap-4 pt-1"
            >
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-accent text-background font-bold text-sm hover:bg-accent/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-accent/20 focus-visible:outline-accent"
                aria-label="View full resume"
              >
                <Download size={15} aria-hidden="true" />
                View Full Resume
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors font-medium focus-visible:outline-accent"
                aria-label="Go to contact section"
              >
                Let&apos;s connect →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
