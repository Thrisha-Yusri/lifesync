<template>
  <ion-page>
    <BaseLayout
      ><template #header>
        <ion-toolbar color="light">
          <ion-title class="text-xl">Life-Sync</ion-title>
        </ion-toolbar>
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
          <ion-grid>
            <ion-row class="gap-5 px-4">
              <ion-col v-for="folder in folders" :key="folder.id" size="auto">
                <div
                  class="relative w-38 h-30 bg-sky-200 rounded-lg shadow-md p-6"
                >
                  <div
                    class="absolute top-0 left-4 w-12 h-4 bg-pink-200 rounded-b-lg"
                  ></div>
                  <p class="text-center text-black font-medium text-lg mt-6">
                    {{ folder.title }}
                  </p>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        
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
      </template></BaseLayout
    >
  </ion-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
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

import { addCircleOutline, home, folderOpen, list, person, arrowBack } from "ionicons/icons";
import BaseLayout from "@/components/templates/BaseLayout.vue";

export default defineComponent({
  components: {
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
      arrowBack,
    };
  },

  methods: {
    addfolder() {
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
