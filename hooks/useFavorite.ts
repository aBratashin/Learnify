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
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation()

			if (!currentUser) {
				return loginModal.onOpen()
			}

			let request

			if (hasFavorited) {
				request = () => axios.delete(`/api/favorites/${courseId}`)
			} else {
				request = () => axios.post(`/api/favorites/${courseId}`)
			}

			toast.promise(
				request(),
				{
					loading: 'Обновление...',
					success: 'Избранное обновлено',
					error: 'Что-то пошло не так!'
				}
			).then(() => {
				router.refresh()
			})
		},
		[courseId, currentUser, hasFavorited, loginModal, router]
	)

	return {
		hasFavorited,
		toggleFavorite
	}
}

export default useFavorite
