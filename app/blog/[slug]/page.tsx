import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import sanitizeHtml from 'sanitize-html'
import PageHeaderTitle from '../../components/layout/PageHeaderTitle'
import Image from 'next/image'
import BlogArticleCard from '../../components/shared/BlogArticleCard'

// METADATA ========================================
type Props = {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const post = await getSinglePost(params)

	if (post) {
		return {
			title: post.title,
			description: post.excerpt,
			keywords: [post.tags],
		}
	}

	return {
		title: '',
		description: '',
		keywords: [],
	}
}

const getSinglePost = async (params: Props['params']) => {
	const res = await fetch(
		`https://eu-west-2.cdn.hygraph.com/content/${process.env.CMS_API_KEY}/master`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `query getPost {
					post (where: {slug: "${params.slug}"}) {
						id
						tags
						slug
						date
						title
						excerpt
						contentSectionOne {
						  html
						}
						contentSectionTwo {
						  html
						}
						contentSectionThree {
						  html
						}
						contentSectionImg {
						  url
						}
						imageCert
						contentSectionQuote
						author {
						  id
						  name
						  title
						  picture {
							url
						  }
						  posts(where: {NOT: {slug: "${params.slug}"}}, first: 3) {
							id
							slug
							tags
							date
							title
							excerpt
							coverImage {
							  url
							}
						  }
						}
					  }
					}`,
			}),
			cache: 'no-store',
		}
	)

	const { data } = await res.json()
	return data.post
}

export default async function BlogArticle({ params }: Props) {
	const post = await getSinglePost(params)

	if (!post) {
		notFound()
	}

	const createHTMLMarkup = (html: string) => {
		return { __html: sanitizeHtml(html) }
	}

	if (post) {
		return (
			<Fragment>
				<PageHeaderTitle headerTitle={post.title} />
				<section id='blogArticle' className='section-borders-y'>
					<article id='articleSectionOne' className='article-section py-6'>
						{post.contentSectionOne && (
							<div
								dangerouslySetInnerHTML={createHTMLMarkup(
									post.contentSectionOne.html
								)}
							/>
						)}
					</article>
					<article
						id='articleImage'
						className='article-img my-4 h-full rounded-bl-xl rounded-br-xl shadow-lg'
					>
						{post.contentSectionImg && (
							<Image
								src={post.contentSectionImg.url}
								className='w-100 h-100 cover max-h-[500px] rounded-tl-xl rounded-tr-xl'
								alt={`${post.title
									.toLowerCase()
									.split(' ')
									.join('-')}-article-img`}
								loading='lazy'
								blurDataURL='data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
								placeholder='blur'
								width={1000}
								height={600}
							></Image>
						)}

						<figcaption className='article-figcaption uppercase'>
							{post.imageCert}
						</figcaption>
					</article>
					<article id='articleSectionTwo' className='article-section py-6'>
						{post.contentSectionTwo && (
							<div
								dangerouslySetInnerHTML={createHTMLMarkup(
									post.contentSectionTwo.html
								)}
							/>
						)}
					</article>
					<article
						id='articleBlockQuote'
						className='article-blockquote my-4 rounded-xl border-t-4 border-primaryBlue bg-lightBlue p-6 shadow-lg lg:px-10 lg:py-12'
					>
						<blockquote>{post.excerpt}</blockquote>
					</article>
					<article id='articleSectionThree' className='article-section py-6'>
						{post.contentSectionThree && (
							<div
								dangerouslySetInnerHTML={createHTMLMarkup(
									post.contentSectionThree.html
								)}
							/>
						)}
					</article>
					<article id='blogAuthor' className='article-footer py-6'>
						<footer>
							<div className='author-details flex items-center justify-end'>
								<div className='author self-end px-3'>
									<h5 className='text-xl font-semibold tracking-wide'>
										{post.author.name}
									</h5>
									<p className='text-primaryBlue/70'>{post.author.title}</p>
								</div>
								<div className='author-img '>
									<Image
										src={post.author.picture.url}
										width={100}
										height={100}
										alt={`${post.author.name}-profile-img`}
										className='h-[80px] w-[80px] rounded-xl object-cover shadow-lg md:h-[100px] md:w-[100px]'
										loading='lazy'
										blurDataURL='data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
										placeholder='blur'
									></Image>
								</div>
							</div>
						</footer>
					</article>
				</section>
				<section id='otherBlogsByAuthor' className='my-4'>
					<PageHeaderTitle headerTitle={`Other Blogs By ${post.author.name}`} />
					{post.author.posts.map((post: any) => {
						return (
							<BlogArticleCard
								key={post.id}
								slug={post.slug}
								tag={post.tags}
								postDate={post.date}
								blogTitle={post.title}
								blogExcerpt={post.excerpt}
								blogCardImg={post.coverImage}
							/>
						)
					})}
				</section>
			</Fragment>
		)
	}
}
