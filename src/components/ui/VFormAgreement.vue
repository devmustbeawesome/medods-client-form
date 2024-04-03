<script>
export default {
  name: "VFormAgreement",
  props: {
    value: { type: Boolean, required: true, default: false },
    label: { type: String, required: false, default: "" },
    isValid: { type: Boolean, required: false, default: true },
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
  <div class="form_agreement-wrapper">
    <VCheckbox v-model="computedValue" :label="label"></VCheckbox>
  </div>
</template>

<style lang="sass" scoped>
/* стили для чекбокса */
.form_agreement-wrapper
  display: flex
  align-items: center
  margin-bottom: 10px
</style>
