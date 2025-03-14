<template>
  <ion-page>
    <!-- Main Page Layout -->
    <BaseLayout>
      <template #header>
        <ion-toolbar color="primary">
          <ion-title class="text-xl">Home</ion-title>
        </ion-toolbar>
      </template>

      <template #content>
        <ion-searchbar></ion-searchbar>
        <!-- Calendar Section -->
        <CustomCard title="Calendar">
          <template #buttons>
            <ion-icon
              :icon="add"
              size="large"
              color="secondary"
              @click="reminder()"
            ></ion-icon>
          </template>
          <template #content>
            <CustomCalendar />
          </template>
        </CustomCard>

        <!-- Folders Section -->
        <div class="py-6">
          <div class="flex justify-between items-center pr-2 pb-4">
            <div class="pb-2 font-bold">Folders</div>
            <ion-button class="h-8 px-3 text-sm flex items-center space-x-2"@click="addfolder()">
              <ion-icon :icon="add" style="color: white" ></ion-icon>
              <span class="font-medium">Add Folder</span>
            </ion-button>
          </div>

          <!-- Folder Grid -->
          <div class="grid grid-cols-2 gap-2">
            <CustomCard
              class="w-[150px] h-[100px]"
              v-for="(folder, index) in folders"
              :key="index"
            >
              <template #content>
                <div class="text-center">
                  <strong>{{ folder.title }}</strong>
                  <p class="text-xs">{{ folder.description }}</p>
                </div>
              </template>
            </CustomCard>
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
  IonRouterOutlet,
  IonLabel,
  IonTabs,
  IonTab,
  IonToolbar,
  IonTabBar,
  IonTabButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonIcon,
  IonPage,
  IonButton,
  IonSearchbar,
} from "@ionic/vue";
import { add, home, folderOpen, list, person } from "ionicons/icons";

import BaseLayout from "@/components/templates/BaseLayout.vue";
import CustomCard from "@/components/templates/CustomCard.vue";
import CustomCalendar from "@/components/templates/CustomCalendar.vue";

export default defineComponent({
  name: "Home",
  components: {
    IonRouterOutlet,
    IonLabel,
    IonTabs,
    IonTab,
    IonToolbar,
    IonTabBar,
    IonTabButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonIcon,
    IonPage,
    IonButton,
    BaseLayout,
    CustomCard,
    CustomCalendar,
    IonSearchbar,
  },

  setup() {
    const isAddFolderModalOpen = ref(false);
    const folders = ref([]);
    const newFolder = ref({
      title: "",
      description: "",
      files: [],
      link: "",
      friends: "",
    });

    const openAddFolderModal = () => {
      isAddFolderModalOpen.value = true;
    };

    const closeAddFolderModal = () => {
      isAddFolderModalOpen.value = false;
      newFolder.value = {
        title: "",
        description: "",
        files: [],
        link: "",
        friends: "",
      };
    };

    return {
      add,
      home,
      folderOpen,
      list,
      person,
      isAddFolderModalOpen,
      folders,
      newFolder,
      openAddFolderModal,
      closeAddFolderModal,
    };
  },

  methods: {
    reminder() {
      this.$router.push("/reminder");
    },
    addfolder() {
      this.$router.push("/folderform");
    },
  },
});
</script>

<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
