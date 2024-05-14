'use client'
import React from 'react'
import { SyncLoader } from 'react-spinners'

const Spinner = () => {
	return (
		<div className='flex items-center justify-center h-full w-full'>
			<SyncLoader color='#7351f5' speedMultiplier={1} />
		</div>
	)
}

export default Spinner
