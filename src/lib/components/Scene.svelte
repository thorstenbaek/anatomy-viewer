<script lang="ts">
  import { T } from '@threlte/core'
  import * as THREE from 'three';
  import Body from "./models/Body.svelte";
  import { OrbitControls} from '@threlte/extras'  
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 8]}
  target={[0, 0, 0]}
  fov={15}
>
  <OrbitControls 
    autoRotate={true}
    autoRotateSpeed={0}
    enableZoom={true}
    enablePan={true}   
    target={[0, 1, 0]}    
    mouseButtons={{RIGHT:THREE.MOUSE.ROTATE, MIDDLE:THREE.MOUSE.PAN}}    
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

<Body/>


  


