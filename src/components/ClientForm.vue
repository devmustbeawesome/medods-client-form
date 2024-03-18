<script>
import {
  required,
  minLength,
  maxLength,
  minValue,
  helpers,
  numeric,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const phoneRegex = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;

export default {
  name: "ClientForm",
  data() {
    return {
      formData: {
        name: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        phone: "7",
        sex: "",
        clientGroup: [],
        attendingDoctor: "",
        sendSMS: "",
        address: {
          index: "",
          country: "",
          region: "",
          city: "",
          street: "",
          house: "",
        },
        passport: {
          type: "",
          series: "",
          number: "",
          issuedBy: "",
          issuedDate: "",
        },
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        firstName: { required },
        name: { required },
        lastName: {},
        birthDate: { required, minValue: minValue(new Date()) },
        phone: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(11),
          regex: helpers.regex(phoneRegex),
          numeric,
        }, // TODO
        sex: {},
        clientGroup: { required },
        attendingDoctor: {},
        sendSMS: {},
        address: {
          index: {},
          country: {},
          region: {},
          city: { required },
          street: {},
          house: {},
        },
        passport: {
          type: { required },
          series: {},
          number: {},
          issuedBy: {},
          issuedDate: { required, minValue: minValue(new Date()) },
        },
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
          v-model="formData.firstName"
          :placeholder="'firstName'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.firstName.$error }"
          :label="'First ame*'"
          :type="'text'"
          @touch="v$.formData.name.$touch"
        />
        <VInput
          v-model="formData.name"
          :placeholder="'name'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.name.$error }"
          :label="'Name*'"
          :type="'text'"
          @touch="v$.formData.name.$touch"
        />
        <VInput
          v-model="formData.lastName"
          :placeholder="'Last name'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.lastName.$error }"
          :label="'Last name'"
          :type="'text'"
          @touch="v$.formData.lastName.$touch"
        />
        <VInput
          v-model="formData.birthDate"
          :placeholder="'birthDate'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.birthDate.$error }"
          :label="'Birth date*'"
          :type="'text'"
          @touch="v$.formData.birthDate.$touch"
        />
        <VInput
          v-model="formData.phone"
          :placeholder="'Phone'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.phone.$error }"
          :label="'Phone'"
          :type="'text'"
          @touch="v$.formData.phone.$touch"
        />
        <VSelect
          v-model="formData.sex"
          :options="['male', 'female']"
          :placeholder="'Sex'"
          :label="'Sex'"
        />
        <VSelect
          v-model="formData.clientGroup"
          :options="['VIP', 'Проблемные', 'ОМС', 'Без группы']"
          :placeholder="'Client group'"
          :label="'Client group'"
          :multiple="true"
        />
        <VSelect
          v-model="formData.attendingDoctor"
          :options="['Иванов', 'Захаров', 'Чернышева']"
          :placeholder="'Attending doctor'"
          :label="'Attending doctor'"
        />
        <VCheckbox v-model="formData.sendSMS" :label="'Send SMS'" />
        <h2>Address</h2>
        <VInput
          v-model="formData.address.index"
          :placeholder="'/Index'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.address.index.$error }"
          :label="'Index'"
          :type="'text'"
          @touch="v$.formData.address.index.$touch"
        />
        <VInput
          v-model="formData.address.country"
          :placeholder="'Country'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.address.country.$error }"
          :label="'Country'"
          :type="'text'"
          @touch="v$.formData.address.country.$touch"
        />
        <VInput
          v-model="formData.address.region"
          :placeholder="'Region'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.address.region.$error }"
          :label="'Region'"
          :type="'text'"
          @touch="v$.formData.address.region.$touch"
        />
        <VInput
          v-model="formData.address.city"
          :placeholder="'City'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.address.city.$error }"
          :label="'City*'"
          :type="'text'"
          @touch="v$.formData.address.city.$touch"
        />
        <VInput
          v-model="formData.address.street"
          :placeholder="'Street'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.address.street.$error }"
          :label="'Street'"
          :type="'text'"
          @touch="v$.formData.address.street.$touch"
        />
        <VInput
          v-model="formData.address.house"
          :placeholder="'House'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.address.house.$error }"
          :label="'House'"
          :type="'text'"
          @touch="v$.formData.address.house.$touch"
        />
        <h2>Passport</h2>
        <!-- // TODO type -->
        <VInput
          v-model="formData.passport.series"
          :placeholder="'Series'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.passport.series.$error }"
          :label="'Series'"
          :type="'text'"
          @touch="v$.formData.passport.series.$touch"
        />
        <VInput
          v-model="formData.passport.number"
          :placeholder="'Number'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.passport.number.$error }"
          :label="'Number'"
          :type="'text'"
          @touch="v$.formData.passport.number.$touch"
        />
        <VInput
          v-model="formData.passport.issuedBy"
          :placeholder="'Issued by'"
          :maxlength="20"
          :class-list="{ 'input-error': v$.formData.passport.issuedBy.$error }"
          :label="'Issued by'"
          :type="'text'"
          @touch="v$.formData.passport.issuedBy.$touch"
        />
        <VInput
          v-model="formData.passport.issuedDate"
          :placeholder="'Issued date'"
          :maxlength="20"
          :class-list="{
            'input-error': v$.formData.passport.issuedDate.$error,
          }"
          :label="'Issued date'"
          :type="'text'"
          @touch="v$.formData.passport.issuedDate.$touch"
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
  background: var(--color-background-mute)

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
