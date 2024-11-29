<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Selection from './Selection.svelte';
</script>
<div class="scene">
  <Canvas>
    <Scene />
  </Canvas>
</div>
<Selection/>

<style>
  .scene {
    height: 500px;
  }
</style>
