import type { Component, JSX } from 'solid-js'

interface Props {
  class?: string
}

export const Logo: Component<Props> = (props) => (
  <a href="#top" class={`logo ${props.class ?? ''}`} aria-label="Nino's Pizza home">
    <span class="logo-tile" aria-hidden="true">
      <span class="dot" />
      <span class="dot" />
    </span>
    <span class="logo-word">
      NINO<span class="logo-apostrophe">'</span>S
    </span>
  </a>
)

export const IconCart = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path
      d="M3 5h2l1.2 9.2a2 2 0 0 0 2 1.8h8.5a2 2 0 0 0 2-1.6L20 8H7"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="10" cy="20" r="1.4" fill="currentColor" />
    <circle cx="17" cy="20" r="1.4" fill="currentColor" />
  </svg>
)

export const IconClose = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
)

export const IconDelivery = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <path
      d="M3 7h11v8H3V7zm11 2h3l3 3v3h-6V9z"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
    <circle cx="7" cy="18" r="1.6" fill="currentColor" />
    <circle cx="17" cy="18" r="1.6" fill="currentColor" />
  </svg>
)

export const IconCarryout = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <path
      d="M4 10h16l-1.2 9H5.2L4 10zm2-3h12l1 3H5l1-3z"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
  </svg>
)

export function SectionHeading(props: {
  eyebrow?: string
  title: string
  subtitle?: string
  id?: string
}) {
  return (
    <header class="section-heading" id={props.id}>
      {props.eyebrow && <p class="eyebrow">{props.eyebrow}</p>}
      <h2>{props.title}</h2>
      {props.subtitle && <p class="section-sub">{props.subtitle}</p>}
    </header>
  )
}

export function Button(props: {
  children: JSX.Element
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark'
  class?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
}) {
  return (
    <button
      type={props.type ?? 'button'}
      class={`btn btn-${props.variant ?? 'primary'} ${props.class ?? ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </button>
  )
}
