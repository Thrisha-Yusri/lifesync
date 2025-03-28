<template>
  <ion-page>
    <!-- <ion-header> -->
    <ion-toolbar color="primary">
      <ion-button
        shape="round"
        fill="clear"
        class="ml-2"
        @click="cancelNotes()"
      >
        <ion-icon slot="icon-only" :icon="arrowBack" color="light"></ion-icon>
      </ion-button>

      <ion-title class="text-l">TO-DO LIST</ion-title>
    </ion-toolbar>
    <!-- </ion-header> -->

    <ion-content color="light">
      <ion-card class="ion-padding">
        <ion-card-header>
          <ion-card-title class="card-title text-lg font-bold p-4"
            >To-do List Details</ion-card-title
          >
        </ion-card-header>

        <ion-card-content>
          <div class="mb-4">
            <ion-input
              v-model="dataObj.title"
              label="Title"
              label-placement="floating"
              placeholder="Enter title"
              class="w-full p-2 border rounded-md"
            ></ion-input>
          </div>

          <div class="mb-4">
            <ion-input
              v-model="newTask"
              label="Task"
              label-placement="floating"
              placeholder="Enter a task..."
              class="w-full"
            ></ion-input>
            <div class="flex justify-end pt-2">
              <ion-icon
                :icon="addCircleOutline"
                color="secondary"
                @click="addTask"
              ></ion-icon>
            </div>
        
          </div>

          <div>
            <div class="font-bold text-lg mb-2">Added Tasks</div>
          </div>

          <ion-list v-if="dataObj.tasks.length > 0">
            <ion-item v-for="(task, index) in dataObj.tasks" :key="index">
              <ion-icon :icon="squareOutline" size="small"></ion-icon>
              <ion-label :class="{ 'line-through': task.completed }"
                ><span class="pl-2">{{ task.text }}</span></ion-label
              >
              <ion-button fill="clear" @click="removeTask(index)">
                <ion-icon :icon="trash" color="danger" />
              </ion-button>
            </ion-item>
          </ion-list>

          <div class="text-gray-500 italic text-center py-4 text-sm" v-else>
            No existing list
          </div>

          <div class="flex justify-between mt-4">
            <ion-button
              fill="solid"
              color="danger"
              class="flex-1 mx-1"
              @click="cancelNotes()"
              >Cancel</ion-button
            >
            <ion-button
              fill="solid"
              color="primary"
              class="flex-1 mx-1"
              @click="saveNotes()"
              >Save</ion-button
            >
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import db from "@/firebase/init.js";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonTextarea,
  IonList,
  IonIcon,
} from "@ionic/vue";
import {
  arrowBack,
  trash,
  addCircleOutline,
  add,
  squareOutline,
} from "ionicons/icons";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonLabel,
    IonTextarea,
    IonList,
    IonIcon,
  },
  data() {
    return {
      newTask: "",
      dataObj: {
        title: "",
        note: "",
        tasks: [],
      },
      trash,
      arrowBack,
      addCircleOutline,
      squareOutline,
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.dataObj.tasks.push({ text: this.newTask, completed: false });
        this.newTask = "";
      }
    },
    removeTask(index) {
      this.dataObj.tasks.splice(index, 1);
    },
    cancelNotes() {
      console.log("Cancelled");
      this.$router.push("/home");
    },
    async saveNotes() {
      try {
        const auth = getAuth();
        let user = JSON.parse(localStorage.getItem("user"));

        let data = {
          ...this.dataObj,
          userId: user.uid,
        };

        const colRef = collection(db, "tasks");
        const docRef = await addDoc(colRef, data);

        this.$toast("Successfully created!", 3000, "success");
        this.$router.push("/tasks");
      } catch (error) {
        console.log(error);
        this.$toast("Error!", 3000, "danger");
      }
    },
  },
});
</script>

<style scoped>
ion-card {
  margin: 20px;
  border-radius: 12px;
}
.card-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}
.line-through {
  text-decoration: line-through;
  color: gray;
}
</style>
