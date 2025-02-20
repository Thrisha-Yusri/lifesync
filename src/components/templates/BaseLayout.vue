<template>
  <ion-page>
    <ion-header >
      <ion-toolbar v-if="title"
        ><ion-title> {{ title }} <slot name="titleHeader"></slot></ion-title
      ></ion-toolbar>
      <slot name="header"></slot>
    </ion-header>
    
    <ion-content class="ion-padding">
      <slot name="content"></slot>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-title>Footer</ion-title>
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
  IonInput
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
    IonInput
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>
