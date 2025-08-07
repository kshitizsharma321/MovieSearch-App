const usdToInrRates = {
	1947: 3.3,
	1948: 3.31,
	1949: 3.67,
	1950: 4.76,
	1951: 4.76,
	1952: 4.76,
	1953: 4.76,
	1954: 4.76,
	1955: 4.76,
	1956: 4.76,
	1957: 4.76,
	1958: 4.76,
	1959: 4.76,
	1960: 4.76,
	1961: 4.76,
	1962: 4.76,
	1963: 4.76,
	1964: 4.76,
	1965: 4.76,
	1966: 6.36,
	1967: 7.5,
	1968: 7.5,
	1969: 7.5,
	1970: 7.5,
	1971: 7.5,
	1972: 7.59,
	1973: 7.74,
	1974: 8.1,
	1975: 8.38,
	1976: 8.96,
	1977: 8.74,
	1978: 8.19,
	1979: 8.13,
	1980: 7.86,
	1981: 8.66,
	1982: 9.46,
	1983: 10.1,
	1984: 11.36,
	1985: 12.37,
	1986: 12.61,
	1987: 12.96,
	1988: 13.92,
	1989: 16.23,
	1990: 17.5,
	1991: 22.74,
	1992: 25.92,
	1993: 30.49,
	1994: 31.37,
	1995: 32.43,
	1996: 35.43,
	1997: 36.31,
	1998: 41.26,
	1999: 43.06,
	2000: 44.94,
	2001: 47.19,
	2002: 48.61,
	2003: 46.58,
	2004: 45.32,
	2005: 44.1,
	2006: 45.31,
	2007: 41.35,
	2008: 43.51,
	2009: 48.41,
	2010: 45.73,
	2011: 46.67,
	2012: 53.44,
	2013: 56.57,
	2014: 62.33,
	2015: 62.97,
	2016: 66.46,
	2017: 67.79,
	2018: 70.09,
	2019: 70.39,
	2020: 76.38,
	2021: 74.57,
	2022: 81.35,
	2023: 81.94,
	2024: 84.83,
	2025: 86.13,
};

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
	if (parseInt(year) > 2025) rupees = usdToInrRates['2025'] * usd;
	else if (parseInt(year) < 1947) rupees = usdToInrRates['1947'] * usd;
	else rupees = usdToInrRates[year] * usd;

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
