<script lang="ts">
  import { T } from '@threlte/core'
  import { interactivity, useGltf } from '@threlte/extras';
  import { Mesh} from "three";
  import Part from "./Part.svelte";
  
  let manPromise = useGltf('/models/MaleComposition.glb');

  interactivity();

  function toArray(obj:any): Mesh[] {
    let results = [];

    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof Mesh) {
        results.push(value);
      }
    }

    return results;
  }

</script>
{#await manPromise}  
  <slot name="fallback" />
  {:then gltf}   
  <T.Group>
    {#each toArray(gltf.nodes) as node}
      <Part mesh={node} normalMap={gltf.materials.Char_Mlp.normalMap} />
    {/each}   
  </T.Group>
    {:catch error}    
    <slot name="error" />
  {/await}