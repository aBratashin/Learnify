'use client'
import { ProductModel } from '@/interfaces/product.interface'
import SearchList from '@/components/SearchList/SearchList'
import useSWR from 'swr'
import Loading from './loading'
import { useEffect, useState } from 'react'

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
		() => (searchQuery ? `http://localhost:3000/api/search?q=${encodedSearch}` : null),
		fetchCourses
	)

	if (!data?.courses) {
		return <Loading />
	}

	return <SearchList products={data.courses} title={searchQuery} />
}
