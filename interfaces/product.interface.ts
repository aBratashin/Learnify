import { TopPageModel } from '@/interfaces/page.interface'

export interface ProductCharacteristic {
	value: string
	name: string
}

export interface ReviewModel {
	id: string
	name: string
	title: string
	description: string
	rating: number
	createdAt: Date
}

export interface ProductModel {
	id: string
	categories: string[]
	tags: string[]
	title: string
	link: string
	price: number
	credit: number
	oldPrice: number
	description: string | null
	characteristics: ProductCharacteristic[] | any[]
	createdAt: Date
	updatedAt: Date
	__v?: number
	image: string
	initialRating: number
	reviews: ReviewModel[]
	reviewCount: number
	reviewAvg: number | null
	advantages?: string | null
	disadvantages?: string
}

export interface ProductBody {
	category: TopPageModel['category']
}
