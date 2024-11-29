<script lang="ts">
    import { T } from '@threlte/core'
    import { type Mesh, type CanvasTexture, UVMapping} from "three";
    
    import {selectionStore, pointerUvPosition, canvasStore} from "../../../stores/stores";

    export let mesh: Mesh;
    export let normalMap: CanvasTexture ;
    export let textureMap: CanvasTexture ;
    
    let color: string = "#cccccc";
    const selectionColor: string = "#aa6666";
    let isSelected: boolean = false;

    function pointerup(e: any) {
        if (e.nativeEvent.button == 0) {
            isSelected = !isSelected;
            if (isSelected) {
                $selectionStore = [...$selectionStore, e.object.name]
            }
            else {
                let index = $selectionStore.findIndex(x => x == e.object.name);
                $selectionStore.splice(index, 1);
                $selectionStore = $selectionStore;
            }
        }

        e.stopPropagation();
    }
    
    function pointerEnter(e:any) {
        color = "#ffffff";
        e.stopPropagation();
    }

    function pointerLeave(e:any) {
        color = "#bbbbbb";
    }

    
</script>

  <T.Mesh geometry={mesh.geometry} name={mesh.name}>
    <!-- on:pointerenter={pointerEnter}
    on:pointerleave={pointerLeave}
    on:pointerup={pointerup}> -->
    
    <T.MeshStandardMaterial {normalMap} map={textureMap} color={isSelected ? selectionColor : color}/>
  </T.Mesh>    

