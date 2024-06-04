import { cva } from 'class-variance-authority'

export const cvaButton = cva([
	'hover:opacity-80 transition cursor-pointer gap-2 w-full'
])

export const cvaBought = cva([
	'flex items-center justify-center text-green h-full'
])
