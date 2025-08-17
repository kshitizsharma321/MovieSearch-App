import { memo } from 'react';

import { getCommonData } from '../util/helper.js';
import { useQueryParams } from '../services/useQueryParams.jsx';
import ImageLoader from './ImageLoader.jsx';
import '../styles/MovieCard.css';

export default memo(function MovieCard({ individualData }) {
	const { navigate, media } = useQueryParams();
	const { id, title, releaseYear, rating, poster } =
		getCommonData(individualData);

	return (
		<>
			<div className='movie-card' onClick={() => navigate(`/${media}/${id}`)}>
				<div className='movie-poster'>
					<ImageLoader path={poster} alt={title} size='w154' />
					<div className='movie-rating'>
						<span>{rating}</span>
					</div>
				</div>
				<div className='movie-info'>
					<h3 className='movie-title'>{title}</h3>
					<p className='movie-year'>{releaseYear}</p>
				</div>
			</div>
		</>
	);
});
