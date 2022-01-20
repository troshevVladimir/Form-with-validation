<template>
  <div class="select" v-click-outside="hide">
    <div class="select__body" @click="dropDown">
      <p>{{ getSelected }}</p>
      <img class="select__icon" src="@/assets/icons/arrow.svg" alt="" />
      <div class="select__dropdown" v-show="isShown">
        <div
          class="select__item"
          v-for="(city, index) in arrayCitys"
          :key="city.city"
          @click.stop="selectItem(index)"
        >
          {{ city.city }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'CustomSelect',
  props: {
    arrayCitys: {
      required: true,
      type: Array,
    },
  },
  data: () => {
    return {
      isShown: false,
      selected: null,
    };
  },

  directives: {
    ClickOutside,
  },
  methods: {
    dropDown() {
      this.isShown = !this.isShown;
    },
    selectItem(key) {
      this.selected = this.arrayCitys[key];
      this.isShown = !this.isShown;

      this.$emit('select', this.getSelected);
    },
    hide() {
      this.isShown = false;
    },
  },

  computed: {
    getSelected() {
      return this.selected ? this.selected.city : '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.select {
  display: inline-flex;

  &__label {
    margin-right: 132px;
    font-size: 21px;
    line-height: 19px;
  }

  &__body {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 336px;

    border: 1px solid $gray-color;
    padding: 6px 10px 6px 12px;
    height: 31px;

    font-size: 16px;
    line-height: 19px;
  }

  &__dropdown {
    position: absolute;
    z-index: 1;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    border: 1px solid $gray-color;
    background: #fff;
    max-height: 400px;
    overflow: auto;
  }
  &__item {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: $light-gray-color;
    }
  }
}
</style>
