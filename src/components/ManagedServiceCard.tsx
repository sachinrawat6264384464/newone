"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem } from "@/types/service";

export default function ManagedServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-center text-center hover:-translate-y-2 relative overflow-hidden"
    >
      {/* Top subtle accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col items-center text-center w-full">
        {/* Category Pill */}
        {service.category && (
          <span className="text-[11px] font-bold text-red-600 bg-red-50 px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
            {service.category}
          </span>
        )}

        {/* Service Icon Container */}
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>

        {/* Big Centered Title */}
        <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors leading-tight text-center">
          {service.title}
        </h3>

        {/* Subtitle */}
        {service.subtitle && (
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">{service.subtitle}</p>
        )}
      </div>

      {/* View More Details Button */}
      <Link
        href={`/services/${service.id}`}
        prefetch={false}
        className="mt-8 pt-5 w-full border-t border-gray-100 flex items-center justify-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider group-hover:translate-x-1 transition-transform cursor-pointer"
      >
        <span>View More Details</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
