import { useQueryParams } from '../services/useQueryParams.jsx';

export default function MediaToggler() {
	let { navigate, pathname, media, name } = useQueryParams();
	if (pathname.includes('search') && name) {
		pathname += `?q=${name}&`;
	} else pathname += '?';

	function handleToggle() {
		const mediaType = media === 'movie' ? 'tv' : 'movie';
		navigate(`${pathname}type=${mediaType}`);
	}

	return (
		<div className='toggle-border'>
			<input
				type='checkbox'
				id='one'
				checked={media === 'tv'}
				onChange={handleToggle}
			/>
			<label htmlFor='one'>
				<div className='handle' />
			</label>
		</div>
	);
}
