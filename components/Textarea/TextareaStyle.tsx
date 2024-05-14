import { cva } from 'class-variance-authority'

export const cvaTextareaWrapper = cva(['relative'])

export const cvaTextarea = cva([
	'w-full py-[7px] px-[15px] text-black border-none outline-primary bg-white shadow-md rounded text-[16px] leading-[22px]'
])

export const cvaTextareaError = cva(['outline-red'])

export const cvaTextareaSpan = cva(['absolute bottom-[-15px] left-0 text-red'])
