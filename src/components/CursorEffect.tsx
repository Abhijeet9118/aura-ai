'use client'

import { useEffect, useRef } from 'react'

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    function animate() {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor!.style.left = cursorX - 10 + 'px'
      cursor!.style.top = cursorY - 10 + 'px'
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    animate()

    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}
