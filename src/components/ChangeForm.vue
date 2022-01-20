<template>
  <div class="container">
    <div class="title">
      <span class="title__hello"> Здравствуйте, </span>
      <div class="name">
        {{ name }}
        <div class="tooltip name__tooltip">
          {{ formFiields.currentSttatus }}
        </div>
      </div>
    </div>

    <div class="change-status" @click.stop v-click-outside="hide">
      <button
        v-if="!statusEdit"
        @click="statusEdit = true"
        class="change-status__btn"
      >
        Сменить статус
      </button>

      <div class="change-status__input-wraper" v-else>
        <InputWithTips
          type="text"
          class="change-status__input"
          v-model="formFiields.currentSttatus"
        />
        <div class="change-status__btn-save" @click="statusClose">OK</div>
      </div>
    </div>

    <div class="inputs">
      <InputWithTips
        label="Ваш город"
        type="select"
        class="inputs__input _divider"
        v-model="formFiields.city"
        :citysArray="citysArray"
      />
      <InputWithTips
        label="Пароль"
        type="password"
        tip="Ваш новый пароль должен содержать не менее 5 символов."
        class="inputs__input"
        v-model.trim="formFiields.password"
        :errorText="errors.password"
      />
      <InputWithTips
        label="Пароль еще раз"
        type="password"
        tip="Повторите пароль, пожалуйста, это обезопасит вас с нами на случай ошибки."
        class="inputs__input _divider"
        v-model.trim="formFiields.passwordAgain"
        :errorText="errors.passwordAgain"
      />
      <InputWithTips
        label="Электронная почта"
        type="text"
        tip="Можно изменить адрес, указанный при регистрации. "
        class="inputs__input"
        v-model.trim="formFiields.email"
        :errorText="errors.email"
      />
      <InputWithTips
        label="Я согласен"
        type="check"
        class="inputs__input"
        v-model="formFiields.ageement"
      />
    </div>
    <button class="button" @click="submitHandler">Изменить</button>
    <span class="button__tip" v-if="showLastChange"
      >последние изменения {{ formatedDate }}</span
    >
  </div>
</template>

<script>
import InputWithTips from '@/components/InputWithTips';
import ClickOutside from 'vue-click-outside';
export default {
  name: 'ChangingForm',
  components: {
    InputWithTips,
  },
  data: () => {
    return {
      name: 'Человек №3596941',
      statusEdit: false,
      lastChange: null,
      showLastChange: false,
      citysArray: null,
      errors: {
        password: null,
        passwordAgain: null,
        email: null,
      },
      formFiields: {
        city: null,
        password: '',
        passwordAgain: null,
        email: null,
        ageement: true, // соглсен по дефолту
        currentSttatus: 'Прежде чем действовать, надо понять',
      },
    };
  },
  methods: {
    validate() {
      this.errors.password =
        this.isEmpty('password') ||
        this.passwordValidationPased ||
        this.passwordAgainValidationPased;
      this.errors.passwordAgain =
        this.isEmpty('password') || this.passwordAgainValidationPased;
      this.errors.email = this.isEmpty('email') || this.emailValidationPased;
    },
    hide() {
      this.statusEdit = false;
    },
    statusClose() {
      this.hide();
    },
    submitHandler() {
      this.lastChange = new Date();
      this.showLastChange = true;

      this.validate();

      if (
        !Object.values(this.errors).filter((el) => {
          return !!el;
        }).length
      ) {
        console.log(this.formFiields); // data
      }
    },
    isEmpty(field) {
      let name;
      switch (field) {
        case 'password':
          name = 'пароль';
          break;
        case 'email':
          name = 'E-mail';
          break;
      }
      return this.formFiields[field] ? null : `Укажите ${name}`;
    },
  },
  watch: {
    formFiields: {
      handler: function () {
        this.validate();
      },
      deep: true,
    },
  },

  computed: {
    getSytysArr() {
      return this.$store.getters.sortCitys();
    },
    emailValidationPased() {
      return String(this.formFiields.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        ? null
        : 'Неверный E-mail';
    },

    passwordValidationPased() {
      return this.formFiields.password.length >= 5
        ? null
        : 'Используйте не менее 5 символов';
    },
    passwordAgainValidationPased() {
      return this.formFiields.password === this.formFiields.passwordAgain
        ? null
        : 'Пароли не совпадают';
    },
    formatedDate() {
      const monthNames = [
        'января',
        'февраля',
        'мара',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];

      return `${this.lastChange.getDate().toString()} ${
        monthNames[this.lastChange.getMonth()]
      } ${this.lastChange.getFullYear().toString()} в ${this.lastChange
        .getHours()
        .toString()}:${this.lastChange
        .getMinutes()
        .toString()}:${this.lastChange.getSeconds().toString()}`;
    },
  },

  async mounted() {
    await this.$store.dispatch('fetchCitys');
    this.citysArray = this.$store.getters.sortCitys;
  },

  directives: {
    ClickOutside,
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';
.title {
  font-size: 30px;
  line-height: 34px;
  margin-right: 123px;
  display: inline-block;
  margin-bottom: 89px;

  &__hello {
    color: $darck-gray-color;
    font-weight: bold;
  }
}
.change-status {
  display: inline-flex;
  align-items: center;

  &__btn {
    border-bottom: 1px dashed currentColor;
    color: $blue-color;
    background-color: transparent;
  }

  &__input-wraper {
    display: inline-flex;
    align-items: center;
  }

  &__input {
    display: inline-block;
  }

  &__btn-save {
    display: inline-block;
    padding: 10px 10px;
    background-color: $green-color;
    box-shadow: 0px 1px 0px #539d22;
    cursor: pointer;
  }
}

.name {
  position: relative;
  display: inline-block;
  font-weight: bold;

  &__tooltip {
    position: absolute;
    top: calc(100% + 11px);
    left: 0;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    padding: 12px 0 8px 12px;
    background-color: $light-gray-color;
    width: 503px;

    &::after {
      content: '';
      display: block;
      background-color: $light-gray-color;
      position: absolute;
      top: 0;
      left: 8px;
      transform: translate(0, -50%) rotate(45deg);
      width: 11px;
      height: 11px;
    }
  }
}
.inputs {
  &__input {
    margin-bottom: 40px;
  }
}
._divider {
  border-bottom: 1px solid #e5e4e4;
  padding-bottom: 32px;
  margin-bottom: 32px;
}

.button {
  margin-left: 223px;
  color: #fff;
  padding: 10px 18px;
  background-color: $green-color;
  box-shadow: 0px 1px 0px #539d22;
  font-size: 18px;
  line-height: 20px;
  &__tip {
    font-size: 12px;
    line-height: 20px;
    color: $gray-color;
    padding-left: 18px;
  }
}
.input-wraper {
  display: inline-flex;
  align-items: center;
}

.inputs {
}
</style>
