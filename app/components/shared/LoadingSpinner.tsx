import { ImSpinner2 } from 'react-icons/im'

type SpinnerType = {
	spinnerColor: string
}

export default function LoadingSpinner({ spinnerColor }: SpinnerType) {
	return (
		<div className='loading-spinner flex justify-center'>
			<ImSpinner2 className={`animate-spin text-5xl ${spinnerColor} `} />
		</div>
	)
}
