'use client'

import { FC } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
	label: string
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	outline?: boolean
	small?: boolean
	icon?: IconType
}

const ModalButton: FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
  relative 
  disabled:opacity-70 
  disabled:cursor-not-allowed 
  rounded-lg 
  hover:opacity-80 
  transition 
  w-full 
  ${outline ? 'bg-white' : 'bg-primary'}
  ${outline ? 'border-black' : 'border-primary'}
  ${outline ? 'text-black' : 'text-white'}
  ${small ? 'py-1' : 'py-3'}
  ${small ? 'text-sm' : 'text-md'}
  ${small ? 'font-light' : 'font-semibold'}
  ${small ? 'border-[1px]' : 'border-2'}
  `}
		>
			{Icon && (
				<Icon size={24} className='absolute left-4 top-3 text-primary' />
			)}
			{label}
		</button>
	)
}

export default ModalButton
