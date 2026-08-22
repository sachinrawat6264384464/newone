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
      className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 relative group/card"
    >
      {/* Top subtle red accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />

      <div>
        {/* Top Image Carousel Container (Compact 4:3 Ratio) */}
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
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
              </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" style={{ zIndex: 10 }} />

            {/* Left Navigation Arrow */}
            {imagesList.length > 1 && (
              <button
                onClick={goPrev}
                style={{ zIndex: 20 }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md rounded-full p-1.5 border border-gray-200 shadow-md opacity-0 group-hover/card:opacity-100 transition-all hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Right Navigation Arrow */}
            {imagesList.length > 1 && (
              <button
                onClick={goNext}
                style={{ zIndex: 20 }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md rounded-full p-1.5 border border-gray-200 shadow-md opacity-0 group-hover/card:opacity-100 transition-all hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Category Pill */}
            {service.category && (
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10" style={{ zIndex: 20 }}>
                <span className="text-[10px] uppercase font-bold text-white tracking-wider">
                  {service.category}
                </span>
              </div>
            )}

            {/* Image Counter Badge */}
            {imagesList.length > 1 && (
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20 flex items-center space-x-1.5" style={{ zIndex: 20 }}>
                <Images className="w-3 h-3 text-red-400" />
                <span className="text-[10px] font-mono font-bold text-white">
                  {currentImgIdx + 1} / {imagesList.length}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Card Body Info */}
        <div className="p-6 font-sans">
          <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors leading-snug">
            {service.title}
          </h3>

          {service.subtitle && (
            <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-3">
              {service.subtitle}
            </p>
          )}

          {service.description && (
            <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4 font-light">
              {service.description}
            </p>
          )}

          {/* Feature Checklist Bullets */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-gray-100">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="px-6 pb-6 pt-2 font-sans">
        <Link
          href={`/services/${service.id}`}
          prefetch={false}
          className="w-full py-2.5 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-xl flex items-center justify-center space-x-2 text-xs font-bold transition-all shadow-xs group/btn"
        >
          <span>View More Details</span>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover/btn:text-red-600 group-hover/btn:translate-x-1 transition-all" />
        </Link>
      </div>
    </motion.div>
  );
}
