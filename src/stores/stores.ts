import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

export const mouseDownStore:Writable<boolean> = writable(false);