<script lang="ts">
    import {onMount} from "svelte";
    import {textureStore} from "../../stores/textureStore";
    import type Rectangle from "../types/rectangle";

    const heightPx = "1024px";
    const widthPx = "1024px";
    const height = 1024;
    const width = 1024;

    let drawing: HTMLCanvasElement;
    let drawingCtx: CanvasRenderingContext2D | null;

    let canvas: HTMLCanvasElement;;
    let textureCtx: CanvasRenderingContext2D | null;
    

    let isDrawing = false;
    let rectangles: Rectangle[] = [];
    let startX = 0;
    let startY = 0;
    let currentRect = { x: 0, y: 0, width: 0, height: 0 };

    onMount(() => {
        drawingCtx = drawing.getContext('2d');
        
        textureCtx = canvas.getContext('2d');
        
        if (textureCtx == null) {
            return;
        }
        
        textureCtx.fillStyle = "lightBlue";
        textureCtx.fillRect(0, 0, 1024, 1024);
        textureCtx.lineWidth = 1;
        textureCtx.strokeStyle = "black";
        textureCtx.fillStyle = "red";
        refresh();
    })

    function refresh() {
        if (textureCtx == null) {
            return;
        }
        
        textureCtx.clearRect(0, 0, 1024, 1024);
        textureCtx.fillStyle = "lightBlue";
        textureCtx.fillRect(0, 0, 1024, 1024);

        textureCtx.fillStyle = "red";
        textureCtx.strokeStyle = "black";
        textureCtx.beginPath();
        textureCtx.lineWidth = 1;
        
        rectangles.map(r => {
            textureCtx?.fillRect(r.x, r.y, r.width, r.height);
        });

        textureCtx.stroke();
        textureCtx.closePath();

        $textureStore = canvas;
    }

    function startDrawing(event: MouseEvent) {
        
        if (event.target == null)
        {
            return;
        }

        const element = event.target as Element;
        const rect = element.getBoundingClientRect();

        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
        isDrawing = true;
        currentRect = { x: startX, y: startY, width: 0, height: 0 };
    }

    function stopDrawing(event: MouseEvent) {
        if (isDrawing) {
            rectangles.push({ ...currentRect });
            currentRect = { x: 0, y: 0, width: 0, height: 0 };
            isDrawing = false;
            
            drawingCtx?.clearRect(0, 0, 1024, 1024);
            refresh();
        }
        
    }

    function draw(event: MouseEvent) {        
        if (!isDrawing) {
            return;
        }

        if (event.target == null)
        {
            return;
        }

        const element = event.target as Element;
        const rect = element.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        currentRect.width = mouseX - startX;
        currentRect.height = mouseY - startY;
        
        if (drawingCtx == null) {
            return;
        }

        drawingCtx.clearRect(0, 0, 1024, 1024);
        drawingCtx.beginPath();
        drawingCtx.rect(currentRect.x, currentRect.y, currentRect.width, currentRect.height);
        drawingCtx.closePath();
        drawingCtx.stroke();
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="stack" style="width: {widthPx};height: {heightPx};">
    <canvas class="texture"
        width="{width}" 
        height="{height}" 
        bind:this={canvas}/>

    <canvas class="drawing" 
        on:mousedown={startDrawing}
        on:mousemove={draw}
        on:mouseup={stopDrawing}     
        width="{width}" 
        height="{height}" 
        bind:this={drawing}/>
</div>

<style>
    #stack {
        position:absolute;
        left: 0;
        top: 0;        
        content: "";
    }

    #stack > canvas {
        position: absolute;
        top: 0;
        left: 0;
    }

    canvas {
        display: block;
    }
</style>
