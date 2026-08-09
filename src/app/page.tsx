// app/page.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "../components/Layout";
import HeroCarousel from "../components/HeroCarousel";
import FloatingElements from "../components/FloatingElements";
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      {/* Image Carousel — opacity fade, guaranteed single image */}
      <div className="relative overflow-hidden" style={{ height: "260px" }}>

        {/* All 3 images stacked — only active one is visible */}
        {service.images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === currentImg ? 1 : 0, zIndex: i === currentImg ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${service.title} - ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" style={{ zIndex: 10 }} />

        {/* Left Arrow */}
        <button
          onClick={goPrev}
          style={{ zIndex: 20 }}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          style={{ zIndex: 20 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" style={{ zIndex: 20 }}>
          {service.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
              style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: i === currentImg ? "white" : "rgba(255,255,255,0.5)",
                border: "none", cursor: "pointer",
                transform: i === currentImg ? "scale(1.3)" : "scale(1)",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>

        {/* Premium badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full" style={{ zIndex: 20 }}>
          <span className="text-xs font-semibold text-gray-700">Premium</span>
        </div>

        {/* Image counter */}
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full" style={{ zIndex: 20 }}>
          <span className="text-xs font-medium text-white">
            {currentImg + 1} / {service.images.length}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{service.description}</p>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
          className={`h-1 bg-gradient-to-r ${service.color} rounded-full mt-4`}
        />
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

const stats = [
  { label: "Happy Clients", value: "250+", icon: Users },
  { label: "Projects Completed", value: "300+", icon: Award },
  { label: "Years Experience", value: "10+", icon: Star },
];

const ProcessSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-red-600 font-semibold text-lg mb-3 tracking-wide uppercase">
            How We Work
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Our Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial consultation to final handover, we follow a proven
            process that ensures your project is delivered on time, within
            budget, and beyond expectations.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Consultation
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Understand your lifestyle, taste, and requirements through
              detailed discussions and space assessments.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Concept & Estimate
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Develop creative concepts, moodboards, and material selections
              while maintaining transparency in pricing and timelines.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <h3 className="text-2xl font-bold text-red-600 mb-3">Execution</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Execute the design with precision and craftsmanship, ensuring
              every element aligns with the vision through quality checks and
              progress updates.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <h3 className="text-2xl font-bold text-red-600 mb-3">Handover</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Complete final styling and walkthroughs, followed by a smooth
              handover and post-project support for lasting satisfaction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <Layout>
      {/* Floating 3D Elements */}
      <FloatingElements />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Meet Nidhi Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-red-50 to-red-100">
        {/* Soft glowing background orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-300/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Nidhi Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="relative group w-[420px] h-[550px]">
                {/* Framed gradient border */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-red-500 via-rose-500 to-orange-400 rounded-[2rem] blur opacity-60 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Main image with glass-like shadow */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dfjecbhki/image/upload/v1762298139/Homestorey-media/Owner/xyergldmjm9mfacihjb5.jpg"
                    alt="Nidhi Mittal"
                    width={500}
                    height={700}
                    className="w-full h-[550px] object-cover rounded-[2rem] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Decorative glow on hover */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-60 transition duration-500"></div>
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <span className="text-red-600 font-bold text-xl tracking-wide uppercase block">
                  Meet Your Designer
                </span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
                  Hi, <span className="text-red-600">I’m Nidhi</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded-full"></div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  I’m passionate about helping{" "}
                  <span className="font-semibold text-red-600">
                    &ldquo;Luxury Lifestyle Seekers&rdquo;
                  </span>
                  navigate the challenges of limited time, budget constraints,
                  and the complex coordination of home design and construction.
                </p>
                <p>
                  With over a decade of experience in{" "}
                  <span className="font-semibold text-red-600">
                    interior design
                  </span>
                  , I’ve collaborated with top construction and home design
                  firms — learning what truly works in an industry often defined
                  by chaos.
                </p>
                <p>
                  That journey led me to found{" "}
                  <span className="font-semibold text-red-600">
                    Home Storey
                  </span>{" "}
                  — a brand built on storytelling, transformation, and the
                  belief that every home should tell the story of the people who
                  live in it.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{
                      scale: 1.07,
                      boxShadow: "0 15px 35px rgba(239, 68, 68, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-xl text-lg"
                  >
                    Book a Consultation
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-red-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-red-600 font-semibold text-lg">
              What We Create
            </span>
            <h2 className="text-5xl font-bold text-gray-800 mt-4 mb-6">
              Look at what we design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From stunning facades to functional interiors, we bring your
              vision to life with creativity and precision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Explore All Designs</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <MasonryGrid />

      <CommonProblems problems={problems} />

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-red-600 font-semibold text-lg">
              Client Stories
            </span>
            <h2 className="text-5xl font-bold text-gray-800 mt-4 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from satisfied homeowners and businesses who trusted us with
              their dreams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                className="bg-white rounded-3xl p-8 relative border border-gray-200 hover:border-red-200 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <Quote className="w-12 h-12 text-red-500 mb-6 opacity-70" />
                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="flex items-center mb-6">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </motion.div>
                  ))}
                  {/* Render half-star if needed */}
                  {testimonial.rating % 1 !== 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay:
                          index * 0.2 + Math.floor(testimonial.rating) * 0.1,
                      }}
                    >
                      <Star className="w-5 h-5 text-yellow-500 fill-current opacity-50" />
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center">
                  <div className="relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 border-3 border-red-500 shadow-md"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-20"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-500 rounded-full opacity-20"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <ProcessSection />

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight">
              Ready to Transform Your
              <span className="block text-red-600 mt-2">Dream Space?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Get a free consultation and let&apos;s discuss how we can bring
              your vision to life with our expert design team
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="https://tidycal.com/homestorey/free-design-discussion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg inline-flex items-center space-x-3"
                >
                  <span>Start Your Free Consultation</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-20"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white/10"
            ></path>
          </svg>
        </div>
      </section>
    </Layout>
  );
}
