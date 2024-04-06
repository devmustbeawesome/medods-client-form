<script>
export default {
  name: "VCheckboxGroup",
  props: {
    value: { type: Array, required: true, default: () => [] },
    title: { type: String, required: false, default: "" },
    errorMessage: { type: String, required: false, default: "" },
    isValid: { type: Boolean, required: false, default: true },
    options: { type: Array, required: true, default: () => [] },
  },
  data() {
    return {
      newValue: this.value,
      newOptions: this.options,
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
    options: function (options) {
      this.newOptions = options;
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
  <div class="form_checkbox-group-wrapper">
    <span class="form_checkbox-group-title">{{ title }}</span>
    <ul class="form_checkbox-group">
      <li
        class="form_checkbox-group-item"
        v-for="(option, index) in newOptions"
        :key="index"
      >
        <VCheckbox
          v-model="computedValue"
          :checkbox-value="option.value"
          :label="option.label"
          :disabled="option.disabled"
        ></VCheckbox>
      </li>
    </ul>
    <span class="form_checkbox-group-error" v-if="errorMessage">{{
      errorMessage
    }}</span>
  </div>
</template>

<style lang="sass" scoped>
/* стили для чекбокса */
.form_checkbox-group-wrapper
  display: flex
  align-items: center
  margin-bottom: 10px
  .form_checkbox-group
    display: flex
    flex-direction: column
    list-style: none
    padding: 0
    margin: 0
    .form_checkbox-group-item
      display: flex
      align-items: center
      margin-bottom: 5px

.form_checkbox-group-error
  color: var(--error-color)
</style>
