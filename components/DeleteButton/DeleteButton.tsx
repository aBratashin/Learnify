'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'
import { DeleteButtonProps } from './DeleteButton.props'
import { cvaIcon, cvaWrapper } from './DeleteButtonStyle'

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
			className={cvaWrapper()}
			title={isReview ? 'Удалить отзыв' : 'Удалить курс'}
			aria-label={isReview ? 'Удалить отзыв' : 'Удалить курс'}
		>
			<MdDelete size={30} className={cvaIcon()} />
		</div>
	)
}

export default DeleteButton
