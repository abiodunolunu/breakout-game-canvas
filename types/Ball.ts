import { Rectangle } from "./Rectangle";

export class Ball extends Rectangle {
    private _velocityX: number
    private _velocityY: number
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width: number, color: string, velX: number, velY: number) {
        super(ctx, x, y, height, width, color)
        this._velocityX = velX
        this._velocityY = velY
    }

    update() {
        if (this.isTouchingHorizontalBorder) {
            this._velocityX = -this._velocityX
        }
        if (this.isTouchingVerticalBorder) {
            this._velocityY = -this._velocityY
        }

        this.x += this._velocityX
        this.y += this._velocityY
        super.draw()
    }

    private get isTouchingHorizontalBorder() {
        return this.x + this.width >= this.canvas.width || this.x <= 0
    }

    private get isTouchingVerticalBorder() {
        return this.y + this.height >= this.canvas.height || this.y <= 0
    }

    set velocityX(num: number) {
        this._velocityX = num
    }

    get velocityX() {
        return this._velocityX
    }

    set velocityY(num: number) {
        this._velocityY = num
    }

    get velocityY() {
        return this._velocityY
    }
}


