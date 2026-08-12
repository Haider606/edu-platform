import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Clock, Users, BookOpen, ArrowRight, SlidersHorizontal } from 'lucide-react'
import { GlassCard } from '../../components/ui/GlassCard'
import { SectionTitle } from '../../components/ui/SectionTitle'

const allCourses = [
  { id: 1, title: 'AI & Machine Learning Fundamentals', instructor: 'Dr. Sarah Chen', rating: 4.9, students: 3420, duration: '12 weeks', price: '$199', originalPrice: '$399', image: 'bg-gradient-to-br from-violet-600/20 to-purple-600/20', tags: ['AI', 'Python', 'TensorFlow'], category: 'AI & Data' },
  { id: 2, title: 'Full-Stack Web Development', instructor: 'James Wilson', rating: 4.8, students: 5180, duration: '16 weeks', price: '$249', originalPrice: '$499', image: 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20', tags: ['React', 'Node.js', 'MongoDB'], category: 'Web Dev' },
  { id: 3, title: 'Data Science & Analytics', instructor: 'Prof. Maria Garcia', rating: 4.9, students: 2890, duration: '14 weeks', price: '$229', originalPrice: '$459', image: 'bg-gradient-to-br from-emerald-600/20 to-teal-600/20', tags: ['Python', 'SQL', 'Tableau'], category: 'AI & Data' },
  { id: 4, title: 'Cloud Architecture & DevOps', instructor: 'Alex Kumar', rating: 4.7, students: 2150, duration: '10 weeks', price: '$179', originalPrice: '$359', image: 'bg-gradient-to-br from-amber-600/20 to-orange-600/20', tags: ['AWS', 'Docker', 'K8s'], category: 'Cloud' },
  { id: 5, title: 'Cybersecurity Essentials', instructor: 'Lisa Thompson', rating: 4.8, students: 1890, duration: '8 weeks', price: '$159', originalPrice: '$319', image: 'bg-gradient-to-br from-rose-600/20 to-pink-600/20', tags: ['Security', 'Network', 'Ethical Hacking'], category: 'Security' },
  { id: 6, title: 'Mobile App Development', instructor: 'David Park', rating: 4.6, students: 2760, duration: '12 weeks', price: '$189', originalPrice: '$379', image: 'bg-gradient-to-br from-indigo-600/20 to-blue-600/20', tags: ['React Native', 'iOS', 'Android'], category: 'Mobile' },
  { id: 7, title: 'Blockchain & Web3 Development', instructor: 'Ryan Nakamura', rating: 4.7, students: 1450, duration: '10 weeks', price: '$199', originalPrice: '$399', image: 'bg-gradient-to-br from-cyan-600/20 to-blue-600/20', tags: ['Solidity', 'Ethereum', 'Smart Contracts'], category: 'Web3' },
  { id: 8, title: 'UI/UX Design Masterclass', instructor: 'Emma Laurent', rating: 4.8, students: 3120, duration: '8 weeks', price: '$149', originalPrice: '$299', image: 'bg-gradient-to-br from-pink-600/20 to-rose-600/20', tags: ['Figma', 'Design Systems', 'Prototyping'], category: 'Design' },
]

const categories = ['All', 'AI & Data', 'Web Dev', 'Cloud', 'Security', 'Mobile', 'Web3', 'Design']

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = allCourses.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <div className="relative">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionTitle
            label="Courses"
            title="Explore Our Curriculum"
            description="Industry-vetted courses designed to take you from beginner to job-ready"
          />

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search courses, topics, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl glass text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-4 rounded-xl glass hover:bg-white/5 transition-colors text-text-secondary">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-glow'
                    : 'glass text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/courses/${course.id}`}>
                  <GlassCard glow className="h-full group overflow-hidden">
                    <div className={`h-40 rounded-xl mb-4 ${course.image} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                      <BookOpen className="w-10 h-10 text-white/60 relative z-10 group-hover:scale-110 transition-transform" />
                      <div className="absolute top-3 right-3 flex gap-1">
                        {course.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-1 rounded-md bg-black/40 backdrop-blur text-[10px] font-medium text-white/80">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <h3 className="font-display font-bold mb-2 group-hover:text-primary-light transition-colors">{course.title}</h3>
                    <p className="text-sm text-text-muted mb-3">by {course.instructor}</p>
                    <div className="flex items-center gap-3 text-sm text-text-secondary mb-4">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" />{course.rating}</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.students.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">{course.price}</span>
                        <span className="text-sm text-text-muted line-through">{course.originalPrice}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}