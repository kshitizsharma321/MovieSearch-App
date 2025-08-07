import { useState } from 'react';

import noPoster from '../assets/noPoster.png';
import noBackdrop from '../assets/noBackdrop.png';
import noActorImage from '../assets/noProfile.webp';

function loadImage(path, image, size = 'w342') {
	if (!path) {
		if (image === 'backdrop') return noBackdrop;
		if (image === 'actor') return noActorImage;
		return noPoster;
	}
	return `https://image.tmdb.org/t/p/${size}/${path}`;
}

export default function ImageLoader({ path, image = 'movie', ...props }) {
	const [imageState, setImageState] = useState('loading');

	return (
		<div className='image-container'>
			{image !== 'actor' && imageState === 'loading' && (
				<div className='image-placeholder'>
					<div className='spinner'></div>
				</div>
			)}

			<img
				{...props}
				src={loadImage(path, image)}
				onLoad={() => setImageState('low-quality')}
				className={`image-low-quality ${
					imageState === 'low-quality' || imageState === 'high-quality'
						? 'loaded'
						: ''
				}`}
			/>

			{(imageState === 'low-quality' || imageState === 'high-quality') && (
				<img
					{...props}
					loading='lazy'
					src={loadImage(path, image, 'original')}
					onLoad={() => setImageState('high-quality')}
					className={`image-high-quality ${
						imageState === 'high-quality' ? 'loaded' : ''
					}`}
				/>
			)}
		</div>
	);
}
