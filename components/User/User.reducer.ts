import { User } from '@prisma/client'

export enum UserSortEnum {
	Role = 'ROLE',
	CreatedAt = 'CREATED_AT',
	None = 'NONE'
}

export type SortActions =
	| { type: UserSortEnum.Role }
	| { type: UserSortEnum.CreatedAt }
	| { type: UserSortEnum.None }
	| { type: 'reset'; initialState: User[] }

export interface SortReducerState {
	sort: UserSortEnum
	users: User[]
}

export const UserSortReducer = (
	state: SortReducerState,
	action: SortActions
): SortReducerState => {
	switch (action.type) {
		case UserSortEnum.Role:
			return {
				sort: UserSortEnum.Role,
				users: state.users.sort((a, b) => {
					if (a.role === 'Admin') {
						if (b.role === 'Admin') return 0
						return -1
					}
					if (a.role === 'User') {
						if (b.role === 'User') return 0
						if (b.role === 'Admin') return 1
						return -1
					}
					return 1
				})
			}
		case UserSortEnum.CreatedAt:
			return {
				sort: UserSortEnum.CreatedAt,
				users: state.users.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				)
			}
		case UserSortEnum.None:
			return {
				sort: UserSortEnum.None,
				users: state.users
			}
		case 'reset':
			return {
				sort: UserSortEnum.None,
				users: action.initialState
			}
		default:
			throw new Error('Invalid sorting type')
	}
}
