import { useQuery } from '@tanstack/react-query'
import { sanityApi } from '@/api/sanityClient.ts'

export const useCMSConfig = () => {
  return useQuery({
    queryKey: ['cms-config'],
    queryFn: () => sanityApi.getConfig(),
    staleTime: 1000 * 60 * 10, // 10 min
  })
}
