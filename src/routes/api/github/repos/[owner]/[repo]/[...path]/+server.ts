import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { octokit } from '$lib/octokit';

export type File = {
	name: string;
	type: 'dir' | 'file';
	path: string;
	downloadUrl: string;
};

export const GET: RequestHandler = async ({ params }) => {
	const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', params);

	return json(
		response.data.map(({ name, type, path, download_url }) => ({
			name,
			type,
			path,
			downloadUrl: download_url
		}))
	);
};
