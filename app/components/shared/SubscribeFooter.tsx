'use client'
import { Fragment, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { FaCheckCircle } from 'react-icons/fa'

export default function SubscribeFooter() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const [isFormValid, setIsFormValid] = useState<boolean | undefined | string>(
		undefined
	)
	const [isFormSubmit, setIsFormSubmit] = useState<boolean>(false)

	// Checks if email input value is valid email
	const isEmailValid = (email: string) => {
		return /\S+@\S+\.\S+/.test(email)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)

		if (isFormValid !== '') {
			setIsFormValid(true)
		} else {
			setIsFormValid(false)
		}
	}

	const handleSubmit = () => {
		if (inputValue === '') {
			setIsFormValid(false)
		} else if (!isEmailValid(inputValue)) {
			setIsFormValid(false)
		} else {
			setIsFormValid(true)
			setIsFormSubmit(true)
			setIsLoading(true)

			// Timeout for dummy subcribe sign up
			setTimeout(() => {
				setIsLoading(false)
				setIsFormSubmit(true)
			}, 2500)
		}
	}

	return (
		<section
			id='footerSubscribe'
			className='relative mb-10 flex h-[325px] w-full items-center justify-center overflow-hidden bg-primaryBlue sm:rounded-xl'
		>
			<div className='top-left-circle absolute -top-[50%] -left-[75px] h-40 w-40 translate-y-[50%] rounded-full border-[1rem] border-yellow sm:-left-[10%]'></div>
			<div className='footer-subscribe-content my-auto w-[345px] sm:w-[400px]'>
				{!isFormSubmit && (
					<Fragment>
						<h3 className='pb-2 text-center text-3xl font-semibold text-white'>
							Subscribe to my blog.
						</h3>
						<p className='text-center text-xl text-white/50'>
							I post fresh content every week.
						</p>
						<div className='subscribe-input-wrapper relative mt-10'>
							<label htmlFor='emailSubmit'></label>
							<input
								type='email'
								name='emailSubmit'
								id='emailSubmit'
								onChange={(e) => handleChange(e)}
								defaultValue={inputValue}
								className={`focus-visible:pastelGreen w-full rounded-lg py-3 pl-4 pr-[154px] font-normal tracking-wide text-primaryBlue outline-pastelGreen placeholder:text-sm ${
									isFormValid === undefined
										? ''
										: !isFormValid
										? 'animate-shake'
										: ''
								}`}
								placeholder='Email address'
							/>
							<small
								className={`text-normal absolute left-1 text-pastelGreen transition duration-300 ${
									isFormValid === undefined
										? 'invisible'
										: !isFormValid
										? 'visible -translate-y-5 opacity-100'
										: 'top-0 opacity-0'
								}`}
							>
								Please enter a valid email address!
							</small>
							<div
								className='subscribe-input-btn absolute bottom-0 right-0 flex h-full w-[136px] cursor-pointer items-center justify-center rounded-tr-lg rounded-br-lg bg-pastelGreen text-xs font-semibold uppercase tracking-wide text-primaryBlue transition hover:bg-lightBlue'
								onClick={() => handleSubmit()}
							>
								Subscribe
							</div>
						</div>
					</Fragment>
				)}
				{isLoading && <LoadingSpinner spinnerColor={'text-pastelGreen'} />}
				{!isLoading && isFormSubmit && (
					<Fragment>
						<div className='subscribe-success flex flex-col items-center'>
							<FaCheckCircle className='mb-8 text-6xl text-pastelGreen' />
							<h3 className='pb-2 text-center text-3xl font-semibold text-white'>
								Thank you
								<span className='text-white/50'> {inputValue}</span> for
								subscribing!
							</h3>
						</div>
					</Fragment>
				)}
			</div>
		</section>
	)
}
