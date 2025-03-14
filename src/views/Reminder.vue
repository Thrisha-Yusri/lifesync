<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="text-l">Reminder</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      <ion-card class="ion-padding">
        <!-- Card Header -->
        <ion-card-header class="center-header">
  <ion-card-title class="card-title text-lg p-4">Add Reminder</ion-card-title>
</ion-card-header>


        <ion-card-content>
          <!-- Reminder Title Input -->
          <div class="mb-4">
          <ion-input
            class="block w-full p-2"
            label="Title"
            label-placement="floating"
            placeholder="Enter text"
          ></ion-input>
        </div>

          <div class="mb-4">
          <ion-label position="floating">Description</ion-label>
          <ion-textarea
            autoGrow
            placeholder="Enter description"
            rows="10"
            class="border p-3 w-full rounded-lg shadow-xs"
          ></ion-textarea>
        </div>

          <!-- Combined Date and Time Picker -->
          <ion-card-title class="text-lg p-5"
            >Select Date & Time</ion-card-title
          >
          <ion-item>
            <ion-datetime
              display-format="MMM DD, YYYY h:mm A"
              placeholder="Select Date and Time"
            ></ion-datetime>
          </ion-item>

          <div class="flex justify-between mt-4">
            <ion-button fill="solid" color="danger" class="flex-1 mx-1"
              >Cancel</ion-button
            >
            <ion-button fill="solid" color="primary" class="flex-1 mx-1"
              >Save</ion-button
            >
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/vue";
import { calendar } from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
  },
  setup() {
    return { calendar };
  },
  methods: {
    cancel() {
      console.log("Cancelled");
    },
    save() {
      console.log("Saved");
    },
  },
};
</script>

<style scoped>
/* Custom styles for a modern look */

.center-header {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  text-align: center;
}

ion-card {
  margin: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ion-item {
  margin-bottom: 20px;
}

ion-datetime {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 10px;
}

/* Add gap between buttons */
ion-grid {
  margin-top: 20px;
}

ion-row.ion-justify-content-between {
  justify-content: space-between;
}
</style>
