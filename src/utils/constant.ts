export type LatLng = [number, number]
export type AreaCode = '00' | '01' | '05' | '07' | '08' | '09' | '10' | '0A' | '12'
export type AreaShortForm = 'taipei' | 'ntpc' | 'tycg' | 'hccg' | 'sipa' | 'miaoli' | 'i' | 'chiayi' | 'kcg'
type AreaMap = {
  [name in AreaShortForm]: { areaCode: AreaCode; name: string; position: LatLng }
}

export const areaConfig: AreaMap = Object.freeze({
  taipei: { position: [25.047924, 121.517081], areaCode: '00', name: '臺北市' },
  ntpc: { position: [25.021539, 121.456809], areaCode: '05', name: '新北市' },
  tycg: { position: [24.95367, 121.225783], areaCode: '07', name: '桃園市' },
  hccg: { position: [24.801815, 120.971459], areaCode: '09', name: '新竹市' },
  sipa: { position: [24.78183, 121.005074], areaCode: '10', name: '新竹科學園區' },
  miaoli: { position: [24.564859, 120.81855], areaCode: '0A', name: '苗栗市' },
  i: { position: [24.154712, 120.664265], areaCode: '01', name: '臺中市' },
  chiayi: { position: [23.479783, 120.43972], areaCode: '08', name: '嘉義市' },
  kcg: { position: [22.629849, 120.343714], areaCode: '12', name: '高雄市' },
})

export const zoomLevelConfig = Object.freeze({
  wholeTaiwan: 8,
  markerShow: 12,
  cityChange: 14,
  placeSearch: 16,
})

export const CENTER_OF_TAIWAN: LatLng = [23.88467, 120.990465]
