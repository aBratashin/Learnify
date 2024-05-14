import getProductsByCategory from '@/actions/getProductsByCategory'
import getCurrentUser from '@/actions/getCurrentUser'
import getPage from '@/actions/getPage'
import TopPage from '@/components/top-page/TopPage'
import { MenuData } from '@/helpers/MenuData'
import { firstLevelMenu } from '@/helpers/helpers'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
	params
}: {
	params: { type: string; alias: string }
}): Promise<Metadata> {
	const page = await getPage(params.alias)
	return {
		title: page?.metaTitle
	}
}

export async function generateStaticParams() {
	let paths: string[] = []

	for (const m of firstLevelMenu) {
		paths = paths.concat(
			MenuData.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`))
		)
	}

	return paths.map(item => ({
		type: item.split('/')[1],
		alias: item.split('/')[2]
	}))
}

const PageProducts = async ({
	params
}: {
	params: { type: string; alias: string }
}) => {
	const firstCategoryMenu = firstLevelMenu.find(m => m.route === params.type)

	if (!firstCategoryMenu) {
		notFound()
	}

	const page = await getPage(params.alias)

	if (!page) {
		notFound()
	}

	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)

	if (!firstCategoryItem) {
		notFound()
	}

	const typePage = MenuData.flatMap(item =>
		item.pages.find(page => page.alias === params.alias)
	)

	if (typePage.length < 1) {
		return notFound()
	}

	const products = await getProductsByCategory({
		category: page.category
	})

	const currentUser = await getCurrentUser()

	return <TopPage page={page} products={products} currentUser={currentUser} />
}

export default PageProducts
