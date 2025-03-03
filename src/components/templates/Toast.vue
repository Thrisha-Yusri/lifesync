<!-- src/components/GlobalToast.vue -->
<template>
    <ion-toast :is-open="visible" :message="message" :duration="duration" position="bottom" :color="color"></ion-toast>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { IonToast } from "@ionic/vue";
  
  export default defineComponent({
    components: {
      IonToast,
    },
    data() {
      return {
        visible: false,
        message: "",
        duration: 3000,
        color: ""
      };
    },
    methods: {
      showToast(message: string, duration: number = 3000, color: string) {
        this.message = message;
        this.duration = duration;
        this.visible = true;
        this.color = color;
  
        // Auto-hide toast after the duration
        setTimeout(() => {
          this.visible = false;
        }, duration);
      },
    },
  });
  </script>
  