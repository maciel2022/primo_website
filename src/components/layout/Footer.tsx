import { site } from '../../content'
import { Logo } from './Logo'

const h4 = 'm-0 mb-3.5 font-mono text-[11px] font-normal uppercase text-[#bdbdbd]'
const item = 'inline-flex min-h-8 items-center text-sm'
const link = `${item} text-white no-underline transition-colors hover:text-[#ff8a8f]`

export function Footer() {
  const { contacto } = site
  return (
    <footer className="border-t border-[#222] bg-ink pt-16 pb-8 text-white">
      <div className="wrap">
        <div className="cols items-start">
          <div className="col-span-4 tablet:col-span-6 mobile:col-span-12">
            <Logo href="#inicio" className="w-max text-white" />
            <p className="mt-3 mb-0 max-w-[30ch] text-sm leading-[1.55] text-[#bdbdbd]">{site.claim}</p>
          </div>
          <nav className="col-span-3 tablet:col-span-6 mobile:col-span-12" aria-label="Pie de página">
            <h3 className={h4}>Navegación</h3>
            <ul className="m-0 list-none p-0">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a className={link} href={l.href}>
                    {l.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 tablet:col-span-6 mobile:col-span-12">
            <h3 className={h4}>Redes</h3>
            <ul className="m-0 list-none p-0">
              <li>
                <a className={link} href={contacto.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a className={link} href={contacto.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-3 tablet:col-span-6 mobile:col-span-12">
            <h3 className={h4}>Contacto</h3>
            <ul className="m-0 list-none p-0">
              <li>
                <a className={link} href={`mailto:${contacto.email}`}>
                  {contacto.email}
                </a>
              </li>
              <li>
                <a className={link} href={contacto.whatsapp} target="_blank" rel="noopener noreferrer">
                  {contacto.telefono}
                </a>
              </li>
              <li>
                <span className={`${item} text-[#bdbdbd]`}>{contacto.zona}</span>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="display mt-10 flex items-start text-[clamp(90px,19cqi,300px)] leading-[.8] text-red"
        >
          {site.marca}
          <sup className="ml-[.05em] grid h-[1.1em] w-[1.1em] place-items-center rounded-full border-[.06em] border-red font-sans text-[.14em] leading-none font-medium tracking-normal">
            ©
          </sup>
        </p>

        <div className="mt-6 flex flex-wrap justify-between gap-3 font-mono text-[11px] text-[#bdbdbd] uppercase">
          <span>{site.footer.copyright}</span>
          <a className="inline-flex min-h-11 items-center text-white no-underline hover:text-[#ff8a8f]" href="#inicio">
            Volver arriba ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
