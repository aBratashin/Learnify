import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { SafeUser } from '@/interfaces'
import useLoginModal from './useLoginModal'

interface IUseFavorite {
	courseId: string
	currentUser?: SafeUser | null
}

const useFavorite = ({ courseId, currentUser }: IUseFavorite) => {
	const router = useRouter()
	const loginModal = useLoginModal()

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || []

		return list.includes(courseId)
	}, [currentUser, courseId])

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation()

			if (!currentUser) {
				return loginModal.onOpen()
			}

			try {
				let request

				if (hasFavorited) {
					request = () => axios.delete(`https://learnify-courses.vercel.app/api/favorites/${courseId}`)
				} else {
					request = () => axios.post(`https://learnify-courses.vercel.app/api/favorites/${courseId}`)
				}

				await request()
				router.refresh()
				toast.success('Избранное обновлено')
			} catch {
				toast.error('Что-то пошло не так!')
			}
		},
		[courseId, currentUser, hasFavorited, loginModal, router]
	)

	return {
		hasFavorited,
		toggleFavorite
	}
}

export default useFavorite
