'use client'
import { MenuData } from '@/helpers/MenuData'
import Button from '@/components/Button/Button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Select from 'react-select'
import H from '../H/H'
import Input from '../Input/Input'
import Spinner from '../Spinner/Spinner'
import Textarea from '../Textarea/Textarea'
import { documentOptionsData, imageOptionsData } from './CourseForm.data'
import { CourseFormProps, IContact } from './CourseForm.props'
import { declOfNum } from '@/helpers/helpers'

const CourseForm: FC<CourseFormProps> = ({ edit, course }) => {
	const router = useRouter()

	const [categoryOptions, setCategoryOptions] = useState<
		{ value: string; label: string }[]
	>([])
	const [imageOptions, setImageOptions] =
		useState<{ value: string; label: string }[]>(imageOptionsData)
	const [documentType, setDocumentType] = useState<{
		value: string
		label: string
	} | null>(null)

	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		formState: { errors }
	} = useForm<IContact>()

	const onSubmit = async (formData: IContact) => {
		const courseData = {
			...formData,
			tags: [],
			categories: formData.categories.map(category => category.label),
			image: formData.image?.value,
			initialRating: 0,
			price: Number(formData.price),
			oldPrice: Math.round(
				Number(formData.price) + Number(formData.price) * 0.25
			),
			credit: Math.round(Number(formData.price) / 24),
			reviewCount: 0,
			characteristics: [
				{
					name: 'Школа',
					value: formData.image?.label
				},
				{
					name: 'Документ об окончании',
					value: documentType?.label
				},
				{
					name: 'Сложность',
					value: formData.complexity
				},
				{
					name: 'Длительность',
					value:
						formData.duration +
						' ' +
						declOfNum(formData.duration, ['месяц', 'месяца', 'месяцев'])
				}
			]
		}

		const submitPromise = edit
			? axios.post('/api/editCourse', { ...courseData, id: course?.id })
			: axios.post('/api/course', courseData)

		toast.promise(submitPromise, {
			loading: 'Отправка данных курса...',
			success: () => {
				reset()
				setDocumentType(null)
				setValue('image', null)
				setValue('categories', [])
				router.refresh()
				return edit ? 'Курс успешно обновлен' : 'Курс успешно добавлен'
			},
			error: 'Что-то пошло не так'
		})
	}

	const extractNumbersFromString = (str: string) => {
		const regex = /\d+/g
		return str.match(regex)?.map(Number) || []
	}

	useEffect(() => {
		if (course) {
			setValue('title', course.title)
			setValue('link', course.link)
			setValue('price', course.price)
			setValue('complexity', course.characteristics[2].value)
			setValue(
				'duration',
				extractNumbersFromString(course.characteristics[3].value)[0]
			)
			setValue('description', course.description || '')
			setValue('advantages', course.advantages || '')

			setDocumentType({
				value: course.characteristics[1].value,
				label: course.characteristics[1].value
			})
			setValue('documentType', {
				value: course.characteristics[1].value,
				label: course.characteristics[1].value
			})

			const selectedCategories = course.categories.map(category => ({
				value: category,
				label: category
			}))
			setValue('categories', selectedCategories)

			setValue('image', {
				value:
					imageOptions.find(el => el.label === course.characteristics[0].value)
						?.value || '',
				label: course.characteristics[0].value
			})
		}
	}, [course, setValue, setDocumentType, imageOptions])

	useEffect(() => {
		extractCategoryOptions()
	}, [])

	const extractCategoryOptions = () => {
		const categories: { value: string; label: string }[] = []
		MenuData.forEach(data => {
			data.pages.forEach(page => {
				categories.push({ value: page.category, label: page.category })
			})
		})
		setCategoryOptions(categories)
	}

	const id = Date.now().toString()
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => setIsMounted(true), [])

	if (!isMounted) {
		return <Spinner />
	}

	return (
		<>
			<div className='flex flex-col gap-8'>
				<H tag='h1'>{edit ? 'Редактировать курс' : 'Добавить курс'}</H>
				<form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-2'>
						<label htmlFor='title'>Название:</label>
						<Input
							id='title'
							className='[&>input]:w-full'
							{...register('title', {
								required: { value: true, message: 'Заполните название' }
							})}
							placeholder='Название'
							error={errors.title}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='link'>Ссылка:</label>
						<Input
							id='link'
							className='grow [&>input]:w-full'
							{...register('link', {
								required: { value: true, message: 'Заполните ссылку' },
								pattern: {
									value:
										/^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
									message: 'Введите корректную ссылку'
								}
							})}
							type='text'
							placeholder='Ссылка на курс'
							error={errors.link}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='price'>Цена:</label>
						<Input
							id='price'
							className='[&>input]:w-full'
							{...register('price', {
								required: { value: true, message: 'Заполните цену' }
							})}
							placeholder='Цена'
							error={errors.price}
							type='number'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='complexity'>Сложность:</label>
						<Input
							id='complexity'
							className='grow [&>input]:w-full'
							{...register('complexity', {
								required: { value: true, message: 'Заполните сложность' }
							})}
							type='text'
							placeholder='Выберите сложность (прим. С нуля)'
							error={errors.complexity}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='duration'>Длительность:</label>
						<Input
							id='duration'
							className='[&>input]:w-full'
							{...register('duration', {
								required: {
									value: true,
									message: 'Заполните длительность (кол-во месяцев)'
								}
							})}
							placeholder='Длительность (кол-во месяцев)'
							error={errors.duration}
							type='number'
						/>
					</div>
					{isMounted ? (
						<>
							<div className='relative flex flex-col gap-2'>
								<label htmlFor='documentType'>Документ об окончании:</label>
								<Controller
									name='documentType'
									control={control}
									rules={{
										required: {
											value: true,
											message: 'Выберите документ об окончании'
										}
									}}
									render={({ field }) => (
										<Select
											{...field}
											id={id}
											options={documentOptionsData}
											onChange={selectedOption => {
												setDocumentType(selectedOption || null)
												field.onChange(selectedOption)
											}}
											value={documentType}
											placeholder='Выберите документ об окончании'
										/>
									)}
								/>
								{errors.documentType && (
									<span className='absolute bottom-[-20px] left-0 text-red'>
										{errors.documentType.message}
									</span>
								)}
							</div>
							<div className='relative flex flex-col gap-2'>
								<label htmlFor='image'>Школа:</label>
								<Controller
									name='image'
									control={control}
									rules={{
										required: { value: true, message: 'Выберите изображение' }
									}}
									render={({ field }) => (
										<Select
											{...field}
											id={id}
											options={imageOptions}
											onChange={selectedOption => {
												setValue('image', selectedOption || null)
												field.onChange(selectedOption)
											}}
											placeholder='Выберите изображение'
										/>
									)}
								/>
								{errors.image && (
									<span className='absolute bottom-[-20px] left-0 text-red'>
										{errors.image.message}
									</span>
								)}
							</div>
							<div className='relative flex flex-col gap-2'>
								<label htmlFor='category'>Категория:</label>
								<Controller
									name='categories'
									control={control}
									rules={{
										required: { value: true, message: 'Выберите категорию' }
									}}
									render={({ field }) => (
										<Select
											{...field}
											id={id}
											options={categoryOptions}
											isMulti
											onChange={selectedOptions => {
												const transformedOptions: {
													value: string
													label: string
												}[] = selectedOptions.map(option => ({
													value: option.label,
													label: option.label
												}))
												setValue('categories', transformedOptions || [])
												field.onChange(transformedOptions)
											}}
											placeholder='Выберите категорию'
										/>
									)}
								/>
								{errors.categories && (
									<span className='absolute bottom-[-20px] left-0 text-red'>
										{errors.categories.message}
									</span>
								)}
							</div>
						</>
					) : null}
					<div className='flex flex-col gap-2'>
						<label htmlFor='description'>Описание:</label>
						<Textarea
							id='description'
							className='[&>textarea]:h-20'
							{...register('description')}
							placeholder='Введите описание (необязательно)'
							error={errors.description}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='advantages'>Преимущества:</label>
						<Textarea
							id='advantages'
							className='[&>textarea]:h-20'
							{...register('advantages')}
							placeholder='Введите преимущества (необязательно)'
							error={errors.advantages}
						/>
					</div>
					<Button
						className='self-center w-1/2'
						appearance='primary'
						type='submit'
					>
						{edit ? 'Редактировать курс' : 'Создать курс'}
					</Button>
				</form>
			</div>
		</>
	)
}

export default CourseForm
