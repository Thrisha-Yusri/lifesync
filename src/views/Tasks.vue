<template>
  <ion-page>
    <BaseLayout>
      <template #header>
        <ion-toolbar color="light">
          <ion-title class="text-xl">Life-Sync</ion-title>
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
        <div class="my-2">
          <div class="flex justify-center">
            <div v-if="tasks.length > 0" class="w-full">
              <div
                v-for="(task, index) in tasks"
                :key="index"
                class="px-6 py-4 bg-amber-100 rounded-md mb-2 cursor-pointer"
              >
                <div class="flex justify-between w-full">
                  <strong class="text-lg">{{ task.title }}</strong>
                  <div>
                    <ion-icon
                      class="pr-3"
                      :icon="eyeOutline"
                      color="secondary"
                      @click="openTask(task)"
                    ></ion-icon>
                    <ion-icon
                      id="present-alert"
                      :icon="trashOutline"
                      color="danger"
                      @click="deleteId = task.id"
                    ></ion-icon>
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
                    <div class="flex justify-between w-full">
                      <div class="font-bold text-2xl">
                        {{ selectedTask?.title }}
                      </div>

                      <div>
                        <ion-icon
                          slot="icon-only"
                          :icon="createOutline"
                          color="secondary"
                          @click="viewtasks(selectedTask.id)"
                        ></ion-icon>
                      </div>
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
                      <ion-button fill="solid" color="danger" class="flex-1"
                        @click="cancelTask()">Cancel</ion-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </ion-modal>
          </div>
        </div>
        <ion-alert
          v-if="tasks.length > 0"
          trigger="present-alert"
          header="Do you want to delete this task?"
          :buttons="alertButtons"
        ></ion-alert>
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
  </ion-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  IonAlert,
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
  IonModal,
} from "@ionic/vue";
import BaseLayout from "@/components/templates/BaseLayout.vue";
import {
  add,
  home,
  folderOpen,
  list,
  person,
  addCircleOutline,
  eyeOutline,
  trashOutline,
  createOutline,
} from "ionicons/icons";
import db from "@/firebase/init.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineComponent({
  components: {
    IonAlert,
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
    IonModal,
  },

  ionViewDidEnter() {
    this.getTasks();
    this.deleteId = null;
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
      eyeOutline,
      selectedTask: null,
      trashOutline,
      deleteId: null,
      createOutline,
      alertButtons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            this.deleteTasks(this.deleteId);
          },
        },
      ],
    };
  },

  methods: {
    addnotes() {
      this.$router.push("/todolistform");
    },

    viewtasks(taskId) {
      this.closeTask();
      this.$router.push({ name: "todolistform", query: { id: taskId } });
    },

    cancelTask(){
      this.$router.push("/home");
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
          id: docSnap.docs[index].id, // Use Firestore document ID instead of index
        }));
        //set the events to the result
        this.tasks = updatedData;
        console.log(this.tasks);
      } else {
        console.log("No such tasks!");
      }
    },

    async deleteTasks(taskId) {
      console.log(taskId);

      try {
        const docRef = doc(db, "tasks", taskId); // Reference to the document

        await deleteDoc(docRef); // Delete the document

        this.getTasks();

        this.$toast("Successfully deleted!", 3000, "success");
      } catch (error) {
        this.$toast("Failed to delete!", 3000, "danger");
      }
    },
    openTask(task) {
      console.log(task);

      this.selectedTask = task;
    },
    closeTask() {
      this.selectedTask = null;
    },
  },
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
.custom-modal::part(content) {
  background: transparent; /* Makes the modal background transparent */
  box-shadow: none; /* Removes any default shadow */
}

.custom-card {
  background-color: #f3e9c4; /* Amber-100 */
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
