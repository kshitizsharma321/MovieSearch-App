import { Outlet, useLocation, useParams } from 'react-router';

import SearchBar from './SearchBar.jsx';

export default function Layout() {
	const { pathname } = useLocation();
	const { name } = useParams();
	const endpoints = pathname.split('/');
	const isShown =
		endpoints.includes('trending') || endpoints.includes('search');

	return (
		<div className='app'>
			<div className='app-container'>
				{isShown && <SearchBar title={name ? name : 'BingeBuzz'} />}
				{<Outlet />}
			</div>
		</div>
	);
}
