import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { UserSortEnum } from '../User/User.reducer'

export interface SortProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	sort: UserSortEnum
	setSort: (sort: UserSortEnum) => void
}
