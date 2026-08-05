import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  variant?: 'solid' | 'outline'
}

const base =
  'w-fit px-12 xl:px-4! py-2 transition-all duration-500 cursor-pointer text-[4vw] md:text-[3vw] xl:text-[1vw] font-medium inline-flex items-center justify-center gap-2 group'

const variants = {
  solid: 'bg-primary text-white hover:bg-primary/90 border-2 border-primary',
  outline:
    'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
}

export default function Button({
  label,
  variant = 'solid',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{label}</span>
    </button>
  )
}
