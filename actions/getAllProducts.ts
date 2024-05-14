import { ProductModel } from '@/interfaces/product.interface'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllProducts(): Promise<ProductModel[]> {
	try {
		const products = await prisma.course.findMany({
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

export default getAllProducts
