'use client'
import { useState, useEffect } from 'react'
import { navItems, socialFooterItems } from '../../../data/navData'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import Image from 'next/image'
import Logo from '../../../public/images/logo.svg'
import Btn from '../shared/Btn'
import { FaEllipsisV } from 'react-icons/fa'
import { RiCloseFill } from 'react-icons/ri'

type NavTypes = {
	id: number
	navItemLink: string
	navItemLinkActive: string | null
	navItemName: string
}

type SocialFooterTypes = {
	id: number
	socialItem: React.ReactNode
	socialItemLink: string
	socialAriaLabel: string
}

export default function Nav() {
	const activeNavLink = useSelectedLayoutSegment()
	const [isNavOpen, setIsNavOpen] = useState(false)

	useEffect(() => {
		isNavOpen
			? document.body.classList.add('overflow-y-hidden')
			: document.body.classList.remove('overflow-y-hidden')
	}, [isNavOpen])

	return (
		<nav className='mx-auto flex w-full max-w-screen-lg items-center justify-between py-2'>
			<div className='blog-logo'>
				<Link href='/'>
					<Image src={Logo} alt='blogga-logo' />
				</Link>
			</div>
			{/* Desktop Nav Links */}
			<div className='nav-links hidden lg:block'>
				<ul className='flex items-center'>
					{navItems.map((item: NavTypes) => {
						return (
							<li className='nav-item' key={item.id}>
								<Link
									href={item.navItemLink}
									className={`px-4 text-lg font-medium  transition ${
										activeNavLink === item.navItemLinkActive
											? 'text-pastelGreen'
											: 'text-white hover:text-white/50'
									}
									`}
								>
									{item.navItemName}
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
			{/* Mobile Nav Links */}
			<div
				className={`mobile-nav-links fixed top-0 left-0 z-10 flex h-full w-full flex-col bg-white py-8 px-8 transition-transform duration-500 md:my-6 md:px-[4rem] lg:hidden lg:py-10 ${
					isNavOpen ? '-translate-x-0' : '-translate-x-full'
				}`}
			>
				<div
					className='close-icon ml-auto cursor-pointer '
					onClick={() => setIsNavOpen(!isNavOpen)}
				>
					<RiCloseFill className='text-3xl text-primaryBlue transition-colors hover:text-primaryBlue/70' />
				</div>
				<div className='h-full w-full'>
					<ul className='flex flex-col items-start py-16 px-10'>
						{navItems.map((item: NavTypes) => {
							return (
								<li
									className={`nav-item group/item py-4 transition hover:translate-x-2 hover:-translate-y-2 ${
										activeNavLink === item.navItemLinkActive
											? 'translate-x-2 -translate-y-2'
											: ''
									}`}
									key={item.id}
								>
									<Link
										href={item.navItemLink}
										onClick={() => setIsNavOpen(!isNavOpen)}
										className={`text-4xl font-semibold text-primaryBlue group-hover/item:text-primaryBlue/70 ${
											activeNavLink === item.navItemLinkActive
												? 'text-primaryBlue/70'
												: ''
										}`}
									>
										{item.navItemName}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
				{/* Mobile Nav Social Links */}
				<div className='mobile-nav-social-links'>
					<ul className='flex items-center justify-center'>
						{socialFooterItems.map((item: SocialFooterTypes) => {
							return (
								<li key={item.id} className='px-3'>
									<Link
										href={item.socialItemLink}
										className='text-3xl text-primaryBlue transition hover:text-primaryBlue/50'
										aria-label={item.socialAriaLabel}
									>
										{item.socialItem}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
			{/* Mobile Nav Icon */}
			<div
				className={`nav-menu-icon cursor-pointer transition duration-500 lg:hidden ${
					isNavOpen ? 'rotate-[450deg]' : 'rotate-[0deg]'
				}`}
				onClick={() => setIsNavOpen(!isNavOpen)}
			>
				<FaEllipsisV className='text-2xl text-white' />
			</div>
			{/* Desktop Subscribe Btn */}
			<Btn
				btnText={'Subscribe'}
				width={'w-[108px]'}
				btnCustom={'hidden'}
				href={'#footerSubscribe'}
			/>
		</nav>
	)
}
