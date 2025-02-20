<template>
  <ion-card>
    <ion-card-content>
      <div class="flex justify-between pb-3" v-if="title">
        <ion-card-header>
          <ion-card-title>{{ title }}</ion-card-title>
          <slot name="title"></slot>
        </ion-card-header>
        <div class="flex items-center">
          <slot name="buttons"></slot>
        </div>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
      <div class="pt-3">
        <slot name="footer"></slot>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>
