<script lang="ts">
    import { T } from '@threlte/core'
    import { Mesh, CanvasTexture, Vector2} from "three";
    import type {IntersectionEvent} from "@threlte/extras";
    import {mouseDownStore} from "../../../stores/stores";

    export let mesh: Mesh;
    export let normalMap: CanvasTexture ;
    
    var mousePos: DOMPoint|null = null;
    
    let color: string = "#cccccc";
    const selectionColor: string = "#aa6666";
    let isSelected: boolean = false;

    function mapUvCoordinatesToTexture(uv: Vector2): DOMPoint {
    return new DOMPoint(uv.x*2048, 2048 - uv.y*2048);
  }

  var inMemoryCanvas = document.createElement('canvas');
  inMemoryCanvas.height = 2048;
  inMemoryCanvas.width = 2048;
  var ctx = inMemoryCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'white';
    ctx?.fillRect(0, 0, 2048, 2048);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
  }

  let canvasTexture = new CanvasTexture(inMemoryCanvas);

  function pointerenter(e: IntersectionEvent<PointerEvent>){    
    if ($mouseDownStore) {
        var uv = e.intersections[0]?.uv;
        if (uv) {
            mousePos = mapUvCoordinatesToTexture(uv);
            ctx?.beginPath();
            ctx?.moveTo(mousePos.x, mousePos.y);
        }
    }
  }

  function pointerleave(e: IntersectionEvent<PointerEvent>){
    ctx?.closePath();
  }
  
  function pointerdown(e: IntersectionEvent<PointerEvent>) {
    if (e.nativeEvent.button == 0) {
        var uv = e.intersections[0]?.uv;
        if (uv) {
            $mouseDownStore = true;
            mousePos = mapUvCoordinatesToTexture(uv);
            ctx?.beginPath();
            ctx?.moveTo(mousePos.x, mousePos.y);
        }
    }
  }

  function pointermove(e: IntersectionEvent<PointerEvent>) {
    if ($mouseDownStore) {
        var uv = e.intersections[0]?.uv;
        if (uv) {
            mousePos = mapUvCoordinatesToTexture(uv);
            
            ctx?.lineTo(mousePos.x, mousePos.y);
            ctx?.stroke();
            
            canvasTexture.needsUpdate = true;
        }
    }
  }

  function pointerup(e: IntersectionEvent<PointerEvent>) {
    $mouseDownStore = false;
    ctx?.closePath;
  }
    
</script>

  <T.Mesh geometry={mesh.geometry} name={mesh.name}
    on:pointerenter={pointerenter}  
    on:pointerleave={pointerleave}
    on:pointerdown={pointerdown}
    on:pointermove={pointermove}
    on:pointerup={pointerup}>    
    
    <T.MeshStandardMaterial {normalMap} map={canvasTexture} color={isSelected ? selectionColor : color}/>
  </T.Mesh>    

