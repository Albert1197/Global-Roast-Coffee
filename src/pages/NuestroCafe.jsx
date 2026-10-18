import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/home.css'

const FINCA_IMG =
  'https://lh3.googleusercontent.com/aida/AEtjO1VsL3QKETelI0QqbRCnwR23VY42Uwrh10l047JGA3uDhFmLaxNRPlwZEbAV0fbPNHJDRRFuMKStFZIzhhRPDtEkkjYEcs_9tgVpbJ0qj-3olzKfb30RSnWrR_70CBc3fDsuoNu7LR_gS0wYrkBrjsIPDkCPUyHQb-B5NzTqpBhaKZqoJ3E6e_3lj1z9Su5jJ4eafvszy2-X4HTYwt0icd77p0fkz8bBBU1o7UIgdV9I'

const TIMELINE = [
  {
    year: '2019',
    title: 'El primer viaje',
    text: 'Recorrimos a pie las fincas de Apaneca-Ilamatepec, en El Salvador. Ahí entendimos que un café excepcional no se fabrica: se cultiva, se cuida y se elige grano a grano.',
  },
  {
    year: '2021',
    title: 'Comercio directo',
    text: 'Dejamos de comprar a intermediarios. Firmamos acuerdos directos con las familias productoras y empezamos a pagar hasta el doble del precio de mercado por su cosecha.',
  },
  {
    year: '2023',
    title: 'Tueste por lotes',
    text: 'Instalamos nuestro propio tostador y adoptamos el tueste por lotes pequeños, afinando el perfil de cada grano para resaltar lo mejor de cada origen.',
  },
  {
    year: '2026',
    title: 'Global Roast Coffee',
    text: 'Hoy llevamos cafés de El Salvador, Ruanda y Panamá a miles de tazas, con la misma promesa del primer día: café fresco, honesto y con nombre propio.',
  },
]

const TRUST = [
  {
    title: 'Trazabilidad total',
    text: 'Cada bolsa indica la finca, la variedad, la altitud y la fecha exacta de tueste. Sabés de dónde viene tu café y quién lo produjo.',
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    title: 'Comercio directo',
    text: 'Compramos directo a las fincas, sin intermediarios. El 75% del precio final queda con quien cultiva el café.',
    icon: (
      <>
        <path d="M8 12h8" />
        <path d="M12 8v8" />
        <path d="M21 8a5 5 0 0 0-5-5H8a5 5 0 0 0 0 10h8a5 5 0 0 1 0 10H8" />
      </>
    ),
  },
  {
    title: 'Tueste fresco, por lotes',
    text: 'Tostamos cada semana en lotes pequeños. Nunca enviamos un café con más de 10 días desde su fecha de tueste.',
    icon: (
      <>
        <path d="M12 2c1 3 4 5.5 4 10a6 6 0 1 1-12 0c0-4.5 3-7 4-10 1 2 2 3 4 0Z" />
      </>
    ),
  },
  {
    title: 'Garantía de satisfacción',
    text: 'Si tu café no es lo que esperabas, te lo reemplazamos o te devolvemos tu dinero. Sin preguntas incómodas.',
    icon: (
      <>
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 19.5 4 17 4 12V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
      </>
    ),
  },
]

const STATS = [
  { n: '3', label: 'Países de origen' },
  { n: '12', label: 'Fincas aliadas' },
  { n: '100%', label: 'Tueste semanal' },
  { n: '48h', label: 'Despacho nacional' },
]

export default function NuestroCafe() {
  return (
    <div className="bg-cream-bg text-coffee-text selection:bg-caramel selection:text-white">
      <Header variant="default" />

      {/* Hero */}
      <section className="relative hero-wood-bg wood-grain-overlay py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src={FINCA_IMG} alt="Fincas cafetaleras" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-caramel block mb-4">
            Nuestra historia
          </span>
          <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#F8F3ED] leading-[1.1] tracking-tight mb-6">
            Café con nombre y apellido
          </h1>
          <p className="text-base sm:text-lg text-[#D6C5B8] max-w-2xl mx-auto leading-relaxed">
            No vendemos café anónimo. Cada bolsa que llega a tu casa nació en una finca que visitamos, de un grano
            que elegimos y de un tueste que hicimos nosotros.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-olive-green block">
              De dónde venimos
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-coffee-dark font-bold tracking-tight">
              Empezamos con una pregunta simple
            </h2>
            <p className="text-base text-[#6C5B52] leading-relaxed">
              ¿Por qué el mejor café de nuestra región se iba entero al exterior, mientras aquí tomábamos mezclas
              viejas y sin historia? En 2019 recorrimos las fincas de Apaneca-Ilamatepec, conocimos a quienes cultivaban esas
              cosechas extraordinarias y entendimos algo: el buen café ya existía aquí, solo faltaba quien lo llevara
              a tu taza con el respeto que merece.
            </p>
            <p className="text-base text-[#6C5B52] leading-relaxed">
              Desde entonces no cambiamos de fórmula: compramos directo a las fincas, tostamos por lotes pequeños
              cada semana y te contamos exactamente de dónde viene lo que tomás. Preferimos crecer despacio y con
              confianza, antes que rápido y a costa de la calidad.
            </p>
          </div>

          {/* Línea de tiempo */}
          <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[#E0D3C2]">
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative pl-8">
                <span className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-caramel ring-4 ring-cream-bg" />
                <span className="text-xs font-bold tracking-[0.18em] text-caramel uppercase">{t.year}</span>
                <h3 className="font-fraunces text-xl font-bold text-coffee-dark mt-1 mb-1.5">{t.title}</h3>
                <p className="text-sm text-[#6C5B52] leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cifras */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-20">
        <div className="bg-coffee-banner rounded-[36px] py-12 px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-fraunces text-4xl sm:text-5xl font-bold text-caramel mb-1">{s.n}</div>
              <div className="text-[13px] text-[#D6C5B8] tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Por qué confiar */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-olive-green block mb-2">
            Nuestra promesa
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl text-coffee-dark font-bold tracking-tight">
            Por qué podés confiar en nosotros
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRUST.map((item) => (
            <div
              key={item.title}
              className="bg-cream-light rounded-[28px] p-8 border border-[#EADBCC] shadow-sm flex gap-5"
            >
              <div className="w-14 h-14 flex-shrink-0 rounded-full bg-badge-mint flex items-center justify-center text-olive-green">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>
              <div>
                <h3 className="font-fraunces text-xl font-bold text-coffee-dark mb-2">{item.title}</h3>
                <p className="text-sm text-[#6C5B52] leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonio */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="font-fraunces text-xl sm:text-2xl italic text-[#3F2B22] leading-relaxed mb-4">
            “Pediqué por primera vez y me llegó el café con la fecha de tueste de esa misma semana. Se nota la
            diferencia al olerlo antes de prepararlo. Ya no tomo otro.”
          </p>
          <span className="text-sm font-semibold text-olive-green tracking-wide">María G. — San Salvador</span>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="bg-cream-light rounded-[36px] py-14 px-8 text-center border border-[#EADBCC] shadow-sm">
          <h2 className="font-fraunces text-3xl sm:text-4xl text-coffee-dark font-bold tracking-tight mb-4">
            Probá la diferencia
          </h2>
          <p className="text-[#6C5B52] max-w-xl mx-auto mb-8">
            Elegí tu origen favorito, decinos cómo lo molés y lo preparamos para enviarte lo fresco esta misma semana.
          </p>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-3 bg-caramel hover:bg-caramel-hover text-coffee-dark font-medium text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span>Ver nuestra selección</span>
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
