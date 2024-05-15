'use client'
import { ProductModel } from '@/interfaces/product.interface'
import SearchList from '@/components/SearchList/SearchList'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner/Spinner'

const fetchCourses = async (url: string) => {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error('Не удалось получить курсы')
	}

	return response.json()
}

export default function Search() {
	const [searchQuery, setSearchQuery] = useState<string | null>(null)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		setSearchQuery(params.get('q'))
	}, [])

	const encodedSearch = encodeURI(searchQuery || '')

	const { data } = useSWR<{ courses: Array<ProductModel> }>(
		() => (searchQuery ? `/api/search?q=${encodedSearch}` : null),
		fetchCourses
	)

	if (!data?.courses) {
		return <Spinner />
	}

	return <SearchList products={data.courses} title={searchQuery} />
}
