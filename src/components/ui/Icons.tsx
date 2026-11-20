// Íconos SVG de trazo fino. Todos decorativos: el texto accesible va en el control.
type P = { size?: number; stroke?: number }

const base = (size: number) =>
  ({ width: size, height: size, fill: 'none', 'aria-hidden': true }) as const

export const ArrowDiag = ({ size = 14, stroke = 1.6 }: P) => (
  <svg {...base(size)} viewBox="0 0 14 14">
    <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth={stroke} />
  </svg>
)
export const ArrowRight = ({ size = 14, stroke = 1.6 }: P) => (
  <svg {...base(size)} viewBox="0 0 14 14">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth={stroke} />
  </svg>
)
export const ArrowLeft = ({ size = 14, stroke = 1.6 }: P) => (
  <svg {...base(size)} viewBox="0 0 14 14">
    <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth={stroke} />
  </svg>
)
export const ArrowDown = ({ size = 14, stroke = 1.6 }: P) => (
  <svg {...base(size)} viewBox="0 0 14 14">
    <path d="M7 2v8M3 6.5l4 4 4-4M2 12.5h10" stroke="currentColor" strokeWidth={stroke} />
  </svg>
)
export const Close = ({ size = 16, stroke = 1.6 }: P) => (
  <svg {...base(size)} viewBox="0 0 16 16">
    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth={stroke} />
  </svg>
)
export const Menu = ({ size = 20, stroke = 1.6 }: P) => (
  <svg {...base(size)} viewBox="0 0 20 20">
    <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth={stroke} />
  </svg>
)
export const Play = ({ size = 16 }: P) => (
  <svg {...base(size)} viewBox="0 0 18 18">
    <path d="M5 3l10 6-10 6z" fill="currentColor" />
  </svg>
)
