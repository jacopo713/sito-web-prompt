import React from 'react';

interface TargetAudienceItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TargetAudienceGridProps {
  audienceData: TargetAudienceItemProps[];
}

export default function TargetAudienceGrid({ audienceData }: TargetAudienceGridProps) {
  if (!audienceData || audienceData.length === 0) {
    return null;
  }

  return (
    <div className="mb-16 md:mb-24">
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <span className="mx-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
            Per Chi È Pensato
          </span>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
        </div>
        
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
          Questi corsi sono
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"> ideali </span>
          se sei...
        </h3>
        
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          ...un professionista che vuole migliorare l&apos;efficienza, uno studente che cerca di eccellere, 
          un creativo a caccia di ispirazione, o semplicemente curioso di padroneggiare gli strumenti AI del futuro.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {audienceData.map((target, index) => (
          <div
            key={target.title}
            className="group relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-950/20 dark:via-transparent dark:to-purple-950/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <target.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300" />
                </div>
                
                {/* Floating Accent */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                {target.title}
              </h4>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                {target.description}
              </p>

              {/* Bottom Accent Line */}
              <div className="mt-6 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Non trovi il tuo profilo? 
        </p>
        <span className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold">
          I nostri corsi sono progettati per essere accessibili a tutti i livelli di esperienza
          <div className="ml-2 w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
        </span>
      </div>
    </div>
  );
}
