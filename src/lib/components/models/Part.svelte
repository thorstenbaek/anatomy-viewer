<script lang="ts">
    import { T } from '@threlte/core'
    import type { Mesh } from "three";

    export let mesh: Mesh;
    export let normalMap;
    let color: string = "#cccccc";

    function pointerEnter(e:any) {
        color = "#ffffff";
    }

    function pointerLeave(e:any) {
        color = "#cccccc";
    }
</script>

  <T.Mesh geometry={mesh.geometry} name={mesh.name}
    on:pointerenter={pointerEnter}
    on:pointerleave={pointerLeave}>
    <T.MeshStandardMaterial {normalMap} color={color}/>
  </T.Mesh>    

