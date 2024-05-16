'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'

interface DeleteButtonProps {
	id: string
	isReview?: boolean
}

const DeleteButton: FC<DeleteButtonProps> = ({ id, isReview = false }) => {
	const router = useRouter()

	const handleDelete = (itemId: string) => {
		const apiEndpoint = isReview ? '/api/deleteReview' : '/api/manageCourses'
		toast.promise(axios.post(apiEndpoint, { id: itemId }), {
			loading: 'Удаление...',
			success: () => {
				router.refresh()
				return isReview ? 'Отзыв успешно удален' : 'Курс успешно удален'
			},
			error: 'Что-то пошло не так'
		})
	}

	return (
		<div
			onClick={() => handleDelete(id)}
			className='relative hover:opacity-80 transition cursor-pointer'
			title={isReview ? 'Удалить отзыв' : 'Удалить курс'}
			aria-label={isReview ? 'Удалить отзыв' : 'Удалить курс'}
		>
			<MdDelete size={30} className='text-red-light' />
		</div>
	)
}

export default DeleteButton
