const url = import.meta.env.VITE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

async function getData(searchURL) {
	try {
		const response = await fetch(`${url}/${searchURL}`);
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.log('Error:', error);
		// throw error;
	}
}

export async function getTrendingData() {
	const searchURL = `trending/all/day?api_key=${apiKey}`;
	const jsonData = await getData(searchURL);
	return jsonData.results;
}

export async function getSearchData(name) {
	const searchURL = `search/multi?api_key=${apiKey}&query=${name}`;
	const jsonData = await getData(searchURL);
	return jsonData.results;
}

export async function getMovieData(media, id) {
	const searchURL = `${media}/${id}?api_key=${apiKey}&append_to_response=credits`;
	const jsonData = getData(searchURL);
	return jsonData;
}
