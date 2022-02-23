import type { LatLng, AreaShortForm } from '@/utils/constant'
import L from 'leaflet'

import { AREA_MAP, CENTER_OF_TAIWAN } from '@/utils/constant'

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

export function getTooltipDirection(shortForm: AreaShortForm): L.Direction {
  if (!shortForm) return 'auto'

  const hashMap: {
    [name in AreaShortForm]: L.Direction
  } = {
    taipei: 'right',
    ntpc: 'top',
    tycg: 'top',
    hccg: 'left',
    sipa: 'right',
    miaoli: 'left',
    i: 'right',
    chiayi: 'left',
    kcg: 'top',
  }

  return hashMap[shortForm] || 'auto'
}

export function calculateTooltipOffset(areaObj): L.PointExpression {
  // console.log(area)

  const offsetSolution: {
    goTop: L.PointExpression
    goRightTop: L.PointExpression
    goRight: L.PointExpression
    goRightBottom: L.PointExpression
    goBottom: L.PointExpression
    goLeftBottom: L.PointExpression
    goLeft: L.PointExpression
    goLeftTop: L.PointExpression
  } = {
    goTop: [0, -10],
    goRightTop: [10, -10],
    goRight: [10, 0],
    goRightBottom: [10, 10],
    goBottom: [0, 10],
    goLeftBottom: [-10, 10],
    goLeft: [-10, 0],
    goLeftTop: [-10, -10],
  }

  if (areaObj.areaCode === AREA_MAP.taipei.areaCode) return offsetSolution.goBottom
  if (areaObj.areaCode === AREA_MAP.ntpc.areaCode) return offsetSolution.goTop

  if (areaObj.areaCode === AREA_MAP.tycg.areaCode) return [-30, 0]

  if (areaObj.areaCode === AREA_MAP.hccg.areaCode) return [20, 0]
  if (areaObj.areaCode === AREA_MAP.sipa.areaCode) return offsetSolution.goRightBottom

  if (areaObj.areaCode === AREA_MAP.miaoli.areaCode) return offsetSolution.goLeftBottom
  // if (areaObj.areaCode === AREA_MAP.i.areaCode) return offsetSolution.goLeft
  if (areaObj.areaCode === AREA_MAP.chiayi.areaCode) return offsetSolution.goLeft

  // if (areaObj.areaCode === AREA_MAP.kcg.areaCode) return offsetSolution.goLeft

  return [0, 0]
}
