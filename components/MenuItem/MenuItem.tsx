'use client'

import { FC } from 'react'
import { MenuItemProps } from './MenuItem.props'
import { cvaWrapper } from './MenuItemStyle'

const MenuItem: FC<MenuItemProps> = ({ onClick, label }) => {
	return (
		<div onClick={onClick} className={cvaWrapper()}>
			{label}
		</div>
	)
}

export default MenuItem
