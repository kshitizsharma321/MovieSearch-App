import { useContext, useState, useEffect } from 'react';

import { SearchContext } from '../store/movie-info-context.jsx';
import ImageLoader from './ImageLoader.jsx';
import './MovieDetails.css';

function timeConverter(minutes) {
	let hrs = Math.floor(minutes / 60);
	let mins = minutes - 60 * hrs;
	if (hrs === 0) return `${mins} mins`;
	if (mins === 0) {
		if (hrs === 1) return `${hrs} hr`;
		return `${hrs} hrs`;
	}
	if (hrs === 1) return `${hrs} hr ${mins} mins`;
	return `${hrs} hrs ${mins} mins`;
}

export default function MovieDetails({
	media,
	id,
	title,
	overview,
	releaseDate,
	rating,
	backdrop,
	onClose,
}) {
	const { apiKey, onSearch } = useContext(SearchContext);
	const [data, setData] = useState(null);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		async function fetchData() {
			const updatedData = await onSearch(
				`${media}/${id}?${apiKey}&append_to_response=credits`
			);
			setData(updatedData);
		}
		fetchData();

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	const tagline = data?.tagline;
	const runtime = data?.runtime ? timeConverter(data.runtime) : 'NA';
	const genres = data?.genres?.map((genre) => genre.name) || [];
	const cast = data?.credits?.cast?.slice(0, 14) || []; // Top 14 cast members

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<button className='modal-close' onClick={onClose}>
					×
				</button>

				<div className='modal-hero'>
					<ImageLoader path={backdrop} alt={title} />
					<div className='modal-hero-content'>
						<h1 className='modal-title'>{title}</h1>
						{tagline && <p className='modal-tagline'>{tagline}</p>}
					</div>
				</div>

				<div className='modal-details'>
					<div className='modal-info-container'>
						<div className='modal-info-left'>
							<div className='info-item'>
								<span className='info-label'>Release Date:</span>
								<span className='info-value'>
									{releaseDate
										? new Date(releaseDate).toLocaleDateString()
										: 'NA'}
								</span>
							</div>
							<div className='info-item'>
								<span className='info-label'>Runtime:</span>
								<span className='info-value'>{runtime}</span>
							</div>
						</div>
						<div className='modal-info-right'>
							<div className='info-item'>
								<span className='info-label'>Rating:</span>
								<span className='modal-rating'>⭐ {rating}</span>
							</div>
						</div>
					</div>

					{genres.length > 0 && (
						<div className='modal-genres-section'>
							<div className='modal-genres'>
								{genres.map((genre, index) => (
									<span key={index} className='genre-tag'>
										{genre}
									</span>
								))}
							</div>
						</div>
					)}

					<div className='modal-overview'>
						<h3>Overview</h3>
						<p>{overview}</p>
					</div>

					{cast.length > 0 && (
						<div className='modal-cast'>
							<h3>Top Cast</h3>
							<div className='cast-grid'>
								{cast.map((actor, index) => (
									<div key={index} className='cast-member'>
										<div className='cast-image-container'>
											<ImageLoader
												path={actor.profile_path}
												alt={actor.name}
												image='actor'
											/>
										</div>
										<div className='cast-info'>
											<p className='actor-name'>{actor.name}</p>
											<p className='character-name'>{actor.character}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
