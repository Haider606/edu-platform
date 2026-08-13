import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles as DreiSparkles, Torus, RoundedBox } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Laptop() {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * .35) * .18;
    group.current.rotation.x = -.08 + Math.sin(state.clock.elapsedTime * .5) * .025;
  });

  return (
    <group ref={group} position={[0, -.25, 0]} rotation={[0, -.25, 0]}>
      <RoundedBox args={[3.8, .18, 2.5]} radius={.12} smoothness={4} position={[0, -.9, .25]}>
        <meshStandardMaterial color="#20243b" metalness={.75} roughness={.25} />
      </RoundedBox>
      <RoundedBox args={[3.25, 2.05, .12]} radius={.08} smoothness={4} position={[0, .15, -.72]} rotation={[-.18,0,0]}>
        <meshStandardMaterial color="#11152b" metalness={.55} roughness={.2} />
      </RoundedBox>
      <mesh position={[0,.15,-.8]} rotation={[-.18,0,0]}>
        <planeGeometry args={[2.85,1.68]} />
        <meshBasicMaterial color="#101b42" />
      </mesh>
      <mesh position={[0,.15,-.815]} rotation={[-.18,0,0]}>
        <planeGeometry args={[2.45,1.3]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={.22} />
      </mesh>
      <pointLight position={[0,.4,1]} color="#6366f1" intensity={2.5} distance={6} />
    </group>
  );
}

function FloatingCard({ position, color, rotation = [0,0,0], label }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * .8 + position[0]) * .12;
  });
  return (
    <Float speed={1.5} rotationIntensity={.2} floatIntensity={.35}>
      <group ref={ref} position={position} rotation={rotation}>
        <RoundedBox args={[1.55,.9,.12]} radius={.1} smoothness={3}>
          <meshStandardMaterial color="#111326" emissive={color} emissiveIntensity={.18} metalness={.5} roughness={.3} />
        </RoundedBox>
        <mesh position={[0,0,.08]}>
          <planeGeometry args={[1.25,.58]} />
          <meshBasicMaterial color={color} transparent opacity={.18} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4,6,5]} intensity={2.5} color="#c7d2fe" />
      <pointLight position={[-4,1,2]} intensity={8} color="#8b5cf6" distance={9} />
      <pointLight position={[4,0,-2]} intensity={6} color="#06b6d4" distance={8} />
      <DreiSparkles count={70} scale={[8,6,5]} size={2} speed={.25} color="#a5b4fc" />
      <Float speed={1.2} rotationIntensity={.12} floatIntensity={.45}>
        <Laptop />
      </Float>
      <FloatingCard position={[-2.6,1.3,.2]} color="#8b5cf6" rotation={[0,.25,-.08]} />
      <FloatingCard position={[2.5,1.7,-.1]} color="#06b6d4" rotation={[0,-.2,.08]} />
      <FloatingCard position={[2.7,-.7,.2]} color="#6366f1" rotation={[.1,-.3,.1]} />
      <Float speed={1.1} rotationIntensity={.5} floatIntensity={.7}>
        <Torus args={[2.9, .025, 12, 100]} rotation={[Math.PI/2.7,.15,.2]}>
          <meshBasicMaterial color="#6366f1" transparent opacity={.45} />
        </Torus>
      </Float>
      <Float speed={1.5} rotationIntensity={.3} floatIntensity={.5}>
        <mesh position={[-2.5,-1.8,-.2]} rotation={[.2,.3,.2]}>
          <icosahedronGeometry args={[.48,0]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={.7} wireframe />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.35} minPolarAngle={1.1} maxPolarAngle={2.1} />
    </>
  );
}

export default function Hero3D() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  if (!desktop) {
    return (
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative w-72 rounded-3xl border border-white/10 bg-white/[.045] p-6 shadow-[0_0_80px_rgba(99,102,241,.15)] backdrop-blur-xl">
          <div className="mb-5 h-40 rounded-2xl bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/20" />
          <div className="h-3 w-2/3 rounded-full bg-white/10" />
          <div className="mt-3 h-3 w-1/2 rounded-full bg-white/5" />
          <div className="mt-6 flex gap-2">
            <span className="h-2 w-14 rounded-full bg-indigo-400/60" />
            <span className="h-2 w-8 rounded-full bg-cyan-400/60" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1,1.5]} camera={{ position: [0, 1, 8], fov: 42 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
