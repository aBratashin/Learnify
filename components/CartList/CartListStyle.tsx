import { cva } from 'class-variance-authority'

export const cvaWrapper = cva([
	'grid grid-cols-[auto,1fr] items-center justify-items-start gap-5 mb-[30px] sm:grid-cols-[auto,1fr,auto]'
])

export const cvaPrice = cva([
	'flex flex-col items-start justify-start gap-5 sm:flex-row sm:items-center sm:justify-between'
])

export const cvaButton = cva([
	'bg-rose-500 w-[200px] h-10 text-white rounded-md hover:scale-105 transition-all'
])

export const cvaErrorContainer = cva([
	'flex flex-col items-center justify-center gap-2 h-full w-full text-center'
])

export const cvaErrorTitle = cva(['font-bold text-2xl'])

export const cvaErrorSubtitle = cva(['font-normal text-md'])
