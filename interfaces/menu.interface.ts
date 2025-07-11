import { TopLevelCategory } from './page.interface'
import React from 'react'

export interface PageItem {
	alias: string
	title: string
	_id: string
	category: string
}

export interface MenuItem {
	_id: {
		secondCategory: string
	}
	isOpened?: boolean
	pages: PageItem[]
}

export interface FirstLevelMenuItem {
	route: string
	name: string
	icon: React.JSX.Element
	id: TopLevelCategory
}
