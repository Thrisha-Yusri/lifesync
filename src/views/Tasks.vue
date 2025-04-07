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
          <ion-title class="text-xl">Life-Sync</ion-title>
          <ion-progress-bar
            type="indeterminate"
            v-if="isLoading"
          ></ion-progress-bar> </ion-toolbar
      ></ion-header>
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
                    :id="`present-alert-${task.id}`"
                    :icon="trashOutline"
                    color="danger"
                    @click="deleteItem = task"
                  ></ion-icon>
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-600">
                  Overall Tasks: {{ task.tasks.length }}
                </div>
                <div class="text-sm text-lime-600">
                  Completed Tasks:
                  {{ task.tasks.filter((task) => task.completed).length }}
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
                      <div
                        class="rounded-lg border p-2 font-semibold"
                        :class="
                          completedCurrentTaskNum === overallCurrentTaskNum
                            ? 'text-green-500'
                            : 'text-red-500'
                        "
                      >
                        {{ completedCurrentTaskNum }}/{{
                          overallCurrentTaskNum
                        }}
                      </div>
                    </div>
                  </div>
                  <ul
                    v-if="selectedTask && selectedTask.tasks.length > 0"
                    class="mt-2"
                  >
                    <li
                      v-for="(t, i) in selectedTask.tasks"
                      :key="i"
                      class="flex items-center space-x-2 space-y-2"
                    >
                      <div class="pt-4">
                        <ion-checkbox v-model="t.completed"></ion-checkbox>
                      </div>

                      <div
                        :class="{ 'line-through text-gray-500': t.completed }"
                      >
                        {{ t.text }}
                      </div>
                    </li>
                  </ul>

                  <div class="flex justify-between mt-2 gap-2 pt-4">
                    <ion-button
                      fill="solid"
                      color="danger"
                      class="flex-1"
                      @click="closeTask"
                      >Cancel</ion-button
                    >
                    <ion-button
                      fill="solid"
                      color="secondary"
                      class="flex-1"
                      @click="saveTask(selectedTask)"
                      >Save</ion-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </ion-modal>
        </div>
      </div>

      <ion-alert
        v-if="deleteItem"
        :trigger="`present-alert-${deleteItem.id}`"
        :header="`Do you want to delete ${deleteItem.title} task?`"
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
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  IonHeader,
  IonButtons,
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
  IonProgressBar,
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
  arrowBackOutline,
} from "ionicons/icons";
import db from "@/firebase/init.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineComponent({
  components: {
    IonHeader,
    IonButtons,
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
    IonProgressBar,
  },

  ionViewWillEnter() {
    this.isLoading = false;
    this.getTasks();
    this.deleteItem = null;
    this.userData = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    overallCurrentTaskNum() {
      return this.selectedTask?.tasks.length;
    },
    completedCurrentTaskNum() {
      return this.selectedTask?.tasks.filter((task) => task.completed).length;
    },
  },
  data() {
    return {
      add,
      home,
      folderOpen,
      arrowBackOutline,
      list,
      person,
      addCircleOutline,
      tasks: [],
      userData: null,
      eyeOutline,
      selectedTask: null,
      trashOutline,
      deleteItem: null,
      createOutline,
      isLoading: false,
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
            this.deleteTasks(this.deleteItem.id);
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
    async saveTask(task) {
      this.isLoading = true;
      try {
        const docId = task.id; // Get document ID from query params
        const docRef = doc(db, "tasks", docId); // Reference to the document

        await updateDoc(docRef, task); // Update document with new data
        this.$toast("Successfully Updated!", 3000, "success");
        this.getTasks();
      } catch (error) {
        this.$toast("Unsuccessfully Updated!", 3000, "danger");
      }
      this.isLoading = false;
    },
    async getTasks() {
      this.closeTask();
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
          id: docSnap.docs[index].id, // Use Firestore document ID instead of index
        }));
        //set the events to the result
        this.tasks = updatedData;
      } else {
      }
      this.isLoading = false;
    },

    async deleteTasks(taskId) {
      this.isLoading = true;
      try {
        const docRef = doc(db, "tasks", taskId); // Reference to the document

        await deleteDoc(docRef); // Delete the document

        this.getTasks();

        this.$toast("Successfully deleted!", 3000, "success");
      } catch (error) {
        this.$toast("Failed to delete!", 3000, "danger");
      }
      this.isLoading = false;
    },
    openTask(task) {
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
