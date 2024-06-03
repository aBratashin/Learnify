'use client'
import React, { FC } from 'react'
import { SyncLoader } from 'react-spinners'
import { SpinnerProps } from './Spinner..props'
import { cvaWrapper } from './SpinnerStyle'

const Spinner: FC<SpinnerProps> = () => {
	return (
		<div className={cvaWrapper()}>
			<SyncLoader color='#7351f5' speedMultiplier={1} />
		</div>
	)
}

export default Spinner
