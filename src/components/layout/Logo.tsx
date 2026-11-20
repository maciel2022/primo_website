import { site } from '../../content'

/** Logo chico "PRIMO©" de navbar, menú y footer. */
export function Logo({ href, className = '' }: { href?: string; className?: string }) {
  const cls = `flex min-h-11 items-center gap-0.5 font-display text-[30px] font-black tracking-[.01em] no-underline [font-stretch:62%] ${className}`
  const inner = (
    <>
      {site.marca}
      <sup className="-mt-3 font-sans text-[11px] font-semibold" aria-hidden="true">
        ©
      </sup>
    </>
  )
  return href ? (
    <a className={cls} href={href} aria-label={`${site.marca} — inicio`}>
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  )
}
