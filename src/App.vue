<template>
    <div class="box">
      <div class="input-date">
        <InputContainer label="day" @input-change="changeValue($event)" ref="dayInputRef"/>
        <InputContainer label="month" @input-change="changeValue($event)" ref="monthInputRef"/>
        <InputContainer label="year" @input-change="changeValue($event)" ref="yearInputRef"/>
      </div>

      <div class="separator">
        <div class="separator-line"></div>
        <button class="submit" @click="submitForm" ref="submitButtonRef">
          <img src="./assets/images/icon-arrow.svg" alt="">
        </button>
      </div>

      <div class="age-box">
        <p><span>{{ ageData.years }}</span> years</p>
        <p><span>{{ ageData.months }}</span> months</p>
        <p><span>{{ ageData.days }}</span> days</p>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import InputContainer from './components/InputContainer.vue';
import IAge from './utils/IAge';
import IInputValue from './utils/IInputValue';

export default defineComponent({
  name: 'App',
  components: {
    InputContainer
  },
  setup() {
    let years = ref('');
    let months = ref('');
    let days = ref('');

    let dayInputRef = ref();
    let monthInputRef = ref();
    let yearInputRef = ref();
    let submitButtonRef = ref();

    let ageData: IAge = reactive({
      years: '--',
      months: '--',
      days: '--'
    });

    function changeValue({ key, text }: IInputValue) {
      const MAX_LENGTH = 2;

      if(key === 'day') {
        if(text.length >= MAX_LENGTH) {
          days.value = text.slice(0, MAX_LENGTH);
          monthInputRef!.value.inputRef.focus();
        }
      }

      if(key === 'month') {
        if(text.length >= MAX_LENGTH) {
          months.value = text.slice(0, MAX_LENGTH);
          yearInputRef!.value.inputRef.focus();
        }
      }
      
      if(key === 'year') {
        if(text.length >= MAX_LENGTH+2) {
          years.value = text.slice(0, MAX_LENGTH+2);
          submitButtonRef!.value.focus();
        }
      }
    }

    function reformatDate() {
      days.value = dayInputRef.value.inputText.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      months.value = monthInputRef.value.inputText.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    }

    function submitForm() {
      const tab = [dayInputRef, monthInputRef, yearInputRef];

      tab.forEach(ref => {
        ref.value.resetErrors();
        ref.value.checkDate();
      });

      if(dayInputRef.value.hasErrors || monthInputRef.value.hasErrors || yearInputRef.value.hasErrors) return;
      console.log("sus")

      reformatDate();

      const today = new Date();
      const birthDate = new Date(`${years.value}-${months.value}-${days.value}`);
      const diffTime = today.getTime() - birthDate.getTime();
      const diffDate = new Date(diffTime);

      const yearDiff = diffDate.getUTCFullYear() - 1970;
      const monthDiff = diffDate.getUTCMonth();
      const dayDiff = diffDate.getUTCDate() - 1;

      Object.assign(ageData, { years: yearDiff, months: monthDiff, days: dayDiff });
    }

    return {
      changeValue,
      years,
      months,
      days,
      ageData,
      submitForm,
      dayInputRef,
      monthInputRef,
      yearInputRef,
      submitButtonRef
    }
  }
})
</script>

<style lang="scss">

body,
html {
  margin: 0;
  box-sizing: border-box;
  background-color: color(neutral, off-white);
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
  width: 60%;
  background: color(neutral, white);
  padding: 3rem;
  border-radius: 15px;
  border-bottom-right-radius: 200px;

  .input-date {
    display: flex;
    justify-content: space-between;
    width: 75%;
  }

  .separator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 1rem 0;

    &-line {
      float: left;
      width: 100%;
      background-color: color(neutral, off-white);
      height: 2px;
    }

    button.submit {
      border-radius: 100%;
      border: 0;
      background-color: color(primary, purple);
      padding: 1rem;
      cursor: pointer;

      img {
        width: 40px;
      }
    }
  }

  .age-box {
    p {
      margin: 0;
      @include get-font(bold);
      font-size: 84px;
      color: color(neutral, off-black);

      span {
        color: color(primary, purple);
      }
    }
  }
}
</style>
