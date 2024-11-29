<script lang="ts">
  import { T } from '@threlte/core'
  import { interactivity, useGltf } from '@threlte/extras';
  import type {IntersectionEvent} from "@threlte/extras";
  import { Mesh, CanvasTexture, Vector2 } from "three";
  import Part from "./Part.svelte";
  import {textureStore} from "../../../stores/stores";
  import {selectionStore, pointerUvPosition, canvasStore} from "../../../stores/stores";
  
  let manPromise = useGltf('/models/MaleComposition.glb');
  var mousePos: DOMPoint;
  var isDrawing: boolean = false;

  interactivity();

  var inMemoryCanvas = document.createElement('canvas');
  inMemoryCanvas.height = 2048;
  inMemoryCanvas.width = 2048;
  var ctx = inMemoryCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'white';
    ctx?.fillRect(0, 0, 2048, 2048);
  }

  let canvasTexture = new CanvasTexture(inMemoryCanvas);

  function toArray(obj:any): Mesh[] {
    let results = [];

    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof Mesh) {
        results.push(value);
      }
    }

    return results;
  }

  function mapUvCoordinatesToTexture(uv: Vector2): DOMPoint {
    return new DOMPoint(uv.x*2048, 2048 - uv.y*2048);
  }

  function pointerdown(e: IntersectionEvent<PointerEvent>) {
    var uv = e.intersections[0]?.uv;
    if (uv) {
      isDrawing = true;
      mousePos = mapUvCoordinatesToTexture(uv);
      ctx?.beginPath();
      ctx?.moveTo(mousePos.x, mousePos.y);
    }
  }

  function pointermove(e: IntersectionEvent<PointerEvent>) {
    var uv = e.intersections[0]?.uv;
    if (uv) {
        mousePos = mapUvCoordinatesToTexture(uv);
        
        var ctx = inMemoryCanvas.getContext('2d');
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx?.lineTo(mousePos.x, mousePos.y);
        ctx?.stroke();
        
        canvasTexture = new CanvasTexture(inMemoryCanvas);
    }
  }

  function pointerup(e: IntersectionEvent<PointerEvent>) {}
  
</script>
{#await manPromise}  
  <slot name="fallback" />
  {:then gltf}   
  <T.Group 
    on:pointerdown={pointerdown}
    on:pointermove={pointermove}
    on:pointerup={pointerup}>

    <!-- <T.Mesh>
      <T.PlaneGeometry/>
      <T.MeshStandardMaterial normalMap={gltf.materials.Char_Mlp.normalMap} map={canvasTexture}/>
    </T.Mesh> -->

    {#each toArray(gltf.nodes) as node}
      <Part mesh={node} normalMap={gltf.materials.Char_Mlp.normalMap} textureMap={canvasTexture}/>
    {/each}   
  </T.Group>
    {:catch error}    
    <slot name="error" />
  {/await}