import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Octokit } from 'octokit';
import { GITHUB_TOKEN } from '$env/static/private';
const octokit = new Octokit({ auth: GITHUB_TOKEN });

export type Repo = {
	name: string;
	owner: string;
};

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q');
	if (!q) {
		throw new Error('Missing query parameter');
	}

	const repos = await octokit.rest.search.repos({ q });

	return json({
		data: repos.data.items.map(({ name, owner }) => ({ name, owner: owner?.login }))
	});
};
