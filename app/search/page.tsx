'use client'
import Spinner from '@/components/Spinner/Spinner'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const SearchResults = dynamic(
	() => import('@/components/SearchResults/SearchResults'),
	{
		suspense: true
	}
)

export default function Search() {
	return (
		<Suspense fallback={<Spinner />}>
			<SearchResults />
		</Suspense>
	)
}
