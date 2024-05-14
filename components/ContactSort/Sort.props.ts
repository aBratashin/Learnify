import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ContactSortEnum } from '../Contact/ContactSort.reducer'

export interface SortProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	sort: ContactSortEnum
	setSort: (sort: ContactSortEnum) => void
}
