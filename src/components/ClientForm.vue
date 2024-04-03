<script>
import {
  required,
  minLength,
  maxLength,
  helpers,
  // numeric,
} from "@vuelidate/validators";

import { useVuelidate } from "@vuelidate/core";

import VModal from "./ui/VModal.vue";
const phoneRegex = helpers.regex(
  /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/
);

export default {
  name: "ClientForm",
  components: { VModal },
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
        sendSMS: false,
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
      isModalActive: false,
      isPendingForm: false,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        firstName: { required },
        name: { required },
        lastName: {},
        birthDate: {
          required,
          maxValue: helpers.withMessage(
            "date cannot be in the future",
            (value) => value < new Date().toISOString()
          ),
        },
        phone: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(12),
          phoneRegex: helpers.withMessage(
            "Check phone number format",
            phoneRegex
          ),
          // numeric,
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
          issuedDate: {
            required,
            maxValue: helpers.withMessage(
              "date cannot be in the future",
              (value) => value < new Date().toISOString()
            ),
          },
        },
      },
    };
  },
  methods: {
    async onSubmit() {
      const validateResult = await this.v$.$validate();
      if (!validateResult) {
        return;
      }
      console.log(this.formData);
      this.isModalActive = true;
      this.isPendingForm = true;
      setTimeout(() => {
        this.isPendingForm = false;
      }, 2000);
      this.$refs.clientCreatingForm.reset();
    },
  },
};
</script>

