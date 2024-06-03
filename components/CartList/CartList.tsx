'use client'
import H from '@/components/H/H'
import Product from '@/components/Product/Product'
import Sort from '@/components/Sort/Sort'
import { SortEnum } from '@/components/Sort/Sort.props'
import Tag from '@/components/Tag/Tag'
import { sortReducer } from '@/components/top-page/sort.reducer'
import { priceRu } from '@/helpers/helpers'
import axios from 'axios'
import { useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useReducer } from 'react'
import toast from 'react-hot-toast'
import { CartListProps } from './CartList.props'
import {
	cvaButton,
	cvaErrorContainer,
	cvaErrorSubtitle,
	cvaErrorTitle,
	cvaPrice,
	cvaWrapper
} from './CartListStyle'

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
			<div className={cvaErrorContainer()}>
				<h1 className={cvaErrorTitle()}>У Вас отсутствуют курсы в корзине!</h1>
				<h2 className={cvaErrorSubtitle()}>
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
			<div className={cvaWrapper()}>
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
			<div className={cvaPrice()}>
				<H tag='h1'>К оплате: {priceRu(total)}</H>
				<button onClick={handlePay} className={cvaButton()}>
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
