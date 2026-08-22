"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Images, Check } from "lucide-react";
import Link from "next/link";
import { ServiceItem } from "@/types/service";

function formatGoogleDriveUrl(url: string): string {
  if (!url) return url
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`
  }
  return url
}

export default function ManagedServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const rawImages = service.images && service.images.length > 0 ? service.images : (service.coverImage ? [service.coverImage] : [])
  const imagesList = rawImages.map(formatGoogleDriveUrl)
  const [currentImgIdx, setCurrentImgIdx] = useState(0)

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImgIdx((prev) => (prev + 1) % imagesList.length)
  }

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImgIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 relative overflow-hidden font-sans"
    >
      {/* Top subtle accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />

      <div>
        {/* Image Box Preview with Navigation & Count Badge */}
        {imagesList.length > 0 && (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
            {imagesList.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500 ease-out"
                style={{ opacity: i === currentImgIdx ? 1 : 0, zIndex: i === currentImgIdx ? 1 : 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${service.title} - ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none z-10" />

            {/* Left Arrow */}
            {imagesList.length > 1 && (
              <button
                onClick={goPrev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md rounded-full p-1.5 border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Right Arrow */}
            {imagesList.length > 1 && (
              <button
                onClick={goNext}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md rounded-full p-1.5 border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Category Badge */}
            {service.category && (
              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 z-20">
                <span className="text-[10px] uppercase font-bold text-white tracking-wider">
                  {service.category}
                </span>
              </div>
            )}

            {/* Image Count Badge */}
            {imagesList.length > 1 && (
              <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 flex items-center space-x-1.5 z-20">
                <Images className="w-3 h-3 text-red-400" />
                <span className="text-[11px] font-mono font-bold text-white">
                  {currentImgIdx + 1} / {imagesList.length} Images
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors leading-tight">
            {service.title}
          </h3>

          {service.subtitle && (
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">
              {service.subtitle}
            </p>
          )}

          {service.description && (
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-4 line-clamp-3">
              {service.description}
            </p>
          )}

          {/* Features Bullets */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-gray-100">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span className="font-medium truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View More Details Button */}
      <div className="px-6 pb-6 pt-2">
        <Link
          href={`/services/${service.id}`}
          prefetch={false}
          className="w-full py-3 bg-slate-50 hover:bg-red-50 text-slate-800 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-xl flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
        >
          <span>View More Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
