'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import NotFoundImg from '../public/images/404.svg'

export default function NotFound() {
	const router = useRouter()

	return (
		<section
			id='pageNotFound'
			className='flex flex-col items-center md:flex-row'
		>
			<div className='flex flex-1 flex-col items-center justify-evenly'>
				<h1 className='text-4xl font-semibold uppercase text-primaryBlue'>
					Error 404!!
				</h1>
				<h2 className='py-5 text-center text-2xl text-primaryBlue'>
					Oops, looks like you've wandered off the beaten path. Our website
					can't seem to find the page you're looking for.
				</h2>
				<button
					className='btn h-[36px] w-1/4 cursor-pointer items-center justify-center rounded-lg bg-primaryBlue text-white drop-shadow-lg transition hover:bg-pastelGreen hover:text-primaryBlue'
					onClick={() => router.back()}
				>
					Go Back
				</button>
			</div>
			{/* Credit -  Web illustrations by Storyset https://storyset.com/web */}
			<div className='flex-1'>
				<Image
					src={NotFoundImg}
					width={600}
					height={600}
					alt='404-image'
					className='h-full w-full'
				></Image>
			</div>
			<div>
				{/*
        No support for metadata in not-found.tsx yet
        https://github.com/vercel/next.js/pull/47328#issuecomment-1488891093
      */}
				<title>404: Page Not Found | Blogga</title>
			</div>
		</section>
	)
}
