import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

// Estado global mínimo del carrito para conectar las pantallas entre sí:
// Detalle agrega productos y Checkout/Confirmación los muestran.
export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const api = useMemo(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.price * i.qty, 0),
      add(product, qty = 1, grind = 'Grano entero') {
        setItems((prev) => {
          const found = prev.find((i) => i.id === product.id && i.grind === grind)
          if (found) {
            return prev.map((i) =>
              i.id === product.id && i.grind === grind ? { ...i, qty: i.qty + qty } : i,
            )
          }
          return [
            ...prev,
            { id: product.id, name: product.name, price: product.price, img: product.imgThumb, qty, grind },
          ]
        })
      },
      setQty(id, grind, qty) {
        setItems((prev) =>
          prev
            .map((i) => (i.id === id && i.grind === grind ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        )
      },
      remove(id, grind) {
        setItems((prev) => prev.filter((i) => !(i.id === id && i.grind === grind)))
      },
      clear() {
        setItems([])
      },
    }),
    [items],
  )

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
