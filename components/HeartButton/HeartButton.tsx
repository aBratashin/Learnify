'use client'

import useFavorite from '@/hooks/useFavorite'
import { SafeUser } from '@/interfaces'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
	courseId: string
	currentUser?: SafeUser | null
}

const HeartButton: FC<HeartButtonProps> = ({ courseId, currentUser }) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		courseId,
		currentUser
	})

	return (
		<div
			onClick={toggleFavorite}
			className='relative hover:opacity-80 transition cursor-pointer'
			title={hasFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
			aria-label={
				hasFavorited ? 'Убрать из избранного' : 'Добавить в избранное'
			}
		>
			<AiOutlineHeart
				size={30}
				className='fill-black absolute -top-[2px] -right-[2px]'
			/>
			<AiFillHeart
				size={26}
				className={hasFavorited ? 'fill-primary' : 'fill-gray'}
			/>
		</div>
	)
}

export default HeartButton
