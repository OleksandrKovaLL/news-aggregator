import { createClient } from '@sanity/client'
import type { AllowedSource, Topic, CMSConfig } from '@/types'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true,
})

export const sanityApi = {
  getAllowedSources: async (): Promise<AllowedSource[]> => {
    const query = `*[_type == "allowedSource" && isActive == true]{
      _id,
      sourceId,
      displayName,
      isActive
    }`
    return await sanityClient.fetch(query)
  },

  getTopics: async (): Promise<Topic[]> => {
    const query = `*[_type == "topic"]{
      _id,
      name,
      keywords,
      color
    }`
    return await sanityClient.fetch(query)
  },

  getConfig: async (): Promise<CMSConfig> => {
    const [allowedSources, topics] = await Promise.all([
      sanityApi.getAllowedSources(),
      sanityApi.getTopics(),
    ])
    return { allowedSources, topics }
  },
}