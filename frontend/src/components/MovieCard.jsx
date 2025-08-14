import { useNavigate } from 'react-router';
import { memo } from 'react';

import ImageLoader from './ImageLoader.jsx';
import { getCommonData } from '../util/helper.js';
import '../styles/MovieCard.css';

export default memo(function MovieCard({ individualData }) {
	const navigate = useNavigate();
	const { id, title, media, releaseYear, rating, poster } =
		getCommonData(individualData);

	return (
		<>
			<div className='movie-card' onClick={() => navigate(`/${media}/${id}`)}>
				<div className='movie-poster'>
					<ImageLoader path={poster} alt={title} size='w185' />
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
