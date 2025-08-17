import { USD_TO_INR } from './exchangeRate.js';

function timeConverter(minutes) {
	let hrs = Math.floor(minutes / 60);
	let mins = minutes - 60 * hrs;
	const returnedMins = `${mins} min${mins > 1 ? 's' : ''}`;
	const returnedHrs = `${hrs} hr${hrs > 1 ? 's' : ''}`;
	if (hrs === 0) return returnedMins;
	if (mins === 0) return returnedHrs;
	return `${returnedHrs} ${returnedMins}`;
}

function dollarToRupees(year, dollar) {
	if (!dollar) return 'NA';
	let quant = 'K',
		usd = parseInt(dollar),
		rupees;
	if (parseInt(year) > 2025) rupees = USD_TO_INR['2025'] * usd;
	else if (parseInt(year) < 1947) rupees = USD_TO_INR['1947'] * usd;
	else rupees = USD_TO_INR[year] * usd;

	if (rupees >= 10000000) {
		rupees = Math.round(rupees / 10000000);
		quant = 'Cr';
	} else if (rupees >= 100000) {
		rupees = Math.round(rupees / 100000);
		quant = 'L';
	} else rupees = Math.round(rupees / 1000);
	return `₹${rupees.toLocaleString('en-IN')} ${quant}`;
}

export function getCommonData(individualData) {
	const id = individualData?.id;
	const title = individualData?.title || individualData?.name;
	const overview = individualData?.overview;
	const poster = individualData?.poster_path;
	const backdrop = individualData?.backdrop_path || poster;
	const media = individualData?.media_type;
	const genreIds = individualData?.genre_ids; // not required now
	const releaseDate =
		individualData?.release_date || individualData?.first_air_date;
	const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : 'NA';
	const rating = individualData?.vote_average
		? Math.round(individualData.vote_average * 10) / 10
		: 'NA';

	return {
		id,
		title,
		overview,
		poster,
		backdrop,
		media,
		genreIds,
		releaseDate,
		releaseYear,
		rating,
	};
}

export function getCompleteMovieData(movie) {
	const { releaseYear } = getCommonData(movie);
	const budget = dollarToRupees(releaseYear, movie?.budget);
	const revenue = dollarToRupees(releaseYear, movie?.revenue);
	const tagline = movie?.tagline;
	const genres = movie?.genres?.map((genre) => genre.name) || [];
	const runtime = movie?.runtime ? timeConverter(movie.runtime) : 'NA';
	const cast = movie?.credits?.cast?.slice(0, 16) || [];
	const status = movie?.status || 'Unknown';
	return {
		budget,
		revenue,
		tagline,
		genres,
		runtime,
		cast,
		status,
	};
}

export function getCompleteTVData(tvShow) {
	const tagline = tvShow?.tagline;
	const genres = tvShow?.genres?.map((genre) => genre.name) || [];
	const cast = tvShow?.credits?.cast?.slice(0, 16) || [];
	const numSeasons = tvShow?.number_of_seasons || 0;
	const numEpisodes = tvShow?.number_of_episodes || 0;
	const status = tvShow?.status || 'Unknown';
	const firstAirDate = tvShow?.first_air_date;
	const lastAirDate = tvShow?.last_air_date;
	const creator = tvShow?.created_by?.[0]?.name || 'NA';
	const networks = tvShow?.networks || [];
	const seasons =
		tvShow?.seasons?.filter((season) => season.season_number > 0) || [];

	return {
		tagline,
		genres,
		cast,
		numSeasons,
		numEpisodes,
		status,
		firstAirDate,
		lastAirDate,
		creator,
		networks,
		seasons,
	};
}
