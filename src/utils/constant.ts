import * as R from 'ramda'

export type LatLng = { lat: number; lng: number }
export type AreaCode = '00' | '01' | '05' | '07' | '0B' | '08' | '09' | '10' | '0A' | '12'
export type AreaShortForm = 'taipei' | 'ntpc' | 'tycg' | 'hsinchu' | 'hccg' | 'sipa' | 'miaoli' | 'i' | 'chiayi' | 'kcg'
export interface AreaConfigValue {
  areaCode: AreaCode
  name: string
  position: LatLng
}

type AreaMap = {
  [name in AreaShortForm]: AreaConfigValue
}

export const AREA_MAP: AreaMap = Object.freeze({
  taipei: { position: { lat: 25.047924, lng: 121.517081 }, areaCode: '00', name: '臺北市' },
  ntpc: { position: { lat: 25.021539, lng: 121.456809 }, areaCode: '05', name: '新北市' },
  tycg: { position: { lat: 24.95367, lng: 121.225783 }, areaCode: '07', name: '桃園市' },
  hsinchu: { areaCode: '0B', name: '新竹縣', position: { lat: 24.827252718355133, lng: 121.0133551467252 } },
  hccg: { position: { lat: 24.801815, lng: 120.971459 }, areaCode: '09', name: '新竹市' },
  sipa: { position: { lat: 24.78183, lng: 121.005074 }, areaCode: '10', name: '新竹科學園區' },
  miaoli: { position: { lat: 24.564859, lng: 120.81855 }, areaCode: '0A', name: '苗栗縣' },
  i: { position: { lat: 24.154712, lng: 120.664265 }, areaCode: '01', name: '臺中市' },
  chiayi: { position: { lat: 23.479783, lng: 120.43972 }, areaCode: '08', name: '嘉義市' },
  kcg: { position: { lat: 22.629849, lng: 120.343714 }, areaCode: '12', name: '高雄市' },
})

type AreaMapById = {
  [name: string]: {
    name: string
    shortForm: AreaShortForm
  }
}

export const AREA_NAME_BY_ID = R.mergeAll(
  Object.keys(AREA_MAP).map(key => {
    const keyName = key as AreaShortForm
    const obj: AreaMapById = {}

    const id = AREA_MAP[keyName].areaCode.toString()

    obj[id] = {
      name: AREA_MAP[keyName].name,
      shortForm: keyName,
    }
    return obj
  })
)

// export const zoomLevelConfig = Object.freeze({
//   wholeTaiwan: 8,
//   markerShow: 12,
//   cityChange: 14,
//   placeSearch: 16,
// })

export const CENTER_OF_TAIWAN: LatLng = { lat: 23.88467, lng: 120.990465 }
