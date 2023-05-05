<template>
    <div class="input-container">
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
    </div>
</template>

<script lang="ts">
import { Ref, defineComponent, ref } from 'vue'
import IPlaceholder from '../utils/IPlaceholder';

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

    return {
        placeholder,
        inputText,
        inputRef
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
        color: color(neutral, smokey-grey);

        &:focus {
            outline: none;
            border: 2px solid color(neutral, light-grey);
        }
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
}
</style>
