'use client'
import { sortReducer } from '@/components/top-page/sort.reducer'
import { priceRu } from '@/helpers/helpers'
import { SafeUser } from '@/interfaces'
import { ProductModel } from '@/interfaces/product.interface'
import H from '@/components/H/H'
import Product from '@/components/Product/Product'
import Sort from '@/components/Sort/Sort'
import { SortEnum } from '@/components/Sort/Sort.props'
import Tag from '@/components/Tag/Tag'
import axios from 'axios'
import { useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useReducer } from 'react'
import toast from 'react-hot-toast'
import Button from '../Button/Button'

interface CartListProps {
	products: ProductModel[]
	currentUser?: SafeUser | null
}

const CartList: FC<CartListProps> = ({ products, currentUser }) => {
	const router = useRouter()

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
					У Вас отсутствуют курсы в корзине!
				</h1>
				<h2 className='font-normal text-md'>
					Добавьте курс в корзину для отображения
				</h2>
			</div>
		)
	}

	const total = products.reduce((sum, product) => sum + product.price, 0)
	const productsIds = products.map(item => item.id)
	const desc = [currentUser?.id, ...productsIds]

	const handlePay = async () => {
		axios
			.post('/api/payment', { total, desc })
			.then(res => {
				router.push(res.data.confirmation.confirmation_url)
			})
			.catch(() => {
				toast.error('Ошибка при оплате товара')
			})
	}

	return (
		<div>
			<div className='grid grid-cols-[auto,1fr] items-center justify-items-start gap-5 mb-[30px] sm:grid-cols-[auto,1fr,auto]'>
				<H tag='h1'>Корзина</H>
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
			<div className='flex flex-col items-start justify-start gap-5 sm:flex-row sm:items-center sm:justify-between'>
				<H tag='h1'>К оплате: {priceRu(total)}</H>
				<button
					onClick={handlePay}
					className='bg-rose-500 w-[200px] h-10 text-white rounded-md hover:scale-105 transition-all'
				>
					Купить
				</button>
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

export default CartList
