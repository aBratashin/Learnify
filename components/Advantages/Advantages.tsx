import React, { FC } from 'react'
import { advantagesProps } from './Advantages.props'
import CheckIcon from './check.svg'
import { cvaTitle, cvaWrapper, cvaDescription } from './AdvantagesStyle'

const Advantages: FC<advantagesProps> = ({ advantages }) => {
	return (
		<>
			{advantages.map(a => (
				<div key={a._id} className={cvaWrapper()}>
					<CheckIcon />
					<div className={cvaTitle()}>{a.title}</div>
					<div className={cvaDescription()}>{a.description}</div>
				</div>
			))}
		</>
	)
}

export default Advantages
