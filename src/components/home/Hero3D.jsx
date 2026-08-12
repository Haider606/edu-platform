import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/*  Low-poly Laptop                                                   */
/* ------------------------------------------------------------------ */
function Laptop() {
  return (
    <group position={[0, -0.3, 0]} rotation={[0.1, -0.3, 0]}>
      {/* Base */}
      <RoundedBox args={[2.2, 0.12, 1.5]} radius={0.04} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      {/* Keyboard area */}
      <RoundedBox args={[1.9, 0.02, 1.1]} radius={0.02} position={[0, 0.07, -0.05]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.3} roughness={0.5} />
      </RoundedBox>
      {/* Hinge */}
      <RoundedBox args={[2.2, 0.06, 0.1]} radius={0.02} position={[0, 0.06, -0.72]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      {/* Screen */}
      <group position={[0, 0.9, -0.72]} rotation={[0.25, 0, 0]}>
        <RoundedBox args={[2.2, 1.5, 0.08]} radius={0.04}>
          <meshStandardMaterial color="#f1f5f9" metalness={0.4} roughness={0.3} />
        </RoundedBox>
        {/* Display glow */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.0, 1.3]} />
          <meshBasicMaterial color="#2563EB" toneMapped={false} />
        </mesh>
        {/* Code lines */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[-0.6 + i * 0.3, 0.3 - i * 0.18, 0.06]}>
            <planeGeometry args={[0.2, 0.04]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#7C3AED' : '#22C55E'}
              toneMapped={false}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Graduation Cap                                                    */
/* ------------------------------------------------------------------ */
function GraduationCap() {
  return (
    <group position={[1.6, 1.2, -0.5]} rotation={[0.2, 0.5, 0.1]}>
      <RoundedBox args={[0.9, 0.06, 0.9]} radius={0.02}>
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.4, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0.5, -0.05, 0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0.45, 0.02, 0.45]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating Books                                                    */
/* ------------------------------------------------------------------ */
function Books() {
  return (
    <group position={[-1.5, -0.8, 0.8]} rotation={[0.1, 0.4, -0.1]}>
      <RoundedBox args={[0.7, 0.1, 0.9]} radius={0.02} position={[0, 0.1, 0]} rotation={[0, 0.1, 0]}>
        <meshStandardMaterial color="#2563EB" metalness={0.2} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.65, 0.1, 0.85]} radius={0.02} position={[0.05, 0, 0.05]} rotation={[0, -0.15, 0.05]}>
        <meshStandardMaterial color="#7C3AED" metalness={0.2} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.6, 0.1, 0.8]} radius={0.02} position={[-0.05, -0.1, -0.05]} rotation={[0.05, 0.2, -0.05]}>
        <meshStandardMaterial color="#22C55E" metalness={0.2} roughness={0.7} />
      </RoundedBox>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Education Cards                                                   */
/* ------------------------------------------------------------------ */
function EduCards() {
  const cards = [
    { pos: [-1.2, 1.0, 0.5], rot: [0.1, 0.3, 0.1], color: '#2563EB' },
    { pos: [1.3, -0.6, 0.6], rot: [-0.1, -0.4, 0.05], color: '#7C3AED' },
    { pos: [0.2, 1.4, -0.8], rot: [0.2, 0.1, -0.1], color: '#22C55E' },
  ]

  return (
    <>
      {cards.map((card, i) => (
        <group key={i} position={card.pos} rotation={card.rot}>
          <RoundedBox args={[0.5, 0.7, 0.04]} radius={0.03}>
            <meshStandardMaterial color={card.color} metalness={0.1} roughness={0.4} />
          </RoundedBox>
          <mesh position={[0, 0.25, 0.025]}>
            <planeGeometry args={[0.4, 0.08]} />
            <meshBasicMaterial color="rgba(255,255,255,0.3)" transparent toneMapped={false} />
          </mesh>
          {[0, 1, 2].map((j) => (
            <mesh key={j} position={[0, 0.05 - j * 0.1, 0.025]}>
              <planeGeometry args={[0.35 - j * 0.05, 0.03]} />
              <meshBasicMaterial color="rgba(255,255,255,0.5)" transparent toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Certificate                                                       */
/* ------------------------------------------------------------------ */
function Certificate() {
  return (
    <group position={[-0.8, 0.6, -1]} rotation={[0.1, -0.5, 0.05]}>
      <RoundedBox args={[0.8, 0.55, 0.02]} radius={0.02}>
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.5} />
      </RoundedBox>
      <mesh position={[0.25, -0.15, 0.015]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.2} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.05, 0.1 - i * 0.08, 0.015]}>
          <planeGeometry args={[0.5 - i * 0.05, 0.025]} />
          <meshBasicMaterial color="#94a3b8" transparent toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Geometric Objects                                                 */
/* ------------------------------------------------------------------ */
function Geometrics() {
  return (
    <>
      <mesh position={[1.8, 0.3, -0.3]} rotation={[0.5, 0.3, 0.2]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#2563EB" metalness={0.4} roughness={0.3} emissive="#2563EB" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-1.8, 0.2, -0.6]} rotation={[0.3, 0.5, 0.1]}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.4} roughness={0.3} emissive="#7C3AED" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.5, -1.2, 0.3]} rotation={[0.4, 0.2, 0.6]}>
        <tetrahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#22C55E" metalness={0.4} roughness={0.3} emissive="#22C55E" emissiveIntensity={0.2} />
      </mesh>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Glowing Rings                                                     */
/* ------------------------------------------------------------------ */
function GlowingRings() {
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame(({ clock }) => {
    if (ring1.current) {
      ring1.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
      ring1.current.rotation.y += 0.002
    }
    if (ring2.current) {
      ring2.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.25) * 0.15
      ring2.current.rotation.y -= 0.003
    }
  })

  return (
    <>
      <mesh ref={ring1} position={[0, 0, -1.5]}>
        <torusGeometry args={[2.2, 0.015, 8, 64]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.3} toneMapped={false} />
      </mesh>
      <mesh ref={ring2} position={[0, 0.2, -1.5]} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[1.8, 0.012, 8, 64]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.2} toneMapped={false} />
      </mesh>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Mouse Parallax Group                                              */
/* ------------------------------------------------------------------ */
function ParallaxScene({ children }) {
  const groupRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.08,
      0.04
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.05,
      0.04
    )
  })

  return <group ref={groupRef}>{children}</group>
}

/* ------------------------------------------------------------------ */
/*  Scene Composition                                                 */
/* ------------------------------------------------------------------ */
function Scene() {
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const floatSpeed = prefersReducedMotion ? 0 : 1.5
  const floatRotation = prefersReducedMotion ? 0 : 0.1

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#7C3AED" />
      <pointLight position={[0, 2, 2]} intensity={0.5} color="#2563EB" />

      <ParallaxScene>
        <Float speed={floatSpeed} rotationIntensity={floatRotation} floatIntensity={0.3}>
          <Laptop />
        </Float>
        <Float speed={floatSpeed} rotationIntensity={floatRotation} floatIntensity={0.4}>
          <GraduationCap />
        </Float>
        <Float speed={floatSpeed} rotationIntensity={floatRotation} floatIntensity={0.3}>
          <Books />
        </Float>
        <Float speed={floatSpeed} rotationIntensity={floatRotation} floatIntensity={0.35}>
          <EduCards />
        </Float>
        <Float speed={floatSpeed} rotationIntensity={floatRotation} floatIntensity={0.25}>
          <Certificate />
        </Float>
        <Float speed={floatSpeed} rotationIntensity={floatRotation} floatIntensity={0.3}>
          <Geometrics />
        </Float>
        <GlowingRings />
      </ParallaxScene>

      <Sparkles
        count={40}
        size={2}
        scale={[6, 6, 4]}
        position={[0, 0, 0]}
        speed={0.3}
        opacity={0.3}
        color="#2563EB"
      />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Loading Fallback                                                  */
/* ------------------------------------------------------------------ */
function CanvasFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                       */
/* ------------------------------------------------------------------ */
export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl" />
        <div className="relative z-10 flex flex-col items-center gap-4 p-8">
          <div className="w-32 h-24 bg-slate-100 rounded-lg shadow-xl flex items-center justify-center border border-slate-200">
            <div className="w-28 h-16 bg-blue-50 rounded border border-blue-200 flex flex-col gap-1 p-2">
              <div className="w-8 h-1 bg-blue-500 rounded" />
              <div className="w-12 h-1 bg-green-500 rounded" />
              <div className="w-6 h-1 bg-purple-500 rounded" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">AI</div>
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">ML</div>
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">Dev</div>
          </div>
          <div className="w-16 h-16 border-2 border-blue-200 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-slate-800 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <CanvasFallback />
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}