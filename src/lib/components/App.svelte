<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>
<div class="scene">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  .scene {
    height: 800px;
  }
</style>
