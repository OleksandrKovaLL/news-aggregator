import { memo, useCallback } from 'react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { EnhancedArticle } from '@/types'

interface NewsCardProps {
  article: EnhancedArticle
  onSelect: (article: EnhancedArticle) => void
}

export const NewsCard = memo(function NewsCard({
  article,
  onSelect,
}: NewsCardProps) {
  const handleClick = useCallback(() => {
    onSelect(article)
  }, [article, onSelect])

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {article.title}
          </h3>
          {article.topic && (
            <Badge
              style={{ backgroundColor: article.topic.color }}
              className="shrink-0"
            >
              {article.topic.name}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {article.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="bg-blue-300 px-5 rounded-2xl">
            {article.source.name}
          </span>
          <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
        </div>
      </CardContent>
    </Card>
  )
})
