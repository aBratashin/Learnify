'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { SafeUser } from '@/interfaces'
import { signOut } from 'next-auth/react'
import { FC, useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar/Avatar'
import MenuItem from '../MenuItem/MenuItem'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
	currentUser?: SafeUser | null
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()

	const toggleOpen = useCallback(() => {
		setIsOpen(prev => !prev)
	}, [])

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div
					onClick={toggleOpen}
					className='w-full p-4 md:py-1 px-2 border-[1px] border-neutral-200 flex items-center justify-between gap-4 rounded-md cursor-pointer hover:shadow-md transition max-h-[50px]'
				>
					<div className='flex items-center justify-center gap-4'>
						<Avatar src={currentUser?.image} />
						<div className='text-sm font-semibold rounded-full hover:bg-neutral-100 transition cursor-pointer'>
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
				<div className='absolute rounded-md shadow-md w-full bg-white overflow-hidden left-0 top-14 text-sm'>
					<div className='flex flex-col cursor-pointer'>
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
								<hr className='opacity-20' />
								<MenuItem onClick={() => signOut()} label='Выйти' />
								{currentUser.role === 'Admin' && (
									<>
										<hr className='opacity-20' />
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
