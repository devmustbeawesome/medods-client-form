<script>
export default {
  name: "VInput",
  props: {
    classList: { type: Object, required: false, default: () => ({}) },
    value: { type: String, required: true, default: "" },
    type: { type: String, required: false, default: "text" },
    maxlength: { type: Number, required: false, default: 500 },
    label: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
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
  <label class="form_input-label">
    <span>{{ label }}</span>
    <input
      v-if="type !== 'textarea'"
      ref="input"
      :type="newType"
      :maxlength="maxlength"
      :value="computedValue"
      class="form_input"
      :class="classList"
      @input="onInput"
      @change="onChange"
      :placeholder="placeholder"
      @blur="$emit('touch')"
      @focusout="$emit('touch')"
    />
    <textarea
      v-else
      ref="textarea"
      :maxlength="maxlength"
      :value="computedValue"
      class="form_input"
      :class="classList"
      @input="onInput"
      @change="onChange"
      :placeholder="placeholder"
      @blur="$emit('touch')"
      @focusout="$emit('touch')"
    />
  </label>
</template>

<style lang="sass" scoped>
.form_input-label
  display: flex
  flex-direction: column
  gap: 5px
  .input-error
    border: 1px solid red

.form_input
  background: none
  padding: 10px 15px
  border: 1px solid var(--color-border)
  color: var(--color-text)
  font-size: 18px
  border-radius: 5px


@media only screen and (max-width: 600px)
  .form_input
    font-size: 14px
    padding: 8px 13px
    border-radius: 4px
</style>
