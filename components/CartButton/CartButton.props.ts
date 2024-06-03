import { SafeUser } from '@/interfaces'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface CartButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	courseId: string
	currentUser?: SafeUser | null
}
