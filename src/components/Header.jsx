import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logo from '../assets/Logo.jpeg'

const LOGO = logo

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/nuestro-cafe', label: 'Nuestro Café' },
  { to: '/nuevo-cafe', label: '+ Agregar Café' },
  { to: '/contacto', label: 'Contacto' },
]

// Encabezado compartido entre las pantallas (Home, Tienda, Detalle, Checkout, Confirmación).
// Se adapta sutilmente según la variante para respetar el diseño original de Stitch.
export default function Header({ variant = 'default', showBadge = false }) {
  const { count } = useCart()
  const { pathname } = useLocation()
  const badge = showBadge ? count : 0

  const wrappers = {
    default: 'w-full bg-cream-bg/95 backdrop-blur-sm sticky top-0 z-50 border-b border-[#E7DCCE]/60',
    tienda: 'w-full border-b border-[#E8DACB]/60 bg-[#F4EBE1]/90 backdrop-blur-sm sticky top-0 z-50',
    detalle: 'w-full border-b border-[#E7DCCE]/60 bg-[#F4EBE1]/90 sticky top-0 z-50 backdrop-blur-sm',
    checkout: 'w-full pt-4 pb-4 px-6 md:px-12 border-b border-[#EADFCF]/60',
    confirmacion: 'w-full border-b border-[#EADCCB] px-6 lg:px-12 py-3 bg-[#F4ECE1]',
  }
  const inner = {
    default: 'max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between',
    tienda: 'max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between',
    detalle: 'max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between',
    checkout: 'max-w-[1180px] mx-auto flex items-center justify-between',
    confirmacion: 'max-w-7xl mx-auto flex items-center justify-between',
  }

  return (
    <header className={wrappers[variant]}>
      <div className={inner[variant]}>
        <Link className="flex items-center gap-3 group" to="/" aria-label="Global Roast Coffee - Inicio">
          <img
            src={LOGO}
            alt="Global Roast Coffee"
            className="h-12 w-12 rounded-full object-cover ring-1 ring-coffee-dark/10 transition-transform group-hover:scale-105"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-fraunces text-lg font-bold text-coffee-dark">Global Roast</span>
            <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-olive-green uppercase">Coffee</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-[15px] font-medium text-coffee-dark">
          {LINKS.map((l) => {
            const active = pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                className={
                  active
                    ? 'text-coffee-dark font-semibold border-b-2 border-coffee-dark pb-0.5'
                    : 'text-[#5C4A3E] hover:text-coffee-dark transition-colors'
                }
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center">
          <Link
            to="/checkout"
            aria-label="Ver carrito"
            className="relative p-2 text-coffee-dark hover:text-caramel transition-colors rounded-full hover:bg-black/5"
          >
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {badge > 0 && (
              <span className="absolute -top-1 -right-1 bg-caramel text-white text-[0.65rem] font-bold w-4.5 h-4.5 min-w-[18px] rounded-full flex items-center justify-center leading-none">
                {badge}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
