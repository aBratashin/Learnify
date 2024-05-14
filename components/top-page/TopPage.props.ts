import { SafeUser } from '@/interfaces'
import { TopPageModel } from '@/interfaces/page.interface'
import { ProductModel } from '@/interfaces/product.interface'

export interface TopPageProps {
	page: TopPageModel
	products: ProductModel[]
	currentUser?: SafeUser | null
}
