'use client'
import NotFound from '@/app/not-found'
import CourseForm from '@/components/CourseForm/CourseForm'
import Spinner from '@/components/Spinner/Spinner'
import { ProductModel } from '@/interfaces/product.interface'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import useSWR from 'swr'
import { EditResultsProps } from './EditResults.props'

const fetchCourses = async (url: string) => {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error('Не удалось получить курсы')
	}

	return response.json()
}

const EditResults: FC<EditResultsProps> = () => {
	const searchParams = useSearchParams()
	const searchQuery = searchParams.get('q')
	const encodedSearch = encodeURI(searchQuery || '')

	const { data, error } = useSWR<{ course: ProductModel }>(
		() => (searchQuery ? `/api/edit?q=${encodedSearch}` : null),
		fetchCourses
	)

	if (searchQuery === null) {
		return <NotFound />
	}

	if (error) {
		return <NotFound />
	}

	if (!data?.course) {
		return <Spinner />
	}

	return <CourseForm edit course={data.course} />
}

export default EditResults
