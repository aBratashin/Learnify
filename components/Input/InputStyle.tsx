import { cva } from 'class-variance-authority'

export const cvaInputWrapper = cva(['relative'])

export const cvaInput = cva([
	'py-[7px] px-[15px] text-black border-none outline-primary bg-white shadow-md rounded text-[16px] leading-[22px]'
])

export const cvaInputError = cva(['outline-red'])

export const cvaInputSpan = cva(['absolute bottom-[-20px] left-0 text-red '])
