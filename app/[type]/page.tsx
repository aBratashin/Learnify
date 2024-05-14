import getAllProducts from '@/actions/getAllProducts'
import getCurrentUser from '@/actions/getCurrentUser'
import { firstLevelMenu } from '@/helpers/helpers'
import ProductList from '@/components/ProductsList/ProductList'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Список курсов'
}

export async function generateStaticParams() {
	return firstLevelMenu.map(item => ({
		type: item.route
	}))
}

export default async function Home({ params }: { params: { type: string } }) {
	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)

	if (!firstCategoryItem) {
		notFound()
	}

	const products = await getAllProducts()
	const currentUser = await getCurrentUser()

	return <ProductList products={products} currentUser={currentUser} />
}
