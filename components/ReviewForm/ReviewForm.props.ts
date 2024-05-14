import { SafeUser } from '@/interfaces'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ReviewFormProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	product_id: string
	isOpened: boolean
	currentUser?: SafeUser | null
}
