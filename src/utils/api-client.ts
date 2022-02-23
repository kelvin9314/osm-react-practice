import { isObject, queryParamsBuilder } from '@/utils/helpers'

type Headers = {
  Authorization?: string
  'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded'
  'Access-Control-Allow-Headers'?: string
}
type Config = {
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  headers?: Headers
  body?: string
  cache?: 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached'
  credentials?: 'include' | 'same-origin' | 'omit'
  mode?: 'no-cors' | 'cors' | 'same-origin'
  redirect?: 'manual' | 'follow' | 'error'
  referrer?: 'no-referrer' | 'client'
}

export default async function apiClient<T>(
  endpoint: string,
  body?: {} | string | null,
  customConfig?: Config
): Promise<T> {
  const apiDomain = process.env.REACT_APP_API_URL || 'https://apis.youbike.com.tw'
  let url = `${apiDomain}${endpoint}`

  const headers: Headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  let config: Config = {
    method: body ? 'POST' : 'GET',
    headers: {
      ...headers,
    },
  }

  // json
  if (body && typeof body === 'object' && Object.keys(body).length > 0) {
    config.body = JSON.stringify(body)
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    }
  }

  // query params
  if (body && typeof body === 'string') {
    config.method = 'GET'
    url = `${apiDomain}${endpoint}${body}`
  }

  config = {
    mode: 'cors',
    ...config,
    ...customConfig,
  }

  const response = await fetch(url, config)
  const jsonResponse = await response.json()

  if (!response.ok) {
    // throw new Error(jsonResponse.retMsg)
    processErrorInterceptors(response)
  }

  return jsonResponse
}

// TODO： Error interceptor ???
function processErrorInterceptors(response) {
  console.log('processErrorInterceptors')
  console.log(response)
}
