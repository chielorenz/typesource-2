<script lang="ts">
	import Explorer from '$lib/components/Explorer.svelte';

	const selectFile = (content: string) => {
		console.log('Selected file:', content);
	};
</script>

<div class="flex">
	<div class="flex h-[calc(100vh-56px)] w-1/4 flex-col border-r border-shark-800 p-4">
		<Explorer {selectFile} />
	</div>
	<div class="w-3/4 p-4">Editor</div>
</div>
