import { cva } from 'class-variance-authority'

export const cvaWrapper = cva([
	'grid grid-cols-1 xl:grid-cols-2 gap-10 mt-5 mb-14'
])

export const cvaWhy = cva(['p-4'])

export const cvaTitle = cva([
	'text-black font-bold text-2xl xl:text-4xl lg:text-3xl'
])

export const cvaContainer = cva(['grid grid-cols-1 md:grid-cols-2 gap-4'])

export const cvaItem = cva(['p-4 shadow-lg rounded-3xl'])

export const cvaItemTitle = cva(['text-3xl font-bold'])

export const cvaItemText = cva(['font-medium'])
