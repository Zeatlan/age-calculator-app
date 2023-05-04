<template>
    <div class="input-container">
        <label for="input">{{ label }}</label>
        <input type="number" name="input" :placeholder="placeholder[label]"/>
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
  setup() {
    const placeholder: Ref<IPlaceholder> = ref({
        day: "DD",
        month: "MM",
        year: "yyyy"
    });

    return {
        placeholder
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
        padding: 0.5rem 1rem;
        color: color(neutral, smokey-grey);
    }
}
</style>
