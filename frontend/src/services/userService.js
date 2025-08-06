const url = import.meta.env.VITE_URL;

async function fetchData(searchURL) {
	const response = await fetch(`${url}/${searchURL}`);
	const jsonData = await response.json();
	return jsonData.results;
}

export async function getTrendingData() {
	const result = await fetchData('api');
	return result;
}

export async function searchMovie(movie) {
	const result = await fetchData(`api/search?q=${movie}`);
	return result;
}

export async function getMovieData(id) {
	const result = await fetchData(`api/title/${id}`);
	return result;
}
