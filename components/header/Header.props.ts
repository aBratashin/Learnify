import { SafeUser } from '@/interfaces'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface HeaderProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	currentUser?: SafeUser | null
}
