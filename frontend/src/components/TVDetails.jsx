// import ImageLoader from './ImageLoader.jsx';
// import { getCommonData } from '../util/helper.js';
// import '../styles/TVDetails.css';

// export default function TVDetails({ tvShow }) {
// 	// Extract data using helper function
// 	const { title, overview, poster, backdrop, rating } = getCommonData(tvShow);

// 	// TV-specific data
// 	const name = tvShow?.name || title;
// 	const firstAirDate = tvShow?.first_air_date;
// 	const lastAirDate = tvShow?.last_air_date;
// 	const numberOfSeasons = tvShow?.number_of_seasons;
// 	const numberOfEpisodes = tvShow?.number_of_episodes;
// 	const status = tvShow?.status;
// 	const genres = tvShow?.genres?.map((genre) => genre.name) || [];
// 	const networks = tvShow?.networks || [];
// 	const creators = tvShow?.created_by || [];
// 	const seasons =
// 		tvShow?.seasons?.filter((season) => season.season_number > 0) || [];
// 	const lastEpisode = tvShow?.last_episode_to_air;
// 	const cast = tvShow?.credits?.cast?.slice(0, 12) || [];

// 	// Format air year
// 	const firstAirYear = firstAirDate
// 		? new Date(firstAirDate).getFullYear()
// 		: 'NA';

// 	// Get status badge class
// 	const getStatusClass = (status) => {
// 		switch (status?.toLowerCase()) {
// 			case 'ended':
// 				return 'ended';
// 			case 'returning series':
// 				return 'ongoing';
// 			case 'canceled':
// 				return 'cancelled';
// 			default:
// 				return 'ongoing';
// 		}
// 	};

// 	return (
// 		<div className='details-page'>
// 			{/* Hero Section */}
// 			<section className='details-hero'>
// 				<ImageLoader
// 					path={backdrop}
// 					image='backdrop'
// 					alt={`${name} backdrop`}
// 					size='w1280'
// 				/>
// 				<div className='details-hero-overlay'>
// 					<h1 className='tv-title'>{name}</h1>
// 					{status && (
// 						<span className={`status-badge ${getStatusClass(status)}`}>
// 							{status}
// 						</span>
// 					)}
// 				</div>
// 			</section>

// 			{/* Content Section */}
// 			<section className='details-content'>
// 				<div className='details-grid'>
// 					{/* Poster and Stats Sidebar */}
// 					<aside className='poster-wrap'>
// 						<ImageLoader
// 							path={poster}
// 							image='movie'
// 							alt={`${name} poster`}
// 							size='w500'
// 						/>

// 						<div className='tv-stats'>
// 							<div className='stat'>
// 								<span>Seasons:</span>
// 								<span>{numberOfSeasons || 'NA'}</span>
// 							</div>
// 							<div className='stat'>
// 								<span>Episodes:</span>
// 								<span>{numberOfEpisodes || 'NA'}</span>
// 							</div>
// 							<div className='stat'>
// 								<span>First Aired:</span>
// 								<span>{firstAirYear}</span>
// 							</div>
// 							<div className='stat'>
// 								<span>Rating:</span>
// 								<span className='badge rating'>★ {rating}</span>
// 							</div>
// 						</div>
// 					</aside>

// 					{/* Main Content */}
// 					<main>
// 						{/* Genres */}
// 						{genres.length > 0 && (
// 							<div style={{ marginBottom: '2rem' }}>
// 								<div
// 									style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
// 								>
// 									{genres.map((genre, index) => (
// 										<span key={index} className='badge genre'>
// 											{genre}
// 										</span>
// 									))}
// 								</div>
// 							</div>
// 						)}

// 						{/* Overview */}
// 						<section style={{ marginBottom: '2.5rem' }}>
// 							<h3
// 								style={{
// 									fontSize: '1.5rem',
// 									marginBottom: '1rem',
// 									fontWeight: '600',
// 								}}
// 							>
// 								Overview
// 							</h3>
// 							<p style={{ lineHeight: '1.7', color: '#ccc' }}>
// 								{overview || 'No overview available for this TV show.'}
// 							</p>
// 						</section>

// 						{/* Cast */}
// 						{cast.length > 0 && (
// 							<section style={{ marginBottom: '3rem' }}>
// 								<h3
// 									style={{
// 										fontSize: '1.5rem',
// 										marginBottom: '1rem',
// 										fontWeight: '600',
// 									}}
// 								>
// 									Top Cast
// 								</h3>
// 								<div className='cast-grid'>
// 									{cast.map((actor, index) => (
// 										<div key={index} className='cast-card'>
// 											<ImageLoader
// 												path={actor.profile_path}
// 												image='actor'
// 												alt={actor.name}
// 												size='w185'
// 											/>
// 											<h4 className='cast-name'>{actor.name}</h4>
// 											<p className='cast-character'>{actor.character}</p>
// 										</div>
// 									))}
// 								</div>
// 							</section>
// 						)}

