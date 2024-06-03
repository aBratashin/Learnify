import { SafeUser } from '@/interfaces'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface UserMenuProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	currentUser?: SafeUser | null
}
