const url = import.meta.env.VITE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

async function getData(searchURL) {
	const response = await fetch(`${url}/${searchURL}`);
	const jsonData = await response.json();
	return jsonData;
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

// import express from 'express';
// import cors from 'cors';
// import { config } from 'dotenv';

// config();
// const app = express();
// const port = 3000;
// const apiKey = process.env.API_KEY;
// const url = process.env.TMDB;

// app.use(cors());
// app.use(express.json());

// async function getData(searchURL) {
//     while (true) {
//         try {
//             const response = await fetch(`${url}/${searchURL}`);
//             const result = await response.json();
//             return result;
//         } catch (error) {
//             if (error.cause.code === 'ECONNRESET') {
//                 console.log('Connection reset, retrying...');
//             } else {
//                 console.log(`Error encountered! `, error);
//                 console.log(`Error Cause: ${error.cause}`);
//                 throw error;
//             }
//         }
//     }
// }

// app.get('/api/:media/:id', async (req, res) => {
//     const { media, id } = req.params;
//     const searchURL = `${media}/${id}?api_key=${apiKey}&append_to_response=credits`;
//     const data = await getData(searchURL);
//     res.send(data);
// });

// app.get('/api/search', async (req, res) => {
//     const name = req.query.q;
//     const searchURL = `search/multi?api_key=${apiKey}&query=${name}`;
//     const data = await getData(searchURL);
//     res.send(data.results);
// });

// app.get('/api', async (req, res) => {
//     const searchURL = `trending/all/day?api_key=${apiKey}`;
//     const data = await getData(searchURL);
//     res.send(data.results);
// });

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });
