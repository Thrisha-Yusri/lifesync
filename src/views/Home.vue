<template>
  <ion-page>
    <!-- Main Page Layout -->
    <BaseLayout>
      <template #header>
        <ion-toolbar color="light">
          <ion-title class="text-xl">Life-Sync</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="logout()">
              <ion-icon :icon="logOutOutline" color="primary"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </template>

      <template #content>
        <!-- Profile card -->
        <div class="flex p-4 bg-indigo-200 rounded-lg ">
          <div class="max-w-1/4 px-3">
            <ion-avatar>
              <img :src="'https://picsum.photos/80/80?random='" alt="avatar" />
            </ion-avatar>
          </div>
          <div class="max-w-3/4">
            <div class="font-bold">Hello,{{ userData?.name }}</div>
            <div class="text-xs text-gray-700">{{ userData?.email }}</div>
          </div>
        </div>

        <!-- Events Card -->
        <div class="my-2 p-4 bg-sky-100 rounded-lg">
          <div class="flex justify-between w-full">
            <div class="font-bold uppercase text-secondary">
              Upcoming Events
            </div>
            <div>
              <ion-icon :icon="calendarOutline" @click="$router.push('/calendar')" color="secondary"></ion-icon>
            </div>
          </div>
          <div class="text-gray-500 italic text-center py-4 text-sm">
            No events
          </div>
          <div class="flex text-sky-700 border-b border-sky-500/40 py-2 last:border-none">
            <div class="w-1/4  text-center border-r border-sky-500/40 mr-3">
              <div class="text-2xl font-bold">21</div>
              <div class="uppercase text-sm font-bold">Aug</div>
            </div>
            <div>
              <div class="font-semibold">Title</div>
              <div>
                <ion-icon
                  :icon="location"
                  color="danger"
                  class="small-icon"
                ></ion-icon
                ><span class="pl-2">Location</span>
              </div>
            </div>
          </div>
          
        </div>

        <!-- Folder Card -->
        <div class="my-2 p-4">
          <div class="flex justify-between w-full">
            <div class="font-bold uppercase text-secondary">To-do list</div>
            <div>
              <ion-icon :icon="addCircleOutline" @click=addList() color="secondary"></ion-icon>
            </div>
          </div>
          <div class="text-gray-500 italic text-center py-4 text-sm">
            No existing list
          </div>
        </div>

        <!-- Folders Section -->
        <div class="py-2">
          <div class="flex justify-between items-center pr-2 pb-4">
            <div class="pb-2 font-bold text-xl">Folders</div>
            <ion-button
              class="h-8 px-2 text-sm flex items-center justify-center space-x-1"
              @click="addfolder()"
            >
              <ion-icon
                :icon="add"
                style="color: white"
                class="text-lg"
              ></ion-icon>
              <span>Add Folder</span>
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
  IonAvatar,
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
  IonButtons,
} from "@ionic/vue";
import {
  add,
  home,
  folderOpen,
  list,
  person,
  logOutOutline,
  calendarOutline,
  location,
  addCircleOutline,
} from "ionicons/icons";
import BaseLayout from "@/components/templates/BaseLayout.vue";
import CustomCard from "@/components/templates/CustomCard.vue";
import CustomCalendar from "@/components/templates/CustomCalendar.vue";
import db from "@/firebase/init.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineComponent({
  name: "Home",
  components: {
    IonAvatar,
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
    IonButtons,
  },

  //run everytime this page is open
  ionViewDidEnter() {
    this.getEvents();
    this.userData = JSON.parse(localStorage.getItem("user"));
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
      userData: null,
      logOutOutline,
      calendarOutline,
      location,
      addCircleOutline
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
    addreminder() {
      this.$router.push("/calendar");
    },
    addList() {
      this.$router.push("/todolistform");
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
          id: index,
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
    logout() {
      localStorage.clear();
      this.$router.push("/login");
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
