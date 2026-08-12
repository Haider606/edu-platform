import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { Star, Clock, Users, BookOpen, Check, Play, Award, MessageCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GlassCard } from '../../components/ui/GlassCard'
import { GlowButton } from '../../components/ui/GlowButton'

const courseData = {
  1: {
    title: 'AI & Machine Learning Fundamentals',
    instructor: 'Dr. Sarah Chen',
    rating: 4.9,
    students: 3420,
    duration: '12 weeks',
    price: '$199',
    originalPrice: '$399',
    image: 'bg-gradient-to-br from-violet-600/30 to-purple-600/30',
    tags: ['AI', 'Python', 'TensorFlow'],
    description: 'Master the fundamentals of artificial intelligence and machine learning. From neural networks to deep learning, this comprehensive course takes you from zero to building real AI applications.',
    modules: [
      'Introduction to AI & ML',
      'Python for Data Science',
      'Supervised Learning',
      'Unsupervised Learning',
      'Neural Networks & Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Deploying ML Models',
      'Capstone Project',
    ],
    whatYouLearn: [
      'Build and train neural networks from scratch',
      'Implement CNNs and RNNs for real-world tasks',
      'Deploy ML models to production environments',
      'Understand transformer architectures',
      'Fine-tune large language models',
    ],
  },
}

export default function CourseDetails() {
  const { id } = useParams()
  const course = courseData[id] || courseData[1]
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="relative pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <Link to="/courses" className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`h-64 md:h-80 rounded-2xl ${course.image} flex items-center justify-center mb-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-4">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex gap-2 justify-center">
                    {course.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-black/40 backdrop-blur text-sm font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{course.title}</h1>
              <p className="text-text-secondary leading-relaxed mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-text-secondary">
                <span className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-400 fill-amber-400" />{course.rating} Rating</span>
                <span className="flex items-center gap-2"><Users className="w-5 h-5" />{course.students.toLocaleString()} Students</span>
                <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{course.duration}</span>
                <span className="flex items-center gap-2"><Award className="w-5 h-5 text-primary-light" />Certificate</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-white/5">
                {['overview', 'curriculum', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                      activeTab === tab ? 'text-white border-primary' : 'text-text-muted border-transparent hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-display font-bold mb-4">What You Will Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {course.whatYouLearn.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl glass">
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'curriculum' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  {course.modules.map((module, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="flex-1 font-medium">{module}</span>
                      <Play className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <p className="text-text-secondary">Reviews coming soon</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <GlassCard glow className="mb-6">
                <div className="text-3xl font-display font-bold text-white mb-1">{course.price}</div>
                <div className="text-text-muted line-through mb-6">{course.originalPrice}</div>
                <GlowButton variant="primary" className="w-full mb-3">Enroll Now</GlowButton>
                <GlowButton variant="secondary" className="w-full">Add to Wishlist</GlowButton>
                <p className="text-xs text-text-muted text-center mt-4">14-day money-back guarantee</p>
              </GlassCard>

              <GlassCard>
                <h4 className="font-display font-bold mb-4">This Course Includes</h4>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-center gap-2"><Play className="w-4 h-4 text-primary" /> 48 hours on-demand video</li>
                  <li className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /> 12 downloadable resources</li>
                  <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /> Direct mentor access</li>
                  <li className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Certificate of completion</li>
                  <li className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Lifetime community access</li>
                </ul>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}