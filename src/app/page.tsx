// app/page.tsx
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import HeroCarousel from "../components/HeroCarousel";
import FloatingElements from "../components/FloatingElements";
import { getServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/settings";
import { ServiceItem } from "@/types/service";
import {
  ChefHat,
  Sofa,
  Bed,
  Bath,
  Star,
  Quote,
  ArrowRight,
  LucideIcon,
  Award,
  Users,
  Clock,
  DollarSign,
  AlertTriangle,
  HomeIcon,
  Briefcase,
  Ruler,
  Zap,
  Palette,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MasonryGrid from "@/components/MasonryGrid";
import CommonProblems from "../components/CommonProblems";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  images: string[];
  color: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const services: Service[] = [
  {
    icon: HomeIcon,
    title: "Facade Design",
    description:
      "Stunning exterior designs that create lasting first impressions",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg",
      "/What_we_create/20220325_164704.jpg",
      "/What_we_create/IMG-20220420-WA0006.jpg",
    ],
    color: "from-red-400 to-red-600",
  },
  {
    icon: Sofa,
    title: "Living Area",
    description:
      "Comfortable and stylish living spaces perfect for family gatherings",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg",
      "/What_we_create/20230301_170056.jpg",
      "/What_we_create/20230301_170142.jpg",
    ],
    color: "from-red-400 to-red-600",
  },
  {
    icon: ChefHat,
    title: "Kitchen Design",
    description: "Modern, functional kitchens that are the heart of your home",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298164/Homestorey-media/What%20we%20create/t6w21ualgsjkz6ifc8bo.jpg",
      "/What_we_create/Kitchen.jpeg",
      "/What_we_create/12.jpg",
    ],
    color: "from-red-400 to-red-600",
  },
  {
    icon: Bed,
    title: "Bedroom Design",
    description: "Peaceful retreats designed for rest and rejuvenation",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298161/Homestorey-media/What%20we%20create/edh6sfa6zt7byruupb2b.jpg",
      "/What_we_create/Bedroom.jpeg",
      "/What_we_create/IMG-20251129-WA0016.jpg",
    ],
    color: "from-red-400 to-red-600",
  },
  {
    icon: Bath,
    title: "Bathroom Design",
    description: "Spa-like bathrooms combining luxury and functionality",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298160/Homestorey-media/What%20we%20create/wqnxhezwbtsnivywxqej.jpg",
      "/What_we_create/Bathroom.jpg",
      "/What_we_create/IMG-20251129-WA0018.jpg",
    ],
    color: "from-red-400 to-red-600",
  },
  {
    icon: Briefcase,
    title: "Home Office Design",
    description: "Productive work-from-home spaces tailored to your needs",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298163/Homestorey-media/What%20we%20create/hqflyynqrv1uccqarkmf.jpg",
      "/What_we_create/Home-office.jpeg",
      "/What_we_create/IMG-20251129-WA0021.jpg",
    ],
    color: "from-red-400 to-red-600",
  },
];


