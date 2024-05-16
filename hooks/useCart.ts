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

const useCart = ({ courseId, currentUser }: IUseFavorite) => {
	const router = useRouter()
	const loginModal = useLoginModal()

	const hasCart = useMemo(() => {
		const list = currentUser?.cartIds || []

		return list.includes(courseId)
	}, [currentUser, courseId])

	const toggleCart = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()

			if (!currentUser) {
				return loginModal.onOpen()
			}

			let request

			if (hasCart) {
				request = () => axios.delete(`/api/cart/${courseId}`)
			} else {
				request = () => axios.post(`/api/cart/${courseId}`)
			}

			toast
				.promise(request(), {
					loading: 'Обновление...',
					success: 'Корзина обновлена',
					error: 'Что-то пошло не так!'
				})
				.then(() => {
					router.refresh()
				})
		},
		[courseId, currentUser, hasCart, loginModal, router]
	)

	return {
		hasCart,
		toggleCart
	}
}

export default useCart
