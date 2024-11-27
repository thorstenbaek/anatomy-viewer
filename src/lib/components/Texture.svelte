<script lang="ts">
    import {onMount} from "svelte";
    import {textureStore} from "../../stores/textureStore";

    const heightPx = "2048px";
    const widthPx = "2048px";
    const height = 2048;
    const width = 2048;

    let drawing;
    let drawingCtx;

    let canvas;
    let textureCtx;
    

    let isDrawing = false;
    let rectangles = [];
    let startX = 0;
    let startY = 0;
    let currentRect = { x: 0, y: 0, width: 0, height: 0 };

    onMount(() => {
        drawingCtx = drawing.getContext('2d');
        
        textureCtx = canvas.getContext('2d');
        textureCtx.fillStyle = "lightBlue";
        textureCtx.fillRect(0, 0, 2048, 2048);
        textureCtx.lineWidth = 1;
        textureCtx.strokeStyle = "black";
        textureCtx.fillStyle = "red";
        refresh();
    })

    function refresh() {
        textureCtx.clearRect(0, 0, 2048, 2048);
        textureCtx.fillStyle = "lightBlue";
        textureCtx.fillRect(0, 0, 2048, 2048);

        textureCtx.fillStyle = "red";
        textureCtx.strokeStyle = "black";
        textureCtx.beginPath();
        textureCtx.lineWidth = 1;
        
        rectangles.map(r => {
            textureCtx.fillRect(r.x, r.y, r.width, r.height);
        });

        textureCtx.stroke();
        textureCtx.closePath();

        $textureStore = canvas;
      
    }

    function startDrawing(event) {
        
        const rect = event.target.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
        isDrawing = true;
        currentRect = { x: startX, y: startY, width: 0, height: 0 };
    }

    function stopDrawing(event) {
        if (isDrawing) {
            rectangles.push({ ...currentRect });
            currentRect = { x: 0, y: 0, width: 0, height: 0 };
            isDrawing = false;

            drawingCtx.clearRect(0, 0, 2048, 2048);
            refresh();
        }
        
    }

    function draw(event) {        
        if (!isDrawing) {
            return;
        }

        const rect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        currentRect.width = mouseX - startX;
        currentRect.height = mouseY - startY;
        
        drawingCtx.clearRect(0, 0, 2048, 2048);
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
