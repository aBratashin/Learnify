import { ProductBody, ProductModel } from '@/interfaces/product.interface'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProductsByCategory(
	productBody: ProductBody
): Promise<ProductModel[]> {
	try {
		const products = await prisma.course.findMany({
			where: {
				categories: {
					has: productBody.category
				}
			},
			include: {
				reviews: true
			}
		})
		return products
	} catch (error) {
		console.error('Ошибка при получении курсов из MongoDB:', error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}

export default getProductsByCategory
