import { ContactsModel } from '@/interfaces/actions.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ContactsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	contacts: ContactsModel[]
}
