'use client'
import { ProductModel } from '@/interfaces/product.interface'
import SearchList from '@/components/SearchList/SearchList'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Loading from './loading'

const fetchCourses = async (url: string) => {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error('Не удалось получить курсы')
	}

	return response.json()
}

export default function Search() {
	const search = useSearchParams()
	const searchQuery = search ? search?.get('q') : null
	const encodedSearch = encodeURI(searchQuery || '')

	const { data } = useSWR<{ courses: Array<ProductModel> }>(
		`https://learnify-courses.vercel.app/api/search?q=${encodedSearch}`,
		fetchCourses
	)

	if (!data?.courses) {
		return <Loading />
	}

	return <SearchList products={data.courses} title={searchQuery} />
}
