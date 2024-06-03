'use client'

import useFavorite from '@/hooks/useFavorite'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { HeartButtonProps } from './HeartButton.props'
import { cvaIcon, cvaWrapper } from './HeartButtonStyle'

const HeartButton: FC<HeartButtonProps> = ({ courseId, currentUser }) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		courseId,
		currentUser
	})

	return (
		<div
			onClick={toggleFavorite}
			className={cvaWrapper()}
			title={hasFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
			aria-label={
				hasFavorited ? 'Убрать из избранного' : 'Добавить в избранное'
			}
		>
			<AiOutlineHeart size={30} className={cvaIcon()} />
			<AiFillHeart
				size={26}
				className={hasFavorited ? 'fill-primary' : 'fill-gray'}
			/>
		</div>
	)
}

export default HeartButton
