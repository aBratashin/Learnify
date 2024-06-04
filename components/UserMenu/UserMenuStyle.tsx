import { cva } from 'class-variance-authority'

export const cvaWrapper = cva(['relative'])

export const cvaContainer = cva(['flex flex-row items-center gap-3'])

export const cvaModal = cva([
	'w-full p-4 md:py-1 px-2 border-[1px] border-neutral-200 flex items-center justify-between gap-4 rounded-md cursor-pointer hover:shadow-md transition max-h-[50px]'
])

export const cvaInfo = cva(['flex items-center justify-center gap-4'])

export const cvaAccount = cva([
	'text-sm font-semibold rounded-full hover:bg-neutral-100 transition cursor-pointer'
])

export const cvaModalOpen = cva([
	'absolute rounded-md shadow-md w-full bg-white overflow-hidden left-0 top-14 text-sm'
])

export const cvaModalOpenContainer = cva(['flex flex-col cursor-pointer'])

export const cvaHr = cva(['opacity-20'])
