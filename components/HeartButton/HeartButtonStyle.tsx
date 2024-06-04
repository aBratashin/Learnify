import { cva } from 'class-variance-authority'

export const cvaWrapper = cva([
	'relative hover:opacity-80 transition cursor-pointer'
])

export const cvaIcon = cva(['fill-black absolute -top-[2px] -right-[2px]'])
