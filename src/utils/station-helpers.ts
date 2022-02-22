import type { LatLng, AreaShortForm, AreaConfigValue } from '@/utils/constant'
import L from 'leaflet'

import { areaConfig, CENTER_OF_TAIWAN } from '@/utils/constant'

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

export function getTooltipDirection(areaKey): L.Direction {
  if (!areaKey) return 'auto'

  const hashMap: {
    [name in AreaShortForm]: L.Direction
  } = {
    taipei: 'right',
    ntpc: 'top',
    tycg: 'left',
    hccg: 'left',
    sipa: 'right',
    miaoli: 'left',
    i: 'left',
    chiayi: 'left',
    kcg: 'left',
  }

  return hashMap[areaKey] || 'auto'
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
    goTop: [0, -30],
    goRightTop: [30, -30],
    goRight: [30, 0],
    goRightBottom: [30, 30],
    goBottom: [0, 30],
    goLeftBottom: [-30, 0],
    goLeft: [-30, 0],
    goLeftTop: [-30, -30],
  }

  if (areaObj.areaCode === areaConfig.taipei.areaCode) return offsetSolution.goRight
  if (areaObj.areaCode === areaConfig.ntpc.areaCode) return offsetSolution.goTop

  if (areaObj.areaCode === areaConfig.tycg.areaCode) return offsetSolution.goLeftTop

  if (areaObj.areaCode === areaConfig.hccg.areaCode) return offsetSolution.goLeft
  if (areaObj.areaCode === areaConfig.sipa.areaCode) return offsetSolution.goRightBottom

  if (areaObj.areaCode === areaConfig.miaoli.areaCode) return offsetSolution.goLeft
  if (areaObj.areaCode === areaConfig.i.areaCode) return offsetSolution.goLeft
  if (areaObj.areaCode === areaConfig.chiayi.areaCode) return offsetSolution.goLeft

  if (areaObj.areaCode === areaConfig.kcg.areaCode) return offsetSolution.goLeft

  return [0, 0]
}
