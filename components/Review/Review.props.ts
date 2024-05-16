import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ReviewModel } from '@/interfaces/product.interface'
import { SafeUser } from '@/interfaces'

export interface ReviewProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: ReviewModel
	manage?: boolean
}
