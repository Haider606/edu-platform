import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { SectionTitle } from '../../components/ui/SectionTitle'

const faqs = [
  { question: 'How does the AI Mentor work?', answer: 'Our AI Mentor uses advanced language models trained on millions of educational interactions. It adapts to your learning style, explains concepts in multiple ways, and remembers your progress to provide personalized guidance 24/7.' },
  { question: 'Are the certificates recognized by employers?', answer: 'Yes! All EduVerse AI certificates are blockchain-verified and recognized by our 500+ hiring partners including Fortune 500 companies. Each certificate includes a unique verification link you can share on LinkedIn.' },
  { question: 'Can I switch between monthly and yearly plans?', answer: 'Absolutely. You can upgrade, downgrade, or switch billing cycles at any time. When upgrading, you only pay the prorated difference. Yearly plans include a 20% discount and priority support.' },
  { question: 'How does the internship placement work?', answer: 'After completing your learning path and passing skill assessments, our AI matching engine connects you with relevant internship opportunities. We partner with 500+ companies and provide interview prep and resume optimization.' },
  { question: 'What is the refund policy?', answer: 'We offer a 14-day money-back guarantee on all paid plans. If you are not satisfied, contact our support team for a full refund, no questions asked.' },
  { question: 'Can I sell my own courses and resources?', answer: 'Yes! Our marketplace allows verified instructors and students to sell notes, templates, projects, and digital products. You keep 70% of revenue, or 85% if you are a Pro member.' },
  { question: 'Do I need prior coding experience?', answer: 'Not at all. Our beginner tracks assume zero prior knowledge. The AI Mentor will guide you step-by-step, and you can adjust the difficulty at any time based on your comfort level.' },
  { question: 'How long do I have access to the courses?', answer: 'All enrolled courses come with lifetime access. You can revisit lessons, download resources, and access updated content forever.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <SectionTitle
            label="FAQ"
            title="Questions? Answered."
            description="Everything you need to know about EduVerse AI"
          />

          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Search questions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl glass text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors" />
          </div>

          <div className="space-y-4">
            {filtered.map((faq, i) => (
              <motion.div key={faq.question} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass rounded-xl overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors">
                  <span className="font-display font-medium pr-4">{faq.question}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                      <div className="px-5 pb-5 text-text-secondary leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}