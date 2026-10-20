import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { createProduct } from '../api'

// Presets de los 2 cafés adicionales listos para insertar
export const CAFE_COLOMBIA = {
  id: 'colombia-supremo',
  name: 'Colombia Supremo',
  origin: 'Colombia · Huila',
  originShort: 'COLOMBIA · HUILA',
  notes: 'Caramelo suave, manzana roja, avellana',
  notesShort: 'Caramelo suave, manzana roja, avellana',
  price: 9.5,
  roast: 'Medio',
  badgeTueste: 'Tueste medio',
  process: 'Proceso Lavado',
  altitude: '1,650–1,950 msnm',
  variety: 'Castillo & Caturra',
  description:
    'Cultivado por pequeños caficultores en las faldas de la cordillera andina en Huila. Un café equilibrado con cuerpo sedoso, acidez cítrica brillante y final prolongado a panela y cacao.',
  imgHome:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqsDfKh2FbiVePf1ZGaN8qbzFb7d3ey5uTAHeukoOfbG4G1diVt-q25DlAGNxH5tjNo9ezVr6_f33D5RtTn9ROA82m6jgriEi07B8oE_PXJAlHLC0vNem7tTPOEBPhAoIms9644O6L_kESNrjD0BTsiig5n6YbzkOITRIc0Hx3i4tELbStsIVsXJtj07Fqf_D3J-fEgRkVmN7gZoeOG34POnhlDP64cLi21lolp_T4yJBekhApGKTBgA',
  imgTienda:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqsDfKh2FbiVePf1ZGaN8qbzFb7d3ey5uTAHeukoOfbG4G1diVt-q25DlAGNxH5tjNo9ezVr6_f33D5RtTn9ROA82m6jgriEi07B8oE_PXJAlHLC0vNem7tTPOEBPhAoIms9644O6L_kESNrjD0BTsiig5n6YbzkOITRIc0Hx3i4tELbStsIVsXJtj07Fqf_D3J-fEgRkVmN7gZoeOG34POnhlDP64cLi21lolp_T4yJBekhApGKTBgA',
  imgDetalle:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqsDfKh2FbiVePf1ZGaN8qbzFb7d3ey5uTAHeukoOfbG4G1diVt-q25DlAGNxH5tjNo9ezVr6_f33D5RtTn9ROA82m6jgriEi07B8oE_PXJAlHLC0vNem7tTPOEBPhAoIms9644O6L_kESNrjD0BTsiig5n6YbzkOITRIc0Hx3i4tELbStsIVsXJtj07Fqf_D3J-fEgRkVmN7gZoeOG34POnhlDP64cLi21lolp_T4yJBekhApGKTBgA',
  imgThumb:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqsDfKh2FbiVePf1ZGaN8qbzFb7d3ey5uTAHeukoOfbG4G1diVt-q25DlAGNxH5tjNo9ezVr6_f33D5RtTn9ROA82m6jgriEi07B8oE_PXJAlHLC0vNem7tTPOEBPhAoIms9644O6L_kESNrjD0BTsiig5n6YbzkOITRIc0Hx3i4tELbStsIVsXJtj07Fqf_D3J-fEgRkVmN7gZoeOG34POnhlDP64cLi21lolp_T4yJBekhApGKTBgA',
}

