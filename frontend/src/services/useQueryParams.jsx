import { useLocation, useSearchParams, useNavigate } from 'react-router';

import { useMemo } from 'react';

export function useQueryParams() {
	const navigate = useNavigate();
	let { pathname } = useLocation();
	const [searchParams] = useSearchParams();

	const queryData = useMemo(() => {
		const name = searchParams.get('q') || undefined;
		const media = searchParams.get('type') || 'movie';
		const page = searchParams.get('page') || 1;
		return { navigate, pathname, name, media, page };
	}, [navigate, pathname, searchParams]);
	return queryData;
}
