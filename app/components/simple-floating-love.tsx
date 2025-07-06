"use client"

import { useEffect, useState } from "react"

// VERSI YANG SANGAT SEDERHANA UNTUK TESTING
export function SimpleFloatingLove() {
  const [loves, setLoves] = useState<any[]>([])

  useEffect(() => {
    // GENERATE LOVE ELEMENTS
    const newLoves = []
    for (let i = 0; i < 15; i++) {
      newLoves.push({
        id: i,
        x: Math.random() * 90 + 5, // 5-95% untuk menghindari tepi
        y: 100,
        opacity: 0,
        size: Math.random() * 15 + 30, // 30-45px
        speed: Math.random() * 0.4 + 0.2, // 0.2-0.6
      })
    }
    setLoves(newLoves)

    // ANIMATE
    const interval = setInterval(() => {
      setLoves((prevLoves) =>
        prevLoves.map((love) => {
          const newY = love.y - love.speed
          let newOpacity = love.opacity

          // FADE IN
          if (newY > 85 && newY < 95) {
            newOpacity = Math.min(0.8, newOpacity + 0.08)
          }
          // VISIBLE
          else if (newY >= 15 && newY <= 85) {
            newOpacity = 0.8
          }
          // FADE OUT
          else if (newY < 15 && newY > 5) {
            newOpacity = Math.max(0, newOpacity - 0.05)
          }

          // RESET
          if (newY < 0) {
            return {
              ...love,
              y: 100,
              opacity: 0,
              x: Math.random() * 90 + 5,
              size: Math.random() * 15 + 30,
              speed: Math.random() * 0.4 + 0.2,
            }
          }

          return {
            ...love,
            y: newY,
            opacity: newOpacity,
          }
        }),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {loves.map((love) => (
        <div
          key={love.id}
          className="absolute text-pink-500 font-serif"
          style={{
            left: `${love.x}%`,
            top: `${love.y}%`,
            fontSize: `${love.size}px`,
            opacity: love.opacity,
            textShadow: "0 0 10px rgba(236, 72, 153, 0.4)",
            transition: "opacity 0.2s ease-out",
          }}
        >
          ♥
        </div>
      ))}

      {/* DEBUG INFO */}
      <div className="fixed bottom-4 left-4 bg-black/70 text-white p-2 rounded text-xs">
        Active Loves: {loves.filter((l) => l.opacity > 0).length}/{loves.length}
      </div>
    </div>
  )
}
