// Cliente HTTP para la API de FastAPI.
// En dev, Vite proxyea /api hacia http://127.0.0.1:8000 (ver vite.config.js);
// en producción, FastAPI sirve el build y la API vive en el mismo origen.

const BASE_URL = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.detail ?? `Error ${res.status}`)
  }
  return res.json()
}

export function getProducts() {
  return request('/products')
}

export function getProduct(id) {
  return request(`/products/${encodeURIComponent(id)}`)
}

export function createOrder(order) {
  return request('/orders', { method: 'POST', body: JSON.stringify(order) })
}

export function getOrder(id) {
  return request(`/orders/${encodeURIComponent(id)}`)
}
