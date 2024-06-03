import { cva } from "class-variance-authority";

export const cvaWrapper = cva([
	'flex flex-col gap-8'
])

export const cvaContainer = cva([
	'flex flex-col gap-2'
])

export const cvaContainerRelative = cva([
	'relative flex flex-col gap-2'
])

export const cvaInput = cva([
	'[&>input]:w-full'
])

export const cvaInputGrow = cva([
	'grow [&>input]:w-full'
])

export const cvaSpanError = cva([
	'absolute bottom-[-20px] left-0 text-red'
])

export const cvaTextarea = cva([
	'[&>textarea]:h-20'
])

export const cvaButton = cva([
	'self-center w-1/2'
])

