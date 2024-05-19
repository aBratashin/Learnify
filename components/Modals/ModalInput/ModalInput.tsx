'use client'

import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { IconType } from 'react-icons'

interface InputProps {
	id: string
	label: string
	type?: string
	placeholder?: string
	disabled?: boolean
	required?: {
		value: boolean
		message: string
	}
	minLength?: {
		value: number
		message: string
	}
	pattern?: {
		value: RegExp
		message: string
	}
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	icon: IconType
}

const ModalInput: FC<InputProps> = ({
	id,
	label,
	type,
	disabled,
	required,
	minLength,
	pattern,
	register,
	errors,
	placeholder,
	icon: Icon
}) => {
	return (
		<div className='w-full flex flex-col gap-2 relative'>
			<label
				className={` 
        text-md
      ${errors[id] ? 'text-red-light' : 'text-zinc-400'}`}
			>
				{label}
			</label>
			<div className='flex gap-1 mb-2'>
				<span
					className={`
        peer 
        p-4  
        bg-white 
        border-2
        rounded-lg
        outline-none 
        transition 
        disabled:opacity-70 
        disabled:cursor-not-allowed
        ${errors[id] ? 'border-red-light' : 'border-neutral-300'} 
        ${errors[id] ? 'focus:border-red-light' : 'focus:border-black'}`}
				>
					<Icon
						size={24}
						className={`${errors[id] ? 'text-red-light' : 'text-black'}`}
					/>
				</span>
				<input
					id={id}
					placeholder={placeholder}
					disabled={disabled}
					{...register(id, {
						required,
						minLength,
						pattern
					})}
					type={type}
					className={`
        peer 
        w-full
        p-4  
        bg-white 
        border-2 
        rounded-lg
        outline-none 
        transition 
        disabled:opacity-70 
        disabled:cursor-not-allowed
        ${errors[id] ? 'border-red-light' : 'border-neutral-300'} 
        ${errors[id] ? 'focus:border-red-light' : 'focus:border-black'}`}
				/>
			</div>
			<div className='self-center text-red-light'>
				{errors[id] && <>{errors[id]?.message}</>}
			</div>
		</div>
	)
}

export default ModalInput
