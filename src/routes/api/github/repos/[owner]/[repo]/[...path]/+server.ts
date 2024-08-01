import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Octokit } from 'octokit';
import { GITHUB_TOKEN } from '$env/static/private';
const octokit = new Octokit({ auth: GITHUB_TOKEN });

export type File = {
	name: string;
	type: 'dir' | 'file';
	path: string;
	downloadUrl: string;
};

export const GET: RequestHandler = async ({ params }) => {
	const { owner, repo, path = '' } = params;
	const content = await octokit.rest.repos.getContent({ owner, repo, path });

	if (Array.isArray(content.data)) {
		return json({
			data: content.data.map(({ name, type, path, download_url }) => ({
				name,
				type,
				path,
				downloadUrl: download_url
			}))
		});
	}

	return json({ data: content.data });
};
