import { SortEnum } from '@/components/Sort/Sort.props'
import { ProductModel } from '@/interfaces/product.interface'

export type SortActions =
	| { type: SortEnum.Price }
	| { type: SortEnum.Rating }
	| { type: SortEnum.None }
	| {
			type: 'reset'
			initialState: ProductModel[]
	  }

export interface SortReducerState {
	sort: SortEnum
	products: ProductModel[]
}

export const sortReducer = (
	state: SortReducerState,
	action: SortActions
): SortReducerState => {
	switch (action.type) {
		case SortEnum.Rating:
			return {
				sort: SortEnum.Rating,
				products: state.products.sort((a, b) => {
					const aRating = calculateAverageRating(a)
					const bRating = calculateAverageRating(b)
					if (aRating !== bRating) {
						return aRating > bRating ? -1 : 1
					} else {
						return a.reviews.length > b.reviews.length ? -1 : 1
					}
				})
			}
		case SortEnum.Price:
			return {
				sort: SortEnum.Price,
				products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1))
			}
		case SortEnum.None:
			return {
				sort: SortEnum.None,
				products: state.products
			}
		case 'reset':
			return {
				sort: SortEnum.None,
				products: action.initialState
			}
		default:
			throw new Error('Неверный тип сортировки')
	}
}

const calculateAverageRating = (product: ProductModel): number => {
	const totalRating = product.reviews.reduce(
		(acc, review) => acc + (isNaN(review.rating) ? 0 : review.rating),
		0
	)
	return product.reviews.length > 0 ? totalRating / product.reviews.length : 0
}
