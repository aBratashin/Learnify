import { cva } from "class-variance-authority"

export const cvaWrapper = cva([
	'grid grid-cols-[auto,1fr] items-center justify-items-start gap-5 mb-[30px] sm:grid-cols-[auto,1fr,auto]'
])

export const cvaErrorContainer = cva([
	'flex flex-col items-center justify-center gap-2 h-full w-full text-center'
])

export const cvaErrorTitle = cva([
	'font-bold text-2xl'
])
