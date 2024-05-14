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
import { FC, useEffect, useReducer, useState } from 'react'
import Search from '../Search/Search'

interface ManageListProps {
	products: ProductModel[]
	currentUser?: SafeUser | null
}

const ManageList: FC<ManageListProps> = ({ products, currentUser }) => {
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

	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const filteredProducts = sortedProducts.filter(
		product =>
			product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(product.description &&
				product.description.toLowerCase().includes(searchTerm.toLowerCase()))
	)

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products })
	}, [products])

	if (products.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center gap-2 h-full w-full text-center'>
				<h1 className='font-bold text-2xl'>Список курсов пуст!</h1>
			</div>
		)
	}

	return (
		<div className='flex flex-col'>
			<div className='grid grid-cols-[auto,1fr] items-center justify-items-start gap-5 mb-[30px] sm:grid-cols-[auto,1fr,auto]'>
				<H tag='h1'>Управление курсами</H>
				{products && (
					<Tag
						color='gray'
						size='medium'
						aria-label={products.length + 'элементов'}
					>
						{filteredProducts.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<Search
				manage
				value={searchTerm}
				onChange={handleSearch}
				className='!w-[200px] self-start sm:self-end'
			/>
			<div role='list'>
				{filteredProducts.map(p => (
					<Product
						role='listitem'
						layout={shouldReduceMotion ? false : true}
						key={p.id}
						product={p}
						currentUser={currentUser}
						manage
					/>
				))}
			</div>
		</div>
	)
}

export default ManageList
