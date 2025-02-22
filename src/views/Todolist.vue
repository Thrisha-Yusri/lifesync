<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>To-Do List</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content color="light">
    <ion-card class="ion-padding">
      <ion-card-header>
        <ion-card-title class="card-title">To do List</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-list :inset="true">
          <ion-item v-for="(task, index) in tasks" :key="index">
            <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
            <ion-input aria-label="Task name" :value="task"></ion-input>
          </ion-item>
        </ion-list>

        <!-- Buttons Section -->
        <div class="flex justify-end mt-4 space-x-2">
          <ion-button color="danger">Cancel</ion-button>
          <ion-button color="primary" >Add</ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script lang="ts">
import {
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    IonCheckbox,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  },
  setup() {
    const tasks = ref([
      "Get eggs",
      "Get milk",
      "Take out compost",
      "Pick up dry cleaning",
      "Call mom",
      "Order more dog food",
      "Think of new tasks for this demo"
    ]);

    const cancel = () => {
      console.log("Cancelled");
    };

    const addTask = () => {
      console.log("Added new task");
    };

    return { tasks, cancel, addTask };
  }
});
</script>

<style scoped>
/* Add spacing and styling for the card */
ion-card {
  margin: 20px;
  border-radius: 12px;
}

/* Title styling */
.card-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

/* Improve spacing inside the list */
ion-item {
  --inner-padding-start: 10px;
  --inner-padding-end: 10px;
}

/* Button container styling */
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

</style>
