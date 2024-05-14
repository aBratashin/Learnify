import getCurrentUser from '@/actions/getCurrentUser'
import getFavoriteProducts from '@/actions/getFavoriteProducts'
import FavoritesList from '@/components/FavoritesList/FavoritesList'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Избранное'
}

const Favorites = async () => {
	const products = await getFavoriteProducts()
	const currentUser = await getCurrentUser()

	return <FavoritesList products={products} currentUser={currentUser} />
}

export default Favorites
