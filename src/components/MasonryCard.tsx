// components/MasonryCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MasonryCardData, Badge } from '@/types/masonry';

interface MasonryCardProps {
  card: MasonryCardData;
}

const MasonryCard: React.FC<MasonryCardProps> = ({ card }) => {
  const getSizeClasses = (size: MasonryCardData['size']): string => {
    const baseClasses = "group cursor-pointer";
    
    switch (size) {
      case 'large':
        return `${baseClasses} md:col-span-2 md:row-span-2`;
      case 'tall':
        return `${baseClasses} md:row-span-2`;
      case 'wide':
        return `${baseClasses} md:col-span-2`;
      case 'medium':
        return `${baseClasses}`;
      case 'small':
        return `${baseClasses}`;
      default:
        return baseClasses;
    }
  };

  const getBadgeColor = (color: Badge['color']): string => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'blue':
        return 'bg-red-600';
      case 'green':
        return 'bg-red-500';
      case 'purple':
        return 'bg-rose-600';
      case 'orange':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getContentPadding = (size: MasonryCardData['size']): string => {
    switch (size) {
      case 'large':
        return 'p-8';
      case 'tall':
        return 'p-8';
      case 'wide':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const getTitleSize = (size: MasonryCardData['size']): string => {
    switch (size) {
      case 'large':
        return 'text-4xl';
      case 'tall':
        return 'text-3xl';
      case 'wide':
        return 'text-3xl';
      default:
        return 'text-2xl';
    }
  };

  const getButtonStyle = (size: MasonryCardData['size']): string => {
    const isLarge = size === 'large' || size === 'tall' || size === 'wide';
    return isLarge 
      ? "text-white font-semibold inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
      : "text-white font-semibold inline-flex items-center space-x-2 text-sm hover:text-white/80 transition-colors";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: card.delay }}
      viewport={{ once: true, margin: "-50px" }}
      className={getSizeClasses(card.size)}
    >
      <div className="relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-200">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {card.badge && (
          <div className={`absolute top-6 right-6 ${card.size === 'small' || card.size === 'medium' ? 'top-4 right-4' : ''}`}>
            <span className={`${getBadgeColor(card.badge.color)} text-white ${
              card.size === 'small' || card.size === 'medium' ? 'text-xs px-3 py-2' : 'text-sm px-4 py-2'
            } font-bold rounded-full shadow-lg`}>
              {card.badge.text}
            </span>
          </div>
        )}
        
        <div className={`absolute bottom-0 left-0 right-0 ${getContentPadding(card.size)}`}>
          <h3 className={`${getTitleSize(card.size)} font-bold text-white mb-3 leading-tight`}>
            {card.title}
          </h3>
          <p className="text-white/90 mb-4 leading-relaxed">
            {card.description}
          </p>
          <motion.button
            whileHover={{ x: 5 }}
            className={getButtonStyle(card.size)}
          >
            <span>{card.buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MasonryCard;