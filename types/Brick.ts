import { Rectangle } from "./Rectangle";

export class Brick extends Rectangle {
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width: number, color: string) {
        super(ctx, x, y, height, width, color)
    }

    update() {
        super.draw()
    }
}