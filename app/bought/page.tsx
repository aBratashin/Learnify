import getBoughtProducts from '@/actions/getBoughtProducts'
import getCurrentUser from '@/actions/getCurrentUser'
import BoughtList from '@/components/BoughtList/BoughtList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Ваши курсы'
}

const Cart = async () => {
	const products = await getBoughtProducts()
	const currentUser = await getCurrentUser()

	return (
		<>
			<BoughtList products={products} currentUser={currentUser} />
		</>
	)
}

export default Cart
