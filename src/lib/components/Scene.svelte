<script lang="ts">
  import { T } from '@threlte/core'
  import Male from "./models/Male.svelte";
  import { ContactShadows, Float, Grid, OrbitControls, interactivity, useGltf, useTexture} from '@threlte/extras'
  import { Texture, RepeatWrapping, MirroredRepeatWrapping, CanvasTexture} from "three";  
  
  

  
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 4]}
  target={[0, 0, 0]}
  fov={15}
>
  <OrbitControls
    autoRotate
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0}
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

<Male/>



<!-- <ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5} /> -->

  


