import { useState } from 'react';

import ImageLoader from './ImageLoader.jsx';
import MovieDetails from './MovieDetails.jsx';
import './MovieCard.css';

export default function Details({ individualData }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const id = individualData.id;
	const title = individualData?.title || individualData?.name;
	const overview = individualData?.overview;
	const releaseDate =
		individualData?.release_date || individualData?.first_air_date;
	const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : 'NA';
	const rating = individualData?.vote_average
		? Math.round(individualData.vote_average * 10) / 10
		: 'NA';
	const poster = individualData?.poster_path;
	const backdrop = individualData?.backdrop_path || poster;
	const media = individualData.media_type;

	return (
		<>
			<div className='movie-card' onClick={() => setIsModalOpen(true)}>
				<div className='movie-poster'>
					<ImageLoader path={poster} alt={title} />
					<div className='movie-rating'>
						<span>{rating}</span>
					</div>
				</div>
				<div className='movie-info'>
					<h3 className='movie-title'>{title}</h3>
					<p className='movie-year'>{releaseYear}</p>
				</div>
			</div>
			{isModalOpen && (
				<MovieDetails
					media={media}
					id={id}
					title={title}
					overview={overview}
					releaseDate={releaseDate}
					rating={rating}
					backdrop={backdrop}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</>
	);
}
