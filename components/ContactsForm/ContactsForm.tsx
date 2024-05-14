'use client'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { ContactStatus } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ContactsForm = () => {
	interface IContact {
		name: string
		phone: string
		email: string
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IContact>()

	const router = useRouter()

	const onSubmit = async (formData: IContact) => {
		axios
			.post('/api/contacts', { ...formData })
			.then(() => {
				reset()
				router.refresh()
				toast.success('Ваша заявка принята')
			})
			.catch(() => {
				toast.error('Что-то пошло не так')
			})
	}

	return (
		<div className='w-full p-10 bg-yellow-200 rounded-xl flex justify-center items-center flex-col lg:flex-row lg:items-start gap-10'>
			<div className='grow w-full lg:w-1/2'>
				<h1 className='text-black font-bold text-2xl xl:text-4xl lg:text-3xl'>
					Поможем решить все вопросы
				</h1>
				<p className='mt-5 text-md'>
					Если вы хотите больше узнать о Learnify или не знаете, какую программу
					обучения выбрать, оставьте заявку — и мы перезвоним
				</p>
			</div>
			<div className='grow w-full lg:w-1/2'>
				<form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
					<Input
						className='[&>input]:w-full [&>input]:h-12'
						{...register('name', {
							required: { value: true, message: 'Заполните имя' }
						})}
						placeholder='Имя'
						error={errors.name}
					/>
					<div className='flex gap-5 flex-col xl:flex-row'>
						<Input
							className='grow [&>input]:w-full [&>input]:h-12'
							{...register('phone', {
								required: { value: true, message: 'Заполните телефон' },
								pattern: {
									value: /^((\+7|7|8)+([0-9]){10})$/,
									message: 'Введите корректный телефон!'
								}
							})}
							type='tel'
							placeholder='Телефон'
							error={errors.phone}
						/>
						<Input
							className='grow [&>input]:w-full [&>input]:h-12'
							{...register('email', {
								required: { value: true, message: 'Заполните почту' },
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
									message: 'Введите корректную почту!'
								}
							})}
							placeholder='Почта'
							error={errors.email}
						/>
					</div>
					<Button className='self-center w-1/2' appearance='primary'>
						Отправить
					</Button>
				</form>
			</div>
		</div>
	)
}

export default ContactsForm
