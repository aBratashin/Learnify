'use client'
import H from '@/components/H/H'
import Product from '@/components/Product/Product'
import Sort from '@/components/Sort/Sort'
import { SortEnum } from '@/components/Sort/Sort.props'
import Tag from '@/components/Tag/Tag'
import { sortReducer } from '@/components/top-page/sort.reducer'
import { useReducedMotion } from 'framer-motion'
import { FC, useEffect, useReducer } from 'react'
import { FavoritesListProps } from './FavoriteList.props'
import {
	cvaErrorContainer,
	cvaErrorSubtitle,
	cvaErrorTitle,
	cvaWrapper
} from './FavoriteListStyle'

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
			<div className={cvaErrorContainer()}>
				<h1 className={cvaErrorTitle()}>У Вас отсутствуют избранные курсы!</h1>
				<h2 className={cvaErrorSubtitle()}>
					Добавьте курс в избранное для отображения
				</h2>
			</div>
		)
	}

	return (
		<div>
			<div className={cvaWrapper()}>
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
