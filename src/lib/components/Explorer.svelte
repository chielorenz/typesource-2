<script lang="ts">
	import type { Repo } from '../../routes/api/github/search/repos/+server';
	import type { File } from '../../routes/api/github/repos/[owner]/[repo]/[...path]/+server';
	import type { FormEventHandler } from 'svelte/elements';

	let { selectFile: selectFileCallback }: { selectFile: (content: string) => void } = $props();

	let timer: number;
	let loading = $state(false);

	let repoList = $state<Repo[]>([]);
	let selectedRepo = $state<Repo | null>(null);
	let fileList = $state<File[]>([]);
	let currentPath = $state<string | null>(null);

	let segments = $derived.by(() => {
		if (!selectedRepo) return [];
		let segments: { label: string; path: string | null }[] = [
			{ label: selectedRepo.name, path: null }
		];
		const paths: string[] = [];
		currentPath?.split('/').forEach((segment) => {
			paths.push(segment);
			segments.push({ label: segment, path: paths.join('/') });
		});
		return segments;
	});

	const handleSearch: FormEventHandler<HTMLInputElement> = (event) => {
		clearTimeout(timer);
		repoList = [];
		fileList = [];
		selectedRepo = null;
		currentPath = null;
		timer = setTimeout(async () => {
			const search = (event.target as HTMLInputElement).value;
			if (search) {
				loading = true;
				const response = await fetch(`/api/github/search/repos?q=${search}`);
				repoList = (await response.json()).data as Repo[];
				loading = false;
			}
		}, 500);
	};

	async function navigate(repo: Repo, path: string | null = null) {
		loading = true;
		const response = await fetch(`api/github/repos/${repo.owner}/${repo.name}/${path || ''}`);
		fileList = (await response.json()).data as File[];
		selectedRepo = repo;
		currentPath = path;
		loading = false;
	}

	async function selectFile(file: File) {
		const response = await fetch(file.downloadUrl);
		const content = await response.text();
		selectFileCallback(content);
	}

	export function random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const boxClass =
		'scrollbar bg-shark-950 border-shark-800 mt-2 max-h-96 overflow-y-auto overflow-x-hidden rounded border';
	const itemClass = 'w-full text-wrap break-words px-4 py-2 text-left hover:bg-shark-800';
</script>

{#snippet itemSkeleton()}
	<div
		class="m-4 mx-3 h-4 animate-pulse rounded bg-shark-800"
		style={`width:calc(${random(30, 100)}% - 32px)`}
	></div>
{/snippet}

<div class="w-[500px] bg-shark-900 p-4 text-white">
	<input
		placeholder="Search for repositories"
		oninput={handleSearch}
		class="w-full rounded border border-shark-800 bg-shark-950 px-4 py-2 text-white outline-none focus:border-shark-600"
	/>

	{#if selectedRepo}
		<div class="mt-2">
			{#each segments as { path, label }}
				<button onclick={() => navigate(selectedRepo, path)} class="px-2">{label}</button>/
			{/each}
		</div>
	{/if}

	{#if loading}
		<div class={boxClass}>
			{@render itemSkeleton()}
			{@render itemSkeleton()}
			{@render itemSkeleton()}
		</div>
	{:else if selectedRepo}
		{#if fileList.length}
			<div class={boxClass}>
				{#each fileList as file}
					{#if file.type === 'dir'}
						<button class={itemClass} onclick={() => navigate(selectedRepo, file.path)}>
							📁 {file.name}
						</button>
					{:else}
						<button class={itemClass} onclick={() => selectFile(file)}>
							📄 {file.name}
						</button>
					{/if}
				{/each}
			</div>
		{/if}
	{:else if repoList.length}
		<div class={boxClass}>
			{#each repoList as repo}
				<button class={itemClass} onclick={() => navigate(repo)}>
					{repo.owner}/{repo.name}
				</button>
			{/each}
		</div>
	{/if}
</div>
