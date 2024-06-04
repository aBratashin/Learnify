import { cva } from 'class-variance-authority'

export const cvaWrapper = cva([
	'w-full p-8 bg-primary border-purple border-solid rounded-xl flex flex-col gap-10 shadow-lg'
])

export const cvaTitle = cva([
	'text-white p-4 font-bold text-2xl xl:text-4xl lg:text-3xl'
])

export const cvaItems = cva([
	'grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 p-4'
])

export const cvaItemLink = cva([
	'bg-white p-2 rounded-3xl font-medium h-14 flex items-center justify-center text-center transition hover:bg-black hover:text-white'
])
