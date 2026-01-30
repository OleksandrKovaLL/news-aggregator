import { memo, useCallback } from 'react'
import type { EnhancedArticle } from '@/types'

interface ArticleModalProps {
  article: EnhancedArticle
  onClose: () => void
}

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line
      x1="18"
      y1="6"
      x2="6"
      y2="18"
    ></line>
    <line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
    ></line>
  </svg>
)

export const ArticleModal = memo(function ArticleModal({
  article,
  onClose,
}: ArticleModalProps) {
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end
      sm:items-center justify-center p-0 sm:p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-blue-300 rounded-t-lg sm:rounded-lg
        max-w-3xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative"
        onClick={handleBackdropClick}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8
          h-8 flex items-center justify-center rounded-full cursor-pointer
          bg-black/50 hover:bg-black/70 text-white transition-colors"
          aria-label="Close"
        >
          {closeIcon}
        </button>
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-40 sm:h-64 object-cover rounded-t-lg"
          />
        )}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">{article.title}</h2>
            {article.topic && (
              <span
                className="px-3 py-1 rounded-full text-white text-sm shrink-0 w-fit"
                style={{ backgroundColor: article.topic.color }}
              >
                {article.topic.name}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
            <span>{article.source.name}</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            {article.author && (
              <>
                <span>•</span>
                <span>{article.author}</span>
              </>
            )}
          </div>

          <p className="text-base sm:text-lg mb-4">{article.description}</p>

          {article.content && (
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              {article.content}
            </p>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-primary
            bg-blue-500 text-primary-foreground rounded-md
            hover:bg-blue-600 text-center"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  )
})
