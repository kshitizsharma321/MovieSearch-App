import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';

import { getMovieData } from '../services/userService.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import NoMovieFound from '../components/NoMovieFound.jsx';
import MovieDetails from '../components/MovieDetails.jsx';

const URL = import.meta.env.VITE_URL;

export default function DetailsPage() {
	const [cardData, setCardData] = useState(null);
	const { pathname } = useLocation();
	const [_, media, id] = pathname.split('/');
	// const { media, id } = useParams();

	useEffect(() => {
		setCardData(null);
		async function fetchData() {
			const jsonData = getMovieData(media, id);
			setCardData(() => {
				if (jsonData?.success === false) {
					return undefined;
				}
				return jsonData;
			});
		}
		fetchData();
	}, [media, id]);

	return (
		<>
			{cardData === null && <LoadingSpinner message='Loading data...' />}
			{cardData === undefined && <NoMovieFound />}
			{cardData && <MovieDetails media={media} movie={cardData} />}
		</>
	);
}
