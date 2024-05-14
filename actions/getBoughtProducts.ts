import prisma from '@/configs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getBoughtProducts() {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser) {
			return []
		}

		const favorites = await prisma.course.findMany({
			where: {
				id: {
					in: [...(currentUser.boughtIds || [])]
				}
			},
			include: {
				reviews: true
			}
		})

		return favorites
	} catch (error: any) {
		throw new Error(error)
	}
}
