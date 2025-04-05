<template>
    <ion-page>
      <BaseLayout>
        <template #header>
          <ion-toolbar color="light">
            <ion-title class="text-xl">Life-Sync</ion-title>
          </ion-toolbar>
        </template>
  
        <template #content>
          <!-- Header Section -->
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
  
          <!-- Display Tasks -->
          <div class="my-2">
            <div class="flex justify-center">
              <div v-if="tasks.length > 0" class="w-full">
                <div
                  v-for="(task, index) in tasks"
                  :key="index"
                  class="px-6 py-4 bg-amber-100 rounded-md mb-2 cursor-pointer"
                  @click="openTask(task)"
                >
                  <div class="flex justify-between w-full items-center">
                    <strong class="text-lg">{{ task.title }}</strong>
                    <div class="flex items-center space-x-3">
                      <!-- View Icon -->
                      <ion-icon :icon="eyeOutline" color="secondary"></ion-icon>
                      <!-- Delete Icon -->
                      <ion-icon
                        :icon="trashOutline"
                        color="danger"
                        @click.stop="deleteTask(task.id)"
                      ></ion-icon>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- No Tasks Message -->
              <div v-else class="text-gray-500 italic text-center py-4 text-sm">
                No existing list
              </div>
  
              <!-- Task Modal -->
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
                      <ion-button expand="full" class="mt-4" @click="closeTask"
                        >Close</ion-button
                      >
                    </div>
                  </div>
                </div>
              </ion-modal>
            </div>
          </div>
        </template>
  
        <template #footer>
          <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="home" href="/">
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
  } from "ionicons/icons";
  import db from "@/firebase/init.js";
  import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
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
      IonModal,
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
        eyeOutline,
        trashOutline,
        tasks: [],
        userData: null,
        selectedTask: null,
      };
    },
  
    methods: {
      addnotes() {
        this.$router.push("/todolistform");
      },
  
      async getTasks() {
        // Get user from local storage
        let user = JSON.parse(localStorage.getItem("user"));
  
        // Query tasks for the logged-in user
        const queryRef = query(collection(db, "tasks"), where("userId", "==", user.uid));
  
        // Fetch documents
        const docSnap = await getDocs(queryRef);
  
        if (!docSnap.empty) {
          // Map the documents to an array, including Firestore document IDs
          this.tasks = docSnap.docs.map((doc) => ({
            id: doc.id, // Store Firestore document ID
            ...doc.data(),
          }));
        } else {
          console.log("No tasks found!");
        }
      },
  
      async deleteTask(taskId) {
        try {
          if (!taskId) return;
  
          // Delete the task from Firestore
          await deleteDoc(doc(db, "tasks", taskId));
  
          // Remove task from local state
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
  
          console.log("Task deleted successfully!");
        } catch (error) {
          console.error("Error deleting task:", error);
        }
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
    background: transparent;
    box-shadow: none;
  }
  
  .custom-card {
    background-color: #f4e8ba; /* Amber-100 */
    padding: 20px;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  