import { useQuery } from '@tanstack/react-query'
import { enhanceArticlesWithTopics } from '@/utils/topicMatcher'
import { useCMSConfig } from './useCMSConfig'
import type { NewsFilters } from '@/types'
import { newsApi } from '@/api/newsApi.ts'

export const useNews = (filters: NewsFilters) => {
  const { data: config } = useCMSConfig()

  return useQuery({
    queryKey: ['news', filters],
    queryFn: async () => {
      // Create a list of allowed sources
      const sources = config?.allowedSources.map((s) => s.sourceId).join(',')

      //News API request
      const response = await newsApi.getAll({
        // sources: filters.source || sources,
        sources: sources,
        pageSize: 50,
        sortBy: 'publishedAt',
      })

      // Filtering only allowed sources
      const allowedSourceIds =
        config?.allowedSources.map((s) => s.sourceId) || []
      let filteredArticles = response.articles.filter(
        (article) =>
          article.source.id && allowedSourceIds.includes(article.source.id)
      )

      if (filters.source) {
        filteredArticles = filteredArticles.filter(
          (article) => article.source.id === filters.source
        )
      }

      // Filtering by keyword in Title
      if (filters.keyword && filters.keyword.trim()) {
        const keywordLower = filters.keyword.toLowerCase().trim()
        filteredArticles = filteredArticles.filter((article) =>
          article.title.toLowerCase().includes(keywordLower)
        )
      }

      // Add topics to articles
      const enhancedArticles = enhanceArticlesWithTopics(
        filteredArticles,
        config?.topics || []
      )

      const sortedArticles = enhancedArticles.toSorted((a, b) => {
        const dateA = new Date(a.publishedAt).getTime()
        const dateB = new Date(b.publishedAt).getTime()
        return filters.sortOrder === 'desc' ? dateB - dateA : dateA - dateB
      })

      return sortedArticles
    },

    enabled: !!config, // CMS config
  })
}
