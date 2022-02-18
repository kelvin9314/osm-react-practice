export const searchStationByName = (stations = [], queryString = '') => {
  queryString = queryString.trim()
  console.log(queryString)
  if (stations?.length <= 0 || !queryString) return null

  return stations.find(station => new RegExp(queryString, 'i').test(station.name_tw))
}

export const getStationMarkerIcon = stationObj => {
  return stationObj.type === 1
    ? 'https://img.icons8.com/doodle/30/000000/marker--v1.png'
    : 'https://img.icons8.com/office/30/000000/marker.png'
}

export const filterIncorrectStation = arr => {
  if (!arr || !arr?.length) return []

  arr.filter(station => {
    if (typeof station?.lat !== 'string' || typeof station?.lng !== 'string') return false

    return true
  })

  return arr
}
