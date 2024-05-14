'use client'
import React, { FC } from 'react'
import { SidebarProps } from '@/components/sidebar/sidebar.props'
import Menu from '@/components/sidebar/components/menu/Menu'
import Logo from '../../app/Logo.svg'
import classNames from 'classnames'
import Search from '@/components/Search/Search'
import UserMenu from '@/components/UserMenu/UserMenu'
import { useRouter } from 'next/navigation'

const Sidebar: FC<SidebarProps> = ({ currentUser, className, ...props }) => {
	const router = useRouter()

	return (
		<aside
			className={classNames(className, ['grid content-start gap-5'])}
			{...props}
		>
			<div className='flex items-center justify-center'>
				<Logo onClick={() => router.push('/')} className='cursor-pointer' />
			</div>
			<Search />
			<UserMenu currentUser={currentUser} />
			<Menu />
		</aside>
	)
}

export default Sidebar
