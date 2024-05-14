import { UsersModel } from '@/interfaces/actions.interface'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllUsers(): Promise<UsersModel[]> {
	try {
		const users = await prisma.user.findMany()
		return users
	} catch (error) {
		console.error('Ошибка при получении контактов из MongoDB:', error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}

export default getAllUsers
