<script lang="ts">
	import { ChevronsUpDown, Search } from 'lucide-svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import type { Repo } from '$lib/../routes/api/github/repos/search/+server';
	import type { File } from '$lib/../routes/api/github/repos/[owner]/[repo]/[...path]/+server';

	let { selectFile: selectFileCallback }: { selectFile: (content: string) => void } = $props();

	let timer: number;
	let loading = $state(false);
	let inputElement: HTMLInputElement | null = $state(null);

	$effect(() => inputElement?.focus());

	let isOpen = $state(false);
	let search = $state('');
	let repoList = $state<Repo[]>([]);
	let selectedRepo = $state<Repo | null>(null);
	let fileList = $state<File[]>([]);
	let currentPath = $state<string | null>(null);

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
				const response = await fetch(`/api/github/repos/search?q=${search}`);
				repoList = (await response.json()) as Repo[];
				loading = false;
			}
		}, 500);
	};

	async function navigate(repo: Repo, path: string | null = null) {
		loading = true;
		const response = await fetch(`/api/github/repos/${repo.owner}/${repo.name}/${path || ''}`);
		fileList = (await response.json()) as File[];
		selectedRepo = repo;
		currentPath = path;
		loading = false;
	}

	async function selectFile(file: File) {
		const response = await fetch(file.downloadUrl);
		const content = await response.text();
		selectFileCallback(content);
	}

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

	export function random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const itemClass =
		'w-full text-wrap break-words px-4 py-2 text-left rounded-lg hover:bg-shark-800';
</script>

{#snippet itemSkeleton()}
	<div
		class="h-4 animate-pulse rounded bg-shark-800"
		style={`width:calc(${random(30, 100)}% - 32px)`}
	></div>
{/snippet}

<div class="relative h-full">
	<div class="h-full">
		<button
			class="flex w-full cursor-pointer items-center space-x-4 rounded-lg border border-shark-800 bg-shark-950 px-4 py-2 text-sm text-white hover:bg-shark-800"
			onclick={() => (isOpen = !isOpen)}
		>
			<div class="w-full text-left">
				{selectedRepo ? `${selectedRepo.owner}/${selectedRepo.name}` : 'Select repository'}
			</div>
			<ChevronsUpDown size={18} />
		</button>

		{#if isOpen}
			<div
				class="absolute top-11 flex w-full flex-col rounded-lg border border-shark-800 bg-shark-950"
			>
				<div class="flex w-full items-center space-x-2 bg-transparent px-4 py-2 text-sm">
					<Search size={18} />
					<input
						placeholder="Search repository"
						oninput={handleSearch}
						class="w-full bg-transparent outline-none"
						bind:this={inputElement}
						bind:value={search}
					/>
				</div>
				{#if loading}
					<div class="border-b border-shark-800"></div>
					<div class="space-y-3 p-3">
						{@render itemSkeleton()}
						{@render itemSkeleton()}
						{@render itemSkeleton()}
					</div>
				{:else if repoList.length}
					<div class="border-b border-shark-800"></div>
					<div class="scrollbar max-h-96 overflow-y-auto overflow-x-hidden p-1">
						{#each repoList as repo}
							<button
								class="pointer block w-full rounded-lg p-2 text-left hover:bg-shark-800"
								onclick={() => {
									isOpen = false;
									search = '';
									repoList = [];
									navigate(repo);
								}}
							>
								{repo.owner}/{repo.name}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		{#if selectedRepo}
			<div class="scrollbar ml-2 mt-2 flex overflow-x-scroll">
				{#each segments as { path, label }}
					<button onclick={() => navigate(selectedRepo, path)} class="px-2">{label}</button>/
				{/each}
			</div>
			{#if loading}
				<div class="space-y-3 p-3">
					{@render itemSkeleton()}
					{@render itemSkeleton()}
					{@render itemSkeleton()}
				</div>
			{:else if fileList.length}
				<div class="scrollbar mt-2 h-[calc(100%-78px)] overflow-y-auto overflow-x-hidden">
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
		{/if}

		<!-- <div class="scrollbar mt-2 overflow-y-auto overflow-x-hidden">
			<button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
			<button class={itemClass}> 📄 Addd </button> <button class={itemClass}> 📄 Addd </button>
		</div> -->
	</div>
</div>
