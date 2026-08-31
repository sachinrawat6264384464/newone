"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Handshake,
  Code,
  Sparkles,
  ArrowRight,
  Mail,
  CheckCircle2,
  Send,
  Share2,
  ChevronRight,
  Brain,
  Rocket,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    {
      id: "brand-community",
      title: "Brand & Community Intern",
      department: "Community & Ecosystem",
      type: "Internship / Community",
      location: "Remote / Hybrid",
      focus: "Grow the Botmartz brand and AI Engineering community.",
      badge: "Audience & Growth",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      icon: Users,
      responsibilities: [
        "Manage LinkedIn, Discord, WhatsApp/Telegram, and community channels.",
        "Create and schedule community content around AI Engineering, RAG, Agents, PyTorch, etc.",
        "Engage with developers, students, founders, and AI professionals.",
        "Organize meetups, webinars, workshops, and community activities.",
        "Increase Botmartz community members and engagement.",
        "Support AI Frontier and other Botmartz events.",
        "Collect community feedback and identify potential opportunities."
      ],
      keySkills: [
        "Communication",
        "Content Creation",
        "Social Media Management",
        "Community Building",
        "AI Interest & Passion"
      ]
    },
    {
      id: "partnerships-growth",
      title: "Partnerships & Community Growth Intern",
      department: "Community & Ecosystem",
      type: "Internship / Community",
      location: "Remote / Hybrid",
      focus: "Build relationships that expand Botmartz's ecosystem.",
      badge: "Ecosystem Partnerships",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      icon: Handshake,
      responsibilities: [
        "Research and identify potential technology, university, startup, community, and event partners.",
        "Reach out to companies, developer communities, colleges, AI groups, and potential sponsors.",
        "Build partnership proposals and collaboration opportunities.",
        "Manage partner communication and follow-ups.",
        "Develop collaborations for workshops, hackathons, meetups, webinars, and AI Frontier.",
        "Maintain a partnership CRM/database.",
        "Identify opportunities with AI/Cloud companies and developer ecosystems.",
        "Help create mutually beneficial programs for the Botmartz community."
      ],
      keySkills: [
        "Outreach & Lead Gen",
        "Research",
        "Strategic Communication",
        "Networking & Negotiation",
        "Relationship Management"
      ]
    },
    {
      id: "devrel-intern",
      title: "Developer Relations (DevRel) Intern",
      department: "AI Engineering & Ecosystem",
      type: "Technical Internship",
      location: "Remote / Hybrid",
      focus: "Build the developer ecosystem around Botmartz's AI Engineering work.",
      badge: "Highly Technical Pipeline",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      icon: Code,
      isTechnical: true,
      responsibilities: [
        "Build relationships with AI/ML developers and engineers.",
        "Create technical content, tutorials, demos, and developer resources.",
        "Organize technical workshops, hackathons, meetups, and developer events.",
        "Support Botmartz open-source projects and GitHub community.",
        "Engage with developers on GitHub, Discord, LinkedIn, Reddit, and other technical communities.",
        "Research emerging technologies such as PyTorch, LangGraph, LangChain, Google ADK, Transformers, RAG, and AI Agents.",
        "Collect developer feedback and communicate insights back to the engineering team.",
        "Help grow Botmartz as an AI Engineering developer brand, rather than simply a services company."
      ],
      keySkills: [
        "Basic Python & Programming",
        "AI/ML & RAG Interest",
        "GitHub & Open Source",
        "Technical Communication",
        "Developer Ecosystems"
      ]
    }
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const subject = encodeURIComponent(`Application for ${selectedRole}: ${applicantName}`);
    const body = encodeURIComponent(
      `Hello Soham,\n\nI am applying for the position of ${selectedRole} at Botmartz AI Solutions.\n\nApplicant Details:\n- Name: ${applicantName}\n- Email: ${applicantEmail}\n- Phone: ${applicantPhone}\n- LinkedIn: ${linkedinUrl}\n- GitHub/Portfolio: ${githubUrl}\n\nCover Note / Why Botmartz:\n${coverNote}\n\nBest regards,\n${applicantName}`
    );

    // Open mailto link directly to soham@botmartz.com
    setTimeout(() => {
      window.location.href = `mailto:soham@botmartz.com?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-28 pb-20 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-1.5 rounded-full text-red-400 font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>Botmartz AI Solutions — Careers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Build the Future of <span className="bg-gradient-to-r from-red-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">AI Engineering</span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            We are structuring our internship &amp; community growth engines to discover top talent, empower developers, and expand Botmartz's AI ecosystem globally.
          </p>

          {/* Contact Direct Badge */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <span>Direct Hiring Contact:</span>
            <a
              href="mailto:soham@botmartz.com"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-red-400 px-3 py-1 rounded-lg transition inline-flex items-center gap-1.5 font-mono"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>soham@botmartz.com</span>
            </a>
          </div>
        </motion.div>

        {/* Recommended Hierarchy Visual Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl mb-16 shadow-2xl space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-extrabold text-red-400 tracking-widest uppercase">Ecosystem Architecture</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">Recommended Growth Hierarchy</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>3 Distinct Growth Engines</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="bg-slate-950/80 border border-red-500/20 p-5 rounded-2xl space-y-2 relative overflow-hidden group hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-red-400 uppercase tracking-wider">Engine 1</span>
                <span className="text-[10px] bg-red-500/10 text-red-300 px-2 py-0.5 rounded-md border border-red-500/30">Audience</span>
              </div>
              <h3 className="text-lg font-bold text-white">Brand &amp; Community</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Build awareness, curate content, and grow our AI Engineering community audience across social channels.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-purple-500/20 p-5 rounded-2xl space-y-2 relative overflow-hidden group hover:border-purple-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Engine 2</span>
                <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/30">Ecosystem</span>
              </div>
              <h3 className="text-lg font-bold text-white">Partnerships &amp; Growth</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Expand reach via tech companies, colleges, AI groups, hackathons, and AI Frontier collaborations.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-cyan-500/20 p-5 rounded-2xl space-y-2 relative overflow-hidden group hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">Engine 3</span>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/30">Technical Pipeline</span>
              </div>
              <h3 className="text-lg font-bold text-white">Developer Relations</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Highly technical role driving open-source tools, PyTorch, RAG, AI Agents, and hiring pipeline.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3 Open Roles Section */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">Active Hiring</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Open Roles &amp; Internships</h2>
            </div>
            <p className="text-xs text-slate-400 font-medium">All applications go directly to <span className="text-red-400 font-mono font-bold">soham@botmartz.com</span></p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {roles.map((role, index) => {
              const IconComp = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/90 border border-white/10 hover:border-white/20 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 transition group"
                >
                  {/* Top Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-red-400 group-hover:scale-105 transition">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${role.badgeColor}`}>
                            {role.badge}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{role.department}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{role.title}</h3>
                        <p className="text-xs text-red-400 font-medium mt-0.5">Focus: {role.focus}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedRole(role.title);
                        setIsSubmitted(false);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-lg inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <span>Apply For Role</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Responsibilities Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-red-400" />
                        <span>Key Responsibilities</span>
                      </h4>
                      <ul className="grid grid-cols-1 gap-2 text-xs text-slate-300 font-light">
                        {role.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Skills Column */}
                    <div className="space-y-3 bg-slate-950/60 border border-white/5 p-4 rounded-2xl h-fit">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Key Skills Required</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {role.keySkills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-white/5 border border-white/10 text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {role.isTechnical && (
                        <div className="pt-2 border-t border-white/10 text-[11px] text-cyan-400 font-mono">
                          Tech Stack: PyTorch, LangGraph, LangChain, RAG, AI Agents, GitHub
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Application Modal Overlay */}
        <AnimatePresence>
          {selectedRole && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Botmartz AI Solutions</span>
                    <h3 className="text-lg sm:text-xl font-black text-white">Apply: {selectedRole}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:bg-white/20 flex items-center justify-center font-bold text-sm transition"
                  >
                    ✕
                  </button>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/40">
                      <Send className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Opening Email Client...</h4>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                      Your pre-filled application email is opening for <span className="text-red-400 font-mono font-bold">soham@botmartz.com</span>. If your mail client doesn't open automatically, send directly to <span className="text-red-400 font-mono font-bold">soham@botmartz.com</span>.
                    </p>
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition"
                    >
                      Done / Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Sharma"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-300 font-bold block">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="alex@gmail.com"
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-300 font-bold block">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-300 font-bold block">LinkedIn Profile URL</label>
                        <input
                          type="url"
                          placeholder="https://linkedin.com/in/username"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-300 font-bold block">GitHub / Portfolio URL</label>
                        <input
                          type="url"
                          placeholder="https://github.com/username"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold block">Why Botmartz? / Brief Intro</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your background in AI, community building, or developer relations..."
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Application to soham@botmartz.com</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
