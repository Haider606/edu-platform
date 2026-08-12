
import { motion } from 'framer-motion'
import { Target, Users, Lightbulb, Globe, Award, Heart } from 'lucide-react'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { GlassCard } from '../../components/ui/GlassCard'
import { Counter } from '../../components/ui/Counter'

const values = [
  { icon: Target, title: 'Mission-Driven', description: 'We exist to democratize tech education and create equal opportunities for learners worldwide.', color: 'from-blue-500 to-cyan-500' },
  { icon: Lightbulb, title: 'Innovation First', description: 'We leverage cutting-edge AI to personalize every learning journey for maximum impact.', color: 'from-violet-500 to-purple-500' },
  { icon: Users, title: 'Community Centric', description: 'Learning is better together. Our global community supports, mentors, and grows with each other.', color: 'from-amber-500 to-orange-500' },
  { icon: Globe, title: 'Global Reach', description: 'Students from 120+ countries trust EduVerse AI to accelerate their careers.', color: 'from-emerald-500 to-teal-500' },
  { icon: Award, title: 'Excellence', description: 'Every course, mentor, and project meets our rigorous quality standards.', color: 'from-rose-500 to-pink-500' },
  { icon: Heart, title: 'Student Success', description: 'Your success is our only metric. 98% of our graduates land jobs within 6 months.', color: 'from-indigo-500 to-blue-500' },
]

const team = [
  { name: 'Dr. Sarah Chen', role: 'CEO & Co-Founder', initials: 'SC', color: 'from-blue-500 to-cyan-500' },
  { name: 'James Wilson', role: 'CTO & Co-Founder', initials: 'JW', color: 'from-violet-500 to-purple-500' },
  { name: 'Maria Garcia', role: 'Head of Education', initials: 'MG', color: 'from-emerald-500 to-teal-500' },
  { name: 'Alex Kumar', role: 'Head of AI', initials: 'AK', color: 'from-amber-500 to-orange-500' },
]

export default function About() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionTitle
            label="About Us"
            title="Building the Future of Education"
            description="EduVerse AI is on a mission to make world-class tech education accessible, personalized, and career-focused for everyone."
          />
        </div>
      </section>

      {/* Story */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-tertiary to-bg" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12 glow-border"
          >
            <h3 className="text-2xl font-display font-bold mb-6 text-gradient">Our Story</h3>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>Founded in 2023 by a team of educators, engineers, and AI researchers, EduVerse AI was born from a simple belief: traditional education is broken. Too expensive, too rigid, and too disconnected from industry needs.</p>
              <p>We set out to build something different. A platform where AI doesn't just deliver content — it understands you. It adapts to your pace, identifies your weaknesses, and guides you toward mastery with the precision of a personal tutor and the scale of the internet.</p>
              <p>Today, EduVerse AI serves 20,000+ students across 120 countries, with a 98% job placement rate and partnerships with the world's leading tech companies. But we're just getting started.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionTitle
            label="Values"
            title="What We Stand For"
            description="The principles that guide every decision we make"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard glow className="h-full group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-display font-bold mb-2">{value.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-tertiary to-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionTitle
            label="Team"
            title="Meet the Minds Behind EduVerse"
            description="World-class educators, engineers, and innovators"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="text-center group">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-bold mb-4 group-hover:scale-110 transition-transform`}>
                    {member.initials}
                  </div>
                  <h4 className="font-display font-bold text-lg">{member.name}</h4>
                  <p className="text-sm text-text-muted">{member.role}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-primary/5 to-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 20000, suffix: '+', label: 'Students' },
              { value: 120, suffix: '+', label: 'Countries' },
              { value: 98, suffix: '%', label: 'Placement Rate' },
              { value: 500, suffix: '+', label: 'Hiring Partners' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

