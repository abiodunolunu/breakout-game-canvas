import { hexToRgb } from '~/helpers/functions';

export class Circle {
    ttl = 60
    opacity = 1;
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    radius: number
    velocity: {
        x: number
        y: number
    }
    color: string
    colorRGB: [number, number, number]
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, velX: number, velY: number) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = {
            x: velX,
            y: velY
        }
        this.color = color
        this.colorRGB = hexToRgb(color)
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath()
    }

    update() {
        this.ttl--
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.adjustOpacityAndColorAccordingToTTL();

        this.draw()
    }
    get canvas() {
        return this.ctx.canvas
    }

    get isAlive() {
        return this.ttl > 1
    }

    adjustOpacityAndColorAccordingToTTL() {
        this.opacity = this.opacity - 1 / this.ttl;

        let [r, g, b] = this.colorRGB
        this.color = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    }

}