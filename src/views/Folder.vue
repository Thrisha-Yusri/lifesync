<template>
  <BaseLayout :hideFooter="false">
    <template #header>
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-button @click="$router.go(-1)">
              <ion-icon :icon="arrowBackOutline" color="secondary"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title class="text-xl flex items-center"
            ><div class="pt-[25px]">Life-Sync</div></ion-title
          >
          <ion-progress-bar
            type="indeterminate"
            v-if="isLoading"
          ></ion-progress-bar> </ion-toolbar
      ></ion-header>
    </template>

    <template #content>
      <div class="flex justify-between items-center p-4">
        <ion-card-title class="card-title text-left text-l"
          >My Folders</ion-card-title
        >
        <div class="flex justify-end pt-2">
          <ion-icon
            :icon="addCircleOutline"
            color="secondary"
            @click="addfolder()"
            class="text-2xl cursor-pointer"
          ></ion-icon>
        </div>
      </div>

   
      
      <div v-if="folders.length === 0" class="text-center p-4 text-gray-500 italic mt-6">
        No folders found. <br />Click the + icon to create a new folder.
      </div>

      <div v-else class="p-4">
        <div
          v-for="(folder, index) in folders"
          :key="index"
          class="border-b border-gray-200 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
          @click="viewFolder(folder.id)"
        >
          <div class="flex items-center space-x-4 flex-1">
            <div class="relative w-13 h-10 bg-sky-200 rounded-lg shadow-md flex items-center justify-center">
              <div class="absolute top-0 left-4 w-6 h-2 bg-pink-200 rounded-b-lg"></div>
             
            </div>
            <div class="flex-1">
              <div class="font-medium text-lg">{{ folder.title }}</div>
              <div class="text-gray-600 text-sm truncate">{{ folder.description }}</div>
            </div>
          </div>

          <ion-icon 
            :icon="chevronForward" 
            color="secondary"
            class="text-xl"
          ></ion-icon>
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
import db from "@/firebase/init.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
  
  async ionViewWillEnter() {
    console.log("ionViewwillEnter");
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.getFolders();
    this.isLoading = false;
  },
  
  data() {
    return {
      folders: [],
      isLoading: false,
      addCircleOutline,
      home,
      folderOpen,
      list,
      person,
      arrowBackOutline,
      chevronForward,
    };
  },
  methods: {
    viewFolder(folderId) {
      this.$router.push({ path: "/folderform", query: { id: folderId } });
    },
    addfolder() {
      this.$router.push("/folderform");
    },
    openFolder(folder) {
      this.$router.push({ path: '/folderform', query: { id: folder.id } });
    },
    async getFolders() {
      this.isLoading = true;
      //inistialize firebase authentication
      const auth = getAuth();
      //get the user from local storage
      let user = JSON.parse(localStorage.getItem("user"));
      //get the folders from the database
      const queryRef = query(
        //get the collection of folders
        collection(db, "folders"),
        //get the events where the userId is equal to the user id
        where("userId", "==", user.uid),
      );

      //get the documents from the query
      const docSnap = await getDocs(queryRef);

      //if the document is not empty
      if (!docSnap.empty) {
        //map the documents to the data
        let result = [];
        //get the data from the documents
        result = docSnap.docs.map((doc) => doc.data());

        const updatedData = result.map((item, index) => ({
          ...item,
          id: docSnap.docs[index].id, // Use Firestore document ID instead of index
        }));
        //set the folders to the result
        this.folders = updatedData;
        console.log(this.folders);
      } else {
        console.log("No such folders!");
      }
      this.isLoading = false;
    },
  }
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
