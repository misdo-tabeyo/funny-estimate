export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""

// PVを測定する
export const pageview = (url: string): void => {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('config', GA_ID, { page_path: url })
};

const normalizeParam = (value: string, maxLen = 100): string => {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen)
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>): void => {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', eventName as any, (params ?? {}) as any)
}

export const trackCarSearch = (input: { maker: string; carName: string }): void => {
  const maker = normalizeParam(input.maker)
  const carName = normalizeParam(input.carName)
  if (!maker || !carName) return

  // GA4 recommended: 'search' + search_term
  // Custom params (maker, car_model) can be registered as Custom dimensions in GA4.
  trackEvent('search', {
    search_term: `${maker} ${carName}`,
    maker,
    car_model: carName,
    content_type: 'car',
  })
}
