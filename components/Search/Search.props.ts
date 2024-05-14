import { DetailedHTMLProps, FormHTMLAttributes } from 'react'

export interface SearchProps
	extends DetailedHTMLProps<
		FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	> {
	manage?: boolean
	value?: string
	onChange?: ((e: any) => void) | undefined
}
