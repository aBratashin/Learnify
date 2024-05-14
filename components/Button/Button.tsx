import React, { FC } from 'react'
import { ButtonProps } from './Button.Props'
import classNames from 'classnames'
import ArrowImage from './arrow.svg'
import {
	cvaButton,
	cvaGhost,
	cvaImageGhost,
	cvaImagePrimary,
	cvaPrimary,
	cvaSpan,
	cvaSpanDown
} from './ButtonStyle'

const Button: FC<ButtonProps> = ({
	appearance,
	arrow = 'none',
	children,
	className,
	...props
}) => {
	return (
		<button
			className={classNames(className, [cvaButton()], {
				[cvaPrimary()]: appearance === 'primary',
				[cvaGhost()]: appearance === 'ghost'
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && (
				<span
					className={classNames([cvaSpan()], {
						[cvaSpanDown()]: arrow === 'down'
					})}
				>
					<ArrowImage
						className={classNames({
							[cvaImagePrimary()]: appearance === 'primary',
							[cvaImageGhost()]: appearance === 'ghost'
						})}
					/>
				</span>
			)}
		</button>
	)
}

export default Button
