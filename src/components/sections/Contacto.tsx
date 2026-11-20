import { useState, type FormEvent, type ReactNode } from 'react'
import { site } from '../../content'
import { useConsulta } from '../../lib/consulta'
import { Button } from '../ui/Button'
import { ArrowDiag } from '../ui/Icons'
import { Guides } from '../ui/Guides'
import { Label } from '../ui/Label'
import { Reveal } from '../ui/Reveal'

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errores = Partial<Record<'nombre' | 'email' | 'servicio', string>>

/** Fila de dato de contacto. Con href es un link con flecha; sin href, solo texto. */
function Fila({ rotulo, valor, href, destacado }: { rotulo: string; valor: string; href?: string; destacado?: boolean }) {
  const cls = `group flex min-h-16 items-center justify-between gap-4 text-white no-underline ${
    destacado ? 'mb-2 bg-red px-6 py-[22px]' : 'border-b border-white/15 py-5'
  }`
  const inner = (
    <>
      <span className="min-w-0">
        <small className={`mb-1.5 block font-mono text-[10px] uppercase ${destacado ? 'text-white' : 'text-[#bdbdbd]'}`}>
          {rotulo}
        </small>
        <b className="text-[17px] font-medium break-words">{valor}</b>
      </span>
      {href && (
        <span
          className={`grid h-10 w-10 flex-none place-items-center border transition-colors duration-300 ${
            destacado
              ? 'border-white group-hover:bg-white group-hover:text-red'
              : 'border-white/30 group-hover:border-red group-hover:bg-red'
          }`}
        >
          <ArrowDiag />
        </span>
      )}
    </>
  )
  if (!href) return <div className={cls}>{inner}</div>
  const ext = href.startsWith('http')
  return (
    <a className={cls} href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  )
}

function Campo({
  id,
  rotulo,
  obligatorio,
  error,
  full,
  children,
}: {
  id: string
  rotulo: string
  obligatorio?: boolean
  error?: string
  full?: boolean
  children: ReactNode
}) {
  return (
    <div className={`flex flex-col gap-2 ${full ? 'col-span-full' : ''}`}>
      <label htmlFor={id} className="font-mono text-[11px] text-[#cfcfcf] uppercase">
        {rotulo}
        {obligatorio && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="m-0 text-[13px] text-[#ff8a8f]">
          {error}
        </p>
      )}
    </div>
  )
}

