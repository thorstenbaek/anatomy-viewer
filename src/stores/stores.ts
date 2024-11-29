import {writable, derived} from 'svelte/store';
import type {Readable, Writable} from 'svelte/store';
import { CanvasTexture } from "three";

export const selectionStore: Writable<string[]> = writable([]);
export const pointerUvPosition = writable({x: 0, y: 0});

export const canvasStore: Writable<HTMLCanvasElement> = writable<HTMLCanvasElement>(null);

export const textureStore: Readable<CanvasTexture> = derived(canvasStore, ($canvasStore) =>{
    if ($canvasStore === null) {
        return null;
    }
    console.log("Creating texture");
    return new CanvasTexture($canvasStore);
}); 