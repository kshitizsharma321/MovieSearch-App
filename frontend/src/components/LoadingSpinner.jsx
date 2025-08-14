export default function LoadingSpinner({ message = 'Loading data...' }) {
	return (
		<div className='loading'>
			<div className='spinner'></div>
			<p>{message}</p>
		</div>
	);
}
