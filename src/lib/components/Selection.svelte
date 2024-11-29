<script lang="ts">
     import {selectionStore, pointerUvPosition} from "../../stores/stores";
</script>

<div class="selection">
    <!-- {$selectionStore} -->
    {$pointerUvPosition.x}, {$pointerUvPosition.y}
</div>

<style>
    .selection {
        padding: 10px;
    }
</style>