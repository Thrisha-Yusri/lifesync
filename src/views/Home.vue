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
        <div class="font-bold font"> 
          Hello, {{ userData?.name }}
        </div>
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
            <CustomCalendar :events="events" />
          </template>
        </CustomCard>

        <!-- Folders Section -->
        <div class="py-6">
          <div class="flex justify-between items-center pr-2 pb-4">
            <div class="pb-2 font-bold">Folders</div>
            <ion-button
              class="h-8 px-3 text-sm flex items-center space-x-2"
              @click="addfolder()"
            >
              <ion-icon :icon="add" style="color: white"></ion-icon>
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
import db from "@/firebase/init.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

//run everytime this page is open
  ionViewDidEnter() {
    this.getEvents();
    this.userData = JSON.parse(localStorage.getItem("user"))
    
  },

  data() {
    return {
      add,
      home,
      folderOpen,
      list,
      person,
      isAddFolderModalOpen: false,
      folders: [],
      newFolder: {
        title: "",
        description: "",
        files: [],
        link: "",
        friends: "",
      },
      events: [],
      userData:null,
    };
  },



  methods: {
    openAddFolderModal() {
      this.isAddFolderModalOpen = true;
    },
    closeAddFolderModal() {
      this.isAddFolderModalOpen = false;
      this.newFolder = {
        title: "",
        description: "",
        files: [],
        link: "",
        friends: "",
      };
    },
    reminder() {
      this.$router.push("/reminder");
    },
    addfolder() {
      this.$router.push("/folderform");
    },
    async getEvents() {
      //inistialize firebase authentication
      const auth = getAuth();
      //get the user from local storage
      let user = JSON.parse(localStorage.getItem("user"));
      //get the events from the database
      const queryRef = query(
        //get the collection of events
        collection(db, "events"),
        //get the events where the userId is equal to the user id
        where("userId", "==", user.uid)
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
          id:index,
          time: {
            start: this.formatDate(item.time.start),
            end: this.formatDate(item.time.end),
          },
        }));
        //set the events to the result
        this.events = updatedData;
      } else {
        console.log("No such document!");
      }
    },

    formatDate(isoString) {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
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
