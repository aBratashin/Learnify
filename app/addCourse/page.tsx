import { authOptions } from '@/configs/auth'
import { UserStatus } from '@prisma/client'
import { getServerSession } from 'next-auth'
import NotFound from '../not-found'
import CourseForm from '@/components/CourseForm/CourseForm'

const page = async () => {
	const session = await getServerSession(authOptions)

	if (session?.user.role !== UserStatus.Admin) {
		return <NotFound />
	}

	return <CourseForm />
}

export default page
