'use client'
import React, {
	ForwardedRef,
	forwardRef,
	KeyboardEvent,
	useEffect,
	useRef,
	useState
} from 'react'
import { RatingProps } from './Rating.props'
import classNames from 'classnames'
import StarIcon from './star.svg'
import { cvaRatingError } from './RatingStyle'

const Rating = forwardRef(
	(
		{
			error,
			isEditable = false,
			rating,
			setRating,
			tabIndex,
			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const [ratingArray, setRatingArray] = useState<React.ReactElement[]>(
			new Array(5).fill(<></>)
		)
		const ratingArrayRef = useRef<(HTMLDivElement | null)[]>([])

		Rating.displayName = 'Rating'

		useEffect(() => {
			constructRating(rating)
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [rating, tabIndex])

		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) {
				return -1
			}
			if (!rating && i == 0) {
				return tabIndex ?? 0
			}
			if (r == i + 1) {
				return tabIndex ?? 0
			}
			return -1
		}

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map(
				(r: React.ReactElement, i: number) => {
					return (
						<span
							key={i}
							onMouseEnter={() => changeDisplay(i + 1)}
							onClick={() => onClick(i + 1)}
							tabIndex={computeFocus(rating, i)}
							onKeyDown={handleKey}
							ref={(r: HTMLDivElement | null) =>
								ratingArrayRef.current?.push(r)
							}
							role={isEditable ? 'slider' : ''}
							aria-invalid={error ? true : false}
							aria-valuenow={rating}
							aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
							aria-valuemax={5}
							aria-valuemin={1}
						>
							<StarIcon
								className={classNames(['mr-[5px] transition-all'], {
									['fill-primary']: i < currentRating,
									['cursor-pointer']: isEditable
								})}
							/>
						</span>
					)
				}
			)
			setRatingArray(updatedArray)
		}

		const changeDisplay = (i: number) => {
			if (!isEditable) return
			constructRating(i)
		}

		const onClick = (i: number) => {
			if (!isEditable || !setRating) return
			setRating(i)
		}

		const handleKey = (e: KeyboardEvent) => {
			if (!isEditable || !setRating) {
				return
			}
			if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
				if (!rating) {
					setRating(1)
				} else {
					e.preventDefault()
					setRating(rating < 5 ? rating + 1 : 5)
					ratingArrayRef.current[rating]?.focus()
				}
			}
			if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
				e.preventDefault()
				setRating(rating > 1 ? rating - 1 : 1)
				ratingArrayRef.current[rating - 2]?.focus()
			}
		}

		return (
			<div
				className={classNames(['flex relative'], {
					[cvaRatingError()]: error
				})}
				{...props}
				ref={ref}
				onMouseLeave={() => changeDisplay(rating)}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
				{error && (
					<span
						className='absolute bottom-[-20px] left-0 text-red'
						role='alert'
					>
						{error.message}
					</span>
				)}
			</div>
		)
	}
)

export default Rating
