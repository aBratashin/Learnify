'use client'

import useCart from '@/hooks/useCart'
import { SafeUser } from '@/interfaces'
import { FC } from 'react'
import { IoIosCart } from 'react-icons/io'
import Button from '../Button/Button'

interface CartButtonProps {
	courseId: string
	currentUser?: SafeUser | null
}

const CartButton: FC<CartButtonProps> = ({ courseId, currentUser }) => {
	const { hasCart, toggleCart } = useCart({
		courseId,
		currentUser
	})

	if (currentUser?.boughtIds.includes(courseId)) {
		return (
			<div className='flex items-center justify-center text-green h-full'>
				Курс приобретен
			</div>
		)
	}

	return (
		<Button
			onClick={toggleCart}
			className='hover:opacity-80 transition cursor-pointer gap-2 w-full'
			appearance={hasCart ? 'primary' : 'ghost'}
			aria-label={hasCart ? 'Убрать из корзины' : 'Добавить в корзину'}
		>
			{hasCart ? 'Убрать из корзины' : 'Добавить в корзину'}
			<IoIosCart size={24} />
		</Button>
	)
}

export default CartButton
