import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PRODUCTS } from '../data/products'
import '../styles/tienda.css'

const ROASTS = ['Claro', 'Medio', 'Oscuro']

export default function Tienda() {
  const [country, setCountry] = useState('')
  const [roast, setRoast] = useState('')

  const countries = [...new Set(PRODUCTS.map((p) => p.origin.split(' · ')[0]))]

  const filtered = PRODUCTS.filter(
    (p) => (!country || p.origin.startsWith(country)) && (!roast || p.roast === roast),
  )

  const pill =
    'px-4 py-1.5 text-[14px] bg-white text-[#33261D] rounded-full border border-[#DFD1C0] hover:border-[#B48B57] transition shadow-sm font-medium'

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#B48B57]/30">
      <Header variant="tienda" />

      <main className="flex-grow w-full max-w-[1240px] mx-auto px-6 pt-10 pb-20">
        <section className="mb-7">
          <h1 className="font-fraunces text-[42px] md:text-[46px] font-bold text-[#2B1810] tracking-tight">
            Nuestra selección global
          </h1>
        </section>

        {/* Filtros interactivos */}
        <section className="flex flex-wrap items-center gap-2.5 pb-8 border-b border-[#E5D7C6]/75 mb-10">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={pill + ' cursor-pointer pr-8'}
            aria-label="Filtrar por país de origen"
          >
            <option value="">País de origen</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {ROASTS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoast(roast === r ? '' : r)}
              className={
                pill +
                (roast === r
                  ? ' bg-[#B48B57] text-white border-[#B48B57]'
                  : ' hover:bg-white/80')
              }
            >
              {r}
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/producto/${p.id}`}
              className="product-card bg-white rounded-2xl p-6 relative flex flex-col justify-between border border-[#EBE1D4] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <div className="absolute top-5 left-5 z-10">
                <span
                  className={
                    'inline-block text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm ' +
                    (p.roast === 'Claro' ? 'bg-[#CDBCA6] text-[#2B1810]' : 'bg-[#BA8E59]')
                  }
                >
                  {p.badgeTueste}
                </span>
              </div>
              <div className="w-full flex justify-center items-center pt-2 pb-6 min-h-[280px]">
                <img
                  alt={`Café de Especialidad ${p.name} - ${p.origin}`}
                  className="h-64 object-contain filter drop-shadow-md"
                  loading="lazy"
                  src={p.imgTienda}
                />
              </div>
              <div className="pt-2 border-t border-gray-50 flex flex-col">
                <span className="text-[11px] tracking-wider uppercase font-semibold text-[#5A6E59] mb-1">
                  {p.originShort}
                </span>
                <h2 className="font-fraunces text-2xl font-bold text-[#2B1810] mb-1.5">{p.name}</h2>
                <p className="text-[14px] italic text-[#6B5A4E] mb-5">{p.notes}</p>
                <div className="text-[15px] text-[#4A3B32]">
                  Desde <span className="font-bold text-[#2B1810] text-lg">${p.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-[#716155] py-10">
              No hay cafés que coincidan con ese filtro.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
