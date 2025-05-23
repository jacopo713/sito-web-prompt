import React from 'react';

interface TargetAudienceItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TargetAudienceGridProps {
  audienceData: TargetAudienceItemProps[];
}

/**
 * Grid component to display target audience segments.
 */
export default function TargetAudienceGrid({ audienceData }: TargetAudienceGridProps) {
  if (!audienceData || audienceData.length === 0) {
    return null;
  }

  return (
    <div className="mb-16 md:mb-20 text-center">
      <h3 className="text-2xl sm:text-3xl font-semibold text-slate-700 dark:text-slate-200 mb-3">
        Questi corsi sono ideali se sei...
      </h3>
      <p className="text-md sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10">
        ...un professionista che vuole migliorare l&apos;efficienza, uno studente che cerca di eccellere, un creativo a caccia di ispirazione, o semplicemente curioso di padroneggiare gli strumenti AI del futuro.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {audienceData.map((target) => (
          <div key={target.title} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-left">
            <target.icon className="h-8 w-8 mb-3 text-indigo-500 dark:text-indigo-400" />
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">{target.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{target.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
