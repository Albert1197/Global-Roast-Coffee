import { useEffect, useState } from 'react'
import { getProduct, getProducts } from './api'
import { PRODUCTS, getProduct as findLocalProduct } from './data/products'

// Hooks que hidratan las pantallas desde la API de FastAPI.
// Si el backend no está disponible, caen al catálogo local (src/data/products.js)
// para que la interfaz siga siendo navegable.

export function useProducts() {
  const [products, setProducts] = useState(PRODUCTS)

  useEffect(() => {
    let alive = true
    getProducts()
      .then((data) => {
        if (alive && data.length > 0) setProducts(data)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return products
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    getProduct(id)
      .then((data) => {
        if (alive) setProduct(data)
      })
      .catch(() => {
        if (alive) setProduct(findLocalProduct(id) ?? null)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [id])

  return { product, loading }
}
