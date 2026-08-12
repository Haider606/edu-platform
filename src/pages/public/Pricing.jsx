import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react'
import { GlassCard } from '../../components/ui/GlassCard'
import { GlowButton } from '../../components/ui/GlowButton'
import { SectionTitle } from '../../components/ui/SectionTitle'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for exploring',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ['5 AI-generated quizzes/month', 'Basic study planner', 'Community access', '3 course previews', 'Email support'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For serious learners',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ['Unlimited AI quizzes', 'AI Mentor 24/7', 'Full course library', 'Project reviews', 'Resume builder', 'Interview coach', 'Priority support'],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For teams & organizations',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: ['Everything in Pro', 'Team management', 'Custom curriculum', 'Priority support', 'White-label options', 'API access', 'Dedicated account manager'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="relative">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-secondary to-bg" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <SectionTitle
            label="Pricing"
            title="Invest in Your Future"
            description="Choose the plan that fits your goals. All plans include a 14-day free trial."
          />

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-text-muted'}`}>Monthly</span>
            <button onClick={() => setIsYearly(!isYearly)} className="relative w-14 h-7 rounded-full bg-white/10 transition-colors">
              <motion.div animate={{ x: isYearly ? 28 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-primary" />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-white' : 'text-text-muted'}`}>Yearly</span>
            {isYearly && <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-bold">Save 20%</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
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
                    <p className="text-sm text-text-muted">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div key={isYearly ? 'yearly' : 'monthly'}
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="flex items-baseline gap-1">
                        <span className="text-4xl font-display font-bold">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                        {plan.monthlyPrice > 0 && <span className="text-text-muted">/{isYearly ? 'year' : 'month'}</span>}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <GlowButton variant={plan.popular ? 'primary' : 'secondary'} className="w-full">{plan.cta}</GlowButton>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* FAQ Teaser */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-16 text-center">
            <p className="text-text-secondary mb-4">Have questions about our pricing?</p>
            <a href="/faq" className="inline-flex items-center gap-2 text-primary-light hover:text-white transition-colors">
              Visit our FAQ <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}