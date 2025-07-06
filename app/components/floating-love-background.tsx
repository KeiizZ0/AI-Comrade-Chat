"use client"

import { useEffect, useState } from "react"

interface LoveElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  rotation: number
  rotationSpeed: number
  delay: number
}

export function FloatingLoveBackground() {
  const [loveElements, setLoveElements] = useState<LoveElement[]>([])

  // GENERATE LOVE ELEMENTS
  const generateLoveElements = () => {
    const elements: LoveElement[] = []
    const elementCount = 20 // Jumlah love icons

    for (let i = 0; i < elementCount; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100, // Random posisi X (0-100%)
        y: 110 + Math.random() * 20, // Mulai dari bawah layar dengan variasi
        size: Math.random() * 20 + 25, // Random size (25-45px)
        speed: Math.random() * 0.5 + 0.3, // Speed pelan (0.3-0.8)
        opacity: 0, // Mulai dengan opacity 0
        rotation: Math.random() * 360, // Random rotasi awal
        rotationSpeed: (Math.random() - 0.5) * 1, // Rotasi pelan
        delay: Math.random() * 3000, // Random delay untuk variasi
      })
    }

    setLoveElements(elements)
  }

  // ANIMATE LOVE ELEMENTS
  useEffect(() => {
    generateLoveElements()

    const animationInterval = setInterval(() => {
      setLoveElements((prevElements) =>
        prevElements.map((element) => {
          let newY = element.y - element.speed // Bergerak ke atas pelan
          let newOpacity = element.opacity
          const newRotation = element.rotation + element.rotationSpeed

          // FADE IN saat mulai naik
          if (newY > 80 && newY < 100) {
            newOpacity = Math.min(0.7, newOpacity + 0.05) // Fade in ke opacity 0.7
          }
          // TETAP TERLIHAT di tengah
          else if (newY >= 20 && newY <= 80) {
            newOpacity = 0.7 // Opacity tetap 0.7 (terlihat jelas)
          }
          // FADE OUT saat mendekati atas
          else if (newY < 20 && newY > 0) {
            newOpacity = Math.max(0, newOpacity - 0.03) // Fade out pelan
          }

          // RESET jika sudah sampai atas
          if (newY < -10) {
            newY = 110 + Math.random() * 20 // Reset ke bawah dengan variasi
            newOpacity = 0
            // Randomize properties baru
            element.x = Math.random() * 100
            element.size = Math.random() * 20 + 25
            element.speed = Math.random() * 0.5 + 0.3
            element.rotationSpeed = (Math.random() - 0.5) * 1
          }

          return {
            ...element,
            y: newY,
            opacity: newOpacity,
            rotation: newRotation,
          }
        }),
      )
    }, 80) // Update setiap 80ms untuk smooth animation

    return () => clearInterval(animationInterval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {loveElements.map((element) => (
        <div
          key={element.id}
          className="absolute transition-all duration-200 ease-out"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            opacity: element.opacity,
            transform: `rotate(${element.rotation}deg)`,
            color: "#ec4899", // Pink color
            textShadow: "0 0 8px rgba(236, 72, 153, 0.3)", // Pink glow
            fontFamily: "serif", // Font yang bagus untuk ♥
          }}
        >
          ♥
        </div>
      ))}

      {/* DEBUG: Tampilkan jumlah elemen */}
      
    </div>
  )
}
