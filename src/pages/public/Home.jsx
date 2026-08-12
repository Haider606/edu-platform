

import { useRef, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, ChevronDown, Star, Clock, Users, BookOpen, FileCheck, UserCircle, BrainCircuit, CalendarDays, FileText, MessageSquare, TrendingUp, Quote, Check, Sparkles, Zap, ShoppingBag, Briefcase, Code2 } from 'lucide-react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial, Sparkles as ThreeSparkles } from '@react-three/drei'
import { GlassCard } from '../../components/ui/GlassCard'
import { GlowButton } from '../../components/ui/GlowButton'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { Counter } from '../../components/ui/Counter'

/* ========== 3D HERO SCENE ========== */
function FloatingObject({ geometry, position, color, scale = 1, speed = 1 }) {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.007
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial color={color} distort={0.2} speed={2} roughness={0.2} metalness={0.8} emissive={color} emissiveIntensity={0.1} />
      </mesh>
    </Float>
  )
}

function NeuralNetwork() {
  const particlesRef = useRef()
  const count = 80
  const [positions, connections] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const conn = []
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 2.5) conn.push(i, j)
      }
    }
    return [pos, new Uint16Array(conn)]
  }, [])

  useFrame((state) => {
    if (particlesRef.current) particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={particlesRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#6366f1" transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="index" count={connections.length} array={connections} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </lineSegments>
    </group>
  )
}

function GlowingRings() {
  const groupRef = useRef()
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      groupRef.current.rotation.y += 0.003
    }
  })
  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 2.1]}>
          <torusGeometry args={[3 + i * 0.8, 0.02, 16, 100]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
    </group>
  )
}

function Hologram() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
      ref.current.material.distort = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })
  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={ref} position={[0, 0, -2]} scale={1.5}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

function Scene() {
  const { mouse } = useThree()
  const groupRef = useRef()
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = mouse.y * 0.1
      groupRef.current.rotation.y = mouse.x * 0.1
    }
  })
  return (
    <group ref={groupRef}>
      <NeuralNetwork />
      <GlowingRings />
      <Hologram />
      <FloatingObject geometry={<boxGeometry args={[0.6, 0.8, 0.15]} />} position={[-3, 1, 1]} color="#f59e0b" scale={0.8} speed={0.8} />
      <FloatingObject geometry={<boxGeometry args={[0.5, 0.5, 0.5]} />} position={[3.5, -0.5, 0.5]} color="#10b981" scale={0.6} speed={1.2} />
      <FloatingObject geometry={<sphereGeometry args={[0.3, 32, 32]} />} position={[-2, -1.5, 2]} color="#ef4444" scale={0.7} speed={1} />
      <FloatingObject geometry={<octahedronGeometry args={[0.4]} />} position={[2.5, 2, -1]} color="#8b5cf6" scale={0.9} speed={0.6} />
      <Stars radius={15} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
      <ThreeSparkles count={50} scale={10} size={2} speed={0.5} color="#6366f1" />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
      <fog attach="fog" args={['#050508', 10, 25]} />
    </group>
  )
}

function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}

/* ========== DATA ========== */
const companies = ['Microsoft', 'Google', 'Amazon', 'Meta', 'Adobe', 'IBM', 'Oracle']
const companyColors = ['#00a4ef', '#4285f4', '#ff9900', '#0668e1', '#ff0000', '#054ada', '#f80000']

const stats = [
  { icon: Users, value: 20000, suffix: '+', label: 'Students', color: 'from-blue-500 to-cyan-500' },
  { icon: BookOpen, value: 250, suffix: '+', label: 'Courses', color: 'from-violet-500 to-purple-500' },
  { icon: Briefcase, value: 500, suffix: '+', label: 'Internships', color: 'from-amber-500 to-orange-500' },
  { icon: Star, value: 98, suffix: '%', label: 'Success Rate', color: 'from-emerald-500 to-teal-500' },
  { icon: Zap, value: 100, suffix: '+', label: 'Teachers', color: 'from-rose-500 to-pink-500' },
]

