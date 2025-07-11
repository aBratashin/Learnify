import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface HProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLParagraphElement>,
		HTMLParagraphElement
	> {
	tag: 'h1' | 'h2' | 'h3'
	children: ReactNode
}
