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
          <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
            <h2 class="text-xl font-bold text-center mb-4">
              {{ selectedTask ? selectedTask.title : 'No Task Found' }}
            </h2>

            <div v-if="selectedTask" class="mb-4">
              <h3 class="text-lg font-semibold">Notes</h3>
              <div class="p-2 bg-gray-100 rounded-md mb-2">
                <p class="text-sm text-gray-700">{{ selectedTask.note }}</p>
              </div>
            </div>

            <div v-if="selectedTask && selectedTask.todos && selectedTask.todos.length > 0" class="mb-4">
              <h3 class="text-lg font-semibold">To-Do</h3>
              <ion-list>
                <ion-item v-for="(todo, index) in selectedTask.todos" :key="index">
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
import { defineComponent } from "vue";
import { IonPage, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonCheckbox } from "@ionic/vue";
import BaseLayout from "@/components/templates/BaseLayout.vue";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default defineComponent({
  name: "todo",
  components: { IonPage, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonCheckbox, BaseLayout },
  data() {
    return {
      selectedTask: null,
    };
  },
  async mounted() {
    const taskId = this.$route.params.taskId;
    if (taskId) {
      const docRef = doc(db, "tasks", taskId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.selectedTask = docSnap.data();
      } else {
        console.log("No such task found");
      }
    }
  },
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