<template>
  <div class="client-form_wrapper">
    <h2 class="client-form_title">Client Form</h2>
    <form
      class="client-form"
      ref="clientCreatingForm"
      @submit.prevent="onSubmit"
    >
      <div class="client-form_input-wrapper">
        <VInput
          v-model="formData.firstName"
          :placeholder="'firstName'"
          :maxlength="20"
          :is-valid="!v$.formData.firstName.$error"
          :errorMessage="
            v$.formData.firstName.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'First name*'"
          :type="'text'"
          @touch="v$.formData.name.$touch"
        />
        <VInput
          v-model="formData.name"
          :placeholder="'name'"
          :maxlength="20"
          :is-valid="!v$.formData.name.$error"
          :errorMessage="
            v$.formData.name.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Name*'"
          :type="'text'"
          @touch="v$.formData.name.$touch"
        />
        <VInput
          v-model="formData.lastName"
          :placeholder="'Last name'"
          :maxlength="20"
          :is-valid="!v$.formData.lastName.$error"
          :errorMessage="
            v$.formData.lastName.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Last name'"
          :type="'text'"
          @touch="v$.formData.lastName.$touch"
        />
        <VInput
          v-model="formData.birthDate"
          :placeholder="'birthDate'"
          :maxlength="20"
          :is-valid="!v$.formData.birthDate.$error"
          :errorMessage="
            v$.formData.birthDate.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Birth date*'"
          :type="'date'"
          @touch="v$.formData.birthDate.$touch"
        />
        <VInput
          v-model="formData.phone"
          :placeholder="'Phone'"
          :maxlength="12"
          :is-valid="!v$.formData.phone.$error"
          :errorMessage="
            v$.formData.phone.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Phone'"
          :type="'text'"
          @touch="v$.formData.phone.$touch"
        />
        <VSelect
          v-model="formData.sex"
          :options="['male', 'female']"
          :placeholder="'Sex'"
          :label="'Sex'"
          :is-valid="!v$.formData.sex.$error"
          :errorMessage="
            v$.formData.sex.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          @touch="v$.formData.sex.$touch"
        />
        <VSelect
          v-model="formData.clientGroup"
          :options="['VIP', 'Проблемные', 'ОМС', 'Без группы']"
          :placeholder="'Client group'"
          :label="'Client group*'"
          :multiple="true"
          :is-valid="!v$.formData.clientGroup.$error"
          :errorMessage="
            v$.formData.clientGroup.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          @touch="v$.formData.clientGroup.$touch"
        />
        <VSelect
          v-model="formData.attendingDoctor"
          :options="['Иванов', 'Захаров', 'Чернышева']"
          :placeholder="'Attending doctor'"
          :label="'Attending doctor'"
          :is-valid="!v$.formData.attendingDoctor.$error"
          :errorMessage="
            v$.formData.attendingDoctor.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          @touch="v$.formData.attendingDoctor.$touch"
        />
        <VFormAgreement v-model="formData.sendSMS" :label="'Send SMS'" />
        <h2>Address</h2>
        <VInput
          v-model="formData.address.index"
          :placeholder="'Index'"
          :maxlength="20"
          :is-valid="!v$.formData.address.index.$error"
          :errorMessage="
            v$.formData.address.index.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Index'"
          :type="'text'"
          @touch="v$.formData.address.index.$touch"
        />
        <VInput
          v-model="formData.address.country"
          :placeholder="'Country'"
          :maxlength="20"
          :is-valid="!v$.formData.address.country.$error"
          :errorMessage="
            v$.formData.address.country.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Country'"
          :type="'text'"
          @touch="v$.formData.address.country.$touch"
        />
        <VInput
          v-model="formData.address.region"
          :placeholder="'Region'"
          :maxlength="20"
          :is-valid="!v$.formData.address.region.$error"
          :errorMessage="
            v$.formData.address.region.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Region'"
          :type="'text'"
          @touch="v$.formData.address.region.$touch"
        />
        <VInput
          v-model="formData.address.city"
          :placeholder="'City'"
          :maxlength="20"
          :is-valid="!v$.formData.address.city.$error"
          :errorMessage="
            v$.formData.address.city.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'City*'"
          :type="'text'"
          @touch="v$.formData.address.city.$touch"
        />
        <VInput
          v-model="formData.address.street"
          :placeholder="'Street'"
          :maxlength="20"
          :is-valid="!v$.formData.address.street.$error"
          :errorMessage="
            v$.formData.address.street.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Street'"
          :type="'text'"
          @touch="v$.formData.address.street.$touch"
        />
        <VInput
          v-model="formData.address.house"
          :placeholder="'House'"
          :maxlength="20"
          :is-valid="!v$.formData.address.house.$error"
          :errorMessage="
            v$.formData.address.house.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'House'"
          :type="'text'"
          @touch="v$.formData.address.house.$touch"
        />
        <h2>Passport</h2>
        <VSelect
          v-model="formData.passport.type"
          :options="[
            'Паспорт',
            'Свидетельство о рождении',
            'Вод. удостоверение',
          ]"
          :placeholder="'Choose document'"
          :label="'Document type*'"
          :multiple="false"
          :is-valid="!v$.formData.passport.type.$error"
          :errorMessage="
            v$.formData.passport.type.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          @touch="v$.formData.passport.type.$touch"
        />
        <VInput
          v-model="formData.passport.series"
          :placeholder="'Series'"
          :maxlength="20"
          :is-valid="!v$.formData.passport.series.$error"
          :errorMessage="
            v$.formData.passport.series.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Series'"
          :type="'text'"
          @touch="v$.formData.passport.series.$touch"
        />
        <VInput
          v-model="formData.passport.number"
          :placeholder="'Number'"
          :maxlength="20"
          :is-valid="!v$.formData.passport.number.$error"
          :errorMessage="
            v$.formData.passport.number.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Number'"
          :type="'text'"
          @touch="v$.formData.passport.number.$touch"
        />
        <VInput
          v-model="formData.passport.issuedBy"
          :placeholder="'Issued by'"
          :maxlength="20"
          :is-valid="!v$.formData.passport.issuedBy.$error"
          :errorMessage="
            v$.formData.passport.issuedBy.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Issued by'"
          :type="'text'"
          @touch="v$.formData.passport.issuedBy.$touch"
        />
        <VInput
          v-model="formData.passport.issuedDate"
          :placeholder="'Issued date'"
          :maxlength="20"
          :is-valid="!v$.formData.passport.issuedDate.$error"
          :errorMessage="
            v$.formData.passport.issuedDate.$errors
              ?.map((element) => element.$message)
              .join(', ')
          "
          :label="'Issued date*'"
          :type="'date'"
          @touch="v$.formData.passport.issuedDate.$touch"
        />
      </div>
      <VButton @click="onSubmit">Submit</VButton>
    </form>
    <VModal :active.sync="isModalActive" :ableClose="false">
      <template #content>
        <div v-show="isPendingForm" class="modal-content">
          <div class="client-form_title">Sending...</div>
          <div class="loader"></div>
        </div>
        <div v-show="!isPendingForm" class="modal-content">
          <div>Success</div>
          <div>Client was created</div>
        </div>
      </template>
      <template #footer>
        <VButton @click="isModalActive = false" v-show="!isPendingForm"
          >close</VButton
        >
      </template>
    </VModal>
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

.loader
  width: 48px
  height: 48px
  border: 5px solid #FFF
  border-bottom-color: transparent
  border-radius: 50%
  display: inline-block
  box-sizing: border-box
  animation: rotation 1s linear infinite


  @keyframes rotation
    0%
      transform: rotate(0deg)

    100%
      transform: rotate(360deg)

.modal-content
  display: flex
  flex-direction: column
  gap: 10px
  align-items: center
  justify-content: center
  margin: 0 auto
  padding: 20px
</style>
