import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface MenuItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	onClick: () => void
	label: string
}
