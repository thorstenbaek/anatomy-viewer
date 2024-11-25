export default class TextureGrid {
    width: number; 
    height: number;
    count: number;

    constructor(width: number, height: number, count: number = 256) {
        this.width = width;
        this.height = height;
        this.count = count;
    }

    render(ctx: CanvasRenderingContext2D, ): void {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        for(let x = 0; x < this.width; x += this.width / this.count) {
            ctx?.moveTo(x, 0);
            ctx?.lineTo(x, this.height);
            for(let y = 0; y < this.height; y += this.height / this.count) {
                ctx?.moveTo(0, y);
                ctx?.lineTo(this.width, y);
            }
        }
        ctx?.stroke();
    }
}