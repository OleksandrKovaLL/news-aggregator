import * as React from 'react'
import { memo, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCMSConfig } from '@/hooks/useCMSConfig'
import type { NewsFilters as Filters } from '@/types'

interface NewsFiltersProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

export const NewsFilters = memo(function NewsFilters({
  filters,
  onFilterChange,
}: NewsFiltersProps) {
  const { data: config, isLoading } = useCMSConfig()

  const handleKeywordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ ...filters, keyword: e.target.value })
    },
    [filters, onFilterChange]
  )

  const handleSourceChange = useCallback(
    (value: string) => {
      onFilterChange({
        ...filters,
        source: value === 'all' ? undefined : value,
      })
    },
    [filters, onFilterChange]
  )

  const handleSortChange = useCallback(
    (value: 'desc' | 'asc') => {
      onFilterChange({ ...filters, sortOrder: value })
    },
    [filters, onFilterChange]
  )

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 p-3 sm:p-4 bg-card sticky top-0 sm:top-5">
      <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-[200px]">
        <Label
          htmlFor="keyword"
          className="text-sm"
        >
          Search by keyword
        </Label>
        <Input
          id="keyword"
          placeholder="Search in titles..."
          value={filters.keyword || ''}
          onChange={handleKeywordChange}
          className="h-9 sm:h-10"
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-[150px] sm:min-w-[180px]">
        <Label
          htmlFor="source"
          className="text-sm"
        >
          Filter by source
        </Label>
        <Select
          value={filters.source || 'all'}
          onValueChange={handleSourceChange}
        >
          <SelectTrigger
            id="source"
            className="h-9 sm:h-10"
          >
            <SelectValue placeholder="All sources" />
          </SelectTrigger>
          <SelectContent className="bg-blue-200">
            <SelectItem
              className="cursor-pointer hover:bg-blue-300"
              value="all"
            >
              All sources
            </SelectItem>
            {!isLoading &&
              config?.allowedSources.map((source) => (
                <SelectItem
                  className="cursor-pointer hover:bg-blue-300"
                  key={source._id}
                  value={source.sourceId}
                >
                  {source.displayName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-[130px] sm:min-w-[150px]">
        <Label
          htmlFor="sort"
          className="text-sm"
        >
          Sort by date
        </Label>
        <Select
          value={filters.sortOrder}
          onValueChange={handleSortChange}
        >
          <SelectTrigger
            id="sort"
            className="h-9 sm:h-10"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-blue-200">
            <SelectItem
              className="cursor-pointer hover:bg-blue-300"
              value="desc"
            >
              Newest first
            </SelectItem>
            <SelectItem
              className="cursor-pointer hover:bg-blue-300"
              value="asc"
            >
              Oldest first
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
})
