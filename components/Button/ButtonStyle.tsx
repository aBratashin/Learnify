import { cva } from 'class-variance-authority'

export const cvaButton = cva([
	'rounded-[5px] text-center text-sm cursor-pointer p-2.5 border-none transition-all group flex items-center justify-center hover:scale-105'
])

export const cvaPrimary = cva([
	'border-[1px] border-solid border-white bg-primary text-white hover:bg-primary-hover'
])

export const cvaGhost = cva([
	'border-[1px] border-solid border-gray-light bg-white text-black hover:text-white hover:bg-primary'
])

export const cvaSpan = cva(['inline-block ml-2.5 transition-all'])

export const cvaSpanDown = cva(['rotate-90'])

export const cvaImagePrimary = cva(['fill-white'])

export const cvaImageGhost = cva(['group-hover:fill-white'])
