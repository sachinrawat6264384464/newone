// components/MasonryGrid.tsx
'use client';

import { motion } from 'framer-motion';
import MasonryCard from './MasonryCard';
import { MasonryCardData } from '@/types/masonry';

const MasonryGrid: React.FC = () => {
  const cardsData: MasonryCardData[] = [
    {
      id: 1,
      title: "Smart Home Automation",
      description: "Control your entire home with voice commands - lighting, temperature, security, and entertainment systems integrated seamlessly",
      image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298154/Homestorey-media/Trending%20Now/sifrsnviuyzkfovsl3ni.jpg",
      badge: {
        text: "Most Popular",
        color: "red"
      },
      size: "large",
      buttonText: "Learn More",
      delay: 0
    },
    {
      id: 2,
      title: "Modular Kitchen Storage",
      description: "Smart storage solutions with pull-out systems and corner optimizers for maximum efficiency",
      image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298145/Homestorey-media/Trending%20Now/aivfp1pqwgtfcop6virc.jpg",
      badge: {
        text: "Popular",
        color: "green"
      },
      size: "medium",
      buttonText: "Explore",
      delay: 0.1
    },
    {
      id: 3,
      title: "Space-Saving Solutions",
      description: "Murphy beds and convertible furniture for modern living spaces",
      image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298159/Homestorey-media/Trending%20Now/yaxvkmmtlui2ikbxgaih.jpg",
      badge: {
        text: "Trending",
        color: "red"
      },
      size: "small",
      buttonText: "Explore",
      delay: 0.2
    },
    {
      id: 4,
      title: "Home Office Design",
      description: "Productive workspaces optimized for remote work and creativity",
      image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298144/Homestorey-media/Trending%20Now/nkmqkyeymplfwaizumgq.jpg",
      badge: {
        text: "In Demand",
        color: "red"
      },
      size: "small",
      buttonText: "Explore",
      delay: 0.3
    },
    {
      id: 5,
      title: "Pooja Areas",
      description: "Dedicated pooja rooms, meditation corners, and serene spaces for spiritual and peaceful living",
      image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298152/Homestorey-media/Trending%20Now/smltkqjvr60siwugu5gv.jpg",
      badge: {
        text: "Wellness Focus",
        color: "red"
      },
      size: "tall",
      buttonText: "Learn More",
      delay: 0.4
    },
    {
      id: 6,
      title: "Terrace BBQ & Lounges",
      description: "Outdoor entertainment spaces designed for relaxation and social gatherings",
      image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298159/Homestorey-media/Trending%20Now/yaxvkmmtlui2ikbxgaih.jpg",
      size: "small",
      buttonText: "Explore",
      delay: 0.5
    },
    {
      id: 7,
      title: "Mandir & Prayer Rooms",
      description: "Sacred spaces with traditional elements and modern design integration",
      image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298153/Homestorey-media/Trending%20Now/kdcsevhnupm4vtm9s2my.jpg",
      size: "small",
      buttonText: "Explore",
      delay: 0.6
    },
    {
      id: 8,
      title: "Bay Window Seating",
      description: "Cozy reading nooks and seating areas that maximize natural light",
      image: "https://res.cloudinary.com/dfjecbhki/image/upload/v1762298143/Homestorey-media/Trending%20Now/el023n4t0hfl8ofbq5ui.png",
      size: "small",
      buttonText: "Explore",
      delay: 0.7
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
            Trending Now
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-normal leading-tight">
            Most Requested Design Solutions.
          </h2>
          <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover what discerning homeowners are choosing this year to elevate their spaces.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            {cardsData.map((card) => (
              <MasonryCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasonryGrid;