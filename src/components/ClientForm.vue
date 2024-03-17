<script>
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "ClientForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        name: { required },
        email: { required, email },
      },
    };
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      console.log(this.formData);
    },
  },
};
</script>

<template>
  <div class="client-form_wrapper">
    <h2 class="client-form_title">Client Form</h2>
    <form class="client-form" @submit.prevent="onSubmit">
      <div class="client-form_input-wrapper">
        <VInput
          v-model="formData.name"
          :placeholder="'name'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.name.$error }"
          :label="'Name'"
          :type="'text'"
          @touch="v$.formData.name.$touch"
        />
      </div>
      <VButton @click="onSubmit">Submit</VButton>
      {{ formData }}
    </form>
    <p v-for="(error, index) of v$.$errors" :key="index">
      <strong>{{ error.$validator }}</strong>
      <strong>{{ error.$property }}</strong>
      <strong>{{ error.$message }}</strong>
    </p>
  </div>
</template>

<style scoped lang="sass">
.client-form_wrapper
  padding: 20px
  border: 1px solid var(--color-border)
  border-radius: 5px
  margin: 0 auto
  max-width: 600px

  .client-form_title
    margin-bottom: 20px

  .client-form
    display: flex
    flex-direction: column
    gap: 10px
    .client-form_input-wrapper
      display: flex
      flex-direction: column
      gap: 5px
</style>
