// components/CommonProblems.tsx
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Problem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface CommonProblemsProps {
  problems: Problem[];
}

const CommonProblems: React.FC<CommonProblemsProps> = ({ problems }) => {
  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
            Solutions That Matter
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-normal leading-tight">
            We Help You Avoid Common Design Challenges.
          </h2>
          <div className="w-16 h-0.5 bg-red-500 mx-auto my-5 rounded-full"></div>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Our bespoke turnkey approach saves you from the typical stress, delays, and cost overruns in home construction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 border border-gray-200/80 hover:border-red-500/30 transition-all duration-300 shadow-md hover:shadow-xl group"
              >
                <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl font-semibold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                  {problem.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommonProblems;