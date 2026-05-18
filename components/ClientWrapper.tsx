'use client'

import { useState, useEffect } from 'react'
import ResumeModal from '@/components/ResumeModal'

/**
 * Client-side wrapper that lives at the page root level.
 * Manages the resume modal state globally so ANY button anywhere
 * (Navbar, Hero, About, etc.) can open it by dispatching:
 *   window.dispatchEvent(new CustomEvent('open-resume-modal'))
 */
export default function ClientWrapper() {
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    const handler = () => setResumeOpen(true)
    window.addEventListener('open-resume-modal', handler)
    return () => window.removeEventListener('open-resume-modal', handler)
  }, [])

  return (
    <ResumeModal
      isOpen={resumeOpen}
      onClose={() => setResumeOpen(false)}
    />
  )
}
