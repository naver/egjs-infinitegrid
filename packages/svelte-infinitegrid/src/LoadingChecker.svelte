<script>
import { onMount, onDestroy } from "svelte";

export let hasLoading = true;

onMount(() => {
    hasLoading = false;
});
</script>
