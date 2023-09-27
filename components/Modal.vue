<script setup lang='ts'>
interface Props {
    canClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    canClose: true
})

const showModal = defineModel<Boolean>({
    required: true,
})

function closeModal() {
    if (props.canClose) {
        return showModal.value = false
    }

    const modalContent = document.querySelector('.modal-content') as HTMLDivElement
    modalContent.classList.add('shake')
    modalContent.onanimationend = () => {
        modalContent.classList.remove('shake')
    }


}
</script>

<template>
    <Teleport to="body">
        <Transition name="zoom" :duration="500">
            <div class="modal" v-if="showModal">
                <div class="modal-content">
                    <button role="button" class="modal-content__close" @click="closeModal">❌</button>
                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.5);

    &-content {
        position: relative;
        width: 100%;
        max-width: 37.5rem;
        border-radius: 0.5rem;
        background-color: white;
        padding: 1rem;

        transition: all 500ms;

        &__close {
            transition: all 320ms;
            position: absolute;
            right: 0;
            top: -2.5rem;
            height: 2rem;
            width: 2rem;
            border: 0;
            border-radius: 50%;
            cursor: pointer;
            scale: 1;


            &:hover {
                scale: 1.1;
                background-color: white;
                outline: 2px solid #ee793d;
            }
        }
    }

}



.zoom-enter-from {
    .modal-content {
        scale: 0;
    }
}

.zoom-enter-to {
    .modal-content {
        scale: 1;
    }
}

.zoom-leave-from {
    .modal-content {
        scale: 1;
    }
}

.zoom-leave-to {
    .modal-content {
        scale: 0;
    }
}

.zoom-enter-active,
.zoom-leave-active {
    // transition: all 5s;
}

.modal-content.shake {
    animation: shake 0.32s forwards;
}

@keyframes shake {
    0% {
        scale: 1;
    }

    25% {
        scale: 0.98;
    }

    50% {
        scale: 1;
    }

    75% {
        scale: 0.98;
    }

    100% {
        scale: 1;
    }
}
</style>