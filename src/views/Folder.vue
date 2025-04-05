<template>
  <ion-page>
    <BaseLayout :hideFooter="false">
      <template #header>
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
              <ion-button @click="$router.go(-1)">
                <ion-icon :icon="arrowBackOutline" color="secondary"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title class="text-xl">Life-Sync</ion-title>
            <ion-progress-bar
            type="indeterminate"
            v-if="isLoading"
          ></ion-progress-bar>
          </ion-toolbar></ion-header
        >
      </template>

      <template #content>
        <div class="flex justify-between items-center p-4">
          <ion-card-title class="card-title text-left text-l"
            >My Folder</ion-card-title
          >
          <div class="flex justify-end pt-2">
            <ion-icon
              :icon="addCircleOutline"
              color="secondary"
              @click="addfolder()"
            ></ion-icon>
          </div>
        </div>

        <!-- Folder List -->
        <div
          v-for="folder in folders"
          :key="folder.id"
          class="border-b border-gray-200 py-2 flex items-center justify-between"
        >
          <div class="flex items-center space-x-4">
            <div class="relative w-15 h-10 bg-sky-200 rounded-lg shadow-md p-6">
              <div
                class="absolute top-0 left-4 w-8 h-2 bg-pink-200 rounded-b-lg"
              ></div>
              <p class="text-center text-black font-medium text-lg mt-6"></p>
            </div>
            <div>{{ folder.title }}</div>
          </div>

          <div>
            <ion-icon :icon="chevronForward" color="secondary"></ion-icon>
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
              <ion-label>Task</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="profile" href="/profile">
              <ion-icon :icon="person" />
              <ion-label>Profile</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </template></BaseLayout
    >
  </ion-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  IonProgressBar,
  IonButtons,
  IonRouterOutlet,
  IonLabel,
  IonTabButton,
  IonTabBar,
  IonTabs,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCardTitle,
} from "@ionic/vue";

import {
  addCircleOutline,
  home,
  folderOpen,
  list,
  person,
  arrowBackOutline,
  chevronForward,
} from "ionicons/icons";
import BaseLayout from "@/components/templates/BaseLayout.vue";

export default defineComponent({
  components: {
    IonProgressBar,
    IonButtons,
    IonRouterOutlet,
    IonLabel,
    IonTabButton,
    IonTabBar,
    IonTabs,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonCardTitle,
    BaseLayout,
  },
  setup() {
    const folders = ref([
      { id: 1, title: "Folder 1" },
      { id: 2, title: "Folder 2" },
      { id: 3, title: "Folder 3" },
      { id: 4, title: "Folder 4" },
    ]);

    return {
      folders,
      addCircleOutline,
      home,
      folderOpen,
      list,
      person,
      arrowBackOutline,
      chevronForward,
      isLoading: false,
    };
  },

  methods: {
    addfolder() {
      this.isLoading = true;
      this.$router.push("/folderform");
    },
  },
});
</script>

<style scoped>
/* Folder box */
.bg-gray-200 {
  background-color: #e5e7eb; /* Light gray */
  transition: transform 0.2s ease-in-out;
}

/* Folder hover effect */
.bg-gray-200:hover {
  transform: scale(1.05);
}

/* Folder tab */
.bg-gray-300 {
  background-color: #d1d5db; /* Slightly darker gray */
}

/* Text styling */
.text-black {
  color: black;
}

/* Adjust row gap */
.gap-4 {
  gap: 16px;
}
</style>
