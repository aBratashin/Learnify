import prisma from '@/configs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getCartProducts() {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser) {
			return []
		}

		const cart = await prisma.course.findMany({
			where: {
				id: {
					in: [...(currentUser.cartIds || [])]
				}
			},
			include: {
				reviews: true
			}
		})

		return cart
	} catch (error: any) {
		throw new Error(error)
	}
}
