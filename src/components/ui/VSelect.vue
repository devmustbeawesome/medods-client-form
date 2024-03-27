<script>
export default {
  name: "VSelect",
  props: {
    classList: { type: Object, required: false, default: () => ({}) },
    value: { type: [String, Number, Array], required: true, default: () => "" },
    name: { type: String, required: false, default: "select" + Date.now() },
    options: { type: Array, required: true, default: () => [] },
    label: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
    multiple: { type: Boolean, required: false, default: false },
    errorMessage: { type: String, required: false, default: "" },
    isValid: { type: Boolean, required: false, default: true },
  },
  data() {
    return {
      newValue: this.value,
      newOptions: this.options,
      selectOpened: false,
    };
  },
  computed: {
    computedValue: {
      get: function () {
        return this.newValue;
      },
      set: function (value) {
        if (!this.multiple) {
          this.selectOpened = false;
        }
        this.$emit("input", value);
      },
    },
  },
  watch: {
    value: function (value) {
      this.newValue = value;
    },
    type: function (options) {
      this.newOptions = options;
    },
  },
  methods: {
    onChange: function (event) {
      this.updateValue(event.target.value);
    },
    updateValue: function (value) {
      this.computedValue = value;
    },
    keyPress: function ({ key }) {
      if (this.selectOpened && (key === "Escape" || key === "Esc")) {
        this.selectOpened = false;
      }
    },
    log: function (event) {
      console.log(event);
    },
  },
  beforeMount() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  },
};
</script>

<template>
  <div
    class="form_select-wrapper"
    v-click-outside="
      () => {
        selectOpened = false;
      }
    "
  >
    <span class="form_select-label" @click="$refs.selectButton.focus()">{{
      label
    }}</span>
    <button
      type="button"
      ref="selectButton"
      class="form_select-button"
      :id="$id('v-select-button')"
      @click.prevent="
        () => {
          selectOpened = !selectOpened;
          $refs.option[0].focus();
        }
      "
    >
      <span>{{
        Array.isArray(computedValue)
          ? computedValue.join(", ") || placeholder
          : computedValue || placeholder
      }}</span>
    </button>

    <ul class="form_select-dialog" v-show="selectOpened">
      <li
        v-for="(option, index) in newOptions"
        :key="option"
        class="form_select-item"
        @click.ctrl="
          () => {
            console.log('ctrl');
          }
        "
      >
        <input
          :id="$id('v-select-option-' + index)"
          :type="multiple ? 'checkbox' : 'radio'"
          :value="option"
          v-model="computedValue"
          :key="option"
          :name="name"
          class="form_select-option-input"
          ref="option"
        />
        <label :for="$id('v-select-option-' + index)" tabindex>
          <span>{{ option }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
.form_select-wrapper
  position: relative
  width: 100%
  margin-bottom: 15px
  .form_select-label
    display: block
    margin-bottom: 5px
    font-size: 18px
    color: var(--color-text)
    font-weight: 500
    line-height: 1.2

  .form_select-button
    background: none
    padding: 10px 15px
    border: 1px solid var(--color-border)
    color: var(--color-text)
    font-size: 18px
    border-radius: 5px
    cursor: pointer
    position: relative
    width: 100%
    text-align: left
    &.select-error
      border-color: red
    &:after
      content: ""
      display: block
      border-style: solid
      border-width: 6px 5px 0 5px
      border-color: var(--color-border) transparent transparent transparent
      pointer-events: none
      position: absolute
      top: 50%
      right: 1rem
      z-index: 1
      margin-top: -3px

  .form_select-dialog
    position: absolute
    top: 100%
    left: 0
    width: 100%
    border: 1px solid var(--color-border)
    border-radius: 5px
    background: var(--color-background-soft)
    padding: 5px
    z-index: 2
    list-style-type: none
    display: flex
    flex-direction: column
    .form_select-item
      display: flex
      align-items: center
      justify-content: space-between
      cursor: pointer
      border-bottom: 1px solid var(--color-border)
      &:hover
        border-color: var(--color-border-hover)
        background: var(--color-background)
      .form_select-option-input
        position: absolute
        z-index: -1
        opacity: 0
        &:focus ~ label
          border: 1px solid var(--color-accent)
        &:checked ~ label
          color: #fff
          background: var(--color-accent)

      label
        cursor: pointer
        padding: 5px
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: space-between


  @media only screen and (max-width: 600px)
    .form_select-button
      font-size: 14px
      padding: 8px 13px
      border-radius: 4px
</style>
