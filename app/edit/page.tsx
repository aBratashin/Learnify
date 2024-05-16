'use client'
import Spinner from '@/components/Spinner/Spinner'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const EditResults = dynamic(
	() => import('@/components/EditResults/EditResults'),
	{
		suspense: true
	}
)

export default function Search() {
	return (
		<Suspense fallback={<Spinner />}>
			<EditResults />
		</Suspense>
	)
}
