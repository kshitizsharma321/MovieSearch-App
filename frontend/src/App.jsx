import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import Layout from './components/Layout.jsx';
import NoPage from './pages/NoPageFound.jsx';
import Home from './pages/HomePage.jsx';
import Search from './pages/SearchPage.jsx';
import Details from './pages/DetailsPage.jsx';
import './App.css';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					{/* <Route index element={<Home />} /> */}
					<Route index element={<Navigate to='/trending' replace />} />
					<Route path='trending' element={<Home />} />
					<Route path='trending/:page' element={<Home />} />
					<Route path='search/:name' element={<Search />} />
					<Route path='search/:name/:page' element={<Search />} />
					<Route path='movie/:id' element={<Details />} />
					<Route path='tv/:id' element={<Details />} />
					<Route path='error' element={<NoPage />} />
					<Route path='*' element={<NoPage url={-1} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
