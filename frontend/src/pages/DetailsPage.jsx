import { useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import { getMovieData } from '../services/userService.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import MovieDetails from '../components/MovieDetails.jsx';

export default function DetailsPage() {
	const navigate = useNavigate();
	const [cardData, setCardData] = useState(null);
	const { pathname } = useLocation();
	const [_, media, id] = pathname.split('/');
	// const { media, id } = useParams();

	useEffect(() => {
		setCardData(null);
		async function fetchData() {
			const jsonData = await getMovieData(media, id);
			setCardData(() => {
				if (jsonData?.success === false) {
					navigate('/error');
					return null;
				} else return jsonData;
			});
		}
		fetchData();
	}, [media, id]);

	return (
		<>
			{cardData === null && <LoadingSpinner />}
			{cardData && <MovieDetails media={media} movie={cardData} />}
		</>
	);
}
