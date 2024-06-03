import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface DeleteButtonProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: string
	isReview?: boolean
}
