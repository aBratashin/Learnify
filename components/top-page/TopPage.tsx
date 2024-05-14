'use client'
import React, { FC, useEffect, useReducer } from 'react'
import { TopPageProps } from '@/components/top-page/TopPage.props'
import H from '@/components/H/H'
import Tag from '@/components/Tag/Tag'
import HhData from '@/components/HhData/HhData'
import Advantages from '@/components/Advantages/Advantages'
import classes from './TopPage.module.css'
import Sort from '@/components/Sort/Sort'
import { SortEnum } from '@/components/Sort/Sort.props'
import { sortReducer } from '@/components/top-page/sort.reducer'
import Product from '@/components/Product/Product'
import { useReducedMotion } from 'framer-motion'

const TopPage: FC<TopPageProps> = ({ page, products, currentUser }) => {
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

	return (
		<div>
			<div className='grid grid-cols-[auto,1fr] items-center justify-items-start gap-5 mb-[30px] lg:grid-cols-[auto,1fr,auto]'>
				<H tag='h1'>{page.title}</H>
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
				{sortedProducts &&
					sortedProducts.map(p => (
						<Product
							role='listitem'
							layout={shouldReduceMotion ? false : true}
							key={p.id}
							product={p}
							currentUser={currentUser}
						/>
					))}
			</div>
			<div className='grid grid-cols-[auto,1fr] items-baseline justify-items-start gap-5'>
				<H tag='h2'>Вакансии - {page.category}</H>
				{products && (
					<Tag color='red' size='medium'>
						hh.ru
					</Tag>
				)}
			</div>
			{page.hh && <HhData {...page.hh} />}
			{page.advantages && page.advantages.length > 1 && (
				<>
					<H tag='h2'>Преимущества</H>
					<Advantages advantages={page.advantages} />
				</>
			)}
			{page.seoText && (
				<div
					className={classes.seo}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				></div>
			)}
			<H tag='h2'>Получаемые навыки</H>
			<div className='flex flex-wrap gap-2'>
				{page.tags.map(t => (
					<Tag key={t} color='primary' size='medium'>
						{t}
					</Tag>
				))}
			</div>
		</div>
	)
}

export default TopPage
