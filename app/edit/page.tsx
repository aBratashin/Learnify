'use client'
import { ProductModel } from '@/interfaces/product.interface'
import CourseForm from '@/components/CourseForm/CourseForm'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import NotFound from '../not-found'
import { useState } from 'react'
import Spinner from '@/components/Spinner/Spinner'

const Edit = () => {
	const search = useSearchParams()
	const searchQuery = search ? search?.get('q') : null
	const encodedSearch = encodeURI(searchQuery || '')

	const [isLoading, setIsLoading] = useState(true)
	const { data, error } = useSWR<{ course: ProductModel }>(
		`https://learnify-courses.vercel.app/api/edit?q=${encodedSearch}`,
		async (url: string) => {
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error('Не удалось получить курсы')
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
