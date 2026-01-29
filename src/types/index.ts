// News API Types
export interface NewsArticle {
    source: {
        id: string | null
        name: string
    }
    author: string | null
    title: string
    description: string | null
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string | null
}

export interface NewsResponse {
    status: string
    totalResults: number
    articles: NewsArticle[]
}

// CMS Types
export interface AllowedSource {
    _id: string
    sourceId: string
    displayName: string
    isActive: boolean
}

export interface Topic {
    _id: string
    name: string
    keywords: string[]
    color: string
}

export interface CMSConfig {
    allowedSources: AllowedSource[]
    topics: Topic[]
}

// Enhanced Article with Topic
export interface EnhancedArticle extends NewsArticle {
    topic?: Topic
}

// Filter and Sort Types
export interface NewsFilters {
    source?: string
    keyword?: string
    sortBy: 'publishedAt' | 'relevancy'
    sortOrder: 'asc' | 'desc'
}