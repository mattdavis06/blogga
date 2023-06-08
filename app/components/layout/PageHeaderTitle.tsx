type PageHeaderTitleType = {
	headerTitle: string
}

export default function PageHeaderTitle({ headerTitle }: PageHeaderTitleType) {
	return (
		// page header for all pages
		<h2 className='pb-5 text-center text-3xl font-bold text-primaryBlue md:text-left'>
			{headerTitle}
		</h2>
	)
}
