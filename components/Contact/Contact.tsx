'use client'
import { ContactStatus } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useReducer } from 'react'
import toast from 'react-hot-toast'
import { MdCancel, MdCheckCircle, MdDelete } from 'react-icons/md'
import Card from '../Card/Card'
import ContactSort from '../ContactSort/ContactSort'
import H from '../H/H'
import Tag from '../Tag/Tag'
import { ContactsProps } from './Contact.props'
import { ContactSortEnum, ContactSortReducer } from './ContactSort.reducer'
import Button from '../Button/Button'

const Contact: FC<ContactsProps> = ({ contacts }) => {
	const router = useRouter()

	const [{ contacts: sortedContacts, sort }, dispatchSort] = useReducer(
		ContactSortReducer,
		{
			contacts,
			sort: ContactSortEnum.Status
		}
	)

	const changeStatus = async (
		status: ContactStatus,
		id: string,
		del: boolean = false
	) => {
		axios
			.post('https://learnify-courses.vercel.app/api/contactStatus', { status, id, del })
			.then(() => {
				toast.success('Заявка успешно изменена')
				router.refresh()
			})
			.catch(() => {
				toast.error('Что-то пошло не так')
			})
	}

	const setSort = (sort: ContactSortEnum) => {
		dispatchSort({ type: sort })
	}

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: contacts })
	}, [contacts])

	const translateStatus = (status: ContactStatus): string => {
		switch (status) {
			case 'Pending':
				return 'В ожидании'
			case 'Confirmed':
				return 'Подтвержден'
			case 'Cancelled':
				return 'Отменен'
		}
	}

	if (contacts.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center gap-2 h-full w-full text-center'>
				<h1 className='font-bold text-2xl'>Список заявок пуст!</h1>
			</div>
		)
	}

	return (
		<>
			<div className='grid grid-cols-[auto,1fr] items-center justify-items-start gap-5 mb-[30px] sm:grid-cols-[auto,1fr,auto]'>
				<H tag='h1'>Заявки</H>
				{contacts && (
					<Tag
						color='gray'
						size='medium'
						aria-label={contacts.length + 'элементов'}
					>
						{contacts.length}
					</Tag>
				)}
				<ContactSort sort={sort} setSort={setSort} />
			</div>
			<div role='list'>
				{sortedContacts.map(el => (
					<div key={el.id}>
						<Card className='p-5'>
							<div className='flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center'>
								<div>
									<div>
										<span className='font-bold'>Имя:</span> {el.name}
									</div>
									<div>
										<span className='font-bold'>Почта:</span> {el.email}
									</div>
									<div>
										<span className='font-bold'>Телефон:</span> {el.phone}
									</div>
									<div>
										<span className='font-bold'>Статус:</span>{' '}
										{translateStatus(el.status)}
									</div>
									<div>
										<span className='font-bold'>Дата:</span>{' '}
										{el.createdAt.toLocaleString()}
									</div>
								</div>
								<div className='flex flex-col gap-5 xl:flex-row'>
									{el.status !== ContactStatus['Confirmed'] && (
										<Button
											className='flex gap-2 w-40'
											appearance='primary'
											onClick={() =>
												changeStatus(ContactStatus['Confirmed'], el.id)
											}
										>
											Подтвердить
											<MdCheckCircle
												size={24}
												className='cursor-pointer text-white'
											/>
										</Button>
									)}
									{el.status !== ContactStatus['Cancelled'] && (
										<Button
											className='flex gap-2 w-40'
											appearance='primary'
											onClick={() =>
												changeStatus(ContactStatus['Cancelled'], el.id)
											}
										>
											Отменить
											<MdCancel
												size={24}
												className='cursor-pointer text-white'
											/>
										</Button>
									)}
									<Button
										className='flex gap-2 w-40'
										appearance='primary'
										onClick={() =>
											changeStatus(ContactStatus['Cancelled'], el.id, true)
										}
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

export default Contact
