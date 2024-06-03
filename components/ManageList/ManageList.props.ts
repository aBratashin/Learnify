import { SafeUser } from '@/interfaces'
import { ProductModel } from '@/interfaces/product.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ManageListProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	products: ProductModel[]
	currentUser?: SafeUser | null
}
