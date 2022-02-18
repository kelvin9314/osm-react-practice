export interface StationDetail {
  _id: string
  country_code: string
  area_code: string
  type: number
  status: number
  station_no: string
  name_cn: string
  name_en: string
  name_tw: string
  district_cn: string
  district_en: string
  district_tw: string
  address_cn: string
  address_en: string
  address_tw: string
  parking_spaces: number
  available_spaces: number
  available_spaces_detail: { yb1: number; yb2: number; eyb: number }
  empty_spaces: number
  forbidden_spaces: number
  img: string
  lat: string
  lng: string
  time: string
  updated_at: string
}