// Per-card image carousel component
function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const IconComponent = service.icon;

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % service.images.length);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) =>
      prev === 0 ? service.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 hover:shadow-2xl hover:border-red-500/30 transition-all duration-500 flex flex-col justify-between"
    >
      {/* Image Carousel */}
      <div className="relative overflow-hidden h-[270px]">
        {/* All images stacked — only active one is visible */}
        {service.images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === currentImg ? 1 : 0, zIndex: i === currentImg ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${service.title} - ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        ))}

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" style={{ zIndex: 10 }} />

        {/* Left Arrow */}
        <button
          onClick={goPrev}
          style={{ zIndex: 20 }}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          style={{ zIndex: 20 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" style={{ zIndex: 20 }}>
          {service.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                i === currentImg ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10" style={{ zIndex: 20 }}>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-white">Luxury Series</span>
        </div>

        {/* Image Counter Badge */}
        <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10" style={{ zIndex: 20 }}>
          <span className="text-xs font-mono font-medium text-gray-200">
            {currentImg + 1} / {service.images.length}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-7 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-red-50 text-red-600 p-2.5 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-slate-950 group-hover:text-red-600 transition-colors">
              {service.title}
            </h3>
          </div>
          <p className="text-slate-950 text-base sm:text-[17px] leading-relaxed font-bold">{service.description}</p>
        </div>

        <Link 
          href="/gallery"
          className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-red-600 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
        >
          <span>View Design Gallery</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

// Dynamic Managed Service Card
function ManagedServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const imagesList = service.images && service.images.length > 0 ? service.images : [service.coverImage];
  const [currentImg, setCurrentImg] = useState(0);

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % imagesList.length);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  return (
    <motion.div
      key={service.id || index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 hover:shadow-2xl hover:border-red-500/30 transition-all duration-500 flex flex-col justify-between"
    >
      {/* Image Carousel (Compact 4:3 Ratio Preview) */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-950">
        {imagesList.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === currentImg ? 1 : 0, zIndex: i === currentImg ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${service.title} - ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" style={{ zIndex: 10 }} />

        {/* Carousel Navigation Arrows */}
        {imagesList.length > 1 && (
          <button
            onClick={goPrev}
            style={{ zIndex: 20 }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {imagesList.length > 1 && (
          <button
            onClick={goNext}
            style={{ zIndex: 20 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Dot Indicators */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5" style={{ zIndex: 20 }}>
            {imagesList.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  i === currentImg ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10" style={{ zIndex: 20 }}>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-white">
            {service.category || "Luxury Series"}
          </span>
        </div>

        {/* Image Counter Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10" style={{ zIndex: 20 }}>
          <span className="text-[11px] font-mono font-bold text-white">
            {currentImg + 1} / {imagesList.length} Images
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="bg-red-50 text-red-600 p-2 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-slate-950 group-hover:text-red-600 transition-colors">
              {service.title}
            </h3>
          </div>
          {service.subtitle && (
            <p className="text-xs font-extrabold text-slate-900 mb-1.5">{service.subtitle}</p>
          )}
          <p className="text-slate-950 text-sm sm:text-base leading-relaxed font-bold line-clamp-3">{service.description}</p>
        </div>

        <Link
          href="/gallery"
          className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-red-600 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
        >
          <span>View Design Gallery</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}


const testimonials: Testimonial[] = [
  {
    name: "Akku",
    role: "Homeowner",
    content:
      "Before, it felt like everything was just…cluttered. I had furniture from here and there, and nothing really flowed together. But Homestorey came in and listened to all my requirements –the cozy armchair by the window for reading, the extra storage in the kitchen for all my spices. I highly recommend HOMESTOREY for full home interior design, They were so professional, always on time, and kept everything clean throughout the whole process",
    rating: 5,
    image:
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298140/Homestorey-media/Testimonials/qseuicqak0uskkbrsubz.webp",
  },
  {
    name: "Mani Bansal",
    role: "Pranic healer",
    content:
      "I got my home designed by home storey to revamp my home,and I am very happy with the work.From start to finish, the team at Homestorey exhibited professionalism, creativity,and an unwavering commitment to bringing my vision to life . Their attention to detail was impeccable, and they were able to seamlessly blend functionality with aesthetics, creating a space that is both beautiful and liveable. I highly recommend them for all your home design services.",
    rating: 4.5,
    image:
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298140/Homestorey-media/Testimonials/qseuicqak0uskkbrsubz.webp",
  },
  {
    name: "Manish Agarwal",
    role: "Exporter",
    content:
      "I recently hired 'Homestorey' for the office space design, and I couldn't be more pleased with the results. My requirements were very clear that I needed a very simple and minimalistic atmosphere. Throughout the construction process, the team maintained open communication, keeping me updated on progress and addressing any concerns promptly.",
    rating: 4.5,
    image:
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298140/Homestorey-media/Testimonials/qseuicqak0uskkbrsubz.webp",
  },
];

const problems = [
  {
    title: "Budget Overruns",
    description:
      "Unexpected costs and hidden expenses that derail your project finances and timeline.",
    icon: DollarSign,
  },
  {
    title: "Time Delays",
    description:
      "Projects taking longer than planned due to poor planning and coordination issues.",
    icon: Clock,
  },
  {
    title: "Space Planning Issues",
    description:
      "Inefficient use of space leading to cramped areas and poor functionality in daily use.",
    icon: Ruler,
  },
  {
    title: "Quality Compromises",
    description:
      "Substandard materials and workmanship that affect durability and overall satisfaction.",
    icon: AlertTriangle,
  },
  {
    title: "Design Inconsistency",
    description:
      "Mismatched styles and themes creating a disjointed look throughout your home.",
    icon: Palette,
  },
  {
    title: "Poor Functionality",
    description:
      "Beautiful designs that don't work for your lifestyle and daily routines.",
    icon: Zap,
  },
  {
    title: "Communication Gaps",
    description:
      "Misunderstandings between homeowners, designers, and contractors causing rework.",
    icon: Users,
  },
  {
    title: "Technical Challenges",
    description:
      "Structural, electrical, and plumbing issues that weren't anticipated in the design.",
    icon: Briefcase,
  },
];

const ProcessSection = () => {
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
      desc: "Complete final styling and walkthroughs, followed by a smooth handover and post-project support for lasting satisfaction.",
      tag: "Post-Support",
    },
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Subtle glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-slate-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-amber-400 font-semibold text-xs tracking-[0.28em] uppercase block mb-3">
            How We Work
          </span>
          <h2 className="font-serif-luxury text-4xl lg:text-5xl text-white font-normal leading-tight mb-4">
            Our <span className="italic text-amber-300">Process</span>
          </h2>
          <div className="w-10 h-px bg-amber-400 mx-auto mb-5 rounded-full" />
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed font-light">
            From initial consultation to final handover — a proven process that ensures your project is delivered on time, within budget, and beyond expectations.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(255,255,255,0.06)" }}
              className="relative bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300 group shadow-lg"
            >
              {/* Top row: Icon badge on left, Big Step Number on top-right */}
              <div className="flex items-center justify-between">
                {/* Icon badge */}
                <div className="bg-white/10 border border-white/20 p-3 rounded-xl text-amber-300 group-hover:bg-white/20 transition-colors duration-300">
                  {step.icon}
                </div>
                {/* Big Step Number (Cleanly positioned at top right) */}
                <span className="text-[52px] font-extrabold text-white/40 leading-none select-none font-serif-luxury tracking-tight">
                  {step.num}
                </span>
              </div>

              {/* Step label & Tag pill row */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">STEP {step.num}</span>
                <span className="text-[10px] tracking-widest text-amber-200 uppercase font-semibold bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">
                  {step.tag}
                </span>
              </div>
              <div className="w-full h-px bg-white/15" />

              {/* Title */}
              <h3 className="font-serif-luxury text-xl text-white font-bold leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-slate-200 text-sm sm:text-[15px] leading-relaxed font-medium">
                {step.desc}
              </p>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [managedServices, setManagedServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    getServices(true).then((data) => {
      if (data && data.length > 0) {
        setManagedServices(data);
      }
    });
  }, []);

  return (
    <Layout>
      {/* Floating 3D Elements */}
      <FloatingElements />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Meet Nidhi Section */}
      <section id="nidhi" className="relative py-24 overflow-hidden bg-[#FAF8F5]">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Nidhi Image Card (Clean Luxury Frame, No Glow) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[420px]">
                {/* Main image with clean border and shadow */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white p-2">
                  <div className="relative rounded-xl overflow-hidden h-[480px]">
                    <Image
                      src="https://res.cloudinary.com/dfjecbhki/image/upload/v1762298139/Homestorey-media/Owner/xyergldmjm9mfacihjb5.jpg"
                      alt="Nidhi Mittal - Principal Designer"
                      width={500}
                      height={700}
                      className="w-full h-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Floating Experience Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -bottom-6 -right-4 sm:right-2 bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-white/10 flex items-center space-x-3"
                >
                  <div className="bg-red-600 p-2.5 rounded-lg text-white">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">10+ Years</p>
                    <p className="text-xs text-gray-300">Design Experience</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Header */}
              <div>
                <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase block">
                  Meet Your Designer
                </span>
                <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 mt-2 mb-4 font-normal leading-tight">
                  Hi, I’m <span className="italic text-red-600">Nidhi Mittal</span>
                </h2>
                <div className="w-16 h-0.5 bg-red-500 rounded-full"></div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-slate-700 leading-relaxed text-base sm:text-lg font-light">
                <p>
                  I’m passionate about helping{" "}
                  <span className="font-semibold text-slate-900">
                    &ldquo;Luxury Lifestyle Seekers&rdquo;
                  </span>{" "}
                  navigate the challenges of limited time, budget constraints,
                  and the complex coordination of architectural design and turnkey construction.
                </p>
                <p>
                  With over a decade of experience in{" "}
                  <span className="font-semibold text-red-600">
                    interior architecture & design
                  </span>
                  , I’ve collaborated with top construction and design firms — learning what truly works in an industry often defined by chaos.
                </p>
                <p>
                  That journey led me to found{" "}
                  <span className="font-semibold text-slate-900">
                    Home Storey
                  </span>{" "}
                  — a brand built on storytelling, transformation, and the belief that every home should tell the unique story of the people who live in it.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4">
                <Link href="https://tidycal.com/homestorey/free-design-discussion" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 12px 25px rgba(239, 68, 68, 0.3)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-md shadow-md text-base inline-flex items-center space-x-2 transition-all"
                  >
                    <span>Book a Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#F5F3EF] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
              What We Create
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal leading-tight">
              Look At What We Design.
            </h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              From bespoke architectural facades to functional luxury interiors, we transform spaces with precision, innovation, and timeless elegance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managedServices.length > 0
              ? managedServices.map((service, index) => (
                  <ManagedServiceCard key={service.id || index} service={service} index={index} />
                ))
              : services.map((service, index) => (
                  <ServiceCard key={index} service={service} index={index} />
                ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-9 py-4 rounded-md shadow-lg text-base transition-all hover:scale-[1.02]"
            >
              <span>Explore All Designs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <MasonryGrid />

      <CommonProblems problems={problems} />

      {/* Our Process Section */}
      <ProcessSection />

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
              Client Stories
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal leading-tight">
              What Our Clients Say.
            </h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
            <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Hear from satisfied homeowners who trusted us with their architectural and interior dreams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 relative border border-gray-200/80 hover:border-red-500/30 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-10 h-10 text-red-500 mb-4 opacity-80" />
                  <p className="text-slate-950 mb-6 italic text-base sm:text-[17px] leading-relaxed font-semibold">
                    &quot;{testimonial.content}&quot;
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-5">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                      >
                        <Star className="w-4 h-4 text-red-500 fill-current" />
                      </motion.div>
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          delay: index * 0.2 + Math.floor(testimonial.rating) * 0.1,
                        }}
                      >
                        <Star className="w-4 h-4 text-red-500 fill-current opacity-40" />
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-red-500 shadow-sm object-cover"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h4 className="font-serif-luxury text-lg font-bold text-slate-950">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-gray-200/60">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
              LET’S BUILD TOGETHER
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-slate-900 font-normal mb-6 leading-tight">
              Ready To Transform Your{" "}
              <span className="block italic text-red-600">Dream Space?</span>
            </h2>
            <p className="text-slate-600 text-base md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Book a complimentary design discussion and discover how we turn your architectural vision into reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                href="https://tidycal.com/homestorey/free-design-discussion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-9 py-4 rounded-md text-base font-bold transition-all shadow-lg inline-flex items-center space-x-3"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
