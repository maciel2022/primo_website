import { site } from './content'

// Paso 1: vista de control de tokens, fuentes y utilidades. Se reemplaza por las secciones.
export default function App() {
  return (
    <main className="section">
      <div className="guides" aria-hidden="true">
        <div className="wrap">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="wrap">
        <p className="label">
          <i className="label-flag" />
          [PR/ Tokens]
        </p>
        <h1 className="display h-section">
          {site.marca} <span className="text-red">— base lista.</span>
        </h1>
        <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-[#333]">{site.claim}</p>
        <div className="mt-10 flex flex-wrap gap-2">
          {(['red', 'ink', 'mist', 'line'] as const).map((c) => (
            <span
              key={c}
              className="mono grid h-24 w-40 place-items-center border border-line text-[11px]"
              style={{ background: `var(--color-${c})`, color: c === 'red' || c === 'ink' ? '#fff' : '#0b0b0b' }}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4 mobile:grid-cols-1">
          <div className="scene scene-sunset chamfer-tr h-56">
            <span className="scene-bg" />
            <span className="scene-caption">chamfer-tr</span>
          </div>
          <div className="scene scene-venue chamfer-bl h-56">
            <span className="scene-bg" />
            <span className="scene-caption">chamfer-bl</span>
          </div>
          <div className="scene scene-gala chamfer-2 h-56">
            <span className="scene-bg" />
            <span className="scene-caption">chamfer-2</span>
          </div>
        </div>
      </div>
    </main>
  )
}
