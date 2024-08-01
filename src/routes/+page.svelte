<script lang="ts">
	import Explorer from '$lib/components/Explorer.svelte';
	const selectFile = (content: string) => {
		console.log('Selected file content:', content);
	};
</script>

<div class="p-2">
	<Explorer {selectFile} />
</div>
