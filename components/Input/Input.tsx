import React, { ForwardedRef, forwardRef } from 'react'
import { InputProps } from './Input.props'
import classNames from 'classnames'
import {
	cvaInput,
	cvaInputError,
	cvaInputSpan,
	cvaInputWrapper
} from './InputStyle'

export const Input = forwardRef(
	(
		{ className, error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className={classNames(className, [cvaInputWrapper()])}>
				<input
					ref={ref}
					className={classNames([cvaInput()], {
						[cvaInputError()]: error
					})}
					{...props}
				/>
				<div>
					{error && (
						<span className={cvaInputSpan()} role='alert'>
							{error.message}
						</span>
					)}
				</div>
			</div>
		)
	}
)

Input.displayName = 'Input'

export default Input
