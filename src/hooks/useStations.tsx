import React from 'react'
// import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import apiFetcher from '@/utils/api-client'

const options = {
  // refreshInterval: 1000 * 60,
  // revalidateOnFocus: false,
}

const useStations = () => {
  const {
    data: stationYb1,
    error: errorYb1,
    isValidating: isValidatingYb1,
  } = useSWRImmutable('/json/station-yb1.json', apiFetcher)

  const {
    data: stationYb2,
    error: errorYb2,
    isValidating: isValidatingYb2,
  } = useSWRImmutable(`/json/station-yb2.json`, apiFetcher)

  const data = {
    yb1: stationYb1,
    yb2: stationYb2,
  }

  return {
    data,
    isLoading: isValidatingYb1 || isValidatingYb2,
    isError: errorYb1 | errorYb2,
  }
}

export default useStations
