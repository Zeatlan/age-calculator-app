<template>
  <div class="test" :class="colorBg">
    <p class="text" :class="colorText">Hello world</p>
    <button @click="changeColor('purple')">To purple</button>
    <button @click="changeColor('red')">To red</button>
  
    <hr>
    <button @click="changeBg('white')">To bg white</button>
    <button @click="changeBg('off-white')">To bg off white</button>
    <button @click="changeBg('light-grey')">To bg light grey</button>
    <button @click="changeBg('smokey-grey')">To bg smokey grey</button>
    <button @click="changeBg('off-black')">To bg off black</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    let colorText = ref('');
    let colorBg = ref('');

    function changeColor(color: string) {
      colorText.value = color;
    }

    function changeBg(color: string) {
      colorBg.value = color;
    }

    return {
      colorText,
      changeColor,
      colorBg,
      changeBg
    }
  }
})
</script>

<style lang="scss">
$palette: (
  primary: (
    purple: hsl(259, 100%, 65%),
    red: hsl(0, 100%, 67%),
  ),
  neutral: (
    white: hsl(0, 0%, 100%),
    off-white: hsl(0, 0%, 94%),
    light-grey: hsl(0, 0%, 86%),
    smokey-grey: hsl(0, 1%, 44%),
    off-black: hsl(0, 0%, 8%),
  )
);

$input-font: 32px;
$font-family: 'Poppins';

$fonts: (
  light: (
    weight: 400,
    style: italic,
  ),
  regular: (
    weight: 700,
    style: normal,
  ),
  bold: (
    weight: 800,
    style: italic
  ),
);

@function color($color,$tone){
    @return map-get(map-get($palette, $color), $tone);
}

@function font-weight($tone) {
  @return map-get($fonts, $tone);
}

@mixin get-font($font) {
  font-weight: map-get(map-get($fonts, $font), weight);
  font-style: map-get(map-get($fonts, $font), style);
}

body, html {
  margin: 0;
  box-sizing: border-box;
}


#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.test {
  width: 100%;
  height: 100vh;
  padding-top: 60px;

  @each $class, $color in map-get($palette, neutral) {
    &.#{"" + $class} {
      background-color: $color;
    }
  }
}

p {
  font-size: $input-font;
  @include get-font(regular);

  @each $class, $color in map-get($palette, primary) {
    &.#{"" + $class} {
      color: $color;
    }
  }
}
</style>
