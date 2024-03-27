<script>
export default {
  name: "VInput",
  props: {
    value: { type: String, required: true, default: "" },
    type: { type: String, required: false, default: "text" },
    maxlength: { type: Number, required: false, default: 500 },
    label: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
    errorMessage: { type: String, required: false, default: "" },
    isValid: { type: Boolean, required: false, default: true },
  },
  data() {
    return {
      newValue: this.value,
      newType: this.type,
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
    type: function (type) {
      this.newType = type;
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
  <div class="form_input-wrapper">
    <label class="form_input-label" :for="$id('v-input')">
      <span>{{ label }}</span>
    </label>
    <input
      :id="$id('v-input')"
      v-if="type !== 'textarea'"
      ref="input"
      :type="newType"
      :maxlength="maxlength"
      :value="computedValue"
      class="form_input"
      :class="{ 'form_input-error': !isValid }"
      @input="onInput"
      @change="onChange"
      :placeholder="placeholder"
      @blur="$emit('touch')"
      @focusout="$emit('touch')"
    />
    <textarea
      v-else
      :id="$id('v-input')"
      ref="textarea"
      :maxlength="maxlength"
      :value="computedValue"
      class="form_input"
      :class="{ 'form_input-error': !isValid }"
      @input="onInput"
      @change="onChange"
      :placeholder="placeholder"
      @blur="$emit('touch')"
      @focusout="$emit('touch')"
    />
    <span class="input-error-message" v-if="!isValid">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style lang="sass" scoped>
.form_input-wrapper
  display: flex
  flex-direction: column
  margin-bottom: 15px
  .form_input-label
    display: flex
    flex-direction: column
    margin-bottom: 5px

  .form_input
    background: none
    padding: 10px 15px
    border: 1px solid var(--color-border)
    color: var(--color-text)
    font-size: 18px
    border-radius: 5px
    &.form_input-error
      border-color: var(--error-color)


  @media only screen and (max-width: 600px)
    .form_input
      font-size: 14px
      padding: 8px 13px
      border-radius: 4px

  .input-error-message
    color: var(--error-color)
    font-size: 14px
    margin-top: 5px
    font-weight: 500
    line-height: 1.2
</style>
