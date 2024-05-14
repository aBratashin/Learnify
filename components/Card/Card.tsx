import React, { ForwardedRef, forwardRef } from 'react'
import { CardProps } from './Card.props'
import classNames from 'classnames'
import { cvaCard, cvaCardBlue, cvaCardWhite } from './CardStyle'

const Card = forwardRef(
	(
		{ className, children, color, ...props }: CardProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<div
				className={classNames(className, [cvaCard()], {
					[cvaCardWhite()]: color === 'white',
					[cvaCardBlue()]: color === 'blue'
				})}
				ref={ref}
				{...props}
			>
				{children}
			</div>
		)
	}
)

Card.displayName = 'Card'

export default Card
