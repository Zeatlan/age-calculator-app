<template>
    <div class="box">
      <div class="input-date">
        <InputContainer label="day" @input-change="changeValue($event)" ref="dayInputRef"/>
        <InputContainer label="month" @input-change="changeValue($event)" ref="monthInputRef"/>
        <InputContainer label="year" @input-change="changeValue($event)" ref="yearInputRef"/>
        <span v-if="isInvalidDate" class="error">Must be a valid date</span>
      </div>

      <div class="separator">
        <div class="separator-line"></div>
        <button class="submit" @click="submitForm" ref="submitButtonRef">
          <img src="./assets/images/icon-arrow.svg" alt="">
        </button>
      </div>

      <div class="age-box">
        <p><span :key="ageData.years">{{ ageData.years }}</span> years</p>
        <p><span :key="ageData.months">{{ ageData.months }}</span> months</p>
        <p><span :key="ageData.days">{{ ageData.days }}</span> days</p>
      </div>
    </div>

    <TheFooter />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import InputContainer from '@/components/InputContainer.vue';
import TheFooter from '@/components/TheFooter.vue';
import IAge from './utils/IAge';
import IInputValue from './utils/IInputValue';

export default defineComponent({
  name: 'App',
  components: {
    InputContainer,
    TheFooter
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

    let isInvalidDate = ref(false);
    const MAX_LENGTH = 2;
    

    function changeValue({ key, text }: IInputValue) {

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
      dayInputRef.value.inputText = dayInputRef.value.inputText.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      days.value = dayInputRef.value.inputText;

      monthInputRef.value.inputText = monthInputRef.value.inputText.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      months.value = monthInputRef.value.inputText;
    }

    function isDateFormatValid(): boolean {
      const day = parseInt(days.value);
      const month = parseInt(months.value) - 1; // JavaScript months are 0-based
      const year = parseInt(years.value);
      const date = new Date(`${years.value}-${months.value}-${days.value}`);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      );
    }

    const animateValue = (key: keyof typeof ageData, targetValue: number) => {
      let currentValue = 0;
      const INTERVAL_TIME = 50;

      const increment = () => {
        if(currentValue < targetValue) {
          currentValue++;
          ageData[key] = currentValue.toString().padStart(MAX_LENGTH, '0');
          setTimeout(increment, INTERVAL_TIME);
        }
      };

      increment();
    }

    function submitForm() {
      const tab = [dayInputRef, monthInputRef, yearInputRef];

      tab.forEach(ref => {
        ref.value.resetErrors();
        ref.value.checkDate();
      });

      if(dayInputRef.value.hasErrors || monthInputRef.value.hasErrors || yearInputRef.value.hasErrors) return;

      reformatDate();

      if(!isDateFormatValid()) {
        isInvalidDate.value = true;
        dayInputRef.value.errors.error = true;
        monthInputRef.value.errors.error = true;
        yearInputRef.value.errors.error = true;
        return;
      }

      isInvalidDate.value = false;

      const today = new Date();
      const birthDate = new Date(`${years.value}-${months.value}-${days.value}`);
      const diffTime = today.getTime() - birthDate.getTime();
      const diffDate = new Date(diffTime);

      const yearDiff = diffDate.getUTCFullYear() - 1970;
      const monthDiff = diffDate.getUTCMonth();
      const dayDiff = diffDate.getUTCDate() - 1;

      animateValue('years', yearDiff);
      animateValue('months', monthDiff);
      animateValue('days', dayDiff);

      //Object.assign(ageData, { years: yearDiff, months: monthDiff, days: dayDiff });
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
      submitButtonRef,
      isInvalidDate
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: color(neutral, smokey-grey);
}

.box {
  width: 50%;
  background: color(neutral, white);
  padding: 3rem;
  border-radius: 25px;
  border-bottom-right-radius: 200px;

  .input-date {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 70%;

    .error {
      flex: 1;
      min-width: 100%;
      color: color(primary, red);
      margin-top: 1rem;
    }
  }

  .separator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 1rem 0;

    &-line {
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
      transition: filter 0.3s ease-in-out;

      &:hover {
        filter: brightness(135%);
      }
      img {
        width: 40px;

      }
    }
  }

  .age-box {
    p {
      margin: 0;
      @include get-font(bold);
      font-weight: 900;
      font-style: normal;
      font-size: 96px;
      line-height: 96px;
      color: color(neutral, off-black);
      user-select:none;

      span {
        color: color(primary, purple);
        letter-spacing: 1rem;
      }
    }
  }
}

@media (max-width: 1000px) {
  .box {
    width: 75%;
    padding: 2rem;
    border-bottom-right-radius: 100px;

    .input-date {
      width: 100%;
    }

    .separator {
      position: relative;

      &-line {
        position: absolute;
      }

      button.submit {
        z-index: 99;
        margin: 0 auto;
        
        img {
          width: 30px;
        }
      }
    }

    .age-box {
      p {
        font-size: 48px;
      }
    }
  }
}
</style>
