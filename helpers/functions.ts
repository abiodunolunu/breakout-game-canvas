import { Rectangle } from "~/types/Rectangle"
const bricksColors = ['#FF0000', '#FFA500', '#FFFF00']

export function areRectanglesOverlapping(x1: number, x2: number, y1: number, y2: number, w1: number, w2: number, h1: number, h2: number): boolean {

    const rect1Left = Math.min(x1, x1 + w1)
    const rect1Right = Math.max(x1, x1 + w1)
    const rect1Top = Math.min(y1, y1 + h1)
    const rect1Bottom = Math.max(y1, y1 + h1)

    const rect2Left = Math.min(x2, x2 + w2)
    const rect2Right = Math.max(x2, x2 + w2)
    const rect2Top = Math.min(y2, y2 + h2)
    const rect2Bottom = Math.max(y2, y2 + h2)



    const isHorizontallyOverlapping = rect1Left <= rect2Right && rect1Right >= rect2Left
    const isVerticallyOverlapping = rect1Top <= rect2Bottom && rect1Bottom >= rect2Top
    return isHorizontallyOverlapping && isVerticallyOverlapping
}

export function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * bricksColors.length);
    return bricksColors[randomIndex];
}

export function drawRectsOnCanvas(ctx: CanvasRenderingContext2D, rows: number, columns: number, spacing: number, height: number) {
    const result = []
    const canvas = ctx.canvas
    const totalSpaceNeeded = (columns + 1) * spacing
    const availableWidth = canvas.width - totalSpaceNeeded
    const widthOfEachRect = availableWidth / columns
    let colorIndex = 0

    for (let row = 0; row < rows; row++) {
        const y = row * (spacing + height)
        let startX = spacing
        for (let col = 0; col < columns; col++) {

            if (col % 4 === 0) {
                colorIndex = 0;  // #FF0000
            } else if (col % 4 === 1 || col % 4 === 3) {
                colorIndex = 1;  // #FFA500
            } else if (col % 4 === 2) {
                colorIndex = 2;  // #FFFF00
            }


            const rect = new Rectangle(ctx, startX, y, height, widthOfEachRect, bricksColors[colorIndex])

            const endOfCurrentRect = startX + widthOfEachRect

            startX = endOfCurrentRect + spacing

            result.push(rect)
        }
    }
    return result
}

export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace(/^#/, '');

    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}