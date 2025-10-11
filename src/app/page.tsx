// app/page.tsx
"use client";
import { motion } from "framer-motion";
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
  Ruler,  Zap, Palette
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MasonryGrid from '@/components/MasonryGrid';
import CommonProblems from "../components/CommonProblems";


interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
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
    description: "Stunning exterior designs that create lasting first impressions",
    image: "/Facade_1.jpg",
    color: "from-red-400 to-red-600",
  },
  {
    icon: Sofa,
    title: "Living Area",
    description: "Comfortable and stylish living spaces perfect for family gatherings",
    image: "/Living_3.jpg",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: ChefHat,
    title: "Kitchen Design",
    description: "Modern, functional kitchens that are the heart of your home",
    image: "/kitchen1.jpg",
    color: "from-red-400 to-red-600",
  },
  {
    icon: Bed,
    title: "Bedroom Design",
    description: "Peaceful retreats designed for rest and rejuvenation",
    image: "/Bedroom_4.jpeg",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Bath,
    title: "Bathroom Design",
    description: "Spa-like bathrooms combining luxury and functionality",
    image: "/Bathroom_1.jpg",
    color: "from-red-400 to-red-600",
  },
  {
    icon: Briefcase,
    title: "Home Office Design",
    description: "Productive work-from-home spaces tailored to your needs",
    image: "/pic3.jpeg",
    color: "from-blue-400 to-blue-600",
  },
];


const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "Home Storey transformed our outdated kitchen into a modern masterpiece. The attention to detail and quality of work exceeded our expectations.",
    rating: 5,
    image: "/pic4.jpeg",
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    content:
      "Their commercial design expertise helped us create an office space that our employees love. Professional, timely, and within budget.",
    rating: 5,
    image: "/pic5.jpeg",
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Designer",
    content:
      "I've worked with many contractors, but Home Storey stands out for their creativity and commitment to excellence. Highly recommended!",
    rating: 5,
    image: "/pic6.jpeg",
  },
];

const problems = [
  {
    title: "Budget Overruns",
    description: "Unexpected costs and hidden expenses that derail your project finances and timeline.",
    icon: DollarSign
  },
  {
    title: "Time Delays",
    description: "Projects taking longer than planned due to poor planning and coordination issues.",
    icon: Clock
  },
  {
    title: "Space Planning Issues",
    description: "Inefficient use of space leading to cramped areas and poor functionality in daily use.",
    icon: Ruler
  },
  {
    title: "Quality Compromises",
    description: "Substandard materials and workmanship that affect durability and overall satisfaction.",
    icon: AlertTriangle
  },
  {
    title: "Design Inconsistency",
    description: "Mismatched styles and themes creating a disjointed look throughout your home.",
    icon: Palette
  },
  {
    title: "Poor Functionality",
    description: "Beautiful designs that don't work for your lifestyle and daily routines.",
    icon: Zap
  },
  {
    title: "Communication Gaps",
    description: "Misunderstandings between homeowners, designers, and contractors causing rework.",
    icon: Users
  },
  {
    title: "Technical Challenges",
    description: "Structural, electrical, and plumbing issues that weren't anticipated in the design.",
    icon: Briefcase
  }
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
            <h3 className="text-2xl font-bold text-blue-600 mb-3">
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
            <h3 className="text-2xl font-bold text-red-600 mb-3">
              Execution
            </h3>
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
            <h3 className="text-2xl font-bold text-blue-600 mb-3">
              Handover
            </h3>
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

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/3 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-black/90 max-w-2xl mx-auto">
              Numbers that speak for our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const colors = [
                "from-blue-500 to-blue-600",
                "from-red-500 to-red-600",
                "from-blue-500 to-blue-600",
              ];
              const borderColors = [
                "border-blue-400/50",
                "border-red-400/50",
                "border-blue-400/50",
              ];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 bg-gradient-to-br ${
                      colors[index % colors.length]
                    } rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-2 ${
                      borderColors[index % borderColors.length]
                    } backdrop-blur-sm`}
                  >
                    <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                  </motion.div>
                  <motion.h3
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="text-5xl md:text-6xl font-bold mb-3 text-black drop-shadow-lg"
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-black/95 font-semibold text-lg tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Nidhi Section */}
      <section className="py-20 relative bg-white">
        <div className="absolute inset-0 bg-red-100/20 opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop&crop=face"
                    alt="Nidhi Mittal"
                    width={500}
                    height={600}
                    className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-red-600 font-bold text-xl tracking-wide uppercase"
                >
                  Meet Your Designer
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-6xl font-bold text-blue-600 mt-4 mb-6 leading-tight"
                >
                  Hi, Nidhi here
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-6 text-gray-700 leading-relaxed"
              >
                <p className="text-lg">
                  I am on a mission to help &ldquo;Luxury Lifestyle Seekers&rdquo; tackle the challenges of limited time, budget constraints and complex coordination of Home Design and Construction.
                </p>
                <p className="text-lg">
                  I am an Interior Designer with over a decade of work experience. I have worked with a lot of home design and construction companies, where I have learned and implemented various techniques to work on space design in this highly unorganized industry. There came a time when I realized that just by sticking to the corporate culture, I will not be able to provide the type of solutions which can actually help people tackle a lot of challenges when it comes to Construction and Home Design.
                </p>
                <p className="text-lg">
                  Having learned this I Founded &ldquo;Homestorey&rdquo; which suggests a narrative of creating beautiful personalized spaces and evokes the sense of storytelling and transformation, our clients not only got their spaces designed but discovered a journey of expression and scalability.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="pt-2"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-xl text-lg"
                  >
                    Book a Consultation
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
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
              Forget Typical Boring Designs, Look at What We Have
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From stunning facades to functional interiors, we bring your vision to life with creativity and precision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
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
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/30">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-gray-700">
                        Premium
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      className={`h-1 bg-gradient-to-r ${service.color} rounded-full mt-4`}
                    ></motion.div>
                  </div>
                </motion.div>
              );
            })}
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
              <span>Explore All Our Services</span>
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
              Hear from satisfied homeowners and businesses who trusted us with their dreams
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
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </motion.div>
                  ))}
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
              <Link href="https://tidycal.com/homestorey/free-design-discussion" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg inline-flex items-center space-x-3"
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