import { cva } from 'class-variance-authority'

export const cvaTagWrapper = cva([
	'inline-block mr-[5px] rounded-[20px] text-center'
])

export const cvaTagSmall = cva(['text-xs leading-3'])

export const cvaTagMedium = cva(['text-sm leading-[14px]'])

export const cvaTagSmallPadding = cva(['py-[5px] px-2.5 text-xs leading-3'])

export const cvaTagMediumPadding = cva([
	'py-[5px] px-2.5 text-sm leading-[14px]'
])

export const cvaTagGhost = cva([
	'bg-none border-[1px] border-solid border-gray-light font-medium'
])

export const cvaTagRed = cva(['bg-red text-white font-semibold'])

export const cvaTagGray = cva(['bg-gray text-white font-semibold'])

export const cvaTagGreen = cva(['bg-green-light text-green font-bold'])

export const cvaTagPrimary = cva([
	'bg-none border-[1px] border-solid border-primary text-primary'
])

export const cvaTagLink = cva(['py-[5px] px-2.5 block w-full h-full'])
