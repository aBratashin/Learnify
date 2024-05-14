import React, { FC } from 'react'
import { PProps } from './P.props'
import classNames from 'classnames'
import { cvaPLarge, cvaPMedium, cvaPSmall } from './PStyle'

const P: FC<PProps> = ({ children, size = 'medium', className, ...props }) => {
	return (
		<p
			className={classNames(className, {
				[cvaPSmall()]: size === 'small',
				[cvaPMedium()]: size === 'medium',
				[cvaPLarge()]: size === 'large'
			})}
			{...props}
		>
			{children}
		</p>
	)
}

export default P
