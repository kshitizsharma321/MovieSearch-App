import { useNavigate } from 'react-router';

export default function Pagination({ page, pages, path = '' }) {
	const navigate = useNavigate();

	return (
		<div className='not-found-buttons'>
			{page > 1 && (
				<button
					className='home-button'
					onClick={() => navigate(`${path}/${page - 1}`)}
				>
					Prev
				</button>
			)}
			{pages && page < pages && (
				<button
					className='home-button'
					onClick={() => navigate(`${path}/${page + 1}`)}
				>
					Next
				</button>
			)}
		</div>
	);
}
