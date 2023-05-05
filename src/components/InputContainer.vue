<template>
    <div class="input-container" :class="{ 'errors' : hasErrors}">
        <label for="input">{{ label }}</label>
        <input 
            type="number" 
            name="input" 
            :placeholder="placeholder[label]"
            min="1"
            max="12"
            ref="inputRef"
            v-model.number="inputText"
            @input="$emit('input-change', {key: label, text: inputText.toString()})"
        />
        <span v-if="errors.isEmptyField">This field is required</span>
        <span v-if="errors.isInvalid">Must be a valid {{ label }}</span>
        <span v-if="errors.isFuture">Must be in the past</span>
    </div>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, reactive, ref } from 'vue'
import IPlaceholder from '../utils/IPlaceholder';

interface IErrors {
    isEmptyField: boolean;
    isInvalid: boolean;
    isFuture: boolean;
}

export default defineComponent({
  name: 'InputContainer',
  props: {
    label: {
        required: true,
        type: String,
    }
  },
  setup(props, { emit }) {
    const placeholder: Ref<IPlaceholder> = ref({
        day: "DD",
        month: "MM",
        year: "YYYY"
    });

    let inputText = ref('');
    let inputRef = ref(null);
    let errors = reactive<IErrors>({
        isEmptyField: false,
        isInvalid: false,
        isFuture: false
    })

    const hasErrors = computed(() =>
        Object.keys(errors).some((key) => errors[key as keyof IErrors])
    );

    function checkDate() {
        // Empty field
        if(inputText.value === '') errors.isEmptyField = true;

        // Invalid input
        const inputNumber = parseInt(inputText.value);

        if(props.label === 'day') {
            if(inputNumber < 0 || inputNumber > 31) errors.isInvalid = true;
        }

        if(props.label === 'month') {
            if(inputNumber < 0 || inputNumber > 12) errors.isInvalid = true;
        }

        if(props.label === 'year') {
            if(inputNumber > new Date().getFullYear()) errors.isFuture = true;
        }
    }

    function resetErrors() {
        Object.assign(errors, {
            isEmptyField: false,
            isInvalid: false,
            isFuture: false
        });
    }

    return {
        placeholder,
        inputText,
        inputRef,
        errors,
        checkDate,
        resetErrors,
        hasErrors
    }
  }
})
</script>

<style scoped lang="scss">
.input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        text-transform: uppercase;
        @include get-font(regular);
        font-size: 12px;
        letter-spacing: 2px;
    }

    input {
        width: 100px;
        font-size: $input-font;
        @include get-font(regular);
        border: 1px solid color(neutral, off-white);
        border-radius: 5px;
        padding: 0.75rem 1.25rem;
        color: color(neutral, off-black);
        transition: all 0.3s ease-in-out;

        &:focus {
            outline: none;
            border: 1px solid color(primary, purple);
        }
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    &.errors {
        label {
            color: color(primary, red);
        }

        input {
            border-color: color(primary, red);
        }

        span {
            color: color(primary, red);
        }
    }
}
</style>
