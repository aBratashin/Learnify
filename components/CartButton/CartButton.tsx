'use client'

import useCart from '@/hooks/useCart'
import { FC } from 'react'
import { IoIosCart } from 'react-icons/io'
import Button from '../Button/Button'
import { CartButtonProps } from './CartButton.props'
import { cvaBought, cvaButton } from './CartButtonStyle'

const CartButton: FC<CartButtonProps> = ({ courseId, currentUser }) => {
	const { hasCart, toggleCart } = useCart({
		courseId,
		currentUser
	})

	if (currentUser?.boughtIds.includes(courseId)) {
		return <div className={cvaBought()}>Курс приобретен</div>
	}

	return (
		<Button
			onClick={toggleCart}
			className={cvaButton()}
			appearance={hasCart ? 'primary' : 'ghost'}
			aria-label={hasCart ? 'Убрать из корзины' : 'Добавить в корзину'}
		>
			{hasCart ? 'Убрать из корзины' : 'Добавить в корзину'}
			<IoIosCart size={24} />
		</Button>
	)
}

export default CartButton
