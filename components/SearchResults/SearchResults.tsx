'use client'
import NotFound from '@/app/not-found'
import SearchList from '@/components/SearchList/SearchList'
import Spinner from '@/components/Spinner/Spinner'
import { ProductModel } from '@/interfaces/product.interface'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import useSWR from 'swr'
import { SearchResultsProps } from './SearchResults.props'
import { SafeUser } from '@/interfaces'

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

	const { data } = useSWR<{ courses: Array<ProductModel>, currentUser: SafeUser | null }>(
		() => (searchQuery ? `/api/search?q=${encodedSearch}` : null),
		fetchCourses,
		{refreshInterval: 1000}
	)

	if (searchQuery === null) {
		return <NotFound />
	}

	if (!data?.courses) {
		return <Spinner />
	}

	return <SearchList products={data.courses} title={searchQuery} currentUser={data.currentUser}/>
}

export default SearchResults
