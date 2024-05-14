import { cva } from 'class-variance-authority'

export const cvaFillRed = cva(['fill-red-light'])

export const cvaWrapper = cva([
	'grid grid-cols-1 gap-[30px] xl:grid-cols-[1fr,3fr]'
])

export const cvaTotal = cva(['p-5 text-center'])

export const cvaTotalCount = cva([
	'font-bold text-4xl leading-[49px] text-primary'
])

export const cvaLevels = cva([
	'grid grid-cols-1 gap-x-0 gap-y-5 p-5 text-center md:grid-cols-3'
])

export const cvaLevelContainer = cva([
	'border-r-0 pb-5 border-b border-gray-light md:border-r md:border-b-0'
])

export const cvaHhDataTitle = cva([
	'font-light text-[20px] leading-[27px] mb-2.5'
])

export const cvaHhDataSalary = cva([
	'font-bold text-[26px] leading-[35px] mb-2.5'
])

export const cvaHhDataIcons = cva([
	'grid grid-cols-[20px,20px,20px] gap-2.5 justify-center'
])
