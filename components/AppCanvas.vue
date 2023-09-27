<script setup lang="ts">
import { drawRectsOnCanvas, isTwoRectanglesColliding } from "~/helpers/functions";
import { Ball, Paddle, Rectangle } from '~/types';

const gameOver = ref(false)

const settings = reactive({
    rows: 5,
    columns: 10,
    ballSpeed: 5,
    enableKeyBoard: false,
    enableMouse: false,
    enableTouch: false,
    paddleSpeed: 5
})

function isBrickCollidingWithBall(brick: Rectangle, ball: Ball) {
    return isTwoRectanglesColliding(brick.x, ball.x, brick.y, ball.y, brick.width, ball.width, brick.height, ball.height)
}

function handleBallAndPaddle(paddle: Paddle, ball: Ball) {
    if (isTwoRectanglesColliding(paddle.x, ball.x, paddle.y, ball.y, paddle.width, ball.width, paddle.height, ball.height)) {

        const collisionPoint = ball.center - paddle.center
        const normalizedCollisionPoint = collisionPoint / (paddle.width / 2)

        ball.velocityX = ball.velocityY * normalizedCollisionPoint

        ball.velocityY = -ball.velocityY
    }
}

let animationRequestID: number;

const canvasRef = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>()
const paddle = ref<Paddle>()
const ball = ref<Ball>()
const bricks = ref<Rectangle[]>([])

function resizeCanvas() {
    if (!ctx.value) return
    const canvas = ctx.value.canvas;
    if (!canvas) return;
    canvas.height = innerHeight - 8;

    if (innerWidth < 1280) {
        canvas.width = innerWidth;
    } else {
        canvas.width = 1280;
    }

    stopAnimating()
    openSettingsModal.value = true
}

function startAnimation(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas
    function animate() {
        if (!(ball.value && paddle.value)) return
        ctx.fillStyle = 'rgba(0,0,0,0.25)'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ball.value.update()
        paddle.value.update()


        for (let i = 0; i < bricks.value.length; i++) {
            const brick = bricks.value[i]
            brick.draw()
            if (isBrickCollidingWithBall(brick, ball.value)) {
                ball.value.velocityY = -ball.value.velocityY
                bricks.value.splice(i, 1)
                i--
            }
        }

        handleBallAndPaddle(paddle.value, ball.value)



        animationRequestID = requestAnimationFrame(animate);

        if (ball.value.y + ball.value.height >= canvas.height) {
            gameOver.value = true
            stopAnimating()
        }

    }

    animate()
}

function init(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas
    bricks.value = drawRectsOnCanvas(ctx, settings.rows, settings.columns, 10, 40)
    paddle.value = new Paddle(ctx, (canvas.width / 2) - 100, canvas.height - 20, 20, 200, '#00FF00', settings.paddleSpeed)
    ball.value = new Ball(ctx, paddle.value.center, canvas.height - 80, 10, 10, '#00FFFF', 0, settings.ballSpeed)

    if (settings.enableKeyBoard) {
        paddle.value.enableKeyBoardControl()
    }
    if (settings.enableMouse) {
        paddle.value.enableMouseControl()
    }

    if (settings.enableTouch) {
        paddle.value.enableTouchControl()
    }
    startAnimation(ctx)
}


const gameRunning = ref(false)



onMounted(() => {
    const canvas = canvasRef.value!;
    ctx.value = canvas.getContext("2d")!;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // init(ctx.value)




    // startAnimation(ctx.value)
});

function stopAnimating() {
    console.log('here')
    cancelAnimationFrame(animationRequestID)
}


onUnmounted(() => {
    window.removeEventListener("resize", resizeCanvas);
});



const rc = ref(!true)
function handleSubmit() {
    if (!ctx.value) return
    openSettingsModal.value = false
    gameOver.value = false
    init(ctx.value)
}
const openSettingsModal = ref(true)

watch(gameOver, newVal => {
    if (newVal) {
        openSettingsModal.value = true
    }
})
</script>

<template>
    <div class="wrapper">
        <canvas ref="canvasRef"> </canvas>
        <Modal v-model="openSettingsModal">
            <form @submit.prevent="handleSubmit">
                <div class="form-item full" style="text-align: center; font-size: 2rem;" v-if="gameOver">GAME OVER! TRY
                    AGAIN</div>
                <div class="form-item">
                    <label for="">Rows</label>
                    <input type="number" v-model="settings.rows">
                </div>
                <div class="form-item">
                    <label for="">Colums</label>
                    <input type="number" v-model="settings.columns">
                </div>
                <div class="form-item">
                    <label for="">Ball Speed</label>
                    <input type="number" v-model="settings.ballSpeed" min="1" max="15">
                </div>

                <div class="form-item">
                    <label for="">Mouse Controls</label>
                    <BaseSwitch v-model="settings.enableMouse" />
                </div>
                <div class="form-item">
                    <label for="">Touch Controls</label>
                    <BaseSwitch v-model="settings.enableTouch" />
                </div>
                <div class="form-item">
                    <label for="">Keyboard Controls</label>
                    <BaseSwitch v-model="settings.enableKeyBoard" />
                </div>
                <div class="form-item full" v-if="settings.enableKeyBoard">
                    <label for="">Paddle speed (Keyboard)</label>
                    <input type="number" v-model="settings.paddleSpeed">
                </div>

                <div class="form-item full">
                    <input type="submit" value="start" />
                </div>
            </form>
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
div.wrapper {
    max-height: 100dvh;

    display: flex;
    justify-content: center;

    canvas {
        background-color: #111827;
    }
}



form {
    background-color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;

    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;

    .form-item {

        label,
        input {
            display: block;
            width: 100%;
        }

        label {
            font-size: 14px;
            margin-bottom: 0.25rem;
            color: #111827;
            font-weight: 500;
        }

        input {
            height: 2.5rem;
            padding-left: 0.625rem;
            color: #111827;
            background-color: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
        }

        input[type="submit"] {
            background-color: #ea580c;
            font-weight: 600;
            text-transform: uppercase;
            color: white;
            cursor: pointer;

            &:hover {
                background-color: #ee793d;
            }
        }

        &.full {
            grid-column: 1 / -1;
        }
    }
}
</style>
