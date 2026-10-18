import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PRODUCTS } from '../data/products'
import '../styles/home.css'

const HERO_BG =
  'https://lh3.googleusercontent.com/aida/AEtjO1VsL3QKETelI0QqbRCnwR23VY42Uwrh10l047JGA3uDhFmLaxNRPlwZEbAV0fbPNHJDRRFuMKStFZIzhhRPDtEkkjYEcs_9tgVpbJ0qj-3olzKfb30RSnWrR_70CBc3fDsuoNu7LR_gS0wYrkBrjsIPDkCPUyHQb-B5NzTqpBhaKZqoJ3E6e_3lj1z9Su5jJ4eafvszy2-X4HTYwt0icd77p0fkz8bBBU1o7UIgdV9I'
const MASCOT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBOP-imyAzeoODDCYQPWMg_QeDHasw9oOclzPyYG15eiI_WxRxTI5tV10C_VALjAW-iy9FgFNHsD0oCbjjyMGB4JJhfp91SygGm25TRw8oWOOX49SHQ8RGMQOf-DXiuNvd3TRzkISfVhZXaVdzYWgv8GgTH3Qq7oLR4UxDT8kZdrpzTVgXqx8BVwvQ0PsTS6MiZon6WbsAdzgH69cNO4JO63ovAeynEWve2z7ZAD_NfJUEhrDNoE5VruA'

const STEPS = [
  {
    n: '01',
    title: 'Seleccionamos',
    text: 'Visitamos fincas de distintos orígenes',
    icon: (
      <>
        <path d="M7 20h10" />
        <path d="M10 20c0-4 1.5-7.5 4-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5-.4-4.8-1.5-1.2-1-1.6-2.5-1.5-4.1 1.7.1 3 1 4 1.9Z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.6 1-1 1.4-2.4 1.2-3.8-1.5.1-3 .6-4.4 1.4Z" />
      </>
    ),
  },
  {
    n: '02',
    title: 'Tostamos',
    text: 'Perfil de tueste específico para cada grano',
    icon: (
      <>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-.61-.22-1.17-.58-1.6L12 11.5l-.92 1.4c-.36.43-.58.99-.58 1.6Z" />
        <path d="M12 2c1 3 4 5.5 4 10a6 6 0 1 1-12 0c0-4.5 3-7 4-10 1 2 2 3 4 0Z" />
      </>
    ),
  },
  {
    n: '03',
    title: 'Enviamos',
    text: 'Fresco, en pocos días, directo a tu casa',
    icon: (
      <>
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </>
    ),
  },
]

export default function Home() {
  return (
    <div className="bg-cream-bg text-coffee-text selection:bg-caramel selection:text-white">
      <Header variant="default" />

      {/* HeroSection */}
      <section className="relative hero-wood-bg wood-grain-overlay min-h-[640px] lg:min-h-[760px] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src={HERO_BG} alt="Fondo de café en grano y molido" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-7 z-10">
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-[4.25rem] font-bold text-[#F8F3ED] leading-[1.1] tracking-tight">
              Café del mundo,
              <br />
              tostado para vos
            </h1>
            <p className="text-base sm:text-lg text-[#D6C5B8] max-w-xl font-normal leading-relaxed">
              Granos seleccionados de las mejores regiones cafetaleras — tostados frescos, enviados directo a tu puerta
            </p>
            <div className="pt-3">
              <Link
                to="/tienda"
                className="inline-flex items-center gap-3 bg-caramel hover:bg-caramel-hover text-coffee-dark font-medium text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Explora nuestros cafés</span>
                <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative z-10">
            <img
              src={MASCOT}
              alt="Mascota Global Roast Coffee"
              className="relative z-10 w-64 sm:w-80 lg:w-96 h-auto drop-shadow-2xl object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* FeaturedProductsSection */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-olive-green block mb-2">
            Bitácora de orígenes
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl text-coffee-dark font-bold tracking-tight">
            Nuestros cafés destacados
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
          {PRODUCTS.map((p) => (
            <Link
              key={p.id}
              to={`/producto/${p.id}`}
              className="bg-cream-light rounded-[32px] p-8 flex flex-col justify-between border border-[#EADBCC] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-full flex justify-center py-6">
                <img src={p.imgHome} alt={`Café ${p.name}`} className="h-64 mx-auto object-contain drop-shadow-md" />
              </div>
              <div className="mt-4 space-y-2">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#826E63] block">
                  {p.originShort}
                </span>
                <h3 className="font-fraunces text-2xl font-bold text-coffee-dark">{p.name}</h3>
                <p className="text-sm italic text-[#635147] font-serif">{p.notes}</p>
                <div className="pt-3">
                  <span className="text-sm text-[#7D6B60]">Desde </span>
                  <span className="text-base font-bold text-coffee-dark font-fraunces">${p.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ProcessStepsSection */}
      <section className="py-16 lg:py-24 max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-coffee-dark mb-16">
          De la finca a tu taza
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {STEPS.map((s) => (
            <div key={s.n} className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-badge-mint flex items-center justify-center text-olive-green mb-2">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                  {s.icon}
                </svg>
              </div>
              <span className="text-xs font-serif text-caramel tracking-wider">{s.n}</span>
              <h3 className="font-fraunces text-2xl font-bold text-coffee-dark">{s.title}</h3>
              <p className="text-sm text-[#6C5B52] max-w-xs leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CallToActionCard */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="bg-coffee-banner rounded-[36px] py-16 px-8 sm:py-20 sm:px-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#FDF9F4] tracking-tight">
              Orígenes, una sola taza
            </h2>
            <div>
              <Link
                to="/tienda"
                className="inline-flex items-center gap-3 bg-caramel hover:bg-caramel-hover text-coffee-dark font-medium text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Ver toda la tienda</span>
                <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
