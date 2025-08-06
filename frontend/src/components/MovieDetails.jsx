import ImageLoader from './ImageLoader.jsx';
import {
	getCommonData,
	getCompleteMovieData,
	getCompleteTVData,
} from '../util/helper.js';
import '../styles/MovieDetails.css';

export default function MovieDetails({ media, movie }) {
	var tagline, genres, cast, numEpisodes, status;
	let runtimeTitle = 'Runtime',
		budgetTitle = 'Budget',
		revenueTitle = 'Box Office',
		actualRuntime,
		actualBudget,
		actualRevenue;

	const { title, backdrop, releaseDate, rating, overview } =
		getCommonData(movie);
	if (media === 'movie') {
		var { tagline, runtime, genres, cast, budget, status, revenue } =
			getCompleteMovieData(movie);
		status = status;
		actualRuntime = runtime;
		actualBudget = budget;
		actualRevenue = revenue;
	} else {
		var { tagline, creator, genres, cast, numSeasons, numEpisodes, status } =
			getCompleteTVData(movie);
		runtimeTitle = 'Created By';
		budgetTitle = `Episode${numEpisodes > 1 ? 's' : ''}`;
		revenueTitle = `Season${numSeasons > 1 ? 's' : ''}`;
		status = status;
		actualRuntime = creator;
		actualBudget = numEpisodes;
		actualRevenue = numSeasons;
	}

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<div className='modal-hero'>
					<ImageLoader path={backdrop} image='backdrop' alt={title} />
					<div className='modal-hero-content'>
						<h1 className='modal-title'>{title}</h1>
						{tagline && <p className='modal-tagline'>{tagline}</p>}
					</div>
				</div>

				<div className='modal-details'>
					<div className='modal-info-container'>
						<div className='modal-info-left'>
							<div className='info-item'>
								<span className='info-label'>Release Date</span>
								<span className='info-value'>
									{releaseDate
										? new Date(releaseDate).toLocaleDateString()
										: 'NA'}
								</span>
							</div>
							<div className='info-item'>
								<span className='info-label'>{runtimeTitle}</span>
								<span className='info-value'>{actualRuntime}</span>
							</div>
							<div className='info-item'>
								<span className='info-label'>Status</span>
								<span className='info-value'>{status}</span>
							</div>
						</div>
						<div className='modal-info-left'>
							<div className='info-item'>
								<span className='info-label'>Rating</span>
								<span className='info-value'>
									{rating !== 'NA' && '⭐ '}
									{rating}
								</span>
							</div>
							<div className='info-item'>
								<span className='info-label'>{budgetTitle}</span>
								<span className='info-value'>{actualBudget}</span>
							</div>
							<div className='info-item'>
								<span className='info-label'>{revenueTitle}</span>
								<span className='info-value'>{actualRevenue}</span>
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
						<p>{overview ?? 'No Overview Available!'}</p>
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
