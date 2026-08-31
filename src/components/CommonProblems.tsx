'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSiteSettings } from '@/lib/settings';
import {
  DollarSign,
  Clock,
  Ruler,
  AlertTriangle,
  Palette,
  Zap,
  Users,
  Briefcase,
  LucideIcon
} from 'lucide-react';

interface Problem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const defaultProblems: Problem[] = [
  {
    title: "Budget Overruns",
    description: "Unexpected costs and hidden expenses that derail your project finances and timeline.",
    icon: DollarSign,
  },
  {
    title: "Time Delays",
    description: "Projects taking longer than planned due to poor planning and coordination issues.",
    icon: Clock,
  },
  {
    title: "Space Planning Issues",
    description: "Inefficient use of space leading to cramped areas and poor functionality in daily use.",
    icon: Ruler,
  },
  {
    title: "Quality Compromises",
    description: "Substandard materials and workmanship that affect durability and overall satisfaction.",
    icon: AlertTriangle,
  },
  {
    title: "Design Inconsistency",
    description: "Mismatched styles and themes creating a disjointed look throughout your home.",
    icon: Palette,
  },
  {
    title: "Poor Functionality",
    description: "Beautiful designs that don't work for your lifestyle and daily routines.",
    icon: Zap,
  },
  {
    title: "Communication Gaps",
    description: "Misunderstandings between homeowners, designers, and contractors causing rework.",
    icon: Users,
  },
  {
    title: "Technical Challenges",
    description: "Structural, electrical, and plumbing issues that weren't anticipated in the design.",
    icon: Briefcase,
  },
];

export default function CommonProblems() {
  const [tagline, setTagline] = useState('SOLUTIONS THAT MATTER')
  const [title, setTitle] = useState('We help you avoid costly mistakes')
  const [subtext, setSubtext] = useState('Our bespoke turnkey approach saves you from the typical stress, delays, and cost overruns in home construction.')

  useEffect(() => {
    const loadData = () => {
      getSiteSettings().then(settings => {
        if (settings.problemsTagline) setTagline(settings.problemsTagline)
        if (settings.problemsTitle) setTitle(settings.problemsTitle)
        if (settings.problemsSubtext) setSubtext(settings.problemsSubtext)
      })
    }
    loadData()
    if (typeof window !== 'undefined') {
      window.addEventListener('site_settings_updated', loadData)
      window.addEventListener('storage', loadData)
      return () => {
        window.removeEventListener('site_settings_updated', loadData)
        window.removeEventListener('storage', loadData)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
            {tagline}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-normal leading-tight">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {defaultProblems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-red-500/30 transition-all duration-300 shadow-md hover:shadow-xl group"
              >
                <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl font-semibold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                  {problem.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}