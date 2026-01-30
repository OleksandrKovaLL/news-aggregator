import axios from 'axios'
import type { NewsResponse } from '@/types'

// const newsApiClient = axios.create({
//   baseURL: import.meta.env.VITE_NEWS_API_BASE_URL,
//   params: {
//     apiKey: import.meta.env.VITE_NEWS_API_KEY,
//   },
// })

const isDevelopment = import.meta.env.DEV

// На production використовуємо наш власний API route
const baseURL = isDevelopment
  ? import.meta.env.VITE_NEWS_API_BASE_URL
  : '/api/news'

const newsApiClient = axios.create({
  baseURL,
  ...(isDevelopment && {
    params: {
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
    },
  }),
})

// export const newsApi = {
//   getAll: async (params?: {
//     sources?: string
//     q?: string
//     sortBy?: 'publishedAt' | 'relevancy' | 'popularity'
//     pageSize?: number
//   }): Promise<NewsResponse> => {
//     const { data } = await newsApiClient.get('/everything', {
//       params: {
//         ...params,
//         language: 'en',
//       },
//     })
//     return data
//   },
// }

export const newsApi = {
  getAll: async (params?: {
    sources?: string
    q?: string
    sortBy?: 'publishedAt' | 'relevancy' | 'popularity'
    pageSize?: number
  }): Promise<NewsResponse> => {
    const { data } = await newsApiClient.get(
      isDevelopment ? '/everything' : '',
      {
        params: {
          ...params,
          language: 'en',
        },
      }
    )
    return data
  },
}
