import { useNavigate } from 'react-router';

export default function NoPageFound() {
	const navigate = useNavigate();

	return (
		<div className='not-found-container'>
			<div className='not-found-content'>
				<div className='error-code'>404</div>
				<h3>Oops! Page Not Found</h3>
				<p>The page you're looking for doesn't exist.</p>
				<button className='home-button' onClick={() => navigate('/')}>
					Go Back Home
				</button>
			</div>
		</div>
	);
}
