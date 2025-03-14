<template>
  <ion-page>
    <BaseLayout>
      <template #header>
        <ion-toolbar color="primary">
          <ion-title>Notes & To-Do</ion-title>
        </ion-toolbar>
      </template>

      <template #content>
        <div class="p-4 flex justify-center">
          <!-- Card Container -->
          <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
            <h2 class="text-xl font-bold text-center mb-4">Title Note</h2>

            <!-- Display Notes -->
            <div v-if="notes.length > 0" class="mb-4">
              <h3 class="text-lg font-semibold">Notes</h3>
              <div
                v-for="(note, index) in notes"
                :key="index"
                class="p-2 bg-gray-100 rounded-md mb-2"
              >
                <strong>{{ note.title }}</strong>
                <p class="text-sm text-gray-700">{{ note.content }}</p>
              </div>
            </div>

            <!-- Display To-Do List -->
            <div v-if="todos.length > 0" class="mb-4">
              <h3 class="text-lg font-semibold">To-Do</h3>
              <ion-list>
                <ion-item v-for="(todo, index) in todos" :key="index">
                  <ion-checkbox v-model="todo.completed"></ion-checkbox>
                  <ion-label :class="{ 'line-through': todo.completed }">
                    {{ todo.task }}
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>
          </div>
        </div>
      </template>
    </BaseLayout>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
} from "@ionic/vue";
import BaseLayout from "@/components/templates/BaseLayout.vue";

export default defineComponent({
  name: "NotesTodos",
  components: {
    IonPage,
    IonToolbar,
    IonTitle,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    BaseLayout,
  },
  setup() {
    // Data storage
    const notes = ref([
      {
        title: "Meeting Notes",
        content: "Discuss project updates with team.ssssssssssssssssssss",
      },
    ]);

    const todos = ref([
      { task: "Finish coding assignment", completed: false },
      { task: "Call the bank", completed: true },
    ]);

    // New note and task input
    const newNote = ref({ title: "", content: "" });
    const newTask = ref("");

    // Functions
    const addTodo = () => {
      if (newTask.value.trim() !== "") {
        todos.value.push({ task: newTask.value, completed: false });
        newTask.value = "";
      }
    };

    const saveNotes = () => {
      if (newNote.value.title && newNote.value.content) {
        notes.value.push({ ...newNote.value });
        newNote.value = { title: "", content: "" };
      }
    };

    const cancel = () => {
      newNote.value = { title: "", content: "" };
      newTask.value = "";
    };

    return {
      notes,
      todos,
      newNote,
      newTask,
      addTodo,
      saveNotes,
      cancel,
    };
  },
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