// 						{/* Seasons */}
// 						{seasons.length > 0 && (
// 							<section style={{ marginBottom: '3rem' }}>
// 								<h3
// 									style={{
// 										fontSize: '1.5rem',
// 										marginBottom: '1rem',
// 										fontWeight: '600',
// 									}}
// 								>
// 									Seasons
// 								</h3>
// 								<div className='seasons-grid'>
// 									{seasons.map((season, index) => (
// 										<div key={index} className='season-card'>
// 											<ImageLoader
// 												path={season.poster_path}
// 												image='movie'
// 												alt={season.name}
// 												size='w300'
// 											/>
// 											<div className='season-info'>
// 												<h4>{season.name}</h4>
// 												<p>{season.episode_count} episodes</p>
// 												{season.vote_average > 0 && (
// 													<span className='badge rating'>
// 														★ {season.vote_average.toFixed(1)}
// 													</span>
// 												)}
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</section>
// 						)}

// 						{/* Networks */}
// 						{networks.length > 0 && (
// 							<section style={{ marginBottom: '2rem' }}>
// 								<h4
// 									style={{
// 										color: '#888',
// 										marginBottom: '1rem',
// 										fontSize: '1rem',
// 									}}
// 								>
// 									Networks
// 								</h4>
// 								<div
// 									style={{
// 										display: 'flex',
// 										flexWrap: 'wrap',
// 										gap: '1rem',
// 										alignItems: 'center',
// 									}}
// 								>
// 									{networks.map((network, index) => (
// 										<ImageLoader
// 											key={index}
// 											path={network.logo_path}
// 											image='network'
// 											alt={network.name}
// 											size='w154'
// 											style={{
// 												height: '40px',
// 												width: 'auto',
// 												background: '#fff',
// 												padding: '0.5rem',
// 												borderRadius: '6px',
// 											}}
// 										/>
// 									))}
// 								</div>
// 							</section>
// 						)}

// 						{/* Creators */}
// 						{creators.length > 0 && (
// 							<section style={{ marginBottom: '2rem' }}>
// 								<h4
// 									style={{
// 										color: '#888',
// 										marginBottom: '1rem',
// 										fontSize: '1rem',
// 									}}
// 								>
// 									Created by
// 								</h4>
// 								<div
// 									style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
// 								>
// 									{creators.map((creator, index) => (
// 										<span
// 											key={index}
// 											style={{
// 												background: '#333',
// 												color: '#fff',
// 												padding: '0.5rem 1rem',
// 												borderRadius: '20px',
// 												fontSize: '0.85rem',
// 											}}
// 										>
// 											{creator.name}
// 										</span>
// 									))}
// 								</div>
// 							</section>
// 						)}

// 						{/* Last Episode */}
// 						{lastEpisode && (
// 							<section
// 								style={{
// 									background: '#1a1a1a',
// 									borderRadius: '12px',
// 									padding: '1.5rem',
// 									border: '1px solid #333',
// 								}}
// 							>
// 								<h4 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
// 									Last Episode to Air
// 								</h4>
// 								<p
// 									style={{
// 										color: '#e50914',
// 										fontWeight: '600',
// 										marginBottom: '0.5rem',
// 									}}
// 								>
// 									{lastEpisode.name}
// 								</p>
// 								<p
// 									style={{
// 										color: '#ccc',
// 										lineHeight: '1.6',
// 										fontSize: '0.9rem',
// 									}}
// 								>
// 									{lastEpisode.overview || 'No overview available.'}
// 								</p>
// 								<div
// 									style={{
// 										display: 'flex',
// 										gap: '1rem',
// 										marginTop: '1rem',
// 										flexWrap: 'wrap',
// 									}}
// 								>
// 									<span style={{ color: '#888', fontSize: '0.8rem' }}>
// 										S{lastEpisode.season_number}E{lastEpisode.episode_number}
// 									</span>
// 									<span style={{ color: '#888', fontSize: '0.8rem' }}>
// 										{lastEpisode.air_date}
// 									</span>
// 									{lastEpisode.runtime && (
// 										<span style={{ color: '#888', fontSize: '0.8rem' }}>
// 											{lastEpisode.runtime} min
// 										</span>
// 									)}
// 								</div>
// 							</section>
// 						)}
// 					</main>
// 				</div>
// 			</section>
// 		</div>
// 	);
// }

