import Spinner from '@/components/Spinner/Spinner'
import { authOptions } from '@/configs/auth'
import { UserStatus } from '@prisma/client'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import NotFound from '../not-found'

const EditResults = dynamic(
	() => import('@/components/EditResults/EditResults'),
	{
		suspense: true
	}
)

export default async function Edit() {
	const session = await getServerSession(authOptions)

	if (session?.user.role !== UserStatus.Admin) {
		return <NotFound />
	}

	return (
		<Suspense fallback={<Spinner />}>
			<EditResults />
		</Suspense>
	)
}
