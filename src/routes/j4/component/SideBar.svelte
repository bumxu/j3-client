<script lang="ts">
    import { entitiesStore } from '$lib/stores/entities.store.j4.svelte';
    import { entityTypesStore } from '$lib/stores/entitytypes.store.j4.svelte';
    import { tagsStore } from '$lib/stores/tags.store.j4.svelte';
    import SbEntities from './SBEntities.svelte';
    import SBEntityTypes from './SBEntityTypes.svelte';
    import SBTags from './SBTags.svelte';

</script>

<div class="x-sidebar">

    <SBEntityTypes bind:entityTypes={entityTypesStore.entityTypes} />
    <SbEntities bind:entities={entitiesStore.entities} />

    <SBTags bind:tags={tagsStore.tags} />


</div>

<style lang="scss">
    .x-sidebar {
        flex: 0 0 300px;
        height: 100vh;
        min-width: 300px;
        background-color: #f0f0f0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .x-sidebar :global(.x-sb-section) {
        flex: 1 1;
        overflow: auto;
    }


    .x-sidebar :global(.x-sb-header) {
        background: #333;
        padding: 5px;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.85);
    }

    .x-sidebar :global(.x-no-selection) {
        font-size: 0.85rem;
        color: #666;
        pointer-events: none;
    }
    .x-sidebar :global(.x-form) {
        padding: 10px;
    }
    .x-sidebar :global(.x-form label) {
        display: block;
        font-size: 0.75rem;
        font-weight: 600;
        margin-top: 5px;
    }
</style>