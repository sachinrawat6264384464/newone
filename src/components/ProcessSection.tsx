"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSiteSettings } from "@/lib/settings";

export default function ProcessSection() {
  const [tagline, setTagline] = useState('HOW WE WORK')
  const [title, setTitle] = useState('Our Process.')
  const [subtext, setSubtext] = useState('A transparent, 5-step journey from initial consultation to final handover and 3 months warranty support.')

  useEffect(() => {
    const loadData = () => {
      getSiteSettings().then(settings => {
        if (settings.processTagline) setTagline(settings.processTagline)
        if (settings.processTitle) setTitle(settings.processTitle)
        if (settings.processSubtext) setSubtext(settings.processSubtext)
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

  const steps = [
    {
      num: "01",
      title: "Consultation",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      desc: "Understand your lifestyle, taste, and requirements through detailed discussions and space assessments.",
      tag: "Free Session",
    },
    {
      num: "02",
      title: "Concept & Estimate",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      desc: "Develop creative concepts, moodboards, and material selections while maintaining transparency in pricing.",
      tag: "3D Visualization",
    },
    {
      num: "03",
      title: "Execution",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      desc: "Execute the design with precision and craftsmanship, ensuring every element aligns with the vision through quality checks.",
      tag: "Quality Assured",
    },
    {
      num: "04",
      title: "Handover",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
          <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      desc: "Deliver your completed luxury space on time, backed by post-handover support and warranty assurances.",
      tag: "On-Time Delivery",
    },
    {
      num: "05",
      title: "Support & Warranty",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      desc: "3 months warranty ON CIVIL WORK & WOOD WORK (T&C*)",
      tag: "Warranty Support",
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-gray-200/50">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
            {tagline}
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal leading-tight">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            {subtext}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              viewport={{ once: true }}
              className="relative bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 shadow-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between">
                <div className="bg-red-50 text-red-600 border border-red-100 p-2.5 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
                <span className="text-[44px] font-extrabold text-slate-200 group-hover:text-red-500/20 leading-none select-none font-serif-luxury tracking-tight transition-colors">
                  {step.num}
                </span>
              </div>

              <div className="flex items-center justify-between gap-1 pt-1">
                <span className="text-[11px] font-bold text-red-600 tracking-widest uppercase">STEP {step.num}</span>
                <span className="text-[9px] tracking-wider text-red-600 uppercase font-semibold bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                  {step.tag}
                </span>
              </div>
              
              <div className="w-full h-px bg-gray-100" />

              <h3 className="font-serif-luxury text-lg text-slate-900 font-bold leading-snug group-hover:text-red-600 transition-colors">
                {step.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
