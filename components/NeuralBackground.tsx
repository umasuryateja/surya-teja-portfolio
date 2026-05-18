'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

/**
 * NeuralBackground — lightweight canvas animation.
 * Draws ~80 glowing cyan nodes connected by fading lines when within 120px.
 * Subtle mouse parallax. Fixed position, z-index 0.
 * Respects prefers-reduced-motion.
 */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const NODE_COUNT = 80
    const CONNECTION_DISTANCE = 120
    const ACCENT = '34, 211, 238'
    const MOUSE_PARALLAX = 0.015

    /** Resize canvas to full viewport */
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    /** Initialize nodes at random positions */
    const initNodes = (): Node[] =>
      Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }))

    nodesRef.current = initNodes()

    /** Track mouse position for parallax */
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    /** Main animation loop */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mouseRef.current
      const nodes = nodesRef.current

      // Update node positions
      nodes.forEach((node) => {
        // Subtle mouse parallax push
        const dx = node.x - mx
        const dy = node.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          node.vx += (dx / dist) * MOUSE_PARALLAX
          node.vy += (dy / dist) * MOUSE_PARALLAX
        }

        node.x += node.vx
        node.y += node.vy

        // Dampen velocity
        node.vx *= 0.99
        node.vy *= 0.99

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${ACCENT}, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        )
        gradient.addColorStop(0, `rgba(${ACCENT}, ${node.opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(${ACCENT}, 0)`)

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, ${node.opacity})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.4 }}
      aria-hidden="true"
    />
  )
}
