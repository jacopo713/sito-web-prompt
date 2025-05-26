import Link from 'next/link'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { getLessonContent, getModuleInfo } from '@/lib/content-reader'
import { notFound } from 'next/navigation'

interface LessonPageProps {
  courseId: string
  moduleSlug: string
  lessonSlug: string
  children?: React.ReactNode
}

export default async function LessonPage({ 
  courseId, 
  moduleSlug, 
  lessonSlug,
  children 
}: LessonPageProps) {
  // Load lesson content and module info
  const lessonContent = await getLessonContent(courseId, moduleSlug, lessonSlug)
  const moduleInfo = await getModuleInfo(courseId, moduleSlug)
  
  if (!lessonContent || !moduleInfo) {
    notFound()
  }

  // Find current lesson index to determine navigation
  const currentLessonIndex = moduleInfo.lessons.findIndex(l => l.slug === lessonSlug)
  const previousLesson = currentLessonIndex > 0 ? moduleInfo.lessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < moduleInfo.lessons.length - 1 ? moduleInfo.lessons[currentLessonIndex + 1] : null

  const previousLessonSlug = previousLesson ? `/corsi/${courseId}/${moduleSlug}/${previousLesson.slug}` : null
  const nextLessonSlug = nextLesson ? `/corsi/${courseId}/${moduleSlug}/${nextLesson.slug}` : null

  return (
    <article className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 sm:p-8 lg:p-10">
      <header className="mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">
          {moduleInfo.moduleTitle} - {lessonContent.title}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
          {lessonContent.title}
        </h1>
      </header>

      {children}

      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mt-8">
          {previousLessonSlug ? (
            <Link
              href={previousLessonSlug}
              className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Lezione Precedente
            </Link>
          ) : (
            <span className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 opacity-50 cursor-not-allowed">
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Lezione Precedente
            </span>
          )}

          {nextLessonSlug ? (
            <Link
              href={nextLessonSlug}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
            >
              Lezione Successiva <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <Link
              href={`/corsi/${courseId}`}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-800 transition-colors"
            >
              Completa Modulo <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
