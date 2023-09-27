export class Rectangle {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    width: number
    height: number
    color: string
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width: number, color: string) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.rect(this.x, this.y, this.width, this.height)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath()
    }

    get canvas() {
        return this.ctx.canvas
    }

    get center() {
        return this.x + (this.width / 2)
    }
}