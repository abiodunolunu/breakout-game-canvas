import { Rectangle } from "~/types/Rectangle"

export function isTwoRectanglesColliding(x1: number, x2: number, y1: number, y2: number, w1: number, w2: number, h1: number, h2: number): boolean {

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


const bricksColors = ['#FF0000', '#FFA500', '#FFFF00']

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * bricksColors.length);
    return bricksColors[randomIndex];
}


export function drawRectsOnCanvas(ctx: CanvasRenderingContext2D, rows: number, columns: number, spacing: number, height: number) {
    const result = []
    const canvas = ctx.canvas
    const totalSpaceNeeded = (columns + 1) * spacing
    const availableWidth = canvas.width - totalSpaceNeeded
    const widthOfEachRect = availableWidth / columns
    for (let row = 0; row < rows; row++) {
        const y = row * (spacing + height)
        let startX = spacing
        for (let col = 0; col < columns; col++) {
            const rect = new Rectangle(ctx, startX, y, height, widthOfEachRect, getRandomColor())

            const endOfCurrentRect = startX + widthOfEachRect

            startX = endOfCurrentRect + spacing

            result.push(rect)
        }
    }
    return result
}