import React from 'react';
import CourseCard, { CourseCardData } from './CourseCard'; // Import the new CourseCard component and its data type

interface CourseCardListProps {
  courses: CourseCardData[]; // Expects an array of course data
}

/**
 * Renders a list of course cards.
 */
export default function CourseCardList({ courses }: CourseCardListProps) {
  if (!courses || courses.length === 0) {
    return <p className="text-center text-slate-500 dark:text-slate-400">Nessun corso disponibile al momento.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
