'use client'

import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ZoomIn, Maximize2, Minimize2 } from 'lucide-react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * ResumeModal — glassmorphism full-screen modal.
 * Shows /resume-preview.jpg as a scrollable preview.
 * Close: X button | Esc key | backdrop click.
 * Actions: Download | Full Size (new tab) | Fullscreen toggle | Zoom.
 */
export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.25, 2.5))
      if (e.key === '-') setZoom((z) => Math.max(z - 0.25, 0.5))
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setZoom(1)
      setIsFullscreen(false)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="resume-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/88 backdrop-blur-md"
            style={{ zIndex: 9998 }}
            aria-hidden="true"
          />

          {/* ── Modal Panel ── */}
          <motion.div
            key="resume-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 flex items-start sm:items-center justify-center p-3 sm:p-6 pointer-events-none"
            style={{ zIndex: 9999 }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            <div
              className="pointer-events-auto w-full max-w-2xl max-h-[96vh] flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(8, 12, 24, 0.97)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: '1px solid rgba(34,211,238,0.28)',
                boxShadow:
                  '0 0 0 1px rgba(34,211,238,0.06), 0 0 80px rgba(34,211,238,0.14), 0 40px 100px rgba(0,0,0,0.75)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header ── */}
              <div
                className="flex items-center justify-between px-5 py-3.5 shrink-0"
                style={{ borderBottom: '1px solid rgba(34,211,238,0.12)' }}
              >
                {/* Title */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <div>
                    <p className="text-text-primary font-bold text-sm leading-none">Resume</p>
                    <p className="text-text-muted text-[11px] mt-0.5 font-mono">
                      Jakka Uma Surya Teja — AI/ML Engineer
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {/* Zoom controls */}
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg" style={{ border: '1px solid rgba(34,211,238,0.18)' }}>
                    <button
                      onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                      className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-accent transition-colors text-base leading-none focus-visible:outline-accent"
                      aria-label="Zoom out"
                    >
                      −
                    </button>
                    <span className="text-[11px] font-mono text-text-muted w-9 text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
                      className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-accent transition-colors text-base leading-none focus-visible:outline-accent"
                      aria-label="Zoom in"
                    >
                      +
                    </button>
                  </div>

                  {/* Fullscreen toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-accent hover:bg-accent/8 transition-all duration-200 focus-visible:outline-accent"
                    style={{ border: '1px solid rgba(34,211,238,0.18)' }}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                    {isFullscreen ? 'Exit' : 'Fullscreen'}
                  </button>

                  {/* View full size in new tab */}
                  <a
                    href="/resume-preview.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-accent hover:bg-accent/8 transition-all duration-200 focus-visible:outline-accent"
                    style={{ border: '1px solid rgba(34,211,238,0.18)' }}
                    aria-label="Open full-size resume in new tab"
                  >
                    <ZoomIn size={13} />
                    Full Size
                  </a>

                  {/* Download */}
                  <a
                    href="/resume-preview.jpg"
                    download="Jakka_Uma_Surya_Teja_Resume.jpg"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent text-background font-semibold text-xs hover:bg-accent/90 transition-all duration-200 focus-visible:outline-accent"
                    style={{ boxShadow: '0 2px 12px rgba(34,211,238,0.25)' }}
                    aria-label="Download resume as image"
                  >
                    <Download size={13} />
                    Download
                  </a>

                  {/* Close */}
                  <button
                    onClick={onClose}
                    className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-all duration-200 focus-visible:outline-accent"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                    aria-label="Close resume preview"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* ── Resume image (scrollable + zoomable) ── */}
              <div className="overflow-auto flex-1 p-4 sm:p-5">
                <div
                  className="relative rounded-xl overflow-hidden mx-auto transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.07)',
                    width: `${zoom * 100}%`,
                    minWidth: zoom < 1 ? `${zoom * 100}%` : undefined,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/resume-preview.jpg"
                    alt="Jakka Uma Surya Teja Resume"
                    className="w-full h-auto block"
                    style={{ display: 'block' }}
                  />
                </div>

                {/* Footer hint */}
                <p className="text-center text-text-muted text-[11px] mt-4 font-mono">
                  Press{' '}
                  <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5 text-[10px]">
                    Esc
                  </kbd>{' '}
                  to close ·{' '}
                  <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5 text-[10px]">
                    +
                  </kbd>
                  {' / '}
                  <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5 text-[10px]">
                    −
                  </kbd>{' '}
                  to zoom · Click outside to dismiss
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
