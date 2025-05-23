import React from 'react';
import Image from 'next/image';

/**
 * Displays logos of AI platforms.
 */
export default function PlatformLogos() {
  return (
    <div className="text-center mb-12 md:mb-16">
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
        PERFEZIONA L&apos;USO DI PIATTAFORME LEADER COME:
      </p>
      <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-4 sm:gap-x-8">
        <Image src="/claude.svg" alt="Claude AI Logo" width={100} height={28} className="h-7 sm:h-8" />
        <Image src="/chatgpt.svg" alt="ChatGPT Logo" width={100} height={28} className="h-7 sm:h-8" />
        <Image src="/gemini.svg" alt="Gemini AI Logo" width={100} height={28} className="h-7 sm:h-8" />
        <Image src="/deepseek.svg" alt="DeepSeek Logo" width={100} height={28} className="h-7 sm:h-8" />
      </div>
    </div>
  );
}
