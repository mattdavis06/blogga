import { Fragment } from 'react'
import sanitizeHtml from 'sanitize-html'
import Image from 'next/image'
import PageHeaderTitle from '../components/layout/PageHeaderTitle'

// Icons
import {
	SiNextdotjs,
	SiReact,
	SiTypescript,
	SiGraphql,
	SiTailwindcss,
	SiPrettier,
	SiPostcss,
	SiGithub,
} from 'react-icons/si'
import { CgWebsite } from 'react-icons/cg'
import Btn from '../components/shared/Btn'

const getAboutPageData = async () => {
	const res = await fetch(
		`https://eu-west-2.cdn.hygraph.com/content/${process.env.CMS_API_KEY}/master`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query: `{
					page(where: {pageTitle: "About"}) {
						id
						pageTitle
						aboutText {
						html
						}
						aboutMeText {
						html
						}
						aboutMeImage {
						url
						}
						gitHubLink
						porfolioSiteLink
					  }
				  }`,
			}),
			cache: 'no-store',
		}
	)
	const { data } = await res.json()
	return data.page
}

export default async function About() {
	const page = await getAboutPageData()

	const createHTMLMarkup = (html: any) => {
		return { __html: sanitizeHtml(html) }
	}

	return (
		<Fragment>
			<PageHeaderTitle headerTitle={'About'} />
			<section id='about' className='section-borders-y'>
				<div className='about-wrapper pt-10 md:flex'>
					<div className='about-description w-full'>
						<div className='about-tech float-right mb-10 h-fit w-full rounded-xl border-t-4 border-primaryBlue bg-lightBlue px-6 py-4 shadow-lg md:ml-8 md:mb-8 md:mt-0 md:w-[35%] md:p-6'>
							<h1 className='pb-6 text-2xl font-medium text-primaryBlue'>
								Built With
							</h1>
							<ul className='columns-2 space-y-6 md:flex md:columns-1 md:flex-col'>
								<li>
									<a
										href='https://nextjs.org/'
										target='_blank'
										className='flex items-center text-primaryBlue/70 transition-colors hover:text-primaryBlue'
									>
										<SiNextdotjs className='mr-4 text-4xl text-primaryBlue' />
										NextJS 13
									</a>
								</li>
								<li>
									<a
										href='https://reactjs.org/'
										target='_blank'
										className='flex items-center text-primaryBlue/70 transition-colors hover:text-primaryBlue'
									>
										<SiReact className='mr-4 text-4xl text-primaryBlue' />
										ReactJS
									</a>
								</li>
								<li>
									<a
										href='https://tailwindcss.com/'
										target='_blank'
										className='flex items-center text-primaryBlue/70 transition-colors hover:text-primaryBlue'
									>
										<SiTailwindcss className='mr-4 text-4xl text-primaryBlue' />
										Tailwind CSS
									</a>
								</li>
								<li>
									<a
										href='https://www.typescriptlang.org/'
										target='_blank'
										className='flex items-center text-primaryBlue/70 transition-colors hover:text-primaryBlue'
									>
										<SiTypescript className='mr-4 text-4xl text-primaryBlue' />
										TypeScript
									</a>
								</li>
								<li>
									<a
										href='https://hygraph.com/'
										target='_blank'
										className='flex items-center text-primaryBlue/70 transition-colors hover:text-primaryBlue'
									>
										<svg
											height='40'
											viewBox='213.333 0 582.058 1000'
											width='40'
											xmlns='http://www.w3.org/2000/svg'
											className='mr-4'
										>
											<path
												clipRule='evenodd'
												d='m678.974 133.331-116.408 66.671-116.408 66.661-116.417 66.67v400.004l116.417-66.67 116.408-66.671v-133.331l-116.408 66.67v-133.331l116.408-66.671 116.408-66.67v400.004l-116.408 66.67-116.408 66.661-116.417 66.671-116.408 66.661 116.408 66.67 116.417-66.67 116.408-66.661 116.408-66.671 116.417-66.661v-666.667l-116.417-66.67z'
												fill='#232E52'
												fillRule='evenodd'
											/>
										</svg>
										Hygraph
									</a>
								</li>
								<li>
									<a
										href='https://graphql.org/'
										target='_blank'
										className='flex items-center text-primaryBlue/70 transition-colors hover:text-primaryBlue'
									>
										<SiGraphql className='mr-4 text-4xl text-primaryBlue' />
										GraphQL
									</a>
								</li>
								<li>
									<a
										href='https://tailwindcss.com/blog/automatic-class-sorting-with-prettier'
										target='_blank'
										className='flex items-center text-primaryBlue/70 transition-colors hover:text-primaryBlue'
									>
										<SiPrettier className='mr-4 text-4xl text-primaryBlue' />
										Prettier
									</a>
								</li>
								<li>
									<a
										href='https://postcss.org/'
										target='_blank'
										className='flex items-center text-primaryBlue/70 transition-colors hover:text-primaryBlue'
									>
										<SiPostcss className='mr-4 text-3xl text-primaryBlue' />
										PostCSS
									</a>
								</li>
							</ul>
						</div>
						{page.aboutText.html && (
							<div
								className='about-section'
								dangerouslySetInnerHTML={createHTMLMarkup(page.aboutText.html)}
							/>
						)}
					</div>
				</div>
				<div className='about-me-wrapper py-10 md:pb-10'>
					<h2 className='pb-6 text-2xl font-medium text-primaryBlue'>
						About Me
					</h2>
					<div className='about-me md:flex'>
						<div className='about-me-text w-full py-4 md:py-0'>
							<div className='about-me-img float-left mb-10 w-full md:mb-4 md:w-[35%] md:pr-8'>
								<Image
									src={page.aboutMeImage.url}
									width={800}
									height={800}
									alt='about-me-profile-img'
									className='w-full rounded-xl shadow-lg'
								></Image>
							</div>
							{page.aboutMeText.html && (
								<div
									className='about-section'
									dangerouslySetInnerHTML={createHTMLMarkup(
										page.aboutMeText.html
									)}
								/>
							)}
						</div>
					</div>
					<div className='about-me-socials mt-8 flex w-full flex-col items-center space-y-4 rounded-xl bg-primaryBlue p-4 md:flex-row md:justify-around md:space-y-0 md:py-4'>
						<Btn
							btnText={'Visit my Github Account'}
							width={'w-full md:w-[300px]'}
							btnCustom={'flex'}
							href={`${page.gitHubLink}`}
							target={'_blank'}
							btnIcon={<SiGithub className='mr-3 text-xl' />}
						/>
						<Btn
							btnText={'Visit my Portfolio Site'}
							width={'w-full md:w-[300px]'}
							btnCustom={'flex'}
							href={`${page.porfolioSiteLink}`}
							target={'_blank'}
							btnIcon={<CgWebsite className='mr-3 text-xl' />}
						/>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

// METADATA =============
export const metadata = {
	title: 'About',
	description: 'About',
	keywords: ['blogga', 'blogs', 'about blogga', 'about'],
}
