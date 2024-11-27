<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Texture from './Texture.svelte';  

</script>

<div class="row">
  <div class="column left">
    <Texture/>    
  </div>
  <div class="column">
    <Canvas>
      <Scene />
    </Canvas>
  </div>
</div>

<style>

 .column {
    float: left;    
    width: 1024px;
    height: 1024px;
  }

  .left {
    height: 1024px;
    width: 1024px;
  }

  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
</style>