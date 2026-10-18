import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import '../styles/checkout.css'

const DEPARTMENTS = [
  { value: '', label: 'Elegí uno' },
  { value: 'san-salvador', label: 'San Salvador' },
  { value: 'la-libertad', label: 'La Libertad' },
  { value: 'santa-ana', label: 'Santa Ana' },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, setQty, remove } = useCart()
  const [payment, setPayment] = useState('transfer')
  const [accepted, setAccepted] = useState(false)

  const SHIPPING = 3.5
  const total = subtotal + SHIPPING

  function confirmOrder(e) {
    e.preventDefault()
    if (!accepted) return
    navigate('/confirmacion')
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#34231E] selection:text-[#F5ECE1]">
      <Header variant="checkout" />

      <main className="flex-grow max-w-[1180px] w-full mx-auto px-6 md:px-12 pt-8 pb-16">
        <h1 className="font-fraunces text-[2.75rem] text-[#2B1B17] font-normal mb-8 tracking-tight">Checkout</h1>

        <form onSubmit={confirmOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Columna izquierda: formulario */}
          <div className="lg:col-span-7 space-y-9">
            <section>
              <h2 className="font-fraunces text-[1.45rem] text-[#2D1B15] mb-4 font-normal">Datos de contacto</h2>
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[0.82rem] font-medium text-[#463832] mb-1" htmlFor="fullname">
                    Nombre completo
                  </label>
                  <input className="custom-input" id="fullname" type="text" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[0.82rem] font-medium text-[#463832] mb-1" htmlFor="phone">
                      Teléfono (WhatsApp)
                    </label>
                    <input className="custom-input text-[#34231E]" id="phone" placeholder="+503 7123-4567" type="tel" />
                  </div>
                  <div>
                    <label className="block text-[0.82rem] font-medium text-[#463832] mb-1" htmlFor="email">
                      Email
                    </label>
                    <input className="custom-input" id="email" type="email" />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-[1.45rem] text-[#2D1B15] mb-4 font-normal">Dirección de entrega</h2>
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[0.82rem] font-medium text-[#463832] mb-1" htmlFor="departamento">
                      Departamento
                    </label>
                    <div className="relative">
                      <select className="custom-input appearance-none pr-8 cursor-pointer" id="departamento" defaultValue="">
                        {DEPARTMENTS.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D7068]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.82rem] font-medium text-[#463832] mb-1" htmlFor="municipio">
                      Municipio
                    </label>
                    <input className="custom-input" id="municipio" type="text" />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.82rem] font-medium text-[#463832] mb-1" htmlFor="direccion">
                    Dirección exacta
                  </label>
                  <input className="custom-input" id="direccion" placeholder="Colonia, calle, número de casa" type="text" />
                </div>
                <div>
                  <label className="block text-[0.82rem] font-medium text-[#463832] mb-1" htmlFor="referencia">
                    Referencia
                  </label>
                  <input className="custom-input" id="referencia" placeholder="Ej. portón negro, frente al parque" type="text" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-[1.45rem] text-[#2D1B15] mb-4 font-normal">Método de pago</h2>
              <div className="space-y-2.5">
                <label className="custom-radio-card flex items-start gap-3.5 p-3.5 cursor-pointer">
                  <input
                    className="mt-1 text-[#34231E] focus:ring-0 border-[#C2B7A8] w-4 h-4"
                    name="payment_method"
                    type="radio"
                    value="transfer"
                    checked={payment === 'transfer'}
                    onChange={() => setPayment('transfer')}
                  />
                  <div>
                    <span className="block text-[0.86rem] font-medium text-[#2E1F1A] leading-tight">Transferencia bancaria</span>
                    <span className="block text-[0.8rem] text-[#7A6E65] mt-0.5">Te enviamos los datos de la cuenta por WhatsApp.</span>
                  </div>
                </label>
                <label className="custom-radio-card flex items-start gap-3.5 p-3.5 cursor-pointer">
                  <input
                    className="mt-1 text-[#34231E] focus:ring-0 border-[#C2B7A8] w-4 h-4"
                    name="payment_method"
                    type="radio"
                    value="cash"
                    checked={payment === 'cash'}
                    onChange={() => setPayment('cash')}
                  />
                  <div>
                    <span className="block text-[0.86rem] font-medium text-[#2E1F1A] leading-tight">Pago contra entrega (efectivo)</span>
                    <span className="block text-[0.8rem] text-[#7A6E65] mt-0.5">Pagás al recibir tu café.</span>
                  </div>
                </label>
              </div>
            </section>

            <section>
              <h2 className="font-fraunces text-[1.45rem] text-[#2D1B15] mb-4 font-normal">
                Notas adicionales <span className="font-sans text-[0.95rem] text-[#695D56] font-normal">(opcional)</span>
              </h2>
              <textarea className="custom-input resize-y" id="notas" placeholder="Horario preferido de entrega, instrucciones..." rows="3" />
            </section>
          </div>

          {/* Columna derecha: resumen del pedido */}
          <aside className="lg:col-span-5">
            <div className="bg-white rounded-[1.25rem] p-6 sm:p-7 border border-[#E9E0D4] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <h2 className="font-fraunces text-[1.45rem] text-[#2B1B17] font-normal mb-5">Resumen del pedido</h2>

              {items.length === 0 && (
                <p className="text-[0.86rem] text-[#7A6E65] py-4">
                  Tu carrito está vacío.{' '}
                  <a className="underline underline-offset-2 text-[#34231E]" href="/tienda">
                    Ir a la tienda
                  </a>
                </p>
              )}

              {items.map((item) => (
                <div key={item.id + item.grind} className="flex items-start gap-3.5 pb-5 border-b border-[#EFEAE2]">
                  <div className="w-12 h-14 bg-[#F2ECE3] rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                    <img alt={`Café ${item.name}`} className="h-full w-auto object-contain" src={item.img} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-fraunces font-bold text-[0.92rem] text-[#2B1B17]">{item.name}</h3>
                        <p className="text-[0.74rem] text-[#7A6E65]">340g · {item.grind}</p>
                      </div>
                      <button
                        aria-label="Eliminar producto"
                        onClick={() => remove(item.id, item.grind)}
                        className="text-[#857B74] hover:text-[#2B1B17] transition-colors p-0.5"
                        type="button"
                      >
                        <svg className="w-4 h-4 stroke-[1.6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="inline-flex items-center border border-[#DFD6CB] rounded-full px-2 py-0.5 bg-white text-xs">
                        <button
                          className="w-4 h-4 flex items-center justify-center text-[#6A5E57] hover:text-black"
                          type="button"
                          onClick={() => setQty(item.id, item.grind, item.qty - 1)}
                        >
                          <span className="sr-only">Disminuir</span>-
                        </button>
                        <span className="px-2 font-medium text-[0.8rem] text-[#2B1B17]">{item.qty}</span>
                        <button
                          className="w-4 h-4 flex items-center justify-center text-[#6A5E57] hover:text-black"
                          type="button"
                          onClick={() => setQty(item.id, item.grind, item.qty + 1)}
                        >
                          <span className="sr-only">Aumentar</span>+
                        </button>
                      </div>
                      <span className="text-[0.88rem] font-medium text-[#2B1B17]">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="py-4 space-y-2 text-[0.86rem] text-[#4A3D36]">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-[#2B1B17]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Envío</span>
                  <span className="text-[#2B1B17]">${SHIPPING.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 pb-5 flex justify-between items-baseline border-b border-[#EFEAE2]">
                <span className="font-fraunces text-base text-[#2B1B17]">Total</span>
                <span className="font-fraunces font-bold text-lg text-[#2B1B17]">${total.toFixed(2)}</span>
              </div>

              <div className="mt-4 flex items-start gap-2.5">
                <input
                  className="rounded-full w-4 h-4 mt-0.5 border-[#C4B9AD] text-[#34231E] focus:ring-0 cursor-pointer"
                  id="terms"
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <label className="text-[0.74rem] text-[#695D56] leading-snug cursor-pointer select-none" htmlFor="terms">
                  He leído y acepto los Términos y Condiciones, la Política de Privacidad y la Política de Envíos
                </label>
              </div>

              <div className="mt-5">
                <button
                  className={
                    'w-full font-medium py-3 px-4 rounded-[0.75rem] text-[0.92rem] transition-colors shadow-sm ' +
                    (accepted
                      ? 'bg-[#968A82] hover:bg-[#857971] text-white'
                      : 'bg-[#C9C1BA] text-white cursor-not-allowed')
                  }
                  type="submit"
                  disabled={!accepted}
                >
                  Confirmar pedido
                </button>
              </div>
            </div>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  )
}
