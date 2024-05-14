import { cva } from 'class-variance-authority'

export const cvaButtonIcon = cva([
	'w-10 h-10 flex items-center justify-center rounded-lg shadow-sm cursor-pointer'
])

export const cvaButtonIconPrimary = cva(['bg-primary text-white hover:primary'])

export const cvaButtonIconGhost = cva([
	'bg-white text-primary hover:primary hover:text-white'
])
