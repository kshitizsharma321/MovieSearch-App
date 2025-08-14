import { useNavigate } from 'react-router';
import { useRef, memo } from 'react';

import '../styles/SearchBar.css';

export default memo(function SearchBar({ title }) {
	const inputRef = useRef();
	const navigate = useNavigate();

	function handleClick() {
		const userInput = inputRef.current.value.trim();
		inputRef.current.value = '';
		inputRef.current.blur();
		if (!userInput) {
			return;
		}
		navigate(`/search/${userInput}`);
	}

	return (
		<div className='search-section'>
			<h1 className='app-title'>{title}</h1>
			<div className='search-container'>
				<div className='search-input-container'>
					<input
						ref={inputRef}
						type='text'
						className='search-input'
						placeholder='Search for movies/series...'
						onKeyDown={(event) => event.key === 'Enter' && handleClick()}
					/>
					<button className='search-btn' onClick={handleClick}>
						<svg className='search-icon-right' viewBox='0 0 24 24' fill='none'>
							<path
								d='M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
});
