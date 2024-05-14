'use client'
import { sortReducer } from '@/components/top-page/sort.reducer'
import { SafeUser } from '@/interfaces'
import { ProductModel } from '@/interfaces/product.interface'
import H from '@/components/H/H'
import Product from '@/components/Product/Product'
import Sort from '@/components/Sort/Sort'
import { SortEnum } from '@/components/Sort/Sort.props'
import Tag from '@/components/Tag/Tag'
import { useReducedMotion } from 'framer-motion'
import { FC, useEffect, useReducer } from 'react'

interface FavoritesListProps {
	products: ProductModel[]
	currentUser?: SafeUser | null
}

const FavoritesList: FC<FavoritesListProps> = ({ products, currentUser }) => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{
			products,
			sort: SortEnum.Rating
		}
	)

	const shouldReduceMotion = useReducedMotion()

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort })
	}

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products })
	}, [products])

	if (products.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center gap-2 h-full w-full text-center'>
				<h1 className='font-bold text-2xl'>
					У Вас отсутствуют избранные курсы!
				</h1>
				<h2 className='font-normal text-md'>
					Добавьте курс в избранное для отображения
				</h2>
			</div>
		)
	}

	return (
		<div>
			<div className='grid grid-cols-[auto,1fr] items-center justify-items-start gap-5 mb-[30px] sm:grid-cols-[auto,1fr,auto]'>
				<H tag='h1'>Избранное</H>
				{products && (
					<Tag
						color='gray'
						size='medium'
						aria-label={products.length + 'элементов'}
					>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role='list'>
				{products.map(p => (
					<Product
						role='listitem'
						layout={shouldReduceMotion ? false : true}
						key={p.id}
						product={p}
						currentUser={currentUser}
					/>
				))}
			</div>
		</div>
	)
}

export default FavoritesList
