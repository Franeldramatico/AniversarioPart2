'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Shared petal geometry — created once and reused across all petals */
const petalShape = (() => {
  const shape = new THREE.Shape()
  const w = 0.12, h = 0.2
  shape.moveTo(0, -h)
  shape.quadraticCurveTo(w, -h * 0.5, w * 0.3, 0)
  shape.quadraticCurveTo(w * 0.5, h * 0.5, 0, h)
  shape.quadraticCurveTo(-w * 0.5, h * 0.5, -w * 0.3, 0)
  shape.quadraticCurveTo(-w, -h * 0.5, 0, -h)
  return new THREE.ShapeGeometry(shape)
})()

function Petal({ position, rotation, color, scale, speed }: {
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  scale: number
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const startPos = useMemo(() => ({ x: position[0], y: position[1], z: position[2] }), [])
  const offset = useMemo(() => Math.random() * 100, [])
  const drift = useMemo(() => Math.random() * 0.3 + 0.1, [])
  const opacity = useMemo(() => 0.5 + Math.random() * 0.35, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime + offset

    const newY = startPos.y + Math.sin(t * speed) * 12
    const newX = startPos.x + Math.sin(t * drift) * 2
    const newZ = startPos.z + Math.sin(t * speed * 0.3) * 1

    meshRef.current.position.x = newX
    meshRef.current.position.z = newZ
    meshRef.current.position.y = ((newY % 30) + 30) % 30 - 15

    meshRef.current.rotation.z = Math.sin(t * 0.7) * 0.15
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.08
    meshRef.current.rotation.y += 0.002
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={petalShape}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

function PetalField() {
  const petals = useMemo(() => {
    const colors = ['#8b2020', '#a83232', '#6b1d1d', '#c94b4b', '#4a1515', '#7a2525']
    return Array.from({ length: 25 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 35,
        Math.random() * 30 - 15,
        (Math.random() - 0.5) * 25 - 8,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: 0.3 + Math.random() * 0.7,
      speed: 0.2 + Math.random() * 0.5,
    }))
  }, [])

  return (
    <group>
      {petals.map((p, i) => (
        <Petal key={i} {...p} />
      ))}
    </group>
  )
}

function AmbientGlow() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (state.scene.children[0]) {
      const light = state.scene.children[0] as THREE.PointLight
      light.intensity = 0.4 + Math.sin(t * 0.5) * 0.15
    }
  })
  return null
}

export default function RoseScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[5]">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 10, 5]} intensity={0.4} color="#8b2020" />
        <pointLight position={[-5, -5, 3]} intensity={0.2} color="#d4aa4a" />
        <AmbientGlow />
        <PetalField />
      </Canvas>
    </div>
  )
}
