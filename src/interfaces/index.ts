interface ResponseStructure {
  retCode: boolean
  retMsg: string
  errCode?: string
  // retVal: []
}

// NOTE: api/front/station/count
export interface StationCountResponse extends ResponseStructure {
  retVal: StationCount[]
}

export interface StationCount {
  area_code: string
  yb1: number
  yb2: number
  total: number
}

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

// NOTE: json/area-all.json
export interface FrontAreaDetail {
  country_code: string
  area_code: string
  country_name_tw: string
  country_name_en: string
  country_name_cn: string
  area_name_tw: string
  area_name_en: string
  area_name_cn: string
  area_english: string
  bike_code: string
  bike_type: AreaBikeType[] | string[]
  domain: string
  ride_count: number
  ride_count2: number
  member_card_count: number
  visit_count: number
  is_open: 1 | 0
  is_bind: 1 | 0
  register_card: AreaRegisterCard[] | []
  service_phone: AreaContactPhone
  service_phone_2: AreaContactPhone
  contact_phone: {}
  contact_mail: string
  ad_phone: string
  ad_mail: string
  lat: string
  lng: string
  lat2: string
  lng2: string
  station_start: string
  station_end: string
  sort: number
  created_at: string
  updated_at: string
}

// NOTE: api/front/bike/lists
export interface StationYb2BikeListResponse extends ResponseStructure {
  retVal: Yb2eBikeInfo[] | []
}

export interface Yb2eBikeInfo {
  station_no: string
  bike_no: string
  pillar_no: string
  battery_power: number
  modify_time: number
}

export type AreaBikeType = '1' | '2' | '3'

interface AreaRegisterCard {
  name_tw: string
  name_en: string
  name_cn: string
  card_type: number
  img: string
  show: string[]
}

interface AreaContactPhone {
  tw: string
  cn: string
  en: string
}
