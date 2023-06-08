'use client'

type BtnTypes = {
	btnText: string
	width?: string
	btnCustom?: string
	btnIcon?: React.ReactNode
	href?: string
	target?: string
	handleClick?: () => void
}

export default function Btn({
	btnText,
	width,
	btnCustom,
	btnIcon,
	href,
	target,
}: BtnTypes) {
	return (
		<div
			className={`btn group h-[36px] ${width} cursor-pointer items-center justify-center rounded-lg bg-white/10 transition hover:bg-pastelGreen lg:flex ${btnCustom}`}
		>
			<a
				href={href}
				target={target && target}
				className='flex items-center text-sm font-medium tracking-wider text-white transition group-hover:text-primaryBlue'
			>
				{btnIcon && btnIcon}
				{btnText}
			</a>
		</div>
	)
}