export function Contacto() {
  const { contacto } = site
  const { formulario } = contacto
  const [enviado, setEnviado] = useState(false)
  const [errores, setErrores] = useState<Errores>({})
  // Precarga pedida desde otra sección (ej. "Consultar por un DJ de cumbia").
  // Cambiar `id` vuelve a montar el formulario con los valores nuevos.
  const [precarga, setPrecarga] = useState({ id: 0, servicio: '', mensaje: '' })
  const opcionArtistas = formulario.servicios.find((s) => /artista/i.test(s)) ?? ''

  useConsulta((c) => {
    setEnviado(false)
    setErrores({})
    setPrecarga((p) => ({ id: p.id + 1, servicio: c.artistas ? opcionArtistas : '', mensaje: c.mensaje }))
  })

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const datos = Object.fromEntries(new FormData(form)) as Record<string, string>

    const err: Errores = {}
    if (!datos.nombre.trim()) err.nombre = 'Decinos tu nombre.'
    if (!datos.email.trim()) err.email = 'Dejanos un correo para responderte.'
    else if (!EMAIL_OK.test(datos.email.trim())) err.email = 'Revisá el correo: parece incompleto.'
    if (!datos.servicio) err.servicio = 'Elegí qué necesitás.'
    setErrores(err)
    const primero = Object.keys(err)[0]
    if (primero) {
      form.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus()
      return
    }

    // TODO: conectar el envío real. Hoy NO se envía nada: solo se muestra el estado de éxito.
    // Opción recomendada (Formspree):
    //   await fetch('https://formspree.io/f/<ID>', {
    //     method: 'POST',
    //     headers: { Accept: 'application/json' },
    //     body: new FormData(form),
    //   })
    // Alternativa: Resend detrás de un endpoint serverless (/api/contacto en Vercel).
    setEnviado(true)
  }

  const a11y = (campo: keyof Errores, id: string) =>
    errores[campo] ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` } : {}

  return (
    <section id="contacto" className="section dark" aria-labelledby="t-contacto">
      <Guides />
      <div className="wrap">
        <Reveal>
          <Label>[PR/ Contacto]</Label>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="display text-[clamp(46px,9.4cqi,140px)] text-balance" id="t-contacto">
              {contacto.titulo}
            </h2>
            <p className="m-0 max-w-[30ch] text-[17px] leading-[1.55] text-[#e5e5e5]">{contacto.bajada}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-10 tablet:block">
          <Reveal className="col-span-5 flex flex-col">
            <Fila rotulo="Respuesta directa" valor="Escribinos por WhatsApp" href={contacto.whatsapp} destacado />
            <Fila rotulo="Correo" valor={contacto.email} href={`mailto:${contacto.email}`} />
            <Fila rotulo="Instagram" valor={contacto.instagram.usuario} href={contacto.instagram.url} />
            <Fila rotulo="Zona de cobertura" valor={contacto.zona} />
          </Reveal>

          <Reveal className="col-span-7 tablet:mt-10">
            {enviado ? (
              <div className="flex flex-col items-start gap-3.5 bg-coal p-10 mobile:p-6" role="status">
                <Label className="m-0!">[Consulta recibida]</Label>
                <h3 className="display text-[52px]">{formulario.exito.titulo}</h3>
                <p className="m-0 text-base leading-[1.6] text-[#cfcfcf]">{formulario.exito.texto}</p>
                <Button tone="white" arrow="red" icon="right" onClick={() => setEnviado(false)}>
                  Enviar otra consulta
                </Button>
              </div>
            ) : (
              <form
                key={precarga.id}
                className="grid grid-cols-2 gap-3.5 mobile:grid-cols-1"
                onSubmit={onSubmit}
                noValidate
                aria-label="Formulario de consulta"
              >
                <Campo id="f-nombre" rotulo="Nombre" obligatorio error={errores.nombre}>
                  <input id="f-nombre" name="nombre" type="text" autoComplete="name" required placeholder="Tu nombre" className="field" {...a11y('nombre', 'f-nombre')} />
                </Campo>
                <Campo id="f-email" rotulo="Correo" obligatorio error={errores.email}>
                  <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="tu@correo.com" className="field" {...a11y('email', 'f-email')} />
                </Campo>
                <Campo id="f-servicio" rotulo="¿Qué necesitás?" obligatorio error={errores.servicio}>
                  <select id="f-servicio" name="servicio" required defaultValue={precarga.servicio} className="field" {...a11y('servicio', 'f-servicio')}>
                    <option value="">Seleccioná una opción</option>
                    {formulario.servicios.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Campo>
                <Campo id="f-tipo" rotulo="Tipo de evento">
                  <select id="f-tipo" name="tipo" defaultValue="" className="field">
                    <option value="">Seleccioná una opción</option>
                    {formulario.tiposEvento.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Campo>
                <Campo id="f-fecha" rotulo="Fecha estimada" full>
                  <input id="f-fecha" name="fecha" type="date" className="field" />
                </Campo>
                <Campo id="f-descripcion" rotulo="Descripción del proyecto" full>
                  <textarea
                    id="f-descripcion"
                    name="descripcion"
                    defaultValue={precarga.mensaje}
                    placeholder="Contanos qué imaginás: tipo de evento, cantidad de invitados, lugar…"
                    className="field"
                  />
                </Campo>
                <div className="col-span-full flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-[#bdbdbd] uppercase">* Obligatorio</span>
                  <Button type="submit" tone="white" arrow="red" icon="right">
                    Enviar consulta
                  </Button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
