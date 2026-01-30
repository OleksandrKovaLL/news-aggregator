import { useCallback, useState } from 'react'
import { useNews } from '@/hooks/useNews'
import { NewsCard } from '@/components/NewsCard'
import { ArticleModal } from '@/components/ArticleModal'
import type { EnhancedArticle, NewsFilters as Filters } from '@/types'
import { NewsFilters } from '@/components/NewsFilters.tsx'

export const HomePage = () => {
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    source: undefined,
    sortOrder: 'desc',
  })
  const [selectedArticle, setSelectedArticle] =
    useState<EnhancedArticle | null>(null)

  const handleCloseModal = useCallback(() => setSelectedArticle(null), [])
  const handleSelectArticle = useCallback(
    (article: EnhancedArticle) => setSelectedArticle(article),
    []
  )

  const { data: articles, isLoading, error } = useNews(filters)

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error loading news
          </h2>
          <p className="text-muted-foreground">
            {error.message && 'Something went wrong'}
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <div className="shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold">News Aggregator</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Stay updated with the latest news from trusted sources
            </p>
          </div>
          {/* Filters */}
          <div className="flex-1">
            <NewsFilters
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div>
          {/* News Grid */}
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading news...</p>
                </div>
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {articles.map((article: EnhancedArticle) => (
                  <NewsCard
                    key={article.url}
                    article={article}
                    onSelect={handleSelectArticle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
