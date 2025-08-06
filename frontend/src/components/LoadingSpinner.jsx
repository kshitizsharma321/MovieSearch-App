export default function LoadingSpinner({ message = 'Searching movies...' }) {
	return (
		<div className='loading'>
			<div className='spinner'></div>
			<p>{message}</p>
		</div>
	);
}
