import getCartProducts from '@/actions/getCartProducts'
import getCurrentUser from '@/actions/getCurrentUser'
import CartList from '@/components/CartList/CartList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Корзина'
}

const Cart = async () => {
	const products = await getCartProducts()
	const currentUser = await getCurrentUser()

	return (
		<>
			<CartList products={products} currentUser={currentUser} />
		</>
	)
}

export default Cart
