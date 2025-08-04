import { useState } from 'react';

import noImageAvailable from '../assets/noImage.webp';
import noActorImage from '../assets/noProfile.webp';

function loadImage(path, image, size = 'w342') {
	if (!path) {
		if (image === 'actor') return noActorImage;
		return noImageAvailable;
	}
	return `https://image.tmdb.org/t/p/${size}/${path}`;
}

export default function ImageLoader({ path, image = 'movie', ...props }) {
	const [lowQualityLoaded, setLowQualityLoaded] = useState(false);
	const [highQualityLoaded, setHighQualityLoaded] = useState(false);

	return (
		<div className='image-container'>
			{image !== 'actor' && !lowQualityLoaded && (
				<div className='image-placeholder'>
					<div className='image-spinner'></div>
				</div>
			)}

			<img
				{...props}
				className={`image-low-quality ${lowQualityLoaded ? 'loaded' : ''}`}
				src={loadImage(path, image)}
				onLoad={() => setLowQualityLoaded(true)}
				alt=''
			/>

			{lowQualityLoaded && (
				<img
					{...props}
					loading='lazy'
					className={`image-high-quality ${highQualityLoaded ? 'loaded' : ''}`}
					src={loadImage(path, image, 'original')}
					onLoad={() => setHighQualityLoaded(true)}
					alt=''
				/>
			)}
		</div>
	);
}
