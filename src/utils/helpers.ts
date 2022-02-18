export function isObject(val): boolean {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

export function queryParamsBuilder(val: {}): string {
  if (!isObject(val)) return ''

  return '?' + new URLSearchParams(val).toString()
}