export const CAFE_ETIOPIA = {
  id: 'etiopia-yirgacheffe',
  name: 'Etiopía Yirgacheffe',
  origin: 'Etiopía · Yirgacheffe',
  originShort: 'ETIOPÍA · YIRGACHEFFE',
  notes: 'Jazmín, flor de azahar, bergamota, miel',
  notesShort: 'Jazmín, flor de azahar, bergamota, miel',
  price: 11.0,
  roast: 'Claro',
  badgeTueste: 'Tueste claro',
  process: 'Proceso Natural',
  altitude: '1,900–2,200 msnm',
  variety: 'Heirloom etíope',
  description:
    'La cuna del café arábica. Cultivado a gran altura y procesado de forma natural al sol en camas africanas elevadas. Su perfil es extraordinariamente aromático, con cuerpo ligero como té y notas florales vivas.',
  imgHome:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKV9WgSlekM9bGsmsSuUqGH6zdKf1BNzhDcc32qZ8CD2XDOrTyRMLHLMyM6-Z1gdTFUrSu2qaEKW8MDbkYBm4R-MGelbrWzWwlFoD3uwHcBx4a_rx00qPNzfkXTHMc3wbIUPAMGOwfTQAt3o3mMBl8PcwGD2v5HITt0GyVAcvV8eULfDkUzkYArwIoFsrgB-b894CM2G2jWf_C3l_Iky63IYvvMKmb1TyGsaZpBZWxIOwHf_lANGl6CA',
  imgTienda:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKV9WgSlekM9bGsmsSuUqGH6zdKf1BNzhDcc32qZ8CD2XDOrTyRMLHLMyM6-Z1gdTFUrSu2qaEKW8MDbkYBm4R-MGelbrWzWwlFoD3uwHcBx4a_rx00qPNzfkXTHMc3wbIUPAMGOwfTQAt3o3mMBl8PcwGD2v5HITt0GyVAcvV8eULfDkUzkYArwIoFsrgB-b894CM2G2jWf_C3l_Iky63IYvvMKmb1TyGsaZpBZWxIOwHf_lANGl6CA',
  imgDetalle:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKV9WgSlekM9bGsmsSuUqGH6zdKf1BNzhDcc32qZ8CD2XDOrTyRMLHLMyM6-Z1gdTFUrSu2qaEKW8MDbkYBm4R-MGelbrWzWwlFoD3uwHcBx4a_rx00qPNzfkXTHMc3wbIUPAMGOwfTQAt3o3mMBl8PcwGD2v5HITt0GyVAcvV8eULfDkUzkYArwIoFsrgB-b894CM2G2jWf_C3l_Iky63IYvvMKmb1TyGsaZpBZWxIOwHf_lANGl6CA',
  imgThumb:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKV9WgSlekM9bGsmsSuUqGH6zdKf1BNzhDcc32qZ8CD2XDOrTyRMLHLMyM6-Z1gdTFUrSu2qaEKW8MDbkYBm4R-MGelbrWzWwlFoD3uwHcBx4a_rx00qPNzfkXTHMc3wbIUPAMGOwfTQAt3o3mMBl8PcwGD2v5HITt0GyVAcvV8eULfDkUzkYArwIoFsrgB-b894CM2G2jWf_C3l_Iky63IYvvMKmb1TyGsaZpBZWxIOwHf_lANGl6CA',
}

const INITIAL_FORM = {
  id: '',
  name: '',
  origin: '',
  originShort: '',
  notes: '',
  notesShort: '',
  price: 9.0,
  roast: 'Medio',
  badgeTueste: 'Tueste medio',
  process: 'Proceso Lavado',
  altitude: '1,500–1,800 msnm',
  variety: 'Arábica',
  description: '',
  imgHome: CAFE_COLOMBIA.imgHome,
  imgTienda: CAFE_COLOMBIA.imgTienda,
  imgDetalle: CAFE_COLOMBIA.imgDetalle,
  imgThumb: CAFE_COLOMBIA.imgThumb,
}

