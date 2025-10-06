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
      image: "/pic1.jpeg",
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
      image: "/pic5.jpeg",
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
      image: "/pic2.jpeg",
      badge: {
        text: "Trending",
        color: "blue"
      },
      size: "small",
      buttonText: "Explore",
      delay: 0.2
    },
    {
      id: 4,
      title: "Home Office Design",
      description: "Productive workspaces optimized for remote work and creativity",
      image: "/pic3.jpeg",
      badge: {
        text: "In Demand",
        color: "blue"
      },
      size: "small",
      buttonText: "Explore",
      delay: 0.3
    },
    {
      id: 5,
      title: "Wellness & Fitness Spaces",
      description: "Dedicated yoga rooms, home gyms, and meditation areas for a healthier lifestyle",
      image: "/pic4.jpeg",
      badge: {
        text: "Wellness Focus",
        color: "purple"
      },
      size: "tall",
      buttonText: "Learn More",
      delay: 0.4
    },
    {
      id: 6,
      title: "Terrace BBQ & Lounges",
      description: "Outdoor entertainment spaces designed for relaxation and social gatherings",
      image: "/pic1.jpeg",
      size: "small",
      buttonText: "Explore",
      delay: 0.5
    },
    {
      id: 7,
      title: "Mandir & Prayer Rooms",
      description: "Sacred spaces with traditional elements and modern design integration",
      image: "/pic2.jpeg",
      size: "small",
      buttonText: "Explore",
      delay: 0.6
    },
    {
      id: 8,
      title: "Bay Window Seating",
      description: "Cozy reading nooks and seating areas that maximize natural light",
      image: "/pic3.jpeg",
      size: "small",
      buttonText: "Explore",
      delay: 0.7
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-600 font-bold text-lg bg-red-100 px-6 py-3 rounded-full mb-4">
            Trending Now
          </span>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Most Requested Design Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what homeowners are choosing this year to transform their spaces
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