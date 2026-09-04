import { useEffect, useRef } from 'react'

import './NodeFriends.css'

const palette = [
  { r: 255, g: 200, b: 120 },
  { r: 160, g: 140, b: 255 },
  { r: 255, g: 140, b: 160 },
  { r: 130, g: 220, b: 200 },
  { r: 140, g: 190, b: 255 },
]

export default function NodeFriends() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, DPR
    let nodes = []
    let mouse = { x: -9999, y: -9999, active: false }
    let ripples = []
    let travelers = []
    let start = null

    function rand(a, b) { return a + Math.random() * (b - a) }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * DPR
      canvas.height = H * DPR
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    class Node {
      constructor() {
        this.reset()
        this.pulsePhase = Math.random() * Math.PI * 2
        this.pulseSpeed = rand(0.5, 1.1)
        this.color = palette[Math.floor(Math.random() * palette.length)]
      }
      reset() {
        this.x = rand(0, W)
        this.y = rand(0, H)
        this.vx = rand(-0.18, 0.18)
        this.vy = rand(-0.18, 0.18)
        this.baseR = rand(1.6, 3.2)
      }
      step(t) {
        this.x += this.vx
        this.y += this.vy
        if (this.x < -20) this.x = W + 20
        if (this.x > W + 20) this.x = -20
        if (this.y < -20) this.y = H + 20
        if (this.y > H + 20) this.y = -20

        if (mouse.active) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 180 && dist > 0.01) {
            const force = (1 - dist / 180) * 0.035
            this.vx += (dx / dist) * force
            this.vy += (dy / dist) * force
          }
        }

        this.vx *= 0.995
        this.vy *= 0.995
        const speed = Math.hypot(this.vx, this.vy)
        if (speed > 0.6) {
          this.vx = (this.vx / speed) * 0.6
          this.vy = (this.vy / speed) * 0.6
        }

        this.r = this.baseR + Math.sin(t * this.pulseSpeed + this.pulsePhase) * 0.6
      }
      draw() {
        const { r, g, b } = this.color
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6)
        glow.addColorStop(0, `rgba(${r},${g},${b},0.55)`)
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(${Math.min(255, r + 40)},${Math.min(255, g + 40)},${Math.min(255, b + 40)},0.95)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 14000))
      nodes = []
      for (let i = 0; i < count; i++) nodes.push(new Node())
    }

    function spawnRipple(x, y) {
      ripples.push({ x, y, r: 0, alpha: 0.5 })
    }

    function updateRipples() {
      ripples.forEach(rp => {
        rp.r += 9
        rp.alpha *= 0.94
        for (const n of nodes) {
          const dx = n.x - rp.x, dy = n.y - rp.y
          const dist = Math.hypot(dx, dy)
          if (Math.abs(dist - rp.r) < 30 && dist > 0.01) {
            const force = (1 - Math.abs(dist - rp.r) / 30) * 0.9
            n.vx += (dx / dist) * force * 0.05
            n.vy += (dy / dist) * force * 0.05
          }
        }
      })
      ripples = ripples.filter(rp => rp.alpha > 0.02)
    }

    function drawCursorLinks() {
      if (!mouse.active) return
      for (const n of nodes) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 190) {
          const alpha = (1 - dist / 190) * 0.55
          const { r, g, b } = n.color
          ctx.strokeStyle = `rgba(${Math.min(255, r + 60)},${Math.min(255, g + 60)},${Math.min(255, b + 60)},${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(n.x, n.y)
          ctx.stroke()
        }
      }
      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 22)
      glow.addColorStop(0, 'rgba(255,255,255,0.9)')
      glow.addColorStop(0.4, 'rgba(190,170,255,0.4)')
      glow.addColorStop(1, 'rgba(190,170,255,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    function maybeSpawnTraveler(a, b) {
      if (Math.random() < 0.0018) {
        travelers.push({ a, b, t: 0, speed: rand(0.006, 0.014) })
      }
    }

    function drawLinks() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.35
            const cr = (a.color.r + b.color.r) / 2
            const cg = (a.color.g + b.color.g) / 2
            const cb = (a.color.b + b.color.b) / 2
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            maybeSpawnTraveler(a, b)
          }
        }
      }

      travelers = travelers.filter(tr => tr.t <= 1)
      for (const tr of travelers) {
        tr.t += tr.speed
        const x = tr.a.x + (tr.b.x - tr.a.x) * tr.t
        const y = tr.a.y + (tr.b.y - tr.a.y) * tr.t
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 8)
        grad.addColorStop(0, 'rgba(255,255,255,0.9)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawRipples() {
      for (const rp of ripples) {
        ctx.strokeStyle = `rgba(200,190,255,${rp.alpha})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    function frame(ts) {
      if (!start) start = ts
      const t = (ts - start) / 1000

      ctx.clearRect(0, 0, W, H)

      const bg = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, Math.max(W, H) * 0.8)
      bg.addColorStop(0, 'rgba(70,50,140,0.18)')
      bg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      updateRipples()
      for (const n of nodes) n.step(t)
      drawLinks()
      drawCursorLinks()
      drawRipples()
      for (const n of nodes) n.draw()

      requestAnimationFrame(frame)
    }

    resize()
    init()
    requestAnimationFrame(frame)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    })
    window.addEventListener('mouseleave', () => { mouse.active = false })
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
        mouse.active = true
      }
    }, { passive: true })
    window.addEventListener('touchend', () => { mouse.active = false })
    window.addEventListener('mousedown', (e) => spawnRipple(e.clientX, e.clientY))
    window.addEventListener('touchstart', (e) => {
      if (e.touches[0]) spawnRipple(e.touches[0].clientX, e.touches[0].clientY)
    }, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="node-friends-canvas" aria-hidden="true" />
}