const coursesData = [
  { id: 1, title: 'AI & Machine Learning Fundamentals', instructor: 'Dr. Sarah Chen', rating: 4.9, students: 3420, duration: '12 weeks', price: '$199', originalPrice: '$399', image: 'bg-gradient-to-br from-violet-600/20 to-purple-600/20', tags: ['AI', 'Python', 'TensorFlow'] },
  { id: 2, title: 'Full-Stack Web Development', instructor: 'James Wilson', rating: 4.8, students: 5180, duration: '16 weeks', price: '$249', originalPrice: '$499', image: 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20', tags: ['React', 'Node.js', 'MongoDB'] },
  { id: 3, title: 'Data Science & Analytics', instructor: 'Prof. Maria Garcia', rating: 4.9, students: 2890, duration: '14 weeks', price: '$229', originalPrice: '$459', image: 'bg-gradient-to-br from-emerald-600/20 to-teal-600/20', tags: ['Python', 'SQL', 'Tableau'] },
  { id: 4, title: 'Cloud Architecture & DevOps', instructor: 'Alex Kumar', rating: 4.7, students: 2150, duration: '10 weeks', price: '$179', originalPrice: '$359', image: 'bg-gradient-to-br from-amber-600/20 to-orange-600/20', tags: ['AWS', 'Docker', 'K8s'] },
  { id: 5, title: 'Cybersecurity Essentials', instructor: 'Lisa Thompson', rating: 4.8, students: 1890, duration: '8 weeks', price: '$159', originalPrice: '$319', image: 'bg-gradient-to-br from-rose-600/20 to-pink-600/20', tags: ['Security', 'Network', 'Ethical Hacking'] },
  { id: 6, title: 'Mobile App Development', instructor: 'David Park', rating: 4.6, students: 2760, duration: '12 weeks', price: '$189', originalPrice: '$379', image: 'bg-gradient-to-br from-indigo-600/20 to-blue-600/20', tags: ['React Native', 'iOS', 'Android'] },
]

const aiFeatures = [
  { icon: FileCheck, title: 'AI Assignment Checker', description: 'Get instant, detailed feedback on your assignments with AI-powered grading that identifies gaps and suggests improvements.', color: 'from-emerald-500 to-teal-500' },
  { icon: UserCircle, title: 'AI Mentor', description: 'Your personal AI tutor available 24/7. Ask questions, get explanations, and receive guidance tailored to your learning style.', color: 'from-blue-500 to-cyan-500' },
  { icon: BrainCircuit, title: 'AI Quiz Generator', description: 'Automatically generate personalized quizzes based on your weak areas. Adaptive difficulty ensures optimal learning progress.', color: 'from-violet-500 to-purple-500' },
  { icon: CalendarDays, title: 'AI Study Planner', description: 'Smart scheduling that adapts to your pace, deadlines, and goals. Never miss a study session with intelligent reminders.', color: 'from-amber-500 to-orange-500' },
  { icon: FileText, title: 'AI Resume Builder', description: 'Create ATS-optimized resumes that highlight your skills and projects. Get real-time suggestions to stand out to recruiters.', color: 'from-rose-500 to-pink-500' },
  { icon: MessageSquare, title: 'AI Interview Coach', description: 'Practice with realistic mock interviews. Get feedback on your answers, body language tips, and industry-specific questions.', color: 'from-indigo-500 to-blue-500' },
]

const roadmapSteps = [
  { icon: BookOpen, title: 'Learning', description: 'Complete structured courses with AI-guided curriculum tailored to your goals.', color: 'bg-blue-500', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Code2, title: 'Projects', description: 'Build real-world projects with mentor feedback and peer collaboration.', color: 'bg-violet-500', gradient: 'from-violet-500 to-purple-500' },
  { icon: FileCheck, title: 'Assessment', description: 'Pass AI-evaluated skill assessments to verify your competency.', color: 'bg-amber-500', gradient: 'from-amber-500 to-orange-500' },
  { icon: Users, title: 'Internship', description: 'Get matched with top companies for hands-on industry experience.', color: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Star, title: 'Certificate', description: 'Earn globally recognized certificates verified on blockchain.', color: 'bg-rose-500', gradient: 'from-rose-500 to-pink-500' },
  { icon: Briefcase, title: 'Job Placement', description: 'Access exclusive job opportunities with our hiring partner network.', color: 'bg-indigo-500', gradient: 'from-indigo-500 to-blue-500' },
]

const testimonials = [
  { name: 'Alexandra Chen', role: 'ML Engineer at Google', image: 'AC', content: 'EduVerse AI completely transformed my career. The AI mentor helped me master TensorFlow in 8 weeks, and the internship placement landed me 3 offers.', rating: 5, salaryIncrease: '+140%', color: 'from-blue-500 to-cyan-500' },
  { name: 'Marcus Johnson', role: 'Full-Stack Developer at Stripe', image: 'MJ', content: 'The project-based learning approach is incredible. I built a production-ready SaaS app during the course, and that portfolio piece got me hired.', rating: 5, salaryIncrease: '+95%', color: 'from-violet-500 to-purple-500' },
  { name: 'Priya Sharma', role: 'Data Scientist at Meta', image: 'PS', content: 'I went from zero coding experience to a data science role in 6 months. The AI study planner kept me on track every single day.', rating: 5, salaryIncrease: '+200%', color: 'from-emerald-500 to-teal-500' },
]

const marketplaceProducts = [
  { title: 'Complete Study Notes Bundle', category: 'Notes', price: '$29', sales: 2340, image: 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20', icon: '📚' },
  { title: 'Developer Portfolio Template', category: 'Templates', price: '$49', sales: 1890, image: 'bg-gradient-to-br from-violet-600/20 to-purple-600/20', icon: '🎨' },
  { title: 'SaaS Starter Kit', category: 'Projects', price: '$99', sales: 980, image: 'bg-gradient-to-br from-emerald-600/20 to-teal-600/20', icon: '🚀' },
  { title: 'Interview Question Bank', category: 'Digital', price: '$19', sales: 4560, image: 'bg-gradient-to-br from-amber-600/20 to-orange-600/20', icon: '💼' },
]
/* ========== SECTIONS ========== */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Hero3D />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg z-[1]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-text-secondary">Now accepting applications for Summer 2026</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6">
          <span className="block text-gradient">Learn Smarter.</span>
          <span className="block text-gradient mt-2">Build Faster.</span>
          <span className="block text-gradient-warm mt-2">Get Hired.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary leading-relaxed mb-10">
          Master in-demand skills with AI-powered learning, live mentors, internships, real projects, and globally recognized certificates.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/register"><GlowButton variant="primary" size="lg" icon={ArrowRight}>Start Learning</GlowButton></Link>
          <Link to="/courses"><GlowButton variant="secondary" size="lg">Explore Courses</GlowButton></Link>
          <GlowButton variant="ghost" size="lg" icon={Play}>Watch Demo</GlowButton>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-bg" />)}
            </div>
            <span>20,000+ Students</span>
          </div>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <span>4.9/5 Rating</span>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <span>98% Success Rate</span>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-text-muted uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function CompaniesSection() {
  return (
    <section className="py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-sm text-text-muted uppercase tracking-widest mb-10">
          Trusted by engineers at leading companies
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {companies.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center justify-center px-8 py-4 grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100 cursor-pointer">
              <span className="text-2xl font-display font-bold tracking-tight" style={{ color: companyColors[i] }}>{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionTitle label="Our Impact" title="Numbers That Speak" description="Join thousands of students who have transformed their careers through EduVerse AI" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
              <GlassCard glow className="text-center group h-full">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoursesSection() {
  const scrollRef = useRef(null)
  return (
    <section id="courses" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary-light border border-primary/20 mb-6">Featured</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gradient mb-4">Top-Rated Courses</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-lg text-text-secondary">Hand-picked by our AI to match your career goals</motion.p>
          </div>
          <Link to="/courses" className="hidden md:flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {coursesData.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }} className="flex-shrink-0 w-[340px] snap-start">
              <Link to={`/courses/${course.id}`}>
                <GlassCard glow className="h-full group overflow-hidden">
                  <div className={`h-48 rounded-xl mb-4 ${course.image} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1">
                      {course.tags.map(tag => <span key={tag} className="px-2 py-1 rounded-md bg-black/40 backdrop-blur text-[10px] font-medium text-white/80">{tag}</span>)}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary-light transition-colors">{course.title}</h3>
                    <p className="text-sm text-text-muted">by {course.instructor}</p>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" />{course.rating}</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.students.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">{course.price}</span>
                        <span className="text-sm text-text-muted line-through">{course.originalPrice}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AIFeaturesSection() {
  return (
    <section id="ai-features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionTitle label="AI Powered" title="Your Personal AI Learning Suite" description="Six powerful AI tools working together to accelerate your learning and career growth" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
              <GlassCard glow className="h-full group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary-light transition-colors">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RoadmapSection() {
  return (
    <section id="internships" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-tertiary to-bg" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionTitle label="Career Path" title="Your Journey to Success" description="A proven 6-step roadmap from learning to landing your dream job" />
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />
          <div className="space-y-12 md:space-y-0">
            {roadmapSteps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className={`relative md:grid md:grid-cols-2 md:gap-8 md:items-center ${i % 2 === 0 ? '' : 'md:text-right'}`}>
                <div className={`${i % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div className="glass rounded-2xl p-6 glow-border group hover:bg-white/[0.06] transition-all duration-500">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-3 ${i % 2 === 0 ? '' : 'md:ml-auto'}`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary-light transition-colors">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.3, type: 'spring' }}
                    className={`w-4 h-4 rounded-full ${step.color} ring-4 ring-bg shadow-lg`} />
                </div>
                <div className={i % 2 === 0 ? 'hidden md:block' : 'hidden md:block md:col-start-1 md:row-start-1'} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionTitle label="Success Stories" title="Students Who Changed Everything" description="Real results from real students who trusted EduVerse AI with their future" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
              <GlassCard glow className="h-full group relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-primary/10 transition-colors" />
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>{t.image}</div>
                  <div>
                    <h4 className="font-display font-bold">{t.name}</h4>
                    <p className="text-sm text-text-muted">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6">"{t.content}"</p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 text-success text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>Salary increase {t.salaryIncrease}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MarketplaceSection() {
  return (
    <section id="marketplace" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-tertiary to-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionTitle label="Marketplace" title="Learn, Create, Earn" description="Buy premium resources, sell your own, and earn referral commissions" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceProducts.map((product, i) => (
            <motion.div key={product.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}>
              <GlassCard glow className="h-full group cursor-pointer">
                <div className={`h-40 rounded-xl ${product.image} flex items-center justify-center mb-4 relative overflow-hidden`}>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{product.icon}</span>
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/40 backdrop-blur text-xs font-medium">{product.category}</div>
                </div>
                <h3 className="font-display font-bold mb-2 group-hover:text-primary-light transition-colors">{product.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xl font-bold text-white">{product.price}</span>
                    <span className="text-xs text-text-muted ml-2">{product.sales} sold</span>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-text-secondary">Earn up to <span className="text-white font-bold">30%</span> referral commission on every sale</span>
            <ArrowRight className="w-4 h-4 text-text-muted" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PricingPreview() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionTitle label="Pricing" title="Invest in Your Future" description="Choose the plan that fits your goals. All plans include a 14-day free trial." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: 'Starter', price: '$0', features: ['5 AI quizzes/month', 'Basic study planner', 'Community access', '3 course previews'], cta: 'Start Free', popular: false },
            { name: 'Pro', price: '$29/mo', features: ['Unlimited AI quizzes', 'AI Mentor 24/7', 'Full course library', 'Project reviews', 'Resume builder', 'Interview coach'], cta: 'Start Pro Trial', popular: true },
            { name: 'Enterprise', price: '$99/mo', features: ['Everything in Pro', 'Team management', 'Custom curriculum', 'Priority support', 'White-label', 'API access'], cta: 'Contact Sales', popular: false },
          ].map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }} className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                </div>
              )}
              <GlassCard glow={plan.popular} className={`h-full ${plan.popular ? 'border-primary/30 bg-primary/5' : ''}`}>
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold mb-1">{plan.name}</h3>
                </div>
                <div className="text-4xl font-display font-bold text-white mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link to="/pricing">
                  <GlowButton variant={plan.popular ? 'primary' : 'secondary'} className="w-full">{plan.cta}</GlowButton>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-primary/5 to-bg" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-16 text-center glow-border">
          <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary-light border border-primary/20 mb-6">Newsletter</motion.span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-gradient mb-4">Stay Ahead of the Curve</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">Get weekly AI learning tips, career insights, and exclusive course discounts delivered to your inbox.</p>
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-3 text-success">
              <Check className="w-6 h-6" /><span className="text-lg font-medium">You are on the list! Welcome aboard.</span>
            </motion.div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true) }} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors" />
              <GlowButton variant="primary" type="submit" icon={ArrowRight}>Subscribe</GlowButton>
            </form>
          )}
          <p className="mt-4 text-xs text-text-muted">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  )
}

/* ========== MAIN EXPORT ========== */
export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <CompaniesSection />
      <StatsSection />
      <CoursesSection />
      <AIFeaturesSection />
      <RoadmapSection />
      <TestimonialsSection />
      <MarketplaceSection />
      <PricingPreview />
      <NewsletterSection />
    </div>
  )
}
