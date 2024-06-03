import { cva } from "class-variance-authority";

export const cvaWrapper = cva([
	'w-full p-10 bg-yellow-200 rounded-xl flex justify-center items-center flex-col lg:flex-row lg:items-start gap-10'
])

export const cvaContainer = cva([
	'grow w-full lg:w-1/2'
])

export const cvaInfoTitle = cva([
	'text-black font-bold text-2xl xl:text-4xl lg:text-3xl'
])

export const cvaInfoText = cva([
	'mt-5 text-md'
])

export const cvaForm = cva([
	'flex flex-col gap-5'
])

export const cvaInput = cva([
	'[&>input]:w-full [&>input]:h-12'
])

export const cvaInputContainer = cva([
	'flex gap-5 flex-col xl:flex-row'
])

export const cvaButton = cva([
	'self-center w-1/2'
])
