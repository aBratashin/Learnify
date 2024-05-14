import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ProductModel } from '@/interfaces/product.interface'
import { SafeUser } from '@/interfaces'

export interface ProductProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	product: ProductModel
	currentUser?: SafeUser | null
	manage?: boolean
}
