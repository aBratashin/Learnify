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

	const handleDelete = async (id: string) => {
		axios
			.post('/api/manageCourses', { id })
			.then(() => {
				toast.success('Курс успешно удален')
				router.refresh()
			})
			.catch(() => {
				toast.error('Что-то пошло не так')
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
