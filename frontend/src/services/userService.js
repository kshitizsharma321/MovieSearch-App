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

export async function getTrendingData(media, page) {
	const searchURL = `trending/${media}/day?api_key=${apiKey}&page=${page}`;
	const jsonData = await getData(searchURL);
	return jsonData;
}

export async function getSearchData(media, name, page) {
	const searchURL = `search/${media}?api_key=${apiKey}&query=${name}&page=${page}`;
	const jsonData = await getData(searchURL);
	return jsonData;
}

export async function getMovieData(media, id) {
	const searchURL = `${media}/${id}?api_key=${apiKey}&append_to_response=credits`;
	const jsonData = await getData(searchURL);
	return jsonData;
}
