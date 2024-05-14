import React, { FC } from 'react'
import { TagProps } from './Tag.props'
import classNames from 'classnames'
import {
	cvaTagGhost,
	cvaTagGray,
	cvaTagGreen,
	cvaTagLink,
	cvaTagMedium,
	cvaTagMediumPadding,
	cvaTagPrimary,
	cvaTagRed,
	cvaTagSmall,
	cvaTagSmallPadding,
	cvaTagWrapper
} from './TagStyle'

const Tag: FC<TagProps> = ({
	size = 'small',
	color = 'ghost',
	href = '',
	children,
	className,
	...props
}) => {
	return (
		<div
			className={classNames(className, [cvaTagWrapper()], {
				[cvaTagSmall()]: href !== '' && size === 'small',
				[cvaTagMedium()]: href !== '' && size === 'medium',
				[cvaTagSmallPadding()]: href === '' && size === 'small',
				[cvaTagMediumPadding()]: href === '' && size === 'medium',
				[cvaTagGhost()]: color === 'ghost',
				[cvaTagRed()]: color === 'red',
				[cvaTagGray()]: color === 'gray',
				[cvaTagGreen()]: color === 'green',
				[cvaTagPrimary()]: color === 'primary'
			})}
			{...props}
		>
			{href ? (
				<a href={href} className={cvaTagLink()} target='_blank'>
					{children}
				</a>
			) : (
				<>{children}</>
			)}
		</div>
	)
}

export default Tag
