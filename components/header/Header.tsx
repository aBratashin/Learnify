'use client'
import React, { FC, useEffect, useState } from 'react'
import { HeaderProps } from '@/components/header/Header.props'
import classNames from 'classnames'
import Sidebar from '@/components/sidebar/Sidebar'
import Logo from '@/app/Logo.svg'
import classes from './Header.module.css'
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'
import { motion, useReducedMotion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

const Header: FC<HeaderProps> = ({ currentUser, className, ...props }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const path = usePathname()
	const shouldReduceMotion = useReducedMotion()

	useEffect(() => {
		setIsOpened(false)
	}, [path])

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: shouldReduceMotion ? 1 : 0,
			x: '100%'
		}
	}

	const router = useRouter()

	return (
		<header className={classNames(className, classes.header)} {...props}>
			<Logo onClick={() => router.push('/')} className='cursor-pointer' />
			<ButtonIcon
				aria-label='Кнопка бургер-меню'
				appearance='white'
				icon='menu'
				onClick={() => setIsOpened(true)}
			/>
			<motion.div
				className={classes.mobileMenu}
				variants={variants}
				initial={'closed'}
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar currentUser={currentUser} />
				<ButtonIcon
					aria-label='Кнопка закрыть бургер-меню'
					className={classes.menuClose}
					appearance='white'
					icon='close'
					onClick={() => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	)
}

export default Header
