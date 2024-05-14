'use client'
import { ProductModel } from '@/interfaces/product.interface'
import CourseForm from '@/components/CourseForm/CourseForm'
import useSWR from 'swr'
import NotFound from '../not-found'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner/Spinner'

const Edit = () => {
	const [searchQuery, setSearchQuery] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		setSearchQuery(params.get('q'))
	}, [])

	const encodedSearch = encodeURI(searchQuery || '')

	const { data, error } = useSWR<{ course: ProductModel }>(
		() => (searchQuery ? `/api/edit?q=${encodedSearch}` : null),
		async (url: string) => {
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error('Не удалось получить курс')
			}

			const data = await response.json()
			setIsLoading(false)
			return data
		}
	)

	if (isLoading) {
		return <Spinner />
	}

	if (!data?.course) {
		return <NotFound />
	}

	return <CourseForm edit course={data.course} />
}

export default Edit
