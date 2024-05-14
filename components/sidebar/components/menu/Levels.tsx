'use client'
import React, { FC, KeyboardEvent, useState } from 'react'
import classNames from 'classnames'
import {
	FirstLevelMenuItem,
	MenuItem,
	PageItem
} from '@/interfaces/menu.interface'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'

const buildThirdLevel = (
	pages: PageItem[],
	route: string,
	isOpened: boolean
) => {
	return pages.map(p => {
		const path = usePathname()
		const shouldReduceMotion = useReducedMotion()

		const exceptions = [
			'analytics-for-executives',
			'mobile-app-design',
			'sysadmin'
		]
		const isException = exceptions.includes(p.alias)

		const variantsChildren = {
			visible: { opacity: 1, height: isException ? '49px' : '29px' },
			hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 }
		}

		return (
			<motion.li key={p._id} variants={variantsChildren}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					href={`/${route}/${p.alias}`}
					aria-current={`/${route}/${p.alias}` === path ? 'page' : false}
					className={classNames(
						[
							'cursor-pointer text-[#6c7077] text-sm font-medium block mb-2.5 outline-offset-[-1px] hover:text-primary'
						],
						{
							['text-primary']: `/${route}/${p.alias}` === path
						}
					)}
				>
					{p.category}
				</Link>
			</motion.li>
		)
	})
}

interface Levels {
	menu: MenuItem[]
	menuItem: FirstLevelMenuItem
	setAnnounce: (announce: 'closed' | 'opened' | undefined) => void
}

const Levels: FC<Levels> = ({ menu, menuItem, setAnnounce }) => {
	const path = usePathname()
	const shouldReduceMotion = useReducedMotion()

	const [menuData, setMenuData] = useState(menu)

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion
				? {}
				: {
						when: 'beforeChildren',
						staggerChildren: 0.1
					}
		},
		hidden: { marginBottom: 0 }
	}

	const openSecondLevel = (secondCategory: string) => {
		setMenuData(
			menu.map(m => {
				if (m._id.secondCategory === secondCategory) {
					setAnnounce(m.isOpened ? 'closed' : 'opened')
					m.isOpened = !m.isOpened
				}
				return m
			})
		)
	}

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault()
			openSecondLevel(secondCategory)
		}
	}

	return (
		<>
			{menuData.map(m => {
				if (m.pages.map(p => p.alias).includes(path.split('/')[2])) {
					m.isOpened = true
				}

				return (
					<li key={m._id.secondCategory}>
						<button
							onKeyDown={(key: KeyboardEvent) =>
								openSecondLevelKey(key, m._id.secondCategory)
							}
							className='cursor-pointer uppercase text-[#6c7077] text-xs font-light leading-5 mb-2.5'
							onClick={() => openSecondLevel(m._id.secondCategory)}
							aria-expanded={m.isOpened}
						>
							{m._id.secondCategory}
						</button>
						<motion.ul
							layout
							variants={variants}
							initial={m.isOpened ? 'visible' : 'hidden'}
							animate={m.isOpened ? 'visible' : 'hidden'}
							className='overflow-hidden'
						>
							{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
						</motion.ul>
					</li>
				)
			})}
		</>
	)
}

export default Levels
