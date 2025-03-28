<template>
  <ion-page>
    <BaseLayout>
      <template #header>
        <ion-toolbar color="light">
          <ion-title class="text-l">Life-Sync</ion-title>
        </ion-toolbar>
      </template>

      <template #content>
        <!-- Header Section: Folders title on the left, Add button on the right -->
        <div class="flex justify-between items-center p-4">
          <ion-card-title class="card-title text-left text-l"
            >My To-do List</ion-card-title
          >
          <div class="flex justify-end pt-2">
            <ion-icon
              :icon="addCircleOutline"
              color="secondary"
              @click="addnotes()"
            ></ion-icon>
          </div>
        </div>

        <!-- Display fetched tasks -->
        <div class=" flex justify-center">
          <!-- Display Tasks -->
          <div v-if="tasks.length > 0" class="w-full">
            <div
              v-for="(task, index) in tasks"
              :key="index"
              class="px-6 py-4 bg-amber-100 rounded-md mb-2"
            >
              <strong class="text-lg">{{ task.title }}</strong>

              <!-- Display Task List -->
              <ul v-if="task.tasks && task.tasks.length > 0" class="mt-2">
                <li
                  v-for="(t, i) in task.tasks"
                  :key="i"
                  class="flex items-center space-x-2"
                >
                  <ion-checkbox v-model="t.completed"></ion-checkbox>
                  <span :class="{ 'line-through': t.completed }">{{
                    t.text
                  }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Show message if no tasks -->
          <p v-else class="text-center text-gray-500 p-4">No tasks found.</p>
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
import {
  add,
  home,
  folderOpen,
  list,
  person,
  addCircleOutline,
} from "ionicons/icons";
import db from "@/firebase/init.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineComponent({
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

  ionViewDidEnter() {
    this.getTasks();
    this.userData = JSON.parse(localStorage.getItem("user"));
  },

  data() {
    return {
      add,
      home,
      folderOpen,
      list,
      person,
      addCircleOutline,
      tasks: [],
      userData: null,
    };
  },

  methods: {
    addnotes() {
      this.$router.push("/todolistform");
    },

    async getTasks() {
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
        this.tasks = updatedData;
      } else {
        console.log("No such tasks!");
      }
    },
  },
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
