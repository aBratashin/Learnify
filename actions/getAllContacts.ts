import { ContactsModel } from '@/interfaces/actions.interface'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllContacts(): Promise<ContactsModel[]> {
	try {
		const contacts = await prisma.contacts.findMany()
		return contacts
	} catch (error) {
		console.error('Ошибка при получении контактов из MongoDB:', error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}

export default getAllContacts
