export enum TopLevelCategory {
	Courses
}

export interface TopPageAdvantage {
	_id: string
	title: string
	description: string
}

export interface HhData {
	id: string
	count: number
	juniorSalary: number
	middleSalary: number
	seniorSalary: number
	updatedAt: Date
}

export interface TopPageModel {
	tags: string[]
	id: string
	secondCategory: string
	alias: string
	title: string
	category: string
	seoText: string | null
	tagsTitle: string
	metaTitle: string
	metaDescription: string
	firstCategory: TopLevelCategory
	advantages?: TopPageAdvantage[] | any
	createdAt: Date
	updatedAt: Date
	hh?: HhData | any
}
