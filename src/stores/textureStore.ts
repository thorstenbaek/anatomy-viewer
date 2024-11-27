import { writable, derived } from "svelte/store";
import { CanvasTexture } from "three";

export const textureStore = writable<any>(null);

export const mapStore = derived(textureStore, ($textureStore) =>{
    return new CanvasTexture($textureStore);
}); 