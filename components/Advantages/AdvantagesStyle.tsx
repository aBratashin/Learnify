import { cva } from 'class-variance-authority'

export const cvaWrapper = cva([
	'grid grid-cols-[50px,1fr] gap-x-10 gap-y-2.5 mb-[30px] text-justify'
])

export const cvaTitle = cva(['self-center font-bold'])

export const cvaDescription = cva(['col-span-2'])
