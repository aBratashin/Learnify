import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Rating from '@/components/Rating/Rating'
import Textarea from '@/components/Textarea/Textarea'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import classes from './ReviewForm.module.css'
import { ReviewFormProps } from './ReviewForm.props'
import CloseIcon from './close.svg'

import { IReviewForm } from '@/components/ReviewForm/ReviewForm.interface'
import axios from 'axios'
import toast from 'react-hot-toast'

const ReviewForm: FC<ReviewFormProps> = ({
	className,
	isOpened,
	product_id,
	currentUser,
	...props
}) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors
	} = useForm<IReviewForm>()
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [isError, setIsError] = useState<string>()
	const router = useRouter()

	const onSubmit = async (formData: IReviewForm) => {
		if (!currentUser?.boughtIds.includes(product_id)) {
			toast.error('Приобретите товар, чтобы оставлять отзывы')
			reset()
			return
		}

		axios
			.post('https://learnify-courses.vercel.app/api/review', { ...formData, product_id })
			.then(() => {
				setIsSuccess(true)
				router.refresh()
				reset()
			})
			.catch(() => {
				toast.error('Что-то пошло не так')
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={classNames(classes.reviewForm, className)} {...props}>
				<Input
					{...register('name', {
						required: { value: true, message: 'Заполните имя' }
					})}
					placeholder='Имя'
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', {
						required: { value: true, message: 'Заполните заголовок' }
					})}
					placeholder='Заголовок отзыва'
					className={classes.title}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={classes.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', {
						required: { value: true, message: 'Заполните текст' }
					})}
					placeholder='Текст отзыва'
					className={classes.description}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label='Текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={classes.submit}>
					<Button
						appearance='primary'
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Отправить
					</Button>
					<span className={classes.info}>
						* Для отправки отзыва необходимо приобрести товар
					</span>
				</div>
			</div>
			{isSuccess && (
				<div
					className={classNames(classes.success, classes.panel)}
					role='alert'
				>
					<div className={classes.successTitle}>Ваш отзыв отправлен</div>
					<div className={classes.successDescription}>
						Спасибо, Ваш отзыв будет опубликован
					</div>
					<button
						onClick={() => setIsSuccess(false)}
						className={classes.close}
						aria-label='Закрыть оповещение'
					>
						<CloseIcon />
					</button>
				</div>
			)}
			{isError && (
				<div className={classNames(classes.error, classes.panel)} role='alert'>
					Что-то пошло не так, попробуйте обновить страницу
					<button
						onClick={() => setIsError(undefined)}
						className={classes.close}
						aria-label='Закрыть оповещение'
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	)
}

export default ReviewForm
