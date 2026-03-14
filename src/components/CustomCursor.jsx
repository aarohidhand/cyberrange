import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const onMouseEnterLink = () => {
      if (dotRef.current) dotRef.current.classList.add('cursor-dot--hover')
      if (ringRef.current) ringRef.current.classList.add('cursor-ring--hover')
    }

    const onMouseLeaveLink = () => {
      if (dotRef.current) dotRef.current.classList.remove('cursor-dot--hover')
      if (ringRef.current) ringRef.current.classList.remove('cursor-ring--hover')
    }

    document.addEventListener('mousemove', onMouseMove)

    // Lerp ring
    let raf
    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`
      }
      raf = requestAnimationFrame(lerp)
    }
    raf = requestAnimationFrame(lerp)

    // Add hover listeners to interactive elements
    const addListeners = () => {
      document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    document.documentElement.classList.add('custom-cursor-active')

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
