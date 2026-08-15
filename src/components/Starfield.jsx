import { useEffect, useRef } from 'react'

function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let width, height
    let stars = []
    let bigStars = []
    let constellations = []

    function resize() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio

      stars = Array.from({ length: 260 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.08,
        driftY: (Math.random() - 0.5) * 0.02,
      }))

      bigStars = Array.from({ length: 14 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1.8,
        color: Math.random() > 0.5 ? '255, 240, 210' : '190, 210, 255',
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
      }))

      constellations = []
      const clusterCount = 4
      for (let c = 0; c < clusterCount; c++) {
        const cx = Math.random() * width
        const cy = Math.random() * height
        const points = Array.from({ length: 5 + Math.floor(Math.random() * 3) }, () => ({
          x: cx + (Math.random() - 0.5) * 220,
          y: cy + (Math.random() - 0.5) * 160,
        }))
        constellations.push(points)
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      ctx.strokeStyle = 'rgba(150, 170, 255, 0.18)'
      ctx.lineWidth = 1
      constellations.forEach((points) => {
        ctx.beginPath()
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })
        ctx.stroke()
        points.forEach((p) => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(200, 210, 255, 0.7)'
          ctx.fill()
        })
      })

      for (const s of stars) {
        s.phase += s.twinkleSpeed
        const alpha = Math.max(0, s.baseAlpha + Math.sin(s.phase) * 0.3)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(226, 222, 255, ${alpha})`
        ctx.fill()
        s.x += s.driftX
        s.y += s.driftY
        if (s.x < 0) s.x = width
        if (s.x > width) s.x = 0
        if (s.y < 0) s.y = height
        if (s.y > height) s.y = 0
      }

      for (const s of bigStars) {
        s.phase += s.twinkleSpeed
        const glow = 0.6 + Math.sin(s.phase) * 0.35
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 8)
        grad.addColorStop(0, `rgba(${s.color}, ${glow})`)
        grad.addColorStop(1, `rgba(${s.color}, 0)`)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * 8, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.color}, 1)`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />
}

export default Starfield
