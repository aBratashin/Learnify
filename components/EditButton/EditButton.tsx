'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { MdEdit } from 'react-icons/md'
import Button from '../Button/Button'
import { EditButtonProps } from './EditButton.props'
import { cvaWrapper } from './EditButtonStyle'

const EditButton: FC<EditButtonProps> = ({ courseId }) => {
	const router = useRouter()

	const handleEdit = () => {
		router.push(`/edit?q=${courseId}`)
	}

	return (
		<Button
			onClick={handleEdit}
			className={cvaWrapper()}
			appearance='primary'
			aria-label='Редактирование курс'
		>
			Редактировать курс
			<MdEdit size={24} />
		</Button>
	)
}

export default EditButton
