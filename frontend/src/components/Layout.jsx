import { Outlet } from 'react-router';

export default function Layout() {
	return (
		<div className='app'>
			<div className='app-container'>{<Outlet />}</div>
		</div>
	);
}
