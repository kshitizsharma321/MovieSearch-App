import { useNavigate } from 'react-router';

export default function NoPageFound() {
	const navigate = useNavigate();

	return (
		<div className='not-found-container'>
			<div className='not-found-content'>
				<div className='error-code'>404</div>
				<h3>Oops! Page Not Found</h3>
				<p>The page you're looking for doesn't exist or has been moved.</p>
				<div className='not-found-buttons'>
					<button className='home-button' onClick={() => navigate(-1)}>
						Go Back
					</button>
					<button className='home-button' onClick={() => navigate('/')}>
						Go To Home
					</button>
				</div>
			</div>
		</div>
	);
}
