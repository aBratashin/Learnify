import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getPage(aliasValue: string) {
	try {
		const pages = await prisma.page.findFirst({
			where: {
				alias: aliasValue
			}
		})
		return pages
	} catch (error) {
		console.error('Ошибка при получении страниц из MongoDB:', error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}

export default getPage
