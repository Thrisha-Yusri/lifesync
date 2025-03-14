<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="text-l">Reminder</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      <ion-card class="ion-padding">
        <!-- Card Header -->
        <ion-card-header class="center-header">
          <ion-card-title class="card-title text-lg p-4"
            >Event Details</ion-card-title
          >
        </ion-card-header>

        <ion-card-content>
          <!-- Reminder Title Input -->
          <div class="mb-4">
            <ion-input
              class="block w-full p-2"
              label="Title"
              placeholder="Enter title"
              label-placement="floating"
              v-model="dataObj.title"
            ></ion-input>
          </div>

          <div class="mb-4">
            <ion-input
              class="block w-full p-2"
              label="With"
              placeholder="Enter name"
              label-placement="floating"
              v-model="dataObj.with"
            ></ion-input>
          </div>
          <div class="mb-4">
            <ion-input
              class="block w-full p-2"
              label="Location"
              placeholder="Enter location"
              label-placement="floating"
              v-model="dataObj.location"
            ></ion-input>
          </div>

          <div class="mb-4">
            <ion-textarea
              autoGrow
              label="Description"
              label-placement="floating"
              placeholder="Enter description"
              rows="10"
              v-model="dataObj.description"
            ></ion-textarea>
          </div>

          <div class="border border-gray-300 rounded-lg px-4 py-2 mb-4">
            <div class="text-gray-500 pb-2 text-xs">Start Date & Time</div>
            <ion-datetime-button datetime="datetime1"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime
                id="datetime1"
                v-model="dataObj.time.start"
              ></ion-datetime>
            </ion-modal>
          </div>

          <div class="border border-gray-300 rounded-lg px-4 py-2">
            <div class="text-gray-500 pb-2 text-xs">End Date & Time</div>
            <ion-datetime-button datetime="datetime2"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime
                id="datetime2"
                v-model="dataObj.time.end"
              ></ion-datetime>
            </ion-modal>
          </div>

          <div class="flex justify-between mt-4">
            <ion-button
              fill="solid"
              color="danger"
              class="flex-1 mx-1"
              @click="cancelReminder()"
              >Cancel</ion-button
            >
            <ion-button
              fill="solid"
              color="primary"
              class="flex-1 mx-1"
              @click="saverReminder()"
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
import {
  IonDatetimeButton,
  IonModal,
  IonTextarea,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/vue";

export default {
  components: {
    IonDatetimeButton,
    IonModal,
    IonTextarea,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
  },

  data() {
    return {
      dataObj: {
        title: "",
        with: "",
        description: "",
        time: {
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
        location: "",
      },
    };
  },

  methods: {
    cancelReminder() {
      console.log("Cancelled");
    },
    async saverReminder() {
      try {
        const auth = getAuth();
        let user = JSON.parse(localStorage.getItem("user"));

        let data = {
          ...this.dataObj,
          userId: user.uid,
        };

        const colRef = collection(db, "events");
        const docRef = await addDoc(colRef, data);

        this.$toast("Successfully created!", 3000, "success");
        this.$router.push("/home");
      } catch (error) {
        console.log(error);
        this.$toast("Error!", 3000, "danger");
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles for a modern look */

.center-header {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  text-align: center;
}

ion-card {
  margin: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ion-item {
  margin-bottom: 20px;
}

ion-datetime {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 10px;
}

/* Add gap between buttons */
ion-grid {
  margin-top: 20px;
}

ion-row.ion-justify-content-between {
  justify-content: space-between;
}
</style>
