<template>
    <div class="box">
      <div class="input-date">
        <InputContainer label="day" />
        <InputContainer label="month" />
        <InputContainer label="year" />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputContainer from './components/InputContainer.vue';

export default defineComponent({
  name: 'App',
  components: {
    InputContainer
  },
  setup() {
  }
})
</script>

<style lang="scss">

body,
html {
  margin: 0;
  box-sizing: border-box;
  background-color: color(neutral, light-grey);
  height: 100%;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: color(neutral, smokey-grey);
}

.box {
  background: color(neutral, white);
  padding: 3rem;
  border-radius: 15px;
  border-bottom-right-radius: 75px;

  .input-date {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
}
</style>
