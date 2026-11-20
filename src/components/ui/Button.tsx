import type { MouseEventHandler, ReactNode } from 'react'
import { isExternal } from '../../content'
import { ArrowDiag, ArrowRight } from './Icons'

type Tone = 'ink' | 'white' | 'red'

const TEXT: Record<Tone, string> = {
  ink: 'bg-ink text-white',
  white: 'bg-white text-ink',
  red: 'bg-red text-white',
}

interface Props {
  children: ReactNode
  /** Color del bloque de texto */
  tone?: Tone
  /** Color del bloque de la flecha */
  arrow?: 'ink' | 'red'
  icon?: 'diag' | 'right'
  /** Con href es un link; sin href es un <button> */
  href?: string
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLElement>
  block?: boolean
  className?: string
}

export function Button({
  children,
  tone = 'ink',
  arrow = tone === 'ink' ? 'red' : 'ink',
  icon = 'diag',
  href,
  type = 'button',
  onClick,
  block,
  className = '',
}: Props) {
  const cls = `btn ${block ? 'btn-block' : ''} ${className}`
  const inner = (
    <>
      <span className={`btn-text ${TEXT[tone]}`}>{children}</span>
      <span className={`btn-arrow ${arrow === 'red' ? 'bg-red' : 'bg-ink'}`}>
        {icon === 'diag' ? <ArrowDiag /> : <ArrowRight />}
      </span>
    </>
  )
  if (href) {
    const ext = isExternal(href)
    return (
      <a
        className={cls}
        href={href}
        onClick={onClick}
        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }
  return (
    <button className={cls} type={type} onClick={onClick}>
      {inner}
    </button>
  )
}
