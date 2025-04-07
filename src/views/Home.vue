<template>
  <!-- Main Page Layout -->
  <BaseLayout :hideFooter="false">
    <template #header>
      <ion-toolbar color="light">
        <ion-title class="text-xl flex items-center"
            ><div class="pt-[25px]">Life-Sync</div></ion-title
          >
        <ion-buttons slot="end">
          <ion-button @click="logout()">
            <ion-icon :icon="logOutOutline" color="primary"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-progress-bar
          type="indeterminate"
          v-if="isLoading"
        ></ion-progress-bar>
      </ion-toolbar>
    </template>

    <template #content>
      <!-- Profile card -->
      <div class="flex justify-between w-full pb-3">
        <div class="font-bold uppercase text-secondary">My Profile</div>
      </div>
      <div class="flex p-4 bg-indigo-200 rounded-lg">
        <div class="max-w-1/4 px-3">
          
        </div>
        <div class="max-w-3/4">
          <div class="font-bold text-lg">Hello, {{ userData?.name }}</div>
          <div class="text-sm text-gray-700">{{ userData?.email }}</div>
        </div>
      </div>

      <div class="flex justify-between w-full pt-5">
        <div class="font-bold uppercase text-secondary">Upcoming Events</div>
        <div class="pr-2">
          <ion-icon
            :icon="calendarOutline"
            @click="$router.push('/calendar')"
            color="secondary"
          ></ion-icon>
        </div>
      </div>

      <!-- Events Card -->
      <div class="my-2 p-4 bg-sky-100 rounded-lg">
        <div
          v-if="events.length > 0"
          v-for="(item, index) in events"
          :key="index"
          class="flex text-sky-700 border-b border-sky-500/40 py-2 last:border-none"
        >
          <div class="w-1/4 text-center border-r border-sky-500/40 mr-3">
            <div class="text-2xl font-bold">
              {{ getDateOrMonth(item.time.start, "date") }}
            </div>
            <div class="uppercase text-sm font-bold">
              {{ getDateOrMonth(item.time.start, "month") }}
            </div>
          </div>
          <div class="w-2/4">
            <div class="font-semibold">{{ item.title }}</div>
            <div class="flex">
              <ion-icon
                :icon="location"
                color="danger"
                class="small-icon"
              ></ion-icon
              ><span class="pl-2" v-if="item.location">{{
                item.location
              }}</span>
              <span v-else class="italic text-gray-500"
                >No location stated
              </span>
            </div>
          </div>

          <div class="justify-end flex items-center w-1/4">
            <div>
              <ion-icon
                :icon="eyeOutline"
                color="secondary"
                @click="viewevents(item.id)"
              ></ion-icon>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 italic text-center py-4 text-sm">
          No events
        </div>
      </div>

      <!-- Tasks List -->
      <div class="my-2 py-4">
        <div class="flex justify-between w-full">
          <div class="font-bold uppercase text-secondary">Task list</div>
          <div class="pr-2">
            <ion-icon
              :icon="addCircleOutline"
              @click="addList()"
              color="secondary"
            ></ion-icon>
          </div>
        </div>

        <div class="flex justify-center">
          <div v-if="tasks.length > 0" class="w-full">
            <div
              v-for="(task, index) in tasks"
              :key="index"
              class="my-2 p-4 bg-amber-100 rounded-md"
              @click="openTask(task)"
            >
              <div class="flex justify-between w-full">
                <strong class="text-lg">{{ task.title }}</strong>
                <div>
                  <ion-icon :icon="eyeOutline" color="secondary"></ion-icon>
                </div>
              </div>
            </div>
          </div>

          <!-- Show message if no tasks -->
          <div v-else class="text-gray-500 italic text-center py-4 text-sm">
            No existing list
          </div>

          <ion-modal
            :is-open="selectedTask !== null"
            @didDismiss="closeTask"
            class="custom-modal"
          >
            <div class="flex justify-center items-center h-full">
              <div class="custom-card">
                <div>
                  <div class="font-bold text-2xl">
                    {{ selectedTask?.title }}
                  </div>
                  <ul
                    v-if="selectedTask && selectedTask.tasks.length > 0"
                    class="mt-2"
                  >
                    <li
                      v-for="(t, i) in selectedTask.tasks"
                      :key="i"
                      class="flex items-center space-x-2"
                    >
                      <ion-checkbox v-model="t.completed"></ion-checkbox>
                      <span :class="{ 'line-through': t.completed }">{{
                        t.text
                      }}</span>
                    </li>
                  </ul>
                  <div class="flex justify-between mt-2 gap-2">
                    <ion-button
                      fill="solid"
                      color="danger"
                      class="flex-1"
                      @click="closeTask"
                      >Cancel</ion-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </ion-modal>
        </div>
      </div>

      <!-- Folders Shared with Me -->
      <div class="my-2">
        <div class="flex justify-between w-full">
          <div class="font-bold uppercase text-secondary">
            Folder Shared with Me
          </div>
        </div>
        <div v-if="foldersSharedWithMe.length > 0" class="w-full">
          <div
            v-for="(folder, index) in foldersSharedWithMe"
            :key="index"
            class="border-b border-gray-200 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
            @click="viewFolder(folder.id)"
          >
            <div class="flex items-center space-x-4 flex-1">
              <div
                class="relative w-13 h-10 bg-sky-200 rounded-lg shadow-md flex items-center justify-center"
              >
                <div
                  class="absolute top-0 left-4 w-6 h-2 bg-pink-200 rounded-b-lg"
                ></div>
              </div>
              <div class="flex-1">
                <div class="font-medium text-lg">{{ folder.title }}</div>
                <div class="text-gray-600 text-sm truncate">
                  {{ folder.description }}
                </div>
              </div>
            </div>

            <ion-icon
              :icon="chevronForward"
              color="secondary"
              class="text-xl"
            ></ion-icon>
          </div>
        </div>

        <!-- Show message if no folders shared -->
        <div v-else class="text-gray-500 italic text-center py-4 text-sm">
          No folders shared with you
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
    </template>
  </BaseLayout>
