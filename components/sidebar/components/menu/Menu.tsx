'use client'
import React, { useState } from 'react'
import { FirstLevelMenuItem } from '@/interfaces/menu.interface'
import classNames from 'classnames'
import Link from 'next/link'
import Levels from '@/components/sidebar/components/menu/Levels'
import { firstLevelMenu } from '@/helpers/helpers'
import { MenuData } from '@/helpers/MenuData'

const Menu = () => {
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(
		undefined
	)

	const firstCategory = 0
	const menu = MenuData

	const buildFirstLevel = () => {
		return (
			<ul>
				{firstLevelMenu.map(m => (
					<li key={m.id}>
						<Link href={`/${m.route}`} aria-expanded={m.id == firstCategory}>
							<div
								className={classNames(
									[
										'grid grid-cols-[24px_1fr] gap-5 items-center text-lg font-medium leading-[25px] mt-5 hover:text-primary fill-primary [&>svg]:hover:fill-primary'
									],
									{
										['text-primary [&>svg]:fill-primary']:
											m.id === firstCategory
									}
								)}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className='ml-3 mt-[15px] pl-8 border-l-[#DFDFDF] border-l border-solid'>
				<Levels menu={menu} menuItem={menuItem} setAnnounce={setAnnounce} />
			</ul>
		)
	}

	return (
		<nav role='navigation'>
			{announce && (
				<span className='w-0 h-0 overflow-hidden absolute' role='lock'>
					{announce == 'opened' ? 'Развернуто' : 'Свернуто'}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	)
}

export default Menu
