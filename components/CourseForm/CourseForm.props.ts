import { ProductModel } from '@/interfaces/product.interface'
import { Course } from '@prisma/client'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface CourseFormProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	edit?: boolean
	course?: ProductModel
}

export interface IContact {
	title: string
	link: string
	categories: { value: string; label: string }[]
	tags: string[]
	image: { value: string; label: string } | null
	initialRating: number
	price: number
	oldPrice: number
	credit: number
	description: string
	advantages: string
	disAdvantages: string
	reviewCount: number
	characteristics: Course['characteristics']
	duration: number
	complexity: string
	documentType: { value: string; label: string } | null
}