// import ImageLoader from './ImageLoader.jsx';
// import { getCompleteTVData } from '../util/helper.js';
// import '../styles/CommonDetails.css';
// import '../styles/TVDetails.css';

// export default function TVDetails({ tvShow }) {
// 	const {
// 		title,
// 		tagline,
// 		backdrop,
// 		poster,
// 		firstAirDate,
// 		lastAirDate,
// 		rating,
// 		genres,
// 		overview,
// 		cast,
// 		numSeasons,
// 		numEpisodes,
// 		status,
// 		creators,
// 		networks,
// 		seasons,
// 	} = getCompleteTVData(tvShow);

// 	return (
// 		<>
// 			<div
// 				className='details-hero'
// 				// style={{ backgroundImage: `url(${backdrop})` }}
// 			>
// 				<div className='details-hero-overlay'>
// 					<ImageLoader
// 						path={poster}
// 						image='movie'
// 						className='details-poster'
// 						alt={title}
// 					/>
// 					<div className='details-content'>
// 						<h1 className='details-title'>
// 							{title}
// 							<span className='details-year'>
// 								({new Date(firstAirDate).getFullYear()})
// 							</span>
// 						</h1>
// 						{tagline && <div className='details-tagline'>{tagline}</div>}

// 						<div className='details-genres'>
// 							{genres.map((genre, index) => (
// 								<span key={index} className='genre-pill'>
// 									{genre}
// 								</span>
// 							))}
// 						</div>

// 						<div className='details-info-row'>
// 							<span className='details-label'>Rating:</span>
// 							<span className='details-value rating-badge'>{rating}</span>
// 						</div>
// 						<div className='details-info-row'>
// 							<span className='details-label'>Seasons:</span>
// 							<span className='details-value'>{numSeasons}</span>
// 						</div>
// 						<div className='details-info-row'>
// 							<span className='details-label'>Episodes:</span>
// 							<span className='details-value'>{numEpisodes}</span>
// 						</div>
// 						<div className='details-info-row'>
// 							<span className='details-label'>Status:</span>
// 							<span className={`tv-status status-${status.toLowerCase()}`}>
// 								{status}
// 							</span>
// 						</div>

// 						<p className='details-overview'>{overview}</p>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='details-container'>
// 				{/* Cast Section */}
// 				<div className='details-section'>
// 					<h3>Top Cast</h3>
// 					<div className='cast-grid'>
// 						{cast.map((actor, index) => (
// 							<div key={index} className='cast-member'>
// 								<div className='cast-image-container'>
// 									<ImageLoader
// 										path={actor.profile_path}
// 										image='actor'
// 										alt={actor.name}
// 									/>
// 								</div>
// 								<div className='cast-info'>
// 									<p className='actor-name'>{actor.name}</p>
// 									<p className='character-name'>{actor.character}</p>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>

// 				{/* Seasons Section */}
// 				{seasons.length > 0 && (
// 					<div className='details-section details-seasons'>
// 						<h3>Seasons</h3>
// 						<div className='seasons-grid'>
// 							{seasons.map((season, index) => (
// 								<div key={index} className='season-card'>
// 									<ImageLoader
// 										path={season.poster_path}
// 										image='movie'
// 										className='season-poster'
// 										alt={season.name}
// 									/>
// 									<div className='season-info'>
// 										<h4 className='season-name'>{season.name}</h4>
// 										<p className='season-details'>
// 											{season.episode_count} episodes
// 										</p>
// 										<p className='season-details'>
// 											{new Date(season.air_date).getFullYear()}
// 										</p>
// 										{season.vote_average > 0 && (
// 											<span className='season-rating'>
// 												{season.vote_average.toFixed(1)}
// 											</span>
// 										)}
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				)}

// 				{/* Creators Section */}
// 				{creators.length > 0 && (
// 					<div className='details-section details-creators'>
// 						<h3>Created by</h3>
// 						<div className='creators-grid'>
// 							{creators.map((creator, index) => (
// 								<div key={index} className='creator-card'>
// 									<ImageLoader
// 										path={creator.profile_path}
// 										image='actor'
// 										className='creator-image'
// 										alt={creator.name}
// 									/>
// 									<div className='creator-info'>
// 										<h4>{creator.name}</h4>
// 										<p className='creator-role'>Creator</p>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				)}

// 				{/* Networks Section */}
// 				{networks.length > 0 && (
// 					<div className='details-section'>
// 						<h3>Networks</h3>
// 						<div className='networks-grid'>
// 							{networks.map((network, index) => (
// 								<img
// 									key={index}
// 									src={`https://image.tmdb.org/t/p/h30/${network.logo_path}`}
// 									alt={network.name}
// 									className='network-logo'
// 								/>
// 							))}
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	);
// }

export default function TVDetails() {}
