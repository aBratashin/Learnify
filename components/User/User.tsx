'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useReducer } from 'react'
import toast from 'react-hot-toast'
import { MdAdminPanelSettings, MdDelete } from 'react-icons/md'
import Card from '../Card/Card'
import H from '../H/H'
import Tag from '../Tag/Tag'
import { UserSortEnum, UserSortReducer } from './User.reducer'
import { UsersProps } from './User.props'
import Button from '../Button/Button'
import { UserStatus } from '@prisma/client'
import UserSort from '../UserSort/UserSort'

const User: FC<UsersProps> = ({ users }) => {
	const router = useRouter()

	const [{ users: sortedUsers, sort }, dispatchSort] = useReducer(
		UserSortReducer,
		{
			users: users,
			sort: UserSortEnum.Role
		}
	)

	const changeRole = async (
		role: UserStatus,
		id: string,
		del: boolean = false
	) => {
		try {
			await toast.promise(axios.post('/api/userStatus', { role, id, del }), {
				loading: 'Изменение аккаунта...',
				success: 'Аккаунт успешно изменен',
				error: 'Что-то пошло не так'
			})
			router.refresh()
		} catch (error) {
			console.error('Произошла ошибка:', error)
		}
	}

	const setSort = (sort: UserSortEnum) => {
		dispatchSort({ type: sort })
	}

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: users })
	}, [users])

	const translateRole = (role: UserStatus): string => {
		switch (role) {
			case 'Admin':
				return 'Администратор'
			case 'User':
				return 'Пользователь'
			default:
				return 'Неизвестная роль'
		}
	}

	if (users.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center gap-2 h-full w-full text-center'>
				<h1 className='font-bold text-2xl'>Список пользователей пуст!</h1>
			</div>
		)
	}

	return (
		<>
			<div className='grid grid-cols-[auto,1fr] items-center justify-items-start gap-5 mb-[30px] sm:grid-cols-[auto,1fr,auto]'>
				<H tag='h1'>Пользователи</H>
				{users && (
					<Tag
						color='gray'
						size='medium'
						aria-label={users.length + 'элементов'}
					>
						{users.length}
					</Tag>
				)}
				<UserSort sort={sort} setSort={setSort} />
			</div>
			<div role='list'>
				{sortedUsers.map(user => (
					<div key={user.id}>
						<Card className='p-5'>
							<div className='flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center'>
								<div>
									<div>
										<span className='font-bold'>Имя:</span> {user.name}
									</div>
									<div>
										<span className='font-bold'>Почта:</span> {user.email}
									</div>
									<div>
										<span className='font-bold'>Роль:</span>{' '}
										{translateRole(user.role)}
									</div>
									<div>
										<span className='font-bold'>Дата создания:</span>{' '}
										{new Date(user.createdAt).toLocaleString()}
									</div>
								</div>
								<div className='flex flex-col gap-5 xl:flex-row'>
									{user.role !== 'Admin' && (
										<Button
											className='flex gap-2 w-40'
											appearance='primary'
											onClick={() => changeRole('Admin', user.id)}
										>
											Дать роль
											<MdAdminPanelSettings
												size={24}
												className='cursor-pointer text-white'
											/>
										</Button>
									)}
									{user.role !== 'User' && (
										<Button
											className='flex gap-2 w-40'
											appearance='primary'
											onClick={() => changeRole('User', user.id)}
										>
											Забрать роль
											<MdAdminPanelSettings
												size={24}
												className='cursor-pointer text-white'
											/>
										</Button>
									)}
									<Button
										className='flex gap-2 w-40'
										appearance='primary'
										onClick={() => changeRole('User', user.id, true)}
									>
										Удалить
										<MdDelete
											title='Удалить'
											size={24}
											className='cursor-pointer text-white'
										/>
									</Button>
								</div>
							</div>
						</Card>
					</div>
				))}
			</div>
		</>
	)
}

export default User
