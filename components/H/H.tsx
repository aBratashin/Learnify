import React, { FC } from 'react'
import { HProps } from './H.props'
import { cvaH1, cvaH2, cvaH3 } from './HStyle'

const H: FC<HProps> = ({ tag, children, ...props }) => {
	switch (tag) {
		case 'h1':
			return (
				<h1 className={cvaH1()} {...props}>
					{children}
				</h1>
			)
		case 'h2':
			return (
				<h2 className={cvaH2()} {...props}>
					{children}
				</h2>
			)
		case 'h3':
			return (
				<h3 className={cvaH3()} {...props}>
					{children}
				</h3>
			)
		default:
			return <></>
	}
}

export default H
