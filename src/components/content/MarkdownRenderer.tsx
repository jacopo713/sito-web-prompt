import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FiInfo, FiAlertTriangle, FiCheckSquare, FiStar } from 'react-icons/fi'
import { FaBrain } from 'react-icons/fa'

interface MarkdownRendererProps {
  content: string
}

// InfoBox component for special callouts
const InfoBox = ({ icon: Icon, title, children }: { 
  icon: React.ElementType
  title?: string
  children: React.ReactNode 
}) => (
  <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 dark:border-indigo-400 rounded-r-lg p-4 sm:p-6 my-6 shadow-md">
    <div className="flex items-start space-x-3">
      <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
      <div className="flex-grow">
        {title && <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-2">{title}</h3>}
        <div className="text-indigo-700 dark:text-indigo-300 text-sm sm:text-base space-y-2">
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components = {
    // Custom heading with better styling
    h1: ({ children }: any) => (
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4 flex items-center">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">
        {children}
      </h3>
    ),
    
    // Custom paragraph styling
    p: ({ children }: any) => (
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        {children}
      </p>
    ),
    
    // Enhanced lists
    ul: ({ children }: any) => (
      <ul className="list-disc list-outside space-y-2 pl-5 my-4 text-slate-600 dark:text-slate-300">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-outside space-y-2 pl-5 my-4 text-slate-600 dark:text-slate-300">
        {children}
      </ol>
    ),
    
    // Code styling
    code: ({ children }: any) => (
      <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-sm">
        {children}
      </code>
    ),
    
    // Blockquotes as info boxes
    blockquote: ({ children }: any) => {
      // Try to parse special blockquote syntax like > **Info:** content
      const content = children?.props?.children
      if (typeof content === 'string' && content.includes('**')) {
        const parts = content.split('**')
        if (parts.length >= 3) {
          const title = parts[1]
          const text = parts[2]
          return <InfoBox icon={FiInfo} title={title}>{text}</InfoBox>
        }
      }
      
      return (
        <blockquote className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 italic my-4">
          {children}
        </blockquote>
      )
    },
    
    // Strong text
    strong: ({ children }: any) => (
      <strong className="font-semibold text-slate-800 dark:text-slate-200">
        {children}
      </strong>
    )
  }

  return (
    <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
                    prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                    prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-800 dark:hover:prose-a:text-indigo-300
                    prose-strong:font-semibold
                    prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