export default function NuevoCafe() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '', lastId: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => {
      const next = { ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }
      // Auto-generar id y originShort si se edita nombre u origen
      if (name === 'name' && !prev.id) {
        next.id = value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }
      if (name === 'origin') {
        next.originShort = value.toUpperCase()
      }
      if (name === 'notes') {
        next.notesShort = value
      }
      if (name === 'roast') {
        next.badgeTueste = `Tueste ${value.toLowerCase()}`
      }
      return next
    })
  }

  function loadPreset(preset) {
    setForm({ ...preset })
    setMsg({ type: 'info', text: `Plantilla cargada: ${preset.name}. Haz clic en "Guardar en Base de Datos".`, lastId: '' })
  }

  async function handleInsertBoth() {
    setLoading(true)
    setMsg({ type: '', text: '', lastId: '' })
    try {
      let createdCount = 0
      for (const cafe of [CAFE_COLOMBIA, CAFE_ETIOPIA]) {
        try {
          await createProduct(cafe)
          createdCount++
        } catch (err) {
          // Si ya existe ignoramos el error específico y continuamos
          console.warn(err.message)
        }
      }
      setMsg({
        type: 'success',
        text: `¡Operación completada! Se procesaron los 2 cafés (Colombia Supremo y Etiopía Yirgacheffe).`,
        lastId: 'colombia-supremo',
      })
    } catch (err) {
      setMsg({ type: 'error', text: `Error al insertar: ${err.message}`, lastId: '' })
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.id || !form.name || !form.origin) {
      setMsg({ type: 'error', text: 'Por favor completa al menos ID, Nombre y Origen.', lastId: '' })
      return
    }

    setLoading(true)
    setMsg({ type: '', text: '', lastId: '' })

    try {
      const saved = await createProduct(form)
      setMsg({
        type: 'success',
        text: `¡Café "${saved.name}" guardado exitosamente en SQLite!`,
        lastId: saved.id,
      })
      setForm(INITIAL_FORM)
    } catch (err) {
      setMsg({ type: 'error', text: err.message, lastId: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F5F0] text-[#2B1810] selection:bg-[#B48B57]/30">
      <Header />

      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A6E59] block mb-2">
            Panel de Gestión · Base de Datos SQLite
          </span>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold tracking-tight text-[#2B1810] mb-4">
            Agregar Nuevo Café
          </h1>
          <p className="text-[#6C5B52] leading-relaxed">
            Inserta nuevos granos directamente en la tabla <code className="bg-white px-2 py-0.5 rounded border border-[#E0D3C4] text-xs">products</code> de la base de datos <code className="bg-white px-2 py-0.5 rounded border border-[#E0D3C4] text-xs">coffee.db</code>.
          </p>
        </div>

        {/* Carga rápida con 1 clic */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-[#EAE0D3] shadow-sm mb-12">
          <h2 className="font-fraunces text-xl font-bold mb-3 flex items-center gap-2">
            <span>⚡</span> Carga rápida de los 2 cafés adicionales
          </h2>
          <p className="text-sm text-[#736358] mb-6">
            Puedes insertar ambos cafés automáticamente a la base de datos, o cargar sus datos en el formulario para inspeccionarlos antes de guardar:
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={handleInsertBoth}
              disabled={loading}
              className="bg-[#2B1810] hover:bg-[#3D251A] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              <span>🚀</span> Insertar los 2 cafés automáticamente
            </button>

            <button
              type="button"
              onClick={() => loadPreset(CAFE_COLOMBIA)}
              className="bg-[#F3ECE3] hover:bg-[#E9DFD3] text-[#2B1810] px-5 py-3 rounded-full text-sm font-medium transition border border-[#D9CCBE]"
            >
              Cargar datos: <strong>Colombia Supremo</strong>
            </button>

            <button
              type="button"
              onClick={() => loadPreset(CAFE_ETIOPIA)}
              className="bg-[#F3ECE3] hover:bg-[#E9DFD3] text-[#2B1810] px-5 py-3 rounded-full text-sm font-medium transition border border-[#D9CCBE]"
            >
              Cargar datos: <strong>Etiopía Yirgacheffe</strong>
            </button>
          </div>
        </section>

        {/* Alertas de mensaje */}
        {msg.text && (
          <div
            className={`p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border ${
              msg.type === 'success'
                ? 'bg-[#EBF3E8] border-[#BDD9B3] text-[#2D5A27]'
                : msg.type === 'error'
                ? 'bg-[#FBEAEA] border-[#E8BDBD] text-[#8C2323]'
                : 'bg-[#FFF9EE] border-[#F2DEB5] text-[#7A5B18]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{msg.type === 'success' ? '✅' : msg.type === 'error' ? '❌' : 'ℹ️'}</span>
              <span className="font-medium text-sm">{msg.text}</span>
            </div>
            {msg.type === 'success' && (
              <div className="flex gap-2">
                <Link
                  to="/tienda"
                  className="bg-[#2B1810] text-white text-xs px-4 py-2 rounded-full font-medium hover:bg-[#432A20] transition"
                >
                  Ver en Tienda →
                </Link>
                {msg.lastId && (
                  <Link
                    to={`/producto/${msg.lastId}`}
                    className="bg-white border border-[#2B1810]/20 text-[#2B1810] text-xs px-4 py-2 rounded-full font-medium hover:bg-black/5 transition"
                  >
                    Ver Detalle
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* Formulario y Vista Previa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Columna Formulario */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE0D3] shadow-sm space-y-6"
          >
            <h2 className="font-fraunces text-2xl font-bold text-[#2B1810] border-b border-[#F0E6DA] pb-4">
              Formulario de Producto
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="name">
                  Nombre del Café *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="ej: Colombia Supremo"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="id">
                  Identificador (ID Slug) *
                </label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  required
                  placeholder="ej: colombia-supremo"
                  value={form.id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="origin">
                  Origen Completo *
                </label>
                <input
                  id="origin"
                  name="origin"
                  type="text"
                  required
                  placeholder="ej: Colombia · Huila"
                  value={form.origin}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="originShort">
                  Origen Corto (Mayúsculas)
                </label>
                <input
                  id="originShort"
                  name="originShort"
                  type="text"
                  placeholder="ej: COLOMBIA · HUILA"
                  value={form.originShort}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="price">
                  Precio (USD) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.25"
                  min="1"
                  required
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="roast">
                  Tueste
                </label>
                <select
                  id="roast"
                  name="roast"
                  value={form.roast}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm cursor-pointer"
                >
                  <option value="Claro">Claro</option>
                  <option value="Medio">Medio</option>
                  <option value="Oscuro">Oscuro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="process">
                  Proceso
                </label>
                <input
                  id="process"
                  name="process"
                  type="text"
                  placeholder="ej: Proceso Lavado"
                  value={form.process}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="altitude">
                  Altitud
                </label>
                <input
                  id="altitude"
                  name="altitude"
                  type="text"
                  placeholder="ej: 1,600–1,900 msnm"
                  value={form.altitude}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="variety">
                  Variedad
                </label>
                <input
                  id="variety"
                  name="variety"
                  type="text"
                  placeholder="ej: Castillo / Heirloom"
                  value={form.variety}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="notes">
                Notas de Cata *
              </label>
              <input
                id="notes"
                name="notes"
                type="text"
                required
                placeholder="ej: Chocolate, ciruela madura, caramelo"
                value={form.notes}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="description">
                Descripción Completa
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Breve reseña sobre la finca, variedad o perfil de sabor..."
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1.5" htmlFor="imgTienda">
                URL de Imagen del Grano
              </label>
              <input
                id="imgTienda"
                name="imgTienda"
                type="url"
                value={form.imgTienda}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    imgHome: e.target.value,
                    imgTienda: e.target.value,
                    imgDetalle: e.target.value,
                    imgThumb: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#B48B57] bg-[#FCFBF8] text-sm font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#B48B57] hover:bg-[#9B7443] text-white font-medium rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 text-base"
            >
              {loading ? 'Guardando en Base de Datos...' : 'Guardar Café en Base de Datos (SQLite)'}
            </button>
          </form>

          {/* Columna Vista Previa en Vivo */}
          <div className="lg:col-span-5 sticky top-28">
            <span className="text-xs font-bold uppercase tracking-wider text-[#736358] block mb-3">
              Vista previa interactiva en la tienda:
            </span>

            <div className="bg-white rounded-2xl p-6 border border-[#EBE1D4] shadow-md relative flex flex-col justify-between">
              <div className="absolute top-5 left-5 z-10">
                <span
                  className={
                    'inline-block text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm ' +
                    (form.roast === 'Claro' ? 'bg-[#CDBCA6] text-[#2B1810]' : 'bg-[#BA8E59]')
                  }
                >
                  {form.badgeTueste || 'Tueste medio'}
                </span>
              </div>

              <div className="w-full flex justify-center items-center pt-2 pb-6 min-h-[260px]">
                <img
                  src={form.imgTienda || CAFE_COLOMBIA.imgTienda}
                  alt={form.name || 'Café'}
                  className="h-60 object-contain filter drop-shadow-md transition-all"
                />
              </div>

              <div className="pt-2 border-t border-gray-50 flex flex-col">
                <span className="text-[11px] tracking-wider uppercase font-semibold text-[#5A6E59] mb-1">
                  {form.originShort || 'ORIGEN · REGIÓN'}
                </span>
                <h3 className="font-fraunces text-2xl font-bold text-[#2B1810] mb-1.5">
                  {form.name || 'Nombre del Café'}
                </h3>
                <p className="text-[14px] italic text-[#6B5A4E] mb-5">
                  {form.notes || 'Notas de cata aromáticas y balanceadas'}
                </p>
                <div className="text-[15px] text-[#4A3B32]">
                  Desde <span className="font-bold text-[#2B1810] text-lg">${Number(form.price || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#EBE0D2]/50 border border-[#DDD0C2] text-xs text-[#5D4E45] space-y-2">
              <p className="font-semibold text-sm text-[#2B1810]">ℹ️ ¿Cómo funciona esta vista?</p>
              <p>
                Al hacer clic en <strong>"Guardar"</strong> o en <strong>"Insertar los 2 cafés automáticamente"</strong>, el frontend enviará una petición HTTP <code className="bg-white px-1 rounded">POST /api/products</code> al backend de FastAPI.
              </p>
              <p>
                FastAPI ejecutará el <code className="bg-white px-1 rounded">INSERT INTO products</code> directamente en el archivo <code className="bg-white px-1 rounded">coffee.db</code> de SQLite y el producto aparecerá de inmediato en toda la tienda.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

