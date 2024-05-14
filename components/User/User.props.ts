import { UsersModel } from '@/interfaces/actions.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface UsersProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	users: UsersModel[]
}
