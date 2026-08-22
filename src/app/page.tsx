// app/page.tsx
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import HeroCarousel from "../components/HeroCarousel";
import ServiceCard from "@/components/ServiceCard";
import ManagedServiceCard from "@/components/ManagedServiceCard";
import ProcessSection from "@/components/ProcessSection";
import { getServices } from "@/lib/services";
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
import FloatingElements from "../components/FloatingElements";
import MasonryGrid from "@/components/MasonryGrid";
import CommonProblems from "../components/CommonProblems";
import { getSiteSettings } from "@/lib/settings";

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
    title: "End to End Construction",
    description:
      "Complete turnkey construction with material management, architectural facade design, and phase planning.",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg"
    ],
    color: "from-red-400 to-red-600",
  },
  {
    icon: HomeIcon,
    title: "Facade Design",
    description:
      "Stunning 3D exterior elevation facade designs that create lasting first impressions.",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg"
    ],
    color: "from-red-400 to-red-600",
  },
  {
    icon: Sofa,
    title: "Full Home Interiors",
    description:
      "Bespoke luxury interior design & turnkey execution including modular kitchens, living areas, and bedrooms.",
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg"
    ],
    color: "from-red-400 to-red-600",
  }
];

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

export default async function Home() {
  const managedServices = await getServices(true);
  const siteSettings = await getSiteSettings();

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
            <div className="lg:col-span-5 flex justify-center">
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
                <div className="absolute -bottom-6 -right-4 sm:right-2 bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-white/10 flex items-center space-x-3">
                  <div className="bg-red-600 p-2.5 rounded-lg text-white">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">10+ Years</p>
                    <p className="text-xs text-gray-300">Design Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="lg:col-span-7 space-y-6">
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
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-md shadow-md text-base inline-flex items-center space-x-2 transition-all cursor-pointer">
                    <span>Book a Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#F5F3EF] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
              {siteSettings.servicesTagline || 'SERVICES WE OFFER'}
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal leading-tight">
              {siteSettings.servicesTitle || 'Choose As Per Your Requirement.'}
            </h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managedServices.length > 0
              ? managedServices.slice(0, 3).map((service, index) => (
                <ManagedServiceCard key={service.id || index} service={service} index={index} />
              ))
              : services.slice(0, 3).map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
          </div>

          {/* Book Consultation WhatsApp Button */}
          <div className="mt-14 text-center">
            <Link
              href="https://wa.me/919625769768?text=Hi!%20I'm%20interested%20in%20Home%20Storey's%20design%20services.%20I'd%20like%20to%20book%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl text-base sm:text-lg transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Book Your Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Now / Most Requested Design Solutions section (Hidden per user request, easily unhidden anytime) */}
      {/* <MasonryGrid /> */}

      <CommonProblems />

      {/* Our Process Section */}
      <ProcessSection />

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
              {siteSettings.testimonialsTagline || 'CLIENT STORIES'}
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal leading-tight">
              {siteSettings.testimonialsTitle || 'What Our Clients Say.'}
            </h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
            <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              {siteSettings.testimonialsSubtext || 'Hear from satisfied homeowners who trusted us with their architectural and interior dreams.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
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
                      <div key={i}>
                        <Star className="w-4 h-4 text-red-500 fill-current" />
                      </div>
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <div>
                        <Star className="w-4 h-4 text-red-500 fill-current opacity-40" />
                      </div>
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
                      <h3 className="font-serif-luxury text-lg font-bold text-slate-950">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-gray-200/60">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
              {siteSettings.ctaTagline || "LET'S BUILD TOGETHER"}
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-slate-900 font-normal mb-6 leading-tight">
              {siteSettings.ctaTitle || 'Ready To Transform Your Dream Space?'}
            </h2>
            <p className="text-slate-600 text-base md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              {siteSettings.ctaSubtext || 'Book a complimentary design discussion and discover how we turn your architectural vision into reality.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                href="https://tidycal.com/homestorey/free-design-discussion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-red-600 hover:bg-red-700 text-white px-9 py-4 rounded-md text-base font-bold transition-all shadow-lg inline-flex items-center space-x-3 cursor-pointer">
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
