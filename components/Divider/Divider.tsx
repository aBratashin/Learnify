import React, { FC } from 'react'
import { DividerProps } from './Divider.props'
import classNames from 'classnames'
import { cvaDivider } from './DividerStyle'

const Divider: FC<DividerProps> = ({ className, ...props }) => {
	return <hr className={classNames(className, [cvaDivider()])} {...props} />
}

export default Divider
