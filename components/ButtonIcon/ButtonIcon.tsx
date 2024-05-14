import React, { FC } from 'react'
import { ButtonIconProps, icons } from './ButtonIcon.Props'
import classNames from 'classnames'
import {
	cvaButtonIcon,
	cvaButtonIconGhost,
	cvaButtonIconPrimary
} from './ButtonIconStyle'

const ButtonIcon: FC<ButtonIconProps> = ({
	appearance,
	icon,
	className,
	...props
}) => {
	const IconComp = icons[icon]

	return (
		<button
			className={classNames(cvaButtonIcon(), className, {
				[cvaButtonIconPrimary()]: appearance == 'primary',
				[cvaButtonIconGhost()]: appearance == 'white'
			})}
			{...props}
		>
			<IconComp />
		</button>
	)
}

export default ButtonIcon
