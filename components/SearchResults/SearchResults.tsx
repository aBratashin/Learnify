'use client'
import NotFound from '@/app/not-found'
import SearchList from '@/components/SearchList/SearchList'
import Spinner from '@/components/Spinner/Spinner'
import { ProductModel } from '@/interfaces/product.interface'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import useSWR from 'swr'
import { SearchResultsProps } from './SearchResults.props'

const fetchCourses = async (url: string) => {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error('Не удалось получить курсы')
	}

	return response.json()
}

const SearchResults: FC<SearchResultsProps> = () => {
	const searchParams = useSearchParams()
	const searchQuery = searchParams.get('q')
	const encodedSearch = encodeURI(searchQuery || '')

	const { data } = useSWR<{ courses: Array<ProductModel> }>(
		() => (searchQuery ? `/api/search?q=${encodedSearch}` : null),
		fetchCourses
	)

	if (searchQuery === null) {
		return <NotFound />
	}

	if (!data?.courses) {
		return <Spinner />
	}

	return <SearchList products={data.courses} title={searchQuery} />
}

export default SearchResults
