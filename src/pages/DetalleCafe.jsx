import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProduct as findLocalProduct } from '../data/products'
import { useProduct } from '../hooks'
import { useCart } from '../context/CartContext'
import '../styles/detalle.css'

const GRINDS = [
  { name: 'Grano entero', hint: 'Recomendado para máxima frescura' },
  { name: 'Molido grueso', hint: 'Prensa francesa, cold brew' },
  { name: 'Molido medio', hint: 'Filtrado, Chemex, V60' },
  { name: 'Molido fino', hint: 'Espresso, cafetera italiana' },
  { name: 'Molido extra fino', hint: 'Turca, moka' },
]

export default function DetalleCafe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const { product: apiProduct } = useProduct(id)
  const product = apiProduct ?? findLocalProduct(id) ?? findLocalProduct('pacamara')

  const [qty, setQty] = useState(1)
  const [grind, setGrind] = useState(GRINDS[0].name)
  const total = product.price * qty

  function addToCart() {
    add(product, qty, grind)
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EBE1] text-[#30221F] antialiased selection:bg-[#B48A63] selection:text-white">
      <Header variant="detalle" />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Imagen del producto */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            <div className="w-full max-w-[480px] aspect-[4/5] rounded-[28px] overflow-hidden bg-[#ECE1D3]/50 flex items-center justify-center p-6 sm:p-10 relative">
              <img
                alt={`Café ${product.name} - Global Roast Coffee`}
                className="max-h-[500px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                src={product.imgDetalle}
              />
            </div>
          </div>

          {/* Información y compra */}
          <section className="lg:col-span-7 flex flex-col pt-1">
            <h1 className="font-fraunces text-4xl sm:text-5xl font-medium tracking-tight text-[#2B1B17] mb-2">
              {product.name}
            </h1>
            <p className="text-[13.5px] text-[#695F59] font-normal tracking-wide mb-4">
              {product.origin} · {product.altitude} · {product.variety}
            </p>

            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#B89476] text-white tracking-wide">
                {product.badgeTueste}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#CFD7C7] text-[#4F5943] tracking-wide">
                {product.process}
              </span>
            </div>

            <div className="w-full bg-[#FCFBF8] border border-[#E9DFD3] rounded-2xl px-5 py-3.5 mb-6 flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <span className="text-[#B48A63] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                  <line x1="6" x2="6" y1="2" y2="4" />
                  <line x1="10" x2="10" y1="2" y2="4" />
                  <line x1="14" x2="14" y1="2" y2="4" />
                </svg>
              </span>
              <p className="italic text-[15px] font-fraunces text-[#3F2B22]">{product.notes}</p>
            </div>

            <p className="text-[14.5px] leading-relaxed text-[#594E48] mb-8 max-w-xl">{product.description}</p>

            {/* Tamaño */}
            <div className="mb-7">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#352522] mb-3">Tamaño</label>
              <button className="w-36 py-3 px-4 bg-[#352522] text-white rounded-xl flex flex-col items-center justify-center shadow-sm" type="button">
                <span className="font-bold text-[15px] leading-tight">340g</span>
                <span className="text-xs text-white/80 font-normal leading-tight mt-0.5">
                  ${product.price.toFixed(2)}
                </span>
              </button>
            </div>

            {/* Molienda (selección interactiva) */}
            <div className="mb-7">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#352522] mb-3">Molienda</label>
              <div className="space-y-2.5 max-w-xl">
                {GRINDS.map((g) => {
                  const active = grind === g.name
                  return (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => setGrind(g.name)}
                      className={
                        'w-full text-left py-3 px-5 rounded-xl flex justify-between items-center transition-all ' +
                        (active
                          ? 'border-2 border-[#352522] bg-[#FFFFFF] shadow-sm'
                          : 'border border-[#E4D7C8] bg-white/70 hover:bg-white')
                      }
                    >
                      <span className={'font-medium text-[14.5px] ' + (active ? 'text-[#2B1B17]' : 'text-[#3E332E]')}>
                        {g.name}
                      </span>
                      <span className={'text-xs ' + (active ? 'text-[#7A706A]' : 'text-[#8A807A]')}>{g.hint}</span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-3">
                <span className="text-xs text-[#6F6660]">¿No sabes cuál elegir?</span>
                <a className="text-xs text-[#352522] underline underline-offset-2 ml-1 font-medium hover:text-black" href="#">
                  Guía de molienda
                </a>
              </div>
            </div>

            {/* Cantidad y total */}
            <div className="flex items-end justify-between max-w-xl mb-4">
              <div className="flex items-center bg-white border border-[#DDD0C2] rounded-full px-3 py-1.5 shadow-sm">
                <button
                  aria-label="Disminuir cantidad"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#554741] hover:text-black text-lg font-light leading-none transition-colors"
                  type="button"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-[#2F211D]">{qty}</span>
                <button
                  aria-label="Aumentar cantidad"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#554741] hover:text-black text-base font-light leading-none transition-colors"
                  type="button"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <span className="block text-[11px] text-[#7F746E] uppercase font-semibold tracking-wider">Total</span>
                <span className="font-fraunces text-3xl font-medium text-[#291A16] leading-none tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="max-w-xl mb-5">
              <button
                onClick={addToCart}
                className="w-full py-4 px-6 bg-[#352522] hover:bg-[#251917] active:scale-[0.99] text-white font-medium text-[15.5px] rounded-2xl shadow-sm transition-all duration-150"
                type="button"
              >
                Agregar al carrito
              </button>
            </div>

            <div className="max-w-xl">
              <Link className="inline-flex items-center text-xs text-[#6B615B] hover:text-black transition-colors font-medium" to="/tienda">
                <span className="mr-1.5">←</span> Volver a la tienda
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
