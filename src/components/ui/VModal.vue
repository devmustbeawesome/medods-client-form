<script>
export default {
  name: "VModal",
  emits: ["update:active"],
  props: {
    active: { type: Boolean, required: false, default: false },
    ableClose: { type: Boolean, required: false, default: true },
  },
  data() {
    return {
      showModal: this.active,
    };
  },
  methods: {
    closeModal() {
      if (this.ableClose) this.showModal = false;
    },
    keyPress({ key }) {
      if (this.showModal && (key === "Escape" || key === "Esc")) {
        this.closeModal();
      }
    },
  },
  watch: {
    showModal: function (value) {
      this.$emit("update:active", value);
      if (value) {
        document.body.style["overflow-y"] = "hidden";
      } else {
        document.body.style["overflow-y"] = "auto";
      }
    },
    active: function (value) {
      this.showModal = value;
    },
  },
  onBeforeMount() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  onBeforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  },
};
</script>

<template>
  <div v-show="showModal">
    <div class="modal-background" @click="closeModal">
      <div class="modal">
        <div class="modal-header">
          <slot name="header" />
          <div v-if="ableClose" class="close-icon" @click="closeModal">╳</div>
        </div>
        <div class="modal-content">
          <slot name="content" />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.modal-background
  width: 100vw
  height: 100vh
  background-color: #0000007e
  position: fixed
  top: 0
  left: 0
  display: block


  .modal
    padding: 10px
    border: 1px solid var(--color-border)
    background-color: var(--color-background-mute)
    position: absolute
    border-radius: 10px
    margin: auto
    top: 0
    left: 0
    bottom: 0
    right: 0
    height: fit-content
    width: fit-content

    .modal-header
      display: flex

      .hide-icon
        position: absolute
        right: 3px
        top: 3px
        cursor: pointer
</style>
