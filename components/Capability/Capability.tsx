import { MenuData } from '@/helpers/MenuData'
import Link from 'next/link'
import { FC } from 'react'
import { capabilityProps } from './Capability.props'
import { cvaItemLink, cvaItems, cvaTitle, cvaWrapper } from './CapabilityStyle'

const Capability: FC<capabilityProps> = () => {
	return (
		<div className={cvaWrapper()}>
			<h1 className={cvaTitle()}>Найди себя и новые возможности в Learnify</h1>
			<div className={cvaItems()}>
				{MenuData.map(el =>
					el.pages.map(c => (
						<Link
							href={`/courses/${c.alias}`}
							className={cvaItemLink()}
							key={c._id}
						>
							{c.category}
						</Link>
					))
				)}
			</div>
		</div>
	)
}

export default Capability
