import { json } from '@sveltejs/kit';
import { octokit } from '$lib/octokit';

export type Repo = {
	name: string;
	owner: string | null;
};

export const GET = async ({ url }) => {
	const q = url.searchParams.get('q');

	if (!q) {
		return json({ error: 'Missing query parameter: q' }, { status: 400 });
	}

	const response = await octokit.request('GET /search/repositories', { q });

	return json(response.data.items.map(({ name, owner }) => ({ name, owner: owner?.login })));
};
