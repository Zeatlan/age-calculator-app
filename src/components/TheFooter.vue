<template>
    <footer>Realized with the ❤️ by <a href="http://github.com/Zeatlan" target="_blank" rel="noopener noreferrer">Zeatlan</a></footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'TheFooter',
});
</script>

<style scoped lang="scss">
footer {
    text-transform: uppercase;
    @include get-font(regular);

    a {
        position: relative;
        color: color(primary, purple);
        overflow: hidden;
        text-decoration: none;

        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: color(primary, purple);
            transition: all 0.3s ease;
        }

        &:hover::before {
            width: 100%;
        }
    }
}
</style>