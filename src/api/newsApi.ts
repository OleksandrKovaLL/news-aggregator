import axios from 'axios'
import type { NewsResponse } from '@/types'

const newsApiClient = axios.create({
    baseURL: import.meta.env.VITE_NEWS_API_BASE_URL,
    params: {
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
    },
})

export const newsApi = {
    getTopHeadlines: async (params?: {
        sources?: string
        q?: string
        pageSize?: number
        page?: number
    }): Promise<NewsResponse> => {
        const { data } = await newsApiClient.get('/top-headlines', {
            params: {
                ...params,
                country: params?.sources ? undefined : 'us',
            },
        })
        return data
    },

    getAll: async (params?: {
        sources?: string
        q?: string
        sortBy?: 'publishedAt' | 'relevancy' | 'popularity'
        pageSize?: number
    }): Promise<NewsResponse> => {
        const { data } = await newsApiClient.get('/everything', {
            params: {
                ...params,
                language: 'en',
            },
        })
        return data
    },
}