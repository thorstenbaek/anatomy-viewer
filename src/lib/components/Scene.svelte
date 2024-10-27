<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls, interactivity, useGltf} from '@threlte/extras'

  interactivity();
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-4, 4, 8]}
  target={[0, 1, 0]}
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

<!-- <ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5} /> -->

  {#await useGltf('/models/MaleCharBaseMesh.glb')}  
    <slot name="fallback" />
  {:then gltf}  
    <!-- <T is={gltf.scene.children[1]} position={[0, 0, 0]}/> -->

    <T.Group position={[0, 0, 0]}>
      <T.Mesh geometry={gltf.nodes.Body1003.geometry} material={gltf.materials.Char_Mlp}>
      </T.Mesh>
      <T.Mesh geometry={gltf.nodes.Body1003_1.geometry} material={gltf.materials.Eye} />
      <T.Mesh geometry={gltf.nodes.Body1003_2.geometry} material={gltf.materials.Eyel} />
    </T.Group>

  {:catch error}    
    <slot name="error" />
  {/await}


