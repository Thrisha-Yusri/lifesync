<template>
  <ion-page>
    <slot name="header"></slot>

    <ion-content :fullscreen="true" :scroll="true" class="ion-padding">
      <slot name="content"></slot>
    </ion-content>
    <ion-footer v-if="!hideFooter">
      <ion-toolbar>
        <slot name="footer"></slot>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonPage,
  IonInput,
  IonBackButton,
  IonButtons,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonPage,
    IonInput,
    IonBackButton,
    IonButtons,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    hideFooter: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
<style>
.bottom-button {
  .bottom-button {
    position: sticky;
    bottom: 20px;
  }
}
</style>
