import { ContactsModel } from '@/interfaces/actions.interface'

export enum ContactSortEnum {
	Status = 'STATUS',
	CreatedAt = 'CREATED_AT',
	None = 'NONE'
}

export type SortActions =
	| { type: ContactSortEnum.Status }
	| { type: ContactSortEnum.CreatedAt }
	| { type: ContactSortEnum.None }
	| { type: 'reset'; initialState: ContactsModel[] }

export interface SortReducerState {
	sort: ContactSortEnum
	contacts: ContactsModel[]
}

export const ContactSortReducer = (
	state: SortReducerState,
	action: SortActions
): SortReducerState => {
	switch (action.type) {
		case ContactSortEnum.Status:
			return {
				sort: ContactSortEnum.Status,
				contacts: state.contacts.sort((a, b) => {
					if (a.status === 'Confirmed') {
						if (b.status === 'Confirmed') return 0
						return -1
					}
					if (a.status === 'Cancelled') {
						if (b.status === 'Cancelled') return 0
						if (b.status === 'Confirmed') return 1
						return -1
					}
					if (b.status === 'Pending') return 0
					return 1
				})
			}
		case ContactSortEnum.CreatedAt:
			return {
				sort: ContactSortEnum.CreatedAt,
				contacts: state.contacts.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				)
			}
		case ContactSortEnum.None:
			return {
				sort: ContactSortEnum.None,
				contacts: state.contacts
			}
		case 'reset':
			return {
				sort: ContactSortEnum.None,
				contacts: action.initialState
			}
		default:
			throw new Error('Неверный тип сортировки')
	}
}
