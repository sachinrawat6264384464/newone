// app/gallery/page.tsx
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getGalleryItems } from "@/lib/galleryItems";
import { getSiteSettings } from "@/lib/settings";
import { GalleryItem } from "@/types/galleryItem";

function formatGoogleDriveUrl(url: string): string {
  if (!url) return url
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`
  }
  return url
}

interface ServiceCarousel {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  images: string[];
  color: string;
  bgGradient: string;
}

const services: ServiceCarousel[] = [
  {
    title: "Facade & Exterior Architecture",
    subtitle: "STUNNING FIRST IMPRESSIONS",
    description:
      "Transform your home's exterior into an architectural masterpiece. From grand entrance foyers to bespoke elevation treatments, we craft outdoor spaces that command admiration.",
    features: [
      "Modern & classical elevation design",
      "Landscaping & outdoor lounge zones",
      "Entrance foyer & door styling",
      "Architectural exterior lighting",
    ],
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298133/Homestorey-media/Gallery%20page/qrvccsdngw1eemstykjc.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298116/Homestorey-media/Gallery%20page/vptfrusn2esxnjv76h0h.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298117/Homestorey-media/Gallery%20page/hutrz0l5g0vpipc9fja6.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298118/Homestorey-media/Gallery%20page/y8fzk10gfdjb8vus5jkv.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298123/Homestorey-media/Gallery%20page/rmocq2ue2azvxqebzzsw.jpg",
    ],
    color: "text-slate-900",
    bgGradient: "from-white to-white",
  },
  {
    title: "Living & Dining Spaces",
    subtitle: "BESPOKE GATHERING AREAS",
    description:
      "Design expansive living areas where families connect. Our approach harmonizes custom layout planning with premium materials for effortless entertaining.",
    features: [
      "Spatial layout & seating flow",
      "Custom dining tables & mood lighting",
      "Integrated media wall concepts",
      "Seamless open-plan organization",
    ],
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298128/Homestorey-media/Gallery%20page/zi2wip1jxakzjqizhdgm.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298129/Homestorey-media/Gallery%20page/caun6igvzixrok6wmnqh.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298130/Homestorey-media/Gallery%20page/xpnzyzppx6h2c10v683v.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298131/Homestorey-media/Gallery%20page/grl8vrpjqr1nv7iaoxnd.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298131/Homestorey-media/Gallery%20page/crhymjepg1mvcmiahb2d.jpg",
    ],
    color: "text-slate-900",
    bgGradient: "from-white to-white",
  },
  {
    title: "Modular Kitchen & Storage",
    subtitle: "CULINARY & FUNCTIONAL EXCELLENCE",
    description:
      "Transform your culinary environment into an efficient, ergonomic work of art featuring German hardware, island counters, and smart storage systems.",
    features: [
      "Modular island kitchen layouts",
      "Soft-close tandem drawer systems",
      "Pantry towers & corner pull-outs",
      "Quartz & marble countertop finishes",
    ],
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298127/Homestorey-media/Gallery%20page/edk6q2gjwi5g0u2mw3pp.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298126/Homestorey-media/Gallery%20page/spkd2fuj0bcyoomyi1pq.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298125/Homestorey-media/Gallery%20page/ceecfgprdjhjobsjqcm8.jpg",
    ],
    color: "text-slate-900",
    bgGradient: "from-white to-white",
  },
  {
    title: "Bedrooms & Private Suites",
    subtitle: "PERSONAL SANCTUARIES",
    description:
      "Create serene private retreats that foster rest and comfort. From master suites to walk-in wardrobes, every detail is tailored to your personal aesthetic.",
    features: [
      "Master suite layout & headboard walls",
      "Walk-in closet & wardrobe organization",
      "Ensuite luxury bathroom designs",
      "Acoustic & warm ambient lighting",
    ],
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298115/Homestorey-media/Gallery%20page/pd3nosf13zophljmvzmf.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298106/Homestorey-media/Gallery%20page/dj6mabg0bhos2uwy92xb.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298110/Homestorey-media/Gallery%20page/cwhrf0xslkk2k3kbbkf2.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298105/Homestorey-media/Gallery%20page/oyunrqa34u60lvewohml.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298104/Homestorey-media/Gallery%20page/y4mdmbgmcykrdvzdhtco.jpg",
    ],
    color: "text-slate-900",
    bgGradient: "from-white to-white",
  },
  {
    title: "Terrace, Mandir & Wellness",
    subtitle: "SACRED & LIFESTYLE SPACES",
    description:
      "Infuse unique character into your home with tranquil prayer rooms, rooftop deck entertainment areas, and dedicated wellness corners.",
    features: [
      "Custom marble Mandir room designs",
      "Terrace party decks & green pergolas",
      "Yoga & home gym wellness zones",
      "Balcony seating & planter arrangements",
    ],
    images: [
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298132/Homestorey-media/Gallery%20page/lfegjcseu2kxstbqgntm.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Gallery%20page/lnawan5pbjhamznuqfwa.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298135/Homestorey-media/Gallery%20page/vvdg8lq8e2ggxhqw53b1.webp",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298133/Homestorey-media/Gallery%20page/qrvccsdngw1eemstykjc.jpg",
      "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298143/Homestorey-media/Trending%20Now/el023n4t0hfl8ofbq5ui.png",
    ],
    color: "text-slate-900",
    bgGradient: "from-white to-white",
  },
];

const ImageCarousel = ({
  images,
  currentIndex,
  onNext,
  onPrev,
}: {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const formattedSrc = formatGoogleDriveUrl(images[currentIndex] || images[0]);
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
      <div className="relative w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={formattedSrc}
          alt={`Gallery image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
      </div>

      {/* Image Count Badge */}
      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 z-10">
        <span className="text-xs font-mono font-bold text-white">
          {currentIndex + 1} / {images.length} Images
        </span>
      </div>

      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2.5 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/60"
                }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Gallery() {
  const [galleryServices, setGalleryServices] = useState<ServiceCarousel[]>(services);
  const [carouselStates, setCarouselStates] = useState<number[]>(
    new Array(services.length).fill(0)
  );

  const [heroTagline, setHeroTagline] = useState<string>("DESIGN PORTFOLIO");
  const [heroTitle, setHeroTitle] = useState<string>("Welcome to Your Dream home Design Journey.");
  const [heroSubtext, setHeroSubtext] = useState<string>(
    "From the moment you step through your front door to every corner of your living space, we bring your architectural vision to life."
  );

  const [heroMosaicImages, setHeroMosaicImages] = useState<string[]>([
    "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg",
    "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg",
    "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg"
  ]);

  useEffect(() => {
    getSiteSettings().then(settings => {
      if (settings.galleryHeroImages && settings.galleryHeroImages.length > 0) {
        setHeroMosaicImages(settings.galleryHeroImages.map(formatGoogleDriveUrl));
      }
      if (settings.galleryHeroTagline) {
        setHeroTagline(settings.galleryHeroTagline);
      }
      if (settings.galleryHeroTitle) {
        setHeroTitle(settings.galleryHeroTitle);
      }
      if (settings.galleryHeroSubtext) {
        setHeroSubtext(settings.galleryHeroSubtext);
      }
    });

    getGalleryItems(true).then(items => {
      if (items && items.length > 0) {
        const mapped: ServiceCarousel[] = items.map(item => ({
          title: item.title,
          subtitle: item.subtitle || item.category.toUpperCase(),
          description: item.description || '',
          features: item.features && item.features.length > 0 ? item.features : [
            'Modern & classical elevation design',
            'Bespoke spatial layout & lighting flow',
            'Premium material specification & handover'
          ],
          images: item.images && item.images.length > 0 ? item.images.map(formatGoogleDriveUrl) : [formatGoogleDriveUrl(item.image)],
          color: 'text-slate-900',
          bgGradient: 'from-white to-white'
        }));
        setGalleryServices(mapped);
        setCarouselStates(new Array(mapped.length).fill(0));
      }
    });
  }, []);

  const updateCarousel = (serviceIndex: number, direction: "next" | "prev") => {
    setCarouselStates((prev) => {
      const newStates = [...prev];
      const currentIndex = newStates[serviceIndex] || 0;
      const imagesArr = galleryServices[serviceIndex]?.images || [];
      const maxIndex = imagesArr.length - 1;

      if (maxIndex <= 0) return prev;

      if (direction === "next") {
        newStates[serviceIndex] = currentIndex === maxIndex ? 0 : currentIndex + 1;
      } else {
        newStates[serviceIndex] = currentIndex === 0 ? maxIndex : currentIndex - 1;
      }

      return newStates;
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-36 sm:pt-40 lg:pt-44 pb-16 bg-[#FAF8F5] relative overflow-hidden border-b border-gray-200/60">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '56px 56px' }} />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-500 font-semibold text-xs tracking-[0.28em] uppercase block mb-4">
                {heroTagline}
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal leading-tight mb-5">
                {heroTitle}
              </h1>
              <div className="w-10 h-px bg-red-500 mb-5" />
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 font-light max-w-md">
                {heroSubtext}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["300+ Completed Designs", "10+ Years Experience"].map((label) => (
                  <div key={label} className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200/80">
                    <span className="text-slate-800 text-sm font-semibold">{label}</span>
                  </div>
                ))}
              </div>

              <Link
                href="https://tidycal.com/homestorey/free-design-discussion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 25px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-lg text-sm font-bold shadow-md transition-all inline-flex items-center gap-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right — Image Mosaic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-3 h-[520px]"
            >
              {/* Tall left image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-lg row-span-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroMosaicImages[0] || "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298136/Homestorey-media/Hero/hfqrz6nqcaxbwa22urgx.jpg"}
                  alt="Interior Design"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Top right */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroMosaicImages[1] || "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298138/Homestorey-media/Hero/haemuplqyv9glq1651fc.jpg"}
                  alt="Luxury Bedroom"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bottom right with overlay badge */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-lg relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroMosaicImages[2] || "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg"}
                  alt="Living Space"
                  className="w-full h-full object-cover"
                />
                {/* Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                  <p className="text-slate-900 text-xs font-bold">300+ Designs</p>
                  <p className="text-red-500 text-[10px] font-medium">Delivered</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Timeline Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
              Our Expertise
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal leading-tight">
              Complete Architectural & Interior Services.
            </h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
            <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
              From initial concept to turnkey execution, we provide comprehensive design solutions for every aspect of your living space.
            </p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            {/* Vertical line — desktop only */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-rose-500 to-red-600 transform -translate-x-1/2 rounded-full shadow-lg"></div>

            <div className="space-y-16 lg:space-y-40">
              {galleryServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Circle dot — desktop only */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                    className="hidden lg:flex absolute left-1/2 w-14 h-14 rounded-full transform -translate-x-1/2 shadow-xl z-20 items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, #EF4444 0%, #DC2626 100%)`,
                    }}
                  >
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </motion.div>

                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center ${index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                      }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`${index % 2 === 0 ? "lg:pr-16" : "lg:col-start-2 lg:pl-16"
                        }`}
                    >
                      <div className="relative">
                        <ImageCarousel
                          images={service.images}
                          currentIndex={carouselStates[index]}
                          onNext={() => updateCarousel(index, "next")}
                          onPrev={() => updateCarousel(index, "prev")}
                        />
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-rose-100 rounded-3xl opacity-50 -z-10 blur-sm"></div>
                      </div>
                    </motion.div>

                    <motion.div
                      className={`space-y-4 ${index % 2 === 0 ? "lg:pl-16" : "lg:col-start-1 lg:pr-16"
                        }`}
                    >
                      <div
                        className="bg-white p-7 lg:p-9 rounded-2xl shadow-md hover:shadow-xl border border-gray-200/80 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="space-y-5 relative z-10">
                          <div>
                            <span className="text-red-500 font-semibold text-xs tracking-[0.25em] uppercase block mb-1">
                              {service.subtitle}
                            </span>
                            <h3 className="font-serif-luxury text-2xl lg:text-3xl font-semibold text-slate-900 leading-tight">
                              {service.title}
                            </h3>
                          </div>

                          <p className="text-slate-600 leading-relaxed text-sm lg:text-base font-light">
                            {service.description}
                          </p>

                          <div className="grid grid-cols-1 gap-2.5 mt-5">
                            {service.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: featureIndex * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 6 }}
                                className="flex items-center space-x-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-gray-200/60"
                              >
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-red-500">
                                  <Sparkles className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-slate-800 font-medium text-xs lg:text-sm">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {index < services.length - 1 && (
                    <div className="absolute left-8 lg:left-1/2 bottom-0 w-0.5 h-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent transform lg:-translate-x-1/2 opacity-50"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-rose-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-white"
          >
            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold mb-4"
            >
              Ready to Get Started?
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg opacity-90 mb-8 leading-relaxed"
            >
              Let&apos;s bring your vision to life with our expert design
              services
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                href="https://tidycal.com/homestorey/free-design-discussion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-red-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
