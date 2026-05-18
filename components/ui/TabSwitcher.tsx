'use client'

import { motion } from 'framer-motion'

interface Tab {
  id: string
  label: string
}

interface TabSwitcherProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  /** ARIA label for the tab list */
  ariaLabel?: string
}

/**
 * Animated tab switcher with sliding underline indicator.
 * Uses Framer Motion layoutId for smooth tab indicator transition.
 */
export default function TabSwitcher({
  tabs,
  activeTab,
  onChange,
  ariaLabel = 'Tabs',
}: TabSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-1 p-1 rounded-xl bg-surface border border-[rgba(34,211,238,0.12)]"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          id={`tab-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:outline-accent ${
            activeTab === tab.id
              ? 'text-background'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          {/* Sliding active background */}
          {activeTab === tab.id && (
            <motion.span
              layoutId="tab-switcher-active"
              className="absolute inset-0 rounded-lg bg-accent"
              style={{ zIndex: 0 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
