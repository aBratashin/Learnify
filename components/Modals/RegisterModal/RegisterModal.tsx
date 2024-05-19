'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { FaGoogle, FaUser, FaYandex } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

import Modal from '../Modal/Modal'
import ModalButton from '../ModalButton/ModalButton'
import ModalInput from '../ModalInput/ModalInput'

const RegisterModal = () => {
	const loginModal = useLoginModal()
	const registerModal = useRegisterModal()
	const [isLoading, setIsLoading] = useState(false)

	const changeModal = () => {
		registerModal.onClose()
		loginModal.onOpen()
	}

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		toast
			.promise(
				axios.post('/api/register', data).then(() => {
					registerModal.onClose()
					loginModal.onOpen()
				}),
				{
					loading: 'Регистрация...',
					success: 'Вы успешно зарегистрировались!',
					error: 'Что-то пошло не так'
				}
			)
			.finally(() => {
				setIsLoading(false)
			})
	}

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<ModalInput
				id='email'
				label='Почта'
				placeholder='Введите почту:'
				disabled={isLoading}
				register={register}
				errors={errors}
				icon={MdEmail}
				required={{ value: true, message: 'Поле обязательно для заполнения!' }}
				pattern={{
					value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
					message: 'Введите корректную почту!'
				}}
			/>
			<ModalInput
				id='name'
				label='Имя'
				placeholder='Введите имя:'
				disabled={isLoading}
				register={register}
				errors={errors}
				icon={FaUser}
				required={{ value: true, message: 'Поле обязательно для заполнения!' }}
				minLength={{ value: 2, message: 'Минимальная длина имени 2 символа!' }}
			/>
			<ModalInput
				id='password'
				type='password'
				label='Пароль'
				placeholder='Введите пароль:'
				disabled={isLoading}
				register={register}
				errors={errors}
				icon={RiLockPasswordFill}
				required={{ value: true, message: 'Поле обязательно для заполнения!' }}
				minLength={{
					value: 6,
					message: 'Минимальная длина пароля 6 символов!'
				}}
			/>
		</div>
	)

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<ModalButton
				outline
				label='Войти через Google'
				icon={FaGoogle}
				onClick={() => signIn('google')}
			/>
			<ModalButton
				outline
				label='Войти через Yandex'
				icon={FaYandex}
				onClick={() => signIn('yandex')}
			/>
			<div className='text-neutral-500 text-center mt-4 font-light'>
				<div className='justify-center flex flex-row items-center gap-2'>
					<div>Уже есть аккаунт?</div>
					<div
						onClick={changeModal}
						className='text-neutral-800 cursor-pointer hover:underline w-full!'
					>
						Войти
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Регистрация'
			actionLabel='Создать'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModal
