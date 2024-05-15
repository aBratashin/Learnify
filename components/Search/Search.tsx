import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { SearchProps } from './Search.props'
import { cvaSearchButton, cvaSearchForm, cvaSearchInput } from './SearchStyle'
import GlassIcon from './glass.svg'

interface IFormInput {
	search: string
}

const Search: FC<SearchProps> = ({
	className,
	manage,
	value,
	onChange,
	...props
}) => {
	const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
	const router = useRouter()

	const goToSearch = (data: IFormInput) => {
		if (!manage) {
			const encodedSearch = encodeURI(data.search)
			router.push(`/search?q=${encodedSearch}`)
		}
	}

	return (
		<form
			className={classNames(className, [cvaSearchForm()])}
			{...props}
			role='search'
			onSubmit={handleSubmit(goToSearch)}
		>
			<Input
				className={cvaSearchInput()}
				placeholder={'Поиск...'}
				{...register('search', { required: { value: true, message: 'Поле не может быть пустым' } })}
				error={errors.search}
			/>
			<Button
				className={cvaSearchButton()}
				appearance='primary'
				aria-label='Искать по сайту'
			>
				<GlassIcon />
			</Button>
		</form>
	)
}

export default Search
