'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { FaGoogle, FaYandex } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Modal from '../Modal/Modal'
import ModalButton from '../ModalButton/ModalButton'
import ModalInput from '../ModalInput/ModalInput'

const LoginModal = () => {
	const router = useRouter()
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isLoading, setIsLoading] = useState(false)

	const changeModal = () => {
		loginModal.onClose()
		registerModal.onOpen()
	}

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)
	
		signIn('credentials', {
			...data,
			redirect: false
		}).then(callback => {
			setIsLoading(false)
	
			if (callback?.ok) {
				toast.success('Вы успешно авторизовались!')
				router.refresh()
				loginModal.onClose()
			}
	
			if (callback?.error) {
				toast.error(callback.error)
			}
		}).catch(error => {
			setIsLoading(false)
			toast.error('Ошибка при авторизации')
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
					<div>Еще нет аккаунта?</div>
					<div
						onClick={changeModal}
						className='text-neutral-800 cursor-pointer hover:underline'
					>
						Создать
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Авторизация'
			actionLabel='Войти'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModal
