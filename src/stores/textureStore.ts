import { writable, derived } from "svelte/store";
import { CanvasTexture } from "three";

export const textureStore = writable<any>(null);

export const mapStore = derived(textureStore, ($textureStore) => {
    var inMemoryCanvas = document.createElement('canvas');
    inMemoryCanvas.height = 2048;
    inMemoryCanvas.width = 2048;
    var ctx = inMemoryCanvas.getContext('2d');
    ctx?.drawImage($textureStore, 0, 0, 2048, 2048);
    return new CanvasTexture($textureStore);
}); 