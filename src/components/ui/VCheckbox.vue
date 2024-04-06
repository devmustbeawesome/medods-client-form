<script>
export default {
  name: "VCheckbox",
  props: {
    classList: { type: Object, required: false, default: () => ({}) },
    value: { type: [Array, Boolean], required: true, default: () => [] },
    checkboxValue: { type: String, required: false, default: "" },
    maxlength: { type: Number, required: false, default: 500 },
    label: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
    errorMessage: { type: String, required: false, default: "" },
    isValid: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      newValue: this.value,
    };
  },
  computed: {
    computedValue: {
      get: function () {
        return this.newValue;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    value: function (value) {
      this.newValue = value;
    },
  },
  methods: {
    onInput: function (event) {
      this.updateValue(event.target.value);
    },
    onChange: function (event) {
      this.updateValue(event.target.value);
    },
    updateValue: function (value) {
      this.computedValue = value;
      // !this.isValid && this.checkHtml5Validity()
    },
  },
};
</script>

<template>
  <div class="form_checkbox-wrapper">
    <input
      type="checkbox"
      v-model="computedValue"
      :value="checkboxValue"
      :id="$id('v-checkbox')"
      class="form_checkbox-input"
      :disabled="disabled"
    />
    <label :for="$id('v-checkbox')" class="form_checkbox">
      <div class="form_checkbox-icon"></div>
      <span class="form_checkbox-label">{{ label }}</span></label
    >
  </div>
</template>

<style lang="sass" scoped>
/* стили для чекбокса */
.form_checkbox-wrapper
  display: flex
  align-items: center
  margin-bottom: 10px

.form_checkbox-input
  position: absolute
  z-index: -1
  opacity: 0
.form_checkbox
  display: flex
  align-items: center
  cursor: pointer
  user-select: none
  .form_checkbox-icon
    display: inline-block
    width: 20px
    height: 20px
    border: 1px solid var(--color-border)
    border-radius: 3px
    border-color: var(--color-border)
    margin-right: 10px
    position: relative

  .form_checkbox-label
    display: inline-flex
    align-items: center
    user-select: none

.form_checkbox-input:checked ~ .form_checkbox
  .form_checkbox-icon
      border-color: var(--color-border)
      background-color: var(--color-background-mute)
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%232c3e50' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")
      background-repeat: no-repeat

@media (prefers-color-scheme: dark)
  .form_checkbox-input:checked ~ .form_checkbox
    .form_checkbox-icon
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23ebebeba3' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")


.form_checkbox-input:not(:disabled):not(:checked) ~ .form_checkbox:hover .form_checkbox-icon
  border-color: var(--color-border-hover)

/* стили для активного состояния чекбокса (при нажатии на него) */

.form_checkbox-input:not(:disabled):active ~ .form_checkbox .form_checkbox-icon
  border-color: var(--color-border)
  background-color: var(--color-text)

/* стили для чекбокса, находящегося в фокусе */

.form_checkbox-input:focus ~ .form_checkbox .form_checkbox-icon
  box-shadow: 0 0 0 0.1rem var(--color-background-mute)

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */

.form_checkbox-input:focus:not(:checked) ~ .form_checkbox .form_checkbox-icon
  box-shadow: 0 0 0 0.1rem var(--color-border-hover )

/* стили для чекбокса, находящегося в состоянии disabled */

.form_checkbox-input:disabled ~ .form_checkbox
  color: var(--color-border-hover)

  .form_checkbox-icon
    background-color: var(--color-background-mute)
</style>
