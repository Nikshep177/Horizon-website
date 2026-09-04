import { useEffect, useRef } from 'react'

function Aurora({ colorStops = ['#3A29FF', '#FF94B9', '#FFD89C'], speed = 0.5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let animationId
    let width, height
    let bands = []

    function hexToRgb(hex) {
      const c = hex.replace('#', '').padEnd(6, '0')
      return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]
    }

    const rgbStops = colorStops.map(hexToRgb)

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.width = canvas.offsetWidth * pixelRatio
      height = canvas.height = canvas.offsetHeight * pixelRatio

      bands = Array.from({ length: 4 }, (_, i) => ({
        y: height * (0.15 + i * 0.18),
        speed: (0.004 + Math.random() * 0.006) * speed,
        amplitude: 50 + Math.random() * 90,
        frequency: 0.0015 + Math.random() * 0.0025,
        phase: Math.random() * Math.PI * 2,
        color: rgbStops[i % rgbStops.length],
        opacity: 0.06 + Math.random() * 0.08,
        drift: (0.002 + Math.random() * 0.004) * speed,
        driftPhase: Math.random() * Math.PI * 2,
        widthFactor: 0.5 + Math.random() * 0.5,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (const b of bands) {
        b.phase += b.speed
        b.driftPhase += b.drift

        const offset = Math.sin(b.driftPhase) * width * 0.06
        const [r, g, bl] = b.color

        for (let x = -50; x < width + 50; x += 2) {
          const wave = Math.sin((x + offset) * b.frequency + b.phase) * b.amplitude
          const wave2 = Math.sin((x + offset) * b.frequency * 2.1 + b.phase * 1.6) * b.amplitude * 0.25
          const yPos = b.y + wave + wave2

          const distFromCenter = Math.abs(x - width / 2) / (width / 2)
          const edgeFade = Math.max(0, 1 - distFromCenter * 1.3)

          const alpha = b.opacity * edgeFade * (0.4 + 0.6 * Math.sin(x * 0.008 + b.phase * 0.4))
          if (alpha < 0.01) continue

          ctx.beginPath()
          ctx.arc(x, yPos, 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, ${alpha})`
          ctx.fill()
        }
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
  }, [colorStops, speed])

  return <canvas ref={canvasRef} aria-hidden="true" />
}

export default Aurora
