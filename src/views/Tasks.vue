<template>
  <ion-page>
    <BaseLayout>
      <template #header>
        <ion-toolbar color="primary">
          <ion-title> Notes & To-Do List</ion-title>
        </ion-toolbar>
      </template>

      <template #content>
        <!-- Header Section: Folders title on the left, Add button on the right -->
        <div class="flex justify-between items-center p-4">
          <ion-card-title class="card-title text-left text-l">Notes</ion-card-title>
          <ion-button @click="todolistform()">
            <ion-icon :icon="addOutline" style="color: white"></ion-icon> Add
            Notes
          </ion-button>
        </div>

        <div
          v-if="notes.length > 0"
          class="flex flex-wrap justify-center gap-2"
        >
          <div
            v-for="(note, index) in notes"
            :key="index"
            class="p-3 w-[300px] h-[100px] bg-stone-400 rounded-lg shadow flex flex-col justify-center mt-1"
          >
            <h3 class="font-bold text-black-800 truncate">
              {{ note.title }}
            </h3>
            <p class="text-gray-700 text-sm truncate">{{ note.content }}</p>
          </div>
        </div>
      </template>

      <template #footer>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="home" href="/home">
              <ion-icon :icon="home" />
              <ion-label>Home</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="folder" href="/folder">
              <ion-icon :icon="folderOpen" />
              <ion-label>Folder</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="tasks" href="/tasks">
              <ion-icon :icon="list" />
              <ion-label>Notes</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="profile" href="/profile">
              <ion-icon :icon="person" />
              <ion-label>Profile</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </template>
    </BaseLayout>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonCardTitle,
  IonButton,
  IonPage,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonIcon,
} from "@ionic/vue";
import BaseLayout from "@/components/templates/BaseLayout.vue";
import { addOutline, home, folderOpen, list, person } from "ionicons/icons";

export default defineComponent({
  name: "ViewNotesTodos",
  components: {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonRouterOutlet,
    IonButton,
    IonCardTitle,
    IonIcon,
    IonPage,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    BaseLayout,
  },
  setup() {
    const notes = ref([
      {
        title: "Meeting Notes",
        content: "Discuss project updates with the team.",
      },
      { title: "Shopping List", content: "Buy milk, eggs, and bread." },
    ]);

    const todos = ref([
      { task: "Finish coding assignment", completed: false },
      { task: "Call the bank", completed: true },
    ]);

    return {
      addOutline,
      notes,
      todos,
      home,
      folderOpen,
      list,
      person,
    };
  },

  methods: {
    addnotes() {
      this.$router.push("/todolistform");
    },
  },
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
