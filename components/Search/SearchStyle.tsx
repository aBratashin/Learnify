import { cva } from 'class-variance-authority'

export const cvaSearchForm = cva(['relative w-full'])

export const cvaSearchInput = cva(['*-[input]:w-full'])

export const cvaSearchButton = cva([
	'absolute top-[3px] right-[3px] w-[30px] h-[30px] p-[7px]'
])
