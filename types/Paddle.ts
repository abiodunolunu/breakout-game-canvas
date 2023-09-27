import { Rectangle } from "./Rectangle";

export class Paddle extends Rectangle {
    private _velocity: number
    private currentVelocity = 0
    private touchStartX = 0;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width: number, color: string, velocity: number) {
        super(ctx, x, y, height, width, color)
        this._velocity = velocity
    }


    update() {
        const canvasWidth = this.canvas.width

        this.x += this.currentVelocity

        if (this.x <= 0) {
            this.x = 0
        } else if (this.x + this.width >= canvasWidth) {
            this.x = canvasWidth - this.width
        }
        super.draw()
    }

    get center() {
        return this.x + (this.width / 2)
    }

    enableMouseControl() {
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }
    enableKeyBoardControl() {
        window.addEventListener('keydown', this.KeyDownEventHandler)
        window.addEventListener('keyup', this.keyUpEventHandler)
    }
    enableTouchControl() {
        window.addEventListener('touchstart', this.touchStartHandler);
        window.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
        window.addEventListener('touchend', this.touchEndHandler);
    }

    disableMouseControl() {
        this.canvas.removeEventListener('mousemove', this.mouseMoveHandler)
    }

    disableKeyBoardControl() {
        window.removeEventListener('keydown', this.KeyDownEventHandler)
        window.removeEventListener('keyup', this.keyUpEventHandler)
    }

    disableTouchControl() {
        window.removeEventListener('touchstart', this.touchStartHandler);
        window.removeEventListener('touchmove', this.touchMoveHandler,);
        window.removeEventListener('touchend', this.touchEndHandler);
    }

    private KeyDownEventHandler = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
                this.currentVelocity = -this._velocity
                break;
            case 'ArrowRight':
                this.currentVelocity = this._velocity
                break;
            default:
                break;
        }
    }

    private keyUpEventHandler = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            this.currentVelocity = 0
        }
    }

    private mouseMoveHandler = (e: MouseEvent) => {
        // Get the horizontal position (left offset) of the canvas relative to the viewport
        const canvasOffset = this.canvas.getBoundingClientRect().left;

        // Adjust the x position of the paddle based on mouse position, considering:
        // 1. The mouse's horizontal position relative to the viewport (e.x)
        // 2. The canvas's offset to ensure the x position is relative to the canvas
        // 3. Half of the paddle's width to center the paddle under the mouse cursor
        this.x = e.x - canvasOffset - (this.width / 2);
    }

    private touchStartHandler = (e: TouchEvent) => {
        this.touchStartX = e.touches[0].clientX;
    }

    private touchMoveHandler = (e: TouchEvent) => {
        const deltaX = e.touches[0].clientX - this.touchStartX;

        // Update paddle's position based on touch movement
        this.x += deltaX;

        // Boundary checks (to ensure paddle remains within canvas)
        if (this.x <= 0) {
            this.x = 0;
        } else if (this.x + this.width >= this.canvas.width) {
            this.x = this.canvas.width - this.width;
        }

        // Update the starting touch position for the next movement
        this.touchStartX = e.touches[0].clientX;

        // Prevent default to stop potential browser behaviors like scrolling
        e.preventDefault();
    }

    private touchEndHandler = (e: TouchEvent) => { }

}