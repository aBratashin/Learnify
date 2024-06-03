'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar/Avatar'
import MenuItem from '../MenuItem/MenuItem'
import { UserMenuProps } from './UserMenu.props'
import {
	cvaAccount,
	cvaContainer,
	cvaHr,
	cvaInfo,
	cvaModal,
	cvaModalOpen,
	cvaModalOpenContainer,
	cvaWrapper
} from './UserMenuStyle'

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()

	const toggleOpen = useCallback(() => {
		setIsOpen(prev => !prev)
	}, [])

	return (
		<div className={cvaWrapper()}>
			<div className={cvaContainer()}>
				<div onClick={toggleOpen} className={cvaModal()}>
					<div className={cvaInfo()}>
						<Avatar src={currentUser?.image} />
						<div className={cvaAccount()}>
							{currentUser?.email ? (
								<span>{currentUser.name}</span>
							) : (
								<span>Аккаунт</span>
							)}
						</div>
					</div>
					<AiOutlineMenu size={24} />
				</div>
			</div>

			{isOpen && (
				<div className={cvaModalOpen()}>
					<div className={cvaModalOpenContainer()}>
						{currentUser ? (
							<>
								<MenuItem
									onClick={() => router.push('/favorites')}
									label='Избранное'
								/>
								<MenuItem
									onClick={() => router.push('/cart')}
									label='Корзина'
								/>
								<MenuItem
									onClick={() => router.push('/bought')}
									label='Ваши курсы'
								/>
								<hr className={cvaHr()} />
								<MenuItem onClick={() => signOut()} label='Выйти' />
								{currentUser.role === 'Admin' && (
									<>
										<hr className={cvaHr()} />
										<MenuItem
											onClick={() => router.push('/contacts')}
											label='Заявки'
										/>
										<MenuItem
											onClick={() => router.push('/users')}
											label='Пользователи'
										/>
										<MenuItem
											onClick={() => router.push('/addCourse')}
											label='Добавить курс'
										/>
										<MenuItem
											onClick={() => router.push('/manageCourses')}
											label='Управление курсами'
										/>
									</>
								)}
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label='Авторизация' />
								<MenuItem onClick={registerModal.onOpen} label='Регистрация' />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
