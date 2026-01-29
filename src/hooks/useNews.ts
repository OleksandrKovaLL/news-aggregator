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
      // Формуємо список дозволених джерел
      const sources = config?.allowedSources
        .map(s => s.sourceId)
        .join(',')

      // Робимо запит до News API
      const response = await newsApi.getAll({
        sources: filters.source || sources,
        q: filters.keyword,
        pageSize: 50,
        sortBy: 'publishedAt',
      })

      // Фільтруємо тільки дозволені джерела
      const allowedSourceIds = config?.allowedSources.map(s => s.sourceId) || []
      const filteredArticles = response.articles.filter(
        article =>
          article.source.id &&
          allowedSourceIds.includes(article.source.id)
      )

      // Додаємо топіки до статей
      const enhancedArticles = enhanceArticlesWithTopics(
        filteredArticles,
        config?.topics || []
      )

      return enhancedArticles
    },
    enabled: !!config, // Запускаємо тільки коли є конфіг з CMS
  })
}