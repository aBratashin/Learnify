import { SafeUser } from "@/interfaces"
import { ProductModel } from "@/interfaces/product.interface"

export interface CartListProps {
	products: ProductModel[]
	currentUser?: SafeUser | null
}