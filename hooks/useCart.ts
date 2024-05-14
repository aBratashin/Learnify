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
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()

			if (!currentUser) {
				return loginModal.onOpen()
			}

			try {
				let request

				if (hasCart) {
					request = () => axios.delete(`/api/cart/${courseId}`)
				} else {
					request = () => axios.post(`/api/cart/${courseId}`)
				}

				await request()
				router.refresh()
				toast.success('Корзина обновлена')
			} catch {
				toast.error('Что-то пошло не так!')
			}
		},
		[courseId, currentUser, hasCart, loginModal, router]
	)

	return {
		hasCart,
		toggleCart
	}
}

export default useCart
