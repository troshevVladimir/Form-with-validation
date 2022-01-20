<template>
  <div class="input">
    <label class="input__label">{{ label }}</label>

    <div class="input__select-wrapper">
      <CustomSelect
        v-if="type === 'select'"
        :arrayCitys="citysArray"
        @select="$emit('input', $event)"
      />

      <div v-else-if="type === 'check'" class="input__check">
        <label class="custom-check">
          <input
            class="standart-checkbox"
            type="checkbox"
            :checked="this.$attrs.value"
            @change="CheckboxHandler()"
          />
          <div class="new-check">
            <img class="check-ico" src="@/assets/icons/check.svg" alt="" />
          </div>
          <p class="new-check-text">принимать актуальную информацию на емейл</p>
        </label>
      </div>

      <input
        v-else
        @input="$emit('input', $event.target.value)"
        :type="type"
        class="input__input"
        :class="{ 'border-red': errorText }"
        :value="this.$attrs.value"
      />
      <div v-if="errorText" class="input__error">{{ errorText }}</div>
    </div>

    <div class="input__tip">{{ tip }}</div>
  </div>
</template>

<script>
import CustomSelect from '@/components/CustomSelect';
export default {
  name: 'InputWithTips',
  components: {
    CustomSelect,
  },
  // model: {
  //   prop: 'value',
  //   event: 'customInput',
  // },
  props: {
    type: {
      type: String,
    },
    label: {
      type: String,
    },
    tip: {
      type: String,
    },
    errorText: {
      type: String,
      default: '',
    },
    citysArray: {
      type: Array,
    },
  },
  data() {
    return {
      checkboxValue: this.$attrs.value, // надо только для чекбокса
    };
  },
  methods: {
    emitNewValue() {
      this.$emit('input', 'adsfadf');
    },
    CheckboxHandler() {
      this.checkboxValue = !this.checkboxValue;
      this.$emit('input', this.checkboxValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.input {
  display: grid;
  grid-template-columns: 223px 336px 1fr;
  align-items: center;

  &__label {
    font-size: 21px;
    line-height: 19px;
  }

  &__input {
    width: 100%;

    border: 1px solid $gray-color;
    padding: 6px 10px 6px 12px;

    font-size: 16px;
    line-height: 19px;
  }

  &__check {
    display: inline-block;
  }

  &__select-wrapper {
    position: relative;
  }

  &__error {
    position: absolute;
    left: 0;
    top: 100%;

    font-size: 12px;
    line-height: 20px;
    color: $red-color;
  }

  &__tip {
    font-size: 12px;
    line-height: 20px;
    color: $gray-color;
    padding-left: 18px;
  }
}

.custom-check {
  position: relative;
  display: flex;
  align-items: center;
}
.check-ico {
  display: none;
}
.standart-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked + .new-check .check-ico {
    display: block;
  }
}
.new-check {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $gray-color;
  width: 12px;
  height: 12px;
  margin-right: 10px;
}
.border-red {
  border-color: $red-color;
}
</style>
