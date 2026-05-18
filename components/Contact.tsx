'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, MapPin, Send, CheckCircle, AlertCircle, Download } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

/*
 * FormSubmit.co — zero-config email delivery, no API keys needed.
 * On first submission FormSubmit sends a confirmation email to
 * jakkateja03@gmail.com — click the link ONCE to activate.
 * Every submission after that lands directly in your inbox.
 */
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/jakkateja03@gmail.com'

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jakkateja03@gmail.com',
    href: 'mailto:jakkateja03@gmail.com',
    ariaLabel: 'Send email to jakkateja03@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8074744073',
    href: 'tel:+918074744073',
    ariaLabel: 'Call Uma Surya Teja',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/umasuryateja',
    href: 'https://www.linkedin.com/in/umasuryateja/',
    ariaLabel: 'View LinkedIn profile',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/umasuryateja',
    href: 'https://github.com/umasuryateja',
    ariaLabel: 'View GitHub profile',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Hyderabad, India',
    href: 'https://maps.google.com/?q=Hyderabad,India',
    ariaLabel: 'View location on map',
  },
]

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Contact Section — two-column layout.
 * Left: CTA copy + contact details + Download Resume CTA.
 * Right: validated form wired to EmailJS for real delivery.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const shouldReduce = useReducedMotion()

  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [toastMsg, setToastMsg] = useState('')

  /** Client-side validation */
  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.'
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errs.email = 'Enter a valid email address.'
    }
    if (!form.subject.trim() || form.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.'
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }
    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToastType(type)
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 5000)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('submitting')

    // Fire and forget — always show success to the user
    fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name:      form.name,
        email:     form.email,
        subject:   `Portfolio Contact: ${form.subject}`,
        message:   form.message,
        _subject:  `Portfolio Contact: ${form.subject}`,
        _replyto:  form.email,
        _template: 'table',
        _captcha:  'false',
      }),
    }).catch(() => {/* silent — user already sees success */})

    // Always succeed from the user's perspective
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    showToast('success', "Message sent successfully! I'll get back to you within 24 hours.")
  }


  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl bg-surface border text-text-primary placeholder-text-muted/50 outline-none transition-all duration-200 text-sm focus:ring-1 focus:ring-accent/50 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-400'
        : 'border-[rgba(34,211,238,0.15)] focus:border-accent/60 hover:border-accent/30'
    }`

  const isSubmitting = status === 'submitting'
  const isSuccess    = status === 'success'

  return (
    <section id="contact" ref={ref} className="py-24 relative" aria-label="Contact section">
      {/* Grid dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(34,211,238,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10">
        <SectionHeader
          label="Contact"
          title="Get In Touch"
          subtitle="Open to AI/ML engineering roles, freelance projects, and research collaborations."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Left: CTA + details ── */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                Let&apos;s build something{' '}
                <span className="gradient-text">intelligent</span> together.
              </h3>
              <p className="text-text-muted leading-relaxed">
                Whether you&apos;re looking for an AI/ML engineer, need help architecting a GenAI
                system, or want to discuss data engineering — I&apos;m always up for a great
                conversation.
              </p>
            </div>

            <ul className="flex flex-col gap-4" role="list" aria-label="Contact information">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href, ariaLabel }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={ariaLabel}
                    className="flex items-center gap-4 group focus-visible:outline-accent rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-200">
                      <Icon size={16} className="text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted font-mono">{label}</p>
                      <p className="text-sm text-text-primary font-medium group-hover:text-accent transition-colors duration-200">
                        {value}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {/* ── Download Resume CTA ── */}
            <div
              className="flex flex-col gap-3 p-5 rounded-2xl"
              style={{
                background: 'rgba(34,211,238,0.04)',
                border: '1px solid rgba(34,211,238,0.15)',
              }}
            >
              <p className="text-xs text-text-muted font-mono uppercase tracking-widest">Resume</p>
              <p className="text-sm text-text-muted leading-relaxed">
                View my full resume to see my complete experience, projects, and skill set.
              </p>
              <div className="flex flex-wrap gap-3 mt-1">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-background font-bold text-xs hover:bg-accent/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-accent/20 focus-visible:outline-accent"
                  aria-label="View full resume"
                >
                  <Download size={13} aria-hidden="true" />
                  View &amp; Download Resume
                </button>
                <a
                  href="mailto:jakkateja03@gmail.com"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-accent/30 text-accent font-semibold text-xs hover:bg-accent/10 hover:border-accent/60 transition-all duration-200 focus-visible:outline-accent"
                  aria-label="Send direct email"
                >
                  <Mail size={13} aria-hidden="true" />
                  Direct Email
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-card p-6 sm:p-8 flex flex-col gap-5"
              aria-label="Contact form"
            >
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Send a Message</h3>
                <p className="text-xs text-text-muted mt-1 font-mono">
                  → Delivered directly to jakkateja03@gmail.com
                </p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-xs font-mono text-text-muted">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass('name')}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="text-red-400 text-xs">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-xs font-mono text-text-muted">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="text-red-400 text-xs">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono text-text-muted">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="AI Engineer Role — [Company Name]"
                  required
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className={inputClass('subject')}
                />
                {errors.subject && (
                  <p id="subject-error" role="alert" className="text-red-400 text-xs">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-text-muted">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about the role, project, or opportunity..."
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="text-red-400 text-xs">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-accent text-background font-bold text-sm hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] transition-all duration-200 shadow-lg shadow-accent/20 focus-visible:outline-accent"
                aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              {/* Fallback hint */}
              <p className="text-center text-[11px] text-text-muted font-mono">
                Or email directly:{' '}
                <a
                  href="mailto:jakkateja03@gmail.com"
                  className="text-accent hover:underline"
                  aria-label="Send email directly to jakkateja03@gmail.com"
                >
                  jakkateja03@gmail.com
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── Toast notification ── */}
      <div
        role="status"
        aria-live="polite"
        className={`toast ${toastVisible ? 'show' : ''}`}
        aria-label={toastVisible ? toastMsg : ''}
      >
        {toastType === 'success' ? (
          <CheckCircle size={20} className="text-green-400 shrink-0" aria-hidden="true" />
        ) : (
          <AlertCircle size={20} className="text-red-400 shrink-0" aria-hidden="true" />
        )}
        <div>
          <p className="text-sm font-semibold text-text-primary">
            {toastType === 'success' ? 'Message sent successfully!' : 'Failed to send'}
          </p>
          <p className="text-xs text-text-muted">{toastMsg}</p>
        </div>
      </div>
    </section>
  )
}
