<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls, interactivity } from '@threlte/extras'
  import MaleCharBaseMesh from './models/MaleCharBaseMesh.svelte';
  import { spring } from 'svelte/motion'

  interactivity();
  let color = "white";
  let scale = spring(1);
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 1, 8]}
  target={[0, 1, 0]}
  fov={15}
>
  <OrbitControls
    autoRotate
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0.5}
    target={[0, 1, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={5.8}
  position={[-10, 10, -10]}
/>
<T.DirectionalLight
  intensity={2.8}
  position={[-10, 10, 10]}
/>
<T.AmbientLight intensity={0.8} />

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>

<Float
  floatIntensity={0.8}
  floatingRange={[0, 0]}
>
  <MaleCharBaseMesh {color} scale={$scale}
    on:pointerenter={()=>{scale.set(1.001)}}
    on:pointerleave={()=>{scale.set(1.0)}}/>
</Float>