</template>

<script>
import { defineComponent } from "vue";
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
  IonCheckbox,
  IonModal,
  IonProgressBar,
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
  eyeOutline,
  chevronForward,
  shuffleOutline,
} from "ionicons/icons";
import BaseLayout from "@/components/templates/BaseLayout.vue";
import CustomCard from "@/components/templates/CustomCard.vue";
import { useRouter } from "vue-router";
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
    CustomCard,
    BaseLayout,
    IonSearchbar,
    IonButtons,
    IonCheckbox,
    IonModal,
    IonProgressBar,
  },

  //run everytime this page is open
  async ionViewWillEnter() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.isLoading = false;
    this.getTasks();
    this.getEvents();
    this.getFoldersSharedWithMe();
  },

  data() {
    return {
      isLoading: false,
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
      chevronForward,
      foldersSharedWithMe: [],
      userData: null,
      logOutOutline,
      calendarOutline,
      location,
      addCircleOutline,
      tasks: [],
      eyeOutline,
      selectedTask: null,
      router: useRouter(),
      shuffleOutline,
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
    viewevents(eventId) {
      this.$router.push({ name: "reminder", query: { id: eventId } });
    },

    async getEvents() {
      this.isLoading = true;
      const currentTime = new Date().toISOString().slice(0, 16);
      //inistialize firebase authentication
      const auth = getAuth();
      //get the user from local storage
      let user = JSON.parse(localStorage.getItem("user"));
      //get the events from the database
      const queryRef = query(
        //get the collection of events
        collection(db, "events"),
        //get the events where the userId is equal to the user id
        where("userId", "==", user.uid),
        where("time.start", ">", currentTime)
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
          time: {
            start: this.formatDate(item.time.start),
            end: this.formatDate(item.time.end),
          },
        }));
        //set the events to the result
        this.events = updatedData.splice(0, 3);
        console.log(this.events);
      } else {
        console.log("No such document!");
      }
      this.isLoading = false;
    },
    // date format
    getDateOrMonth(dateString, type) {
      const date = new Date(dateString);
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];

      if (type === "date") {
        return date.getDate(); // Returns the day of the month
      } else if (type === "month") {
        return months[date.getMonth()]; // Returns the abbreviated month
      } else {
        return "Invalid type. Use 'date' or 'month'.";
      }
    },

    async getTasks() {
      this.isLoading = true;
      //inistialize firebase authentication
      const auth = getAuth();
      //get the user from local storage
      let user = JSON.parse(localStorage.getItem("user"));
      //get the events from the database
      const queryRef = query(
        //get the collection of events
        collection(db, "tasks"),
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
        }));
        //set the events to the result
        this.tasks = updatedData.splice(0, 3);
      } else {
        console.log("No such tasks!");
      }
      this.isLoading = false;
    },
    async getFoldersSharedWithMe() {
      this.isLoading = true;
      try {
        const auth = getAuth();
        let user = JSON.parse(localStorage.getItem("user"));

        const queryRef = query(
          collection(db, "folders"),
          where("collaborators", "array-contains", user.email)
        );

        const docSnap = await getDocs(queryRef);

        if (!docSnap.empty) {
          this.foldersSharedWithMe = docSnap.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
            
        } else {
          this.foldersSharedWithMe = [];
        }
      } catch (error) {
        console.error("Error getting shared folders:", error);
        this.$toast("Error loading shared folders", 3000, "danger");
      } finally {
        this.isLoading = false;
      }
    },

    openTask(task) {
      this.selectedTask = task;
    },
    closeTask() {
      this.selectedTask = null;
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
    async logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    viewFolder(folderId) {
      this.$router.push({ path: "/folderform", query: { id: folderId } });
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

.line-through {
  text-decoration: line-through;
}

.custom-modal::part(content) {
  background: transparent;
  box-shadow: none;
}

.custom-card {
  background-color: #f4e8ba;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
