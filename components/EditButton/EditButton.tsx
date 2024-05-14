'use client'

import { FC } from 'react'
import { MdEdit } from 'react-icons/md'
import Button from '../Button/Button'
import { useRouter } from 'next/navigation'

interface CartButtonProps {
	courseId: string
}

const CartButton: FC<CartButtonProps> = ({ courseId }) => {
	const router = useRouter()

	const handleEdit = () => {
		router.push(`/edit?q=${courseId}`)
	}

	return (
		<Button
			onClick={handleEdit}
			className='hover:opacity-80 transition cursor-pointer gap-2 w-full'
			appearance='primary'
			aria-label='Редактирование курс'
		>
			Редактировать курс
			<MdEdit size={24} />
		</Button>
	)
}

export default CartButton
