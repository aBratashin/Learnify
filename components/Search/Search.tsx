'use client'
import React, { FC, useState } from 'react'
import { SearchProps } from './Search.props'
import classNames from 'classnames'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import GlassIcon from './glass.svg'
import { useRouter } from 'next/navigation'
import { cvaSearchButton, cvaSearchForm, cvaSearchInput } from './SearchStyle'

const Search: FC<SearchProps> = ({
	className,
	manage,
	value,
	onChange,
	...props
}) => {
	const [search, setSearch] = useState<string>('')

	const router = useRouter()

	const goToSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (!manage) {
			const encodedSearch = encodeURI(search)
			router.push(`/search?q=${encodedSearch}`)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!manage && e.key == 'Enter') {
			goToSearch(e)
		}
	}

	return (
		<form
			className={classNames(className, [cvaSearchForm()])}
			{...props}
			role='search'
			onSubmit={goToSearch}
		>
			<Input
				className={cvaSearchInput()}
				placeholder={'Поиск...'}
				value={manage ? value : search}
				onChange={manage ? onChange : e => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
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
