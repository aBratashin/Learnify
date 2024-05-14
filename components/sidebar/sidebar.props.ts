import { SafeUser } from '@/interfaces'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface SidebarProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	currentUser?: SafeUser | null
}
