import { useEffect } from 'react'
import './CustomCursor.css'

const BASE = import.meta.env.BASE_URL
const STAR = `${BASE}cursors/star-cursor.png`
const MOON = `${BASE}cursors/moon-cursor.png`
const SAKURA = `${BASE}cursors/sakura.png`

export default function CustomCursor({ enabled }) {
  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    root.style.setProperty('--cursor-star', `url("${STAR}") 0 0, auto`)
    root.style.setProperty('--cursor-moon', `url("${MOON}") 0 0, pointer`)
    root.style.setProperty('--sakura-image', `url("${SAKURA}")`)
    root.classList.add('has-custom-cursor')

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const layer = document.createElement('div')
    layer.className = 'sakura-trail'
    layer.setAttribute('aria-hidden', 'true')
    document.body.appendChild(layer)

    let lastSpawn = 0
    let lastX = 0
    let lastY = 0

    function spawnPetal(x, y) {
      const angle = Math.random() * Math.PI * 2
      const radius = 10 + Math.random() * 20
      const petal = document.createElement('span')
      petal.className = 'sakura-petal'
      petal.style.left = `${x + Math.cos(angle) * radius}px`
      petal.style.top = `${y + Math.sin(angle) * radius}px`
      petal.style.setProperty('--drift', `${(Math.random() - 0.5) * 36}px`)
      petal.style.setProperty('--drop', `${40 + Math.random() * 28}px`)
      petal.style.setProperty('--spin', `${(Math.random() - 0.5) * 70}deg`)
      petal.style.setProperty('--size', `${12 + Math.random() * 8}px`)
      petal.style.setProperty('--life', `${1.1 + Math.random() * 0.35}s`)
      layer.appendChild(petal)
      petal.addEventListener('animationend', () => petal.remove())
      while (layer.childElementCount > 14) {
        layer.firstChild.remove()
      }
    }

    function onMove(event) {
      if (!finePointer.matches || reducedMotion.matches) return
      const now = performance.now()
      const dist = Math.hypot(event.clientX - lastX, event.clientY - lastY)
      lastX = event.clientX
      lastY = event.clientY
      if (dist < 2 || now - lastSpawn < 50) return
      lastSpawn = now
      spawnPetal(event.clientX, event.clientY)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      layer.remove()
      root.classList.remove('has-custom-cursor')
      root.style.removeProperty('--cursor-star')
      root.style.removeProperty('--cursor-moon')
      root.style.removeProperty('--sakura-image')
    }
  }, [enabled])

  return null
}
