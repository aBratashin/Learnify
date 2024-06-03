'use client'
import H from '@/components/H/H'
import Product from '@/components/Product/Product'
import Sort from '@/components/Sort/Sort'
import { SortEnum } from '@/components/Sort/Sort.props'
import Tag from '@/components/Tag/Tag'
import { sortReducer } from '@/components/top-page/sort.reducer'
import { useReducedMotion } from 'framer-motion'
import { FC, useEffect, useReducer } from 'react'
import { SearchListProps } from './SearchList.props'
import {
	cvaErrorContainer,
	cvaErrorSubtitle,
	cvaErrorTitle,
	cvaWrapper
} from './SearchListStyle'

const SearchList: FC<SearchListProps> = ({ products, currentUser, title }) => {
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
				<h1 className={cvaErrorTitle()}>
					По Вашему запросу ничего не найдено!
				</h1>
				<h2 className={cvaErrorSubtitle()}>
					Попробуйте поменять параметры поиска
				</h2>
			</div>
		)
	}

	return (
		<div>
			<div className={cvaWrapper()}>
				<H tag='h1'>Поиск: {title}</H>
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

export default SearchList
