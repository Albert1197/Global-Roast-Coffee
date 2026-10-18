import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

const MASCOT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAb_C9PaSXcix5eYF0NDgMYJjPxPHkq22PzrutCwATuHwUUubD8yXMkIj3pESISLRjEMtopvVoQxS3ErY7TDm624dCTZ_khAFvdToV75r8GiS_mc5KIPMC7KC7ztxzfoPQwcZDg9o3IQ3G6Oo9anEwnNUzopuhMpit2Dma4UW7uhjMBLFNRCGmHZrFsjiCuoR5NYOe9UisqtUnshI0atcMGPL0SpxBFDiatDmlvL6Fg0ECoRT7AmNWSug'

export default function Confirmacion() {
  const { subtotal } = useCart()
  const SHIPPING = 3.5
  const total = subtotal > 0 ? subtotal + SHIPPING : 14.5

  return (
    <div className="min-h-screen bg-cream-bg flex flex-col justify-between selection:bg-amber-200">
      <Header variant="confirmacion" showBadge />

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-4 flex items-center justify-center">
            <img
              alt="Mascota de Global Roast saludando alegremente con mochila y sombrero de explorador"
              className="w-full h-full object-contain filter drop-shadow-sm select-none"
              src={MASCOT}
            />
          </div>

          <h1 className="font-fraunces text-3xl sm:text-4xl text-[#2F1D17] font-semibold tracking-tight mb-2">
            ¡Gracias, Ana!
          </h1>

          <div className="mb-5 space-y-1">
            <p className="text-base text-[#463932] font-medium tracking-wide">Pedido GR-00001</p>
            <p className="text-sm font-medium text-[#59483F]">Total: ${total.toFixed(2)}</p>
          </div>

          <p className="text-[13px] sm:text-sm text-[#665449] max-w-md mx-auto leading-relaxed mb-6 font-normal">
            Te escribiremos por WhatsApp con los datos para la transferencia. Tostamos tu café al confirmar el pago.
          </p>

          <div className="flex flex-col items-center mb-5 w-full">
            <a
              className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-forest-btn hover:bg-forest-btn-hover text-white text-xs sm:text-sm font-medium rounded-full shadow-sm hover:shadow transition-all duration-150"
              href="https://wa.me/50370000000"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.533 2.026.814 3.149.814 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm3.376 8.204c-.14.394-.813.729-1.127.777-.314.048-.718.067-2.316-.593-1.916-.79-3.14-2.738-3.235-2.865-.096-.127-.775-1.03-.775-1.966 0-.936.491-1.397.666-1.587.175-.19.381-.238.508-.238.127 0 .254.001.365.006.118.006.275-.045.43.327.159.381.539 1.317.587 1.412.048.095.079.207.016.333-.063.127-.095.206-.19.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.493.813 1.057 1.317.728.648 1.341.85 1.532.945.19.095.301.079.412-.048.111-.127.476-.556.603-.746.127-.19.254-.159.428-.095.175.063 1.111.524 1.302.619.19.095.317.143.365.222.048.079.048.46-.092.854zM12 2C6.477 2 2 6.477 2 12c0 1.891.527 3.662 1.442 5.176L2 22l4.981-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              <span>Escribinos por WhatsApp</span>
            </a>
            <span className="mt-2 text-xs font-normal text-[#6C584C] tracking-wide">+503 7000-0000</span>
          </div>

          <Link
            className="inline-block px-7 py-2 bg-[#EADECF] hover:bg-[#DFD1BF] text-[#523F36] text-xs sm:text-sm font-normal rounded-full transition-colors duration-150"
            to="/tienda"
          >
            Seguir comprando
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
