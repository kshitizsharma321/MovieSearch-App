import { useRef, memo, useState } from 'react';

import { useQueryParams } from '../services/useQueryParams.jsx';
import { useDebouncedSearch } from '../services/useDebouncedSearch.jsx';
import MediaToggler from './MediaToggler.jsx';
import '../styles/SearchBar.css';

export default memo(function SearchBar() {
	const inputRef = useRef();
	const { navigate, pathname, name, media } = useQueryParams();
	const [userInput, setUserInput] = useState('');
	const { filteredSuggestions, clearSuggestions } = useDebouncedSearch(
		userInput,
		media
	);
	const endpoints = pathname.split('/');
	const isShown =
		endpoints.includes('trending') || endpoints.includes('search');

	function handleChange(value) {
		setUserInput(value);
	}

	function handleClick(searchData = userInput) {
		const trimmedInput = searchData.trim();
		setUserInput('');
		inputRef.current.blur();
		if (!trimmedInput) {
			return;
		}
		navigate(`/search?q=${trimmedInput}&type=${media}`);
	}

	function handleSelect(suggestion) {
		clearSuggestions();
		setUserInput(suggestion);
		handleClick(suggestion);
		// inputRef.current.focus();
	}

	return (
		isShown && (
			<div className='search-section'>
				<h1 className='app-title'>{name || 'BingeBuzz'}</h1>
				<div className='search-container'>
					<div className='search-input-container'>
						<input
							ref={inputRef}
							value={userInput}
							type='text'
							className='search-input'
							placeholder='Search for movies/series...'
							onChange={(event) => handleChange(event.target.value)}
							onKeyDown={(event) => event.key === 'Enter' && handleClick()}
						/>
						<button className='search-btn' onClick={handleClick}>
							<svg
								className='search-icon-right'
								viewBox='0 0 24 24'
								fill='none'
							>
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
					<div className='autocomplete-container'>
						<ul className='autocomplete-suggestions'>
							{filteredSuggestions.map((suggestion, index) => (
								<li
									key={index}
									className='autocomplete-suggestion'
									onClick={() => handleSelect(suggestion)}
								>
									{suggestion}
								</li>
							))}
						</ul>
					</div>
					<div className='media-type'>
						<MediaToggler />
					</div>
				</div>
			</div>
		)
	);
});
