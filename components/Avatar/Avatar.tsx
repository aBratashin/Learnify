'use client'

import Image from 'next/image'
import { FC } from 'react'
import { AvatarProps } from './Avatar.props'
import AvatarIcon from './avatar.svg'

const Avatar: FC<AvatarProps> = ({ src }) => {
	if (src) {
		return (
			<Image
				className='rounded-full'
				height={30}
				width={30}
				alt='Avatar'
				src={src}
			/>
		)
	}

	return (
		<AvatarIcon className='rounded-full' height='30' width='30' alt='Avatar' />
	)
}

export default Avatar
