<template>
  <ion-tabs>
    <ion-tab tab="home">
      <ion-page id="hamburger-menu">
        <!-- Sidebar Menu -->
        <ion-menu content-id="hamburger-menu" side="start">
          <ion-header>
            <ion-toolbar class="bg-white-600 text-black">
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>
        </ion-menu>

        <!-- Main Page Layout -->
        <BaseLayout>
          <template #header>
            <!-- Header with Hamburger Button -->
            <ion-toolbar class="flex justify-between items-center px-2 py-1">
              <ion-button fill="blue" @click="openMenu">
                <ion-icon :icon="menuOutline" class="text-2xl text-gray-700"></ion-icon>
              </ion-button>
              <div></div>
              <!-- Profile Icon -->
              <!-- <ion-button fill="clear">
                <ion-icon
                  :icon="personCircleOutline"
                  class="text-2xl text-gray-700"
                ></ion-icon>
              </ion-button> -->
            </ion-toolbar>
          </template>

          <template #content>
            <!-- Calendar Section -->
            <CustomCard title="Calendar">
              <template #buttons>
                <ion-icon :icon="add" size="large" color="secondary"></ion-icon>
              </template>
              <template #content>
                <CustomCalendar />
              </template>
            </CustomCard>

            <!-- Folders Section -->
            <div class="py-6">
              <div class="flex justify-between items-center pr-2 pb-4">
                <div class="pb-3 font-bold">Folders</div>
                <ion-button color="secondary" @click="openAddFolderModal">
                  <div class="flex space-x-2 px-2">
                    <ion-icon slot="icon-only" :icon="add"></ion-icon>
                    <span class="text-xs">Add Folder</span>
                  </div>
                </ion-button>
              </div>

              <!-- Folder Grid -->
              <div class="grid grid-cols-2 gap-2">
                <CustomCard class="w-[150px] h-[100px]" v-for="(folder, index) in folders" :key="index">
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
        </BaseLayout>
      </ion-page>
    </ion-tab>

    <!-- Adding Folder -->
    <ion-modal :is-open="isAddFolderModalOpen">
      <ion-content class="ion-padding">
        <h2 class="text-lg font-bold">Create New Folder</h2>
        <ion-item>
          <ion-input label="Title" label-placement="floating" placeholder="Enter text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-textarea label="Description" label-placement="floating" placeholder="Enter text"
            auto-grow></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label>Upload Files</ion-label>
          <ion-button @click="openFilePicker" color="primary">
            Choose File
          </ion-button>
          <input type="file" multiple ref="fileInput" hidden @change="handleFileUpload" />
        </ion-item>
        <ion-item>
          <ion-input label="Add Link" label-placement="floating" placeholder="Enter link"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Add Collaborators" label-placement="floating" placeholder="Enter Collaborators"></ion-input>
        </ion-item>

        <div class="flex justify-end mt-4 space-x-2">
          <ion-button color="danger" @click="closeAddFolderModal">Cancel</ion-button>
          <ion-button color="primary" @click="addFolder">Add</ion-button>
        </div>
      </ion-content>
    </ion-modal>

    <!-- Bottom Tab Bar -->
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home">
        <ion-icon :icon="homeOutline" />
        <span>Home</span>
      </ion-tab-button>
      <ion-tab-button tab="folders">
        <ion-icon :icon="folderOutline" />
        <span>Folders</span>
      </ion-tab-button>
      <ion-tab-button tab="tasks">
        <ion-icon :icon="checkboxOutline" />
        <span>Tasks</span>
      </ion-tab-button>
      <ion-tab-button tab="shared">
        <ion-icon :icon="shareOutline" />
        <span>Shared</span>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
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
  IonMenu,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonModal,
} from "@ionic/vue";
import {
  homeOutline,
  folderOutline,
  checkboxOutline,
  shareOutline,
  menuOutline,
  personCircleOutline,
  add,
} from "ionicons/icons";

import BaseLayout from "@/components/templates/BaseLayout.vue";
import CustomCard from "@/components/templates/CustomCard.vue";
import CustomCalendar from "@/components/templates/CustomCalendar.vue";

export default defineComponent({
  name: "Home",
  components: {
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
    IonMenu,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonModal,
    BaseLayout,
    CustomCard,
    CustomCalendar,
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

    const openMenu = () => {
      document.querySelector("ion-menu")?.open();
    };

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

    const handleFileUpload = (event) => {
      newFolder.value.files = Array.from(event.target.files);
    };

    const addFolder = () => {
      if (newFolder.value.title.trim() === "") {
        alert("Folder title is required!");
        return;
      }
      folders.value.push({ ...newFolder.value });
      closeAddFolderModal();
    };

    return {
      homeOutline,
      folderOutline,
      checkboxOutline,
      shareOutline,
      menuOutline,
      personCircleOutline,
      add,
      isAddFolderModalOpen,
      folders,
      newFolder,
      openMenu,
      openAddFolderModal,
      closeAddFolderModal,
      handleFileUpload,
      addFolder,
    };
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
