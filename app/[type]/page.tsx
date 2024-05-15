import getAllProducts from '@/actions/getAllProducts'
import getCurrentUser from '@/actions/getCurrentUser'
import ProductList from '@/components/ProductsList/ProductList'
import Spinner from '@/components/Spinner/Spinner'
import { firstLevelMenu } from '@/helpers/helpers'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
export const metadata: Metadata = {
	title: 'Список курсов'
}

export async function generateStaticParams() {
	return firstLevelMenu.map(item => ({
		type: item.route
	}))
}

const Home = async ({ params }: { params: { type: string } }) => {
	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)

	if (!firstCategoryItem) {
		notFound()
	}

	const products = await getAllProducts()
	const currentUser = await getCurrentUser()

	return <ProductList products={products} currentUser={currentUser} />
}

const HomeWrapper = (props: { params: { type: string } }) => {
	return (
		<Suspense fallback={<Spinner />}>
			<Home {...props} />
		</Suspense>
	)
}

export default HomeWrapper
