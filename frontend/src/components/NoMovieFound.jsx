export default function NoMovieFound({ media }) {
	let content = 'Movies';
	if (media === 'tv') content = 'TV Shows';

	return (
		<div className='no-results-simple'>
			<h3>No {content} Found!</h3>
			<p>Try different search terms</p>
		</div>
	);
}
