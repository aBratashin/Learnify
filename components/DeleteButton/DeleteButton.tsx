'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'

interface DeleteButtonProps {
	courseId: string
}

const DeleteButton: FC<DeleteButtonProps> = ({ courseId }) => {
	const router = useRouter()

	const handleDelete = (id: string) => {
		toast.promise(axios.post('/api/manageCourses', { id }), {
			loading: 'Удаление...',
			success: () => {
				router.refresh()
				return 'Курс успешно удален'
			},
			error: 'Что-то пошло не так'
		})
	}

	return (
		<div
			onClick={() => handleDelete(courseId)}
			className='relative hover:opacity-80 transition cursor-pointer'
			title='Удалить курс'
			aria-label='Удалить курс'
		>
			<MdDelete size={30} className='text-red-light' />
		</div>
	)
}

export default DeleteButton
