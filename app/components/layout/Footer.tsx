import Link from 'next/link'
import SubscribeFooter from '../shared/SubscribeFooter'
import { socialFooterItems } from '../../../data/navData'

export default function Footer() {
	return (
		<footer className='mx-auto mt-10 flex w-full max-w-screen-sm flex-col py-6 md:mt-0 md:max-w-screen-md'>
			<SubscribeFooter />
			<hr className='my-6 bg-primaryBlue/30' />
			<div className='footer-content-wrapper flex flex-col items-center justify-between md:flex-row'>
				<div className='footer-text order-2 text-center md:order-1 md:text-left'>
					<div className='copyright'>
						<p className='text-sm text-primaryBlue/70'>
							&copy; {new Date().getFullYear()} Blogga
						</p>
					</div>
					<div className='credits'>
						<p className='text-sm text-primaryBlue/70'>
							Design Credit:
							<Link
								className='pl-2 text-primaryBlue/50 transition hover:text-primaryBlue'
								href='https://www.figma.com/community/file/1061110744289086034'
								target='_blank'
							>
								Elikem J. Daniels
							</Link>
						</p>
						<p className='text-sm text-primaryBlue/70'>
							Images:
							<Link
								className='pl-2 text-primaryBlue/50 transition hover:text-primaryBlue'
								href='https://unsplash.com/'
								target='_blank'
							>
								Unsplash
							</Link>
						</p>
					</div>
				</div>
				<div className='footer-socials order-1 mb-14 md:order-2 md:mb-0'>
					<ul className='flex w-32 items-center justify-between'>
						{socialFooterItems.map((item) => {
							return (
								<li key={item.id}>
									<Link
										href={item.socialItemLink}
										className='text-2xl text-primaryBlue transition hover:text-primaryBlue/50'
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
		</footer>
	)
}
