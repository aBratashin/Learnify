import { SafeUser } from '@/interfaces'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface HeartButtonProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	courseId: string
	currentUser?: SafeUser | null
}
