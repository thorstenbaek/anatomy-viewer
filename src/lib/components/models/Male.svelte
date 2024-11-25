<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls, interactivity, useGltf, useTexture} from '@threlte/extras'
  import { Texture, RepeatWrapping, MirroredRepeatWrapping, CanvasTexture} from "three";
  import TextureGrid from "./textureGrid";
  import {parts} from "./parts.json";

  var grid = new TextureGrid(2048, 2048);
  /*var inMemoryCanvas = document.createElement('canvas');
  inMemoryCanvas.height = 128;
  inMemoryCanvas.width = 256;
  var ctx = inMemoryCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'red';
    ctx?.fillRect( 5, 5, 246, 118 );
    ctx.strokeStyle = '#ffFF00';
    ctx.lineWidth = 3;
    ctx?.moveTo(0, 64);
    ctx?.lineTo(256, 64);
    ctx?.moveTo(128, 0);
    ctx?.lineTo(128, 128);
    ctx?.stroke();
  }
  const map2 = new CanvasTexture(inMemoryCanvas);*/


  var inMemoryCanvas = document.createElement('canvas');
  inMemoryCanvas.height = 2048;
  inMemoryCanvas.width = 2048;
  var ctx = inMemoryCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'white';
    ctx?.fillRect(0, 0, 2048, 2048);
    ctx.fillStyle = 'red';
    ctx?.fillRect(1928, 0, 148, 178);
    ctx.fillStyle = 'green';
    ctx?.fillRect(1928, 178, 148, 178);
    ctx.fillStyle = 'yellow';
    ctx?.fillRect(1408, 0, 520, 824);
    ctx.fillStyle = 'cyan';
    ctx?.fillRect(1408, 825, 424, 830);
    ctx.fillStyle = 'blue';
    ctx?.fillRect(500, 1100, 700, 600);

    
    grid.render(ctx);    
  }
  const map2 = new CanvasTexture(inMemoryCanvas);

  let manPromise = useGltf('/models/MaleCharBaseMesh.glb');

    interactivity();
</script>

{#await manPromise}  
    <slot name="fallback" />
  {:then gltf} 
    <!-- <T is={gltf.scene.children[1]} position={[0, 0, 0]}/> -->
     {console.log(gltf.nodes.Body1003.geometry)}

    <T.Mesh>
      <T.PlaneGeometry/>
      
      <T.MeshStandardMaterial normalMap={gltf.materials.Char_Mlp.normalMap} map={map2}/>
    </T.Mesh>
   
     <T.Group position={[0, 0, 0]}>
      <T.Mesh geometry={gltf.nodes.Body1003.geometry} material={gltf.materials.Char_Mlp} >
        <T.MeshStandardMaterial map={map2} normalMap={gltf.materials.Char_Mlp.normalMap}/>
      </T.Mesh>
      <T.Mesh geometry={gltf.nodes.Body1003_1.geometry} material={gltf.materials.Eye} />
      <T.Mesh geometry={gltf.nodes.Body1003_2.geometry} material={gltf.materials.Eyel} />
    </T.Group>

  {:catch error}    
    <slot name="error" />
  {/await}