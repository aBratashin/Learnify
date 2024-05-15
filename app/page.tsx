import About from '@/components/About/About'
import Capability from '@/components/Capability/Capability'
import ContactsForm from '@/components/ContactsForm/ContactsForm'
import H from '@/components/H/H'
import Slider from '@/components/Slider/Slider'

export default function Home() {
	return (
		<div className='flex flex-col gap-[30px]'>
			<H tag='h1'>Главная</H>
			<div className='flex flex-col gap-20'>
				<Slider />
				<Capability />
				<About />
				<ContactsForm />
			</div>
		</div>
	)
}
