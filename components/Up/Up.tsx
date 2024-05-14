'use client'
import React, { useEffect } from 'react'
import { useScrollY } from '@/hooks/useScrollY'
import { motion, useAnimation } from 'framer-motion'
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'
import { cvaUp } from './UpStyle'

const Up = () => {
	const controls = useAnimation()

	const y = useScrollY()

	useEffect(() => {
		if (y > 500) {
			controls.start({ opacity: 1, display: 'block' })
		} else {
			controls.start({ opacity: 0, display: 'none' })
		}
	}, [y, controls])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	return (
		<motion.div
			className={cvaUp()}
			animate={controls}
			initial={{ opacity: 0, display: 'none' }}
		>
			<ButtonIcon
				icon='up'
				appearance='primary'
				onClick={scrollToTop}
				aria-label='Подняться в самый верх сайта'
			/>
		</motion.div>
	)
}

export default Up
