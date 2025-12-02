// Utility functions to encode/decode share parameters

interface ShareFilters {
  gameId?: string
  status?: string
  search?: string
}

export function encodeShareFilters(filters: ShareFilters): string {
  const data = JSON.stringify(filters)
  // Base64 encode and make URL safe
  return btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeShareFilters(encoded: string): ShareFilters {
  try {
    // Restore base64 padding and decode
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4) {
      base64 += '='
    }
    const data = atob(base64)
    return JSON.parse(data)
  } catch {
    return {}
  }
}
