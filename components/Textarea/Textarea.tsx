import React, { ForwardedRef, forwardRef } from 'react'
import { TextareaProps } from './Textarea.props'
import classNames from 'classnames'
import {
	cvaTextarea,
	cvaTextareaError,
	cvaTextareaSpan,
	cvaTextareaWrapper
} from './TextareaStyle'

const Textarea = forwardRef(
	(
		{ className, error, ...props }: TextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		return (
			<div className={classNames(className, [cvaTextareaWrapper()])}>
				<textarea
					ref={ref}
					className={classNames([cvaTextarea()], {
						[cvaTextareaError()]: error
					})}
					{...props}
				/>
				{error && (
					<span className={cvaTextareaSpan()} role='alert'>
						{error.message}
					</span>
				)}
			</div>
		)
	}
)

Textarea.displayName = 'Textarea'

export default Textarea
