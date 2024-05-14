import { cva } from 'class-variance-authority'

export const cvaSortWrapper = cva(['grid grid-cols-[auto,auto] gap-10'])

export const cvaSortHidden = cva(['hidden'])

export const cvaSortButton = cva(['flex items-center cursor-pointer'])

export const cvaSortEnum = cva(['font-bold text-primary'])

export const cvaSortIcon = cva(['mr-2'])
