import getCurrentUser from '@/actions/getCurrentUser'
import LoginModal from '@/components/Modals/LoginModal/LoginModal'
import RegisterModal from '@/components/Modals/RegisterModal/RegisterModal'
import Up from '@/components/Up/Up'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import classes from './layout.module.css'

const notoSans = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Learnify',
	description: 'Learnify'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const currentUser = await getCurrentUser()
	return (
		<html lang='ru'>
			<body className={notoSans.className}>
				<div className={classes.wrapper}>
					<Header currentUser={currentUser} className={classes.header} />
					<Toaster />
					<LoginModal />
					<RegisterModal />
					<Sidebar currentUser={currentUser} className={classes.sidebar} />
					<main className={classes.body} role='main'>
						{children}
					</main>
					<Footer className={classes.footer} />
					<Up />
				</div>
			</body>
		</html>
	)
}
