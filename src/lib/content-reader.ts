import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface LessonContent {
  title: string
  moduleSlug: string
  lessonSlug: string
  previousLesson: string | null
  nextLesson: string | null
  content: string
}

export interface ModuleInfo {
  moduleSlug: string
  moduleTitle: string
  description: string
  icon: string
  lessons: {
    slug: string
    title: string
    duration?: string
  }[]
}

export interface CourseInfo {
  id: string
  title: string
  subtitle: string
  description: string
  targetAudience: string[]
  learningObjectives: string[]
}

export async function getLessonContent(
  courseId: string, 
  moduleSlug: string, 
  lessonSlug: string
): Promise<LessonContent | null> {
  try {
    const contentPath = path.join(
      process.cwd(), 
      'content', 
      'courses', 
      courseId, 
      'modules', 
      moduleSlug, 
      'lessons', 
      `${lessonSlug}.md`
    )
    
    if (!fs.existsSync(contentPath)) {
      console.warn(`Lesson content not found at: ${contentPath}`)
      return null
    }

    const fileContent = fs.readFileSync(contentPath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      title: data.title || 'Untitled Lesson',
      moduleSlug: data.moduleSlug || moduleSlug,
      lessonSlug: data.lessonSlug || lessonSlug,
      previousLesson: data.previousLesson || null,
      nextLesson: data.nextLesson || null,
      content
    }
  } catch (error) {
    console.error('Error reading lesson content:', error)
    return null
  }
}

export async function getModuleInfo(
  courseId: string, 
  moduleSlug: string
): Promise<ModuleInfo | null> {
  try {
    const modulePath = path.join(
      process.cwd(), 
      'content', 
      'courses', 
      courseId, 
      'modules', 
      moduleSlug, 
      'module-info.json'
    )
    
    if (!fs.existsSync(modulePath)) {
      console.warn(`Module info not found at: ${modulePath}`)
      return null
    }

    const moduleContent = fs.readFileSync(modulePath, 'utf8')
    const moduleData = JSON.parse(moduleContent) as ModuleInfo
    
    return moduleData
  } catch (error) {
    console.error('Error reading module info:', error)
    return null
  }
}

export async function getCourseInfo(courseId: string): Promise<CourseInfo | null> {
  try {
    const coursePath = path.join(
      process.cwd(), 
      'content', 
      'courses', 
      courseId, 
      'course-info.json'
    )
    
    if (!fs.existsSync(coursePath)) {
      console.warn(`Course info not found at: ${coursePath}`)
      return null
    }

    const courseContent = fs.readFileSync(coursePath, 'utf8')
    const courseData = JSON.parse(courseContent) as CourseInfo
    
    return courseData
  } catch (error) {
    console.error('Error reading course info:', error)
    return null
  }
}

// Helper function to get all available lessons for a course
export async function getAllLessons(courseId: string): Promise<{
  moduleSlug: string
  moduleTitle: string
  lessons: { slug: string; title: string; duration?: string }[]
}[]> {
  try {
    const modulesPath = path.join(process.cwd(), 'content', 'courses', courseId, 'modules')
    
    if (!fs.existsSync(modulesPath)) {
      return []
    }

    const modulesFolders = fs.readdirSync(modulesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    const modules = []
    for (const moduleSlug of modulesFolders) {
      const moduleInfo = await getModuleInfo(courseId, moduleSlug)
      if (moduleInfo) {
        modules.push({
          moduleSlug: moduleInfo.moduleSlug,
          moduleTitle: moduleInfo.moduleTitle,
          lessons: moduleInfo.lessons
        })
      }
    }

    return modules
  } catch (error) {
    console.error('Error getting all lessons:', error)
    return []
  }
}
