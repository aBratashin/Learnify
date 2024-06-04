'use client'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ContactsFormProps } from './ContactsForm.props'
import {
	cvaButton,
	cvaContainer,
	cvaForm,
	cvaInfoText,
	cvaInfoTitle,
	cvaInput,
	cvaInputContainer,
	cvaInputGrow,
	cvaWrapper
} from './ContactsFormStyle'

const ContactsForm: FC<ContactsFormProps> = () => {
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
		const submitPromise = axios.post('/api/contacts', { ...formData })

		toast.promise(submitPromise, {
			loading: 'Отправка заявки...',
			success: () => {
				reset()
				router.refresh()
				return 'Ваша заявка принята'
			},
			error: 'Что-то пошло не так'
		})
	}

	return (
		<div className={cvaWrapper()}>
			<div className={cvaContainer()}>
				<h1 className={cvaInfoTitle()}>Поможем решить все вопросы</h1>
				<p className={cvaInfoText()}>
					Если вы хотите больше узнать о Learnify или не знаете, какую программу
					обучения выбрать, оставьте заявку — и мы перезвоним
				</p>
			</div>
			<div className={cvaContainer()}>
				<form className={cvaForm()} onSubmit={handleSubmit(onSubmit)}>
					<Input
						className={cvaInput()}
						{...register('name', {
							required: { value: true, message: 'Заполните имя' }
						})}
						placeholder='Имя'
						error={errors.name}
					/>
					<div className={cvaInputContainer()}>
						<Input
							className={cvaInputGrow()}
							{...register('phone', {
								required: { value: true, message: 'Заполните телефон' },
								pattern: {
									value: /^((\+7|7|8)+([0-9]){10})$/,
									message: 'Телефон некорректен!'
								}
							})}
							type='tel'
							placeholder='Телефон'
							error={errors.phone}
						/>
						<Input
							className={cvaInputGrow()}
							{...register('email', {
								required: { value: true, message: 'Заполните почту' },
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
									message: 'Почта некорректна!'
								}
							})}
							placeholder='Почта'
							error={errors.email}
						/>
					</div>
					<Button className={cvaButton()} appearance='primary'>
						Отправить
					</Button>
				</form>
			</div>
		</div>
	)
}

export default ContactsForm
