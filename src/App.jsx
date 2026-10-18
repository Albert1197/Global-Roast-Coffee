import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import DetalleCafe from './pages/DetalleCafe'
import Checkout from './pages/Checkout'
import Confirmacion from './pages/Confirmacion'

// Página provisoria para secciones del menú que no tienen pantalla en Stitch.
function EnDesarrollo({ titulo }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-fraunces text-4xl font-bold text-coffee-dark mb-3">{titulo}</h1>
        <p className="text-[#716155] max-w-md">
          Esta sección todavía no existe como pantalla en el proyecto de Stitch "Global Roast Coffee Home".
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/producto/:id" element={<DetalleCafe />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/nuestro-cafe" element={<EnDesarrollo titulo="Nuestro Café" />} />
        <Route path="/contacto" element={<EnDesarrollo titulo="Contacto" />} />
        <Route path="*" element={<EnDesarrollo titulo="Página no encontrada" />} />
      </Routes>
    </CartProvider>
  )
}
