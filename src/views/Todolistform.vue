<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title class="text-l">Notes & To-Do List</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content color="light">
    <ion-card class="ion-padding">
      <ion-card-header>
        <ion-card-title class="card-title text-lg font-bold p-4">My Notes</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <!-- Notes Title Input -->
        <div class="mb-4">
          <ion-input
            v-model="noteTitle"
            label="Title"
            label-placement="floating"
            placeholder="Enter title"
            class="w-full p-2 border rounded-md"
          ></ion-input>
        </div>

        <!-- Notes Input -->
        <div class="mb-4">
          <ion-label position="floating">Write a Note</ion-label>
          <ion-textarea
            v-model="noteText"
            autoGrow
            placeholder="Enter your notes..."
            rows="10"
            class="border p-3 w-full rounded-lg shadow-xs"
          ></ion-textarea>
        </div>

        <!-- To-Do List Section -->
        <ion-card-header>
          <ion-card-title class="card-title text-lg font-bold p-4">To-Do List</ion-card-title>
        </ion-card-header>

        <div class="mb-4 flex">
          <ion-input
            v-model="newTask"
            label="New Task"
            label-placement="floating"
            placeholder="Enter a task..."
            class="w-full"
          ></ion-input>
          <ion-button @click="addTask" color="primary" class="px-3 py-1">Add</ion-button>
        </div>

       
        <ion-list v-if="tasks.length > 0" class="bg-white rounded-md shadow p-3">
          <ion-item v-for="(task, index) in tasks" :key="index">
            <ion-checkbox v-model="task.completed" class="mr-2"></ion-checkbox>
            <ion-label :class="{ 'line-through': task.completed }">{{ task.text }}</ion-label>
            <ion-button fill="clear" @click="removeTask(index)">
              <ion-icon name="trash-outline" class="text-red-500"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>

       
        <div class="flex justify-end mt-6 space-x-2">
          <ion-button color="danger">Cancel</ion-button>
          <ion-button color="primary">Save</ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonLabel,
  IonTextarea,
  IonList,
  IonCheckbox,
  IonIcon,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonLabel,
    IonTextarea,
    IonList,
    IonCheckbox,
    IonIcon,
  },
  setup() {
    const noteTitle = ref(""); // New Title Field
    const noteText = ref("");
    const newTask = ref("");
    const tasks = ref<{ text: string; completed: boolean }[]>([]);

    const addTask = () => {
      if (newTask.value.trim() !== "") {
        tasks.value.push({ text: newTask.value, completed: false });
        newTask.value = "";
      }
    };

    const removeTask = (index: number) => {
      tasks.value.splice(index, 1);
    };

    return { noteTitle, noteText, newTask, tasks, addTask, removeTask };
  },
});
</script>

<style scoped>
/* Styling for the card */
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

/* Task completed styling */
.line-through {
  text-decoration: line-through;
  color: gray;
}
</style>
