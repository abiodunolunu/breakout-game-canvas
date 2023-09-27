<script setup lang="ts">
interface Props {
    modelValue: boolean;
}
interface Emits {
    (e: "update:modelValue", v: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
    <button role="button" type="button" :class="[
        modelValue ? 'active' : ''
    ]" @click="$emit('update:modelValue', !modelValue)">
        <span></span>
    </button>
</template>

<style lang="scss" scoped>
button {
    outline: none;
    border: 0;
    width: 100%;
    height: 2.5rem;
    border-radius: 1.5rem;
    position: relative;
    transition: all 0.1s linear;
    background-color: #d1d5db;

    span {

        display: block;
        height: 28px;
        width: 28px;
        border-radius: 50%;
        position: absolute;
        top: 6px;
        transition: all 0.1s linear;

        left: 0.5rem;
        background-color: #ea580c;
    }

    &.active {
        background-color: #ea580c;

        span {
            left: calc(100% - 36px);
            background-color: #d1d5db;
        }
    }


}
</style>
