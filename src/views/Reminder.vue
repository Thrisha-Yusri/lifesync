<template>
  <ion-page>
    <BaseLayout
      ><template #header>
        <ion-header>
          <ion-toolbar color="secondary">
            <ion-buttons slot="start">
              <ion-button @click="$router.go(-1)">
                <ion-icon :icon="arrowBackOutline" color="light"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title class="text-xl">Reminder</ion-title>
          </ion-toolbar></ion-header
        >
      </template>
      <template #content>
        <ion-content>
          <!-- Card Header -->
          <ion-card-header class="center-header" v-if="editMode">
            <ion-card-title class="card-title text-xl p-4"
              >Event Details</ion-card-title
            >
          </ion-card-header>

          <ion-card-content v-if="editMode">
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
                v-if="!$route.query.id"
                fill="solid"
                color="secondary"
                class="flex-1 mx-1"
                @click="saverReminder()"
                >Submit</ion-button
              >
              <ion-button
                v-else
                fill="solid"
                color="secondary"
                class="flex-1 mx-1"
                @click="editReminder()"
                >Save</ion-button
              >
            </div>
          </ion-card-content>
          <ion-card-content v-else>
            <div class="space-y-3 bg-sky-100 shadow rounded-lg px-4 py-6 mb-4">
              <div
                class="flex border-b justify-between font-bold pb-2 text-xl text-cyan-700"
              >
                <div>Event Details</div>
                <div class="flex justify-end pb-2 space-x-2">
                  <ion-icon
                    id="present-alert"
                    slot="icon-only"
                    :icon="trashOutline"
                    color="danger"
                  ></ion-icon>

                  <ion-icon
                    slot="icon-only"
                    :icon="createOutline"
                    color="secondary"
                    @click="editMode = true"
                  ></ion-icon>
                </div>
              </div>
              <div class="pt-3">
                <div class="font-bold">Title</div>
                <div>{{ dataObj.title }}</div>
              </div>
              <div>
                <div class="font-bold">With</div>
                <div>{{ dataObj.with }}</div>
              </div>
              <div>
                <div class="font-bold">Location</div>
                <div>{{ dataObj.location }}</div>
              </div>
              <div>
                <div class="font-bold">Description</div>
                <div>{{ dataObj.description }}</div>
              </div>
              <div>
                <div class="font-bold">Start Date & Time</div>
                <div>{{ formatDate(dataObj.time.start) }}</div>
              </div>
              <div>
                <div class="font-bold">End Date & Time</div>
                <div>{{ formatDate(dataObj.time.end) }}</div>
              </div>
            </div> </ion-card-content
          ><ion-alert
            trigger="present-alert"
            header="Do you want to delete this event?"
            :buttons="alertButtons"
          ></ion-alert> </ion-content></template
    ></BaseLayout>
  </ion-page>
</template>

<script>
import db from "@/firebase/init.js";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  IonAlert,
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
  IonButtons,
} from "@ionic/vue";
import { arrowBackOutline, trashOutline, createOutline } from "ionicons/icons";
import BaseLayout from "@/components/templates/BaseLayout.vue";
export default {
  components: {
    IonAlert,
    IonButtons,
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
    BaseLayout,
  },

  ionViewDidEnter() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    if (this.$route.query.id) {
      this.getDetails();
    } else {
      this.editMode = true;
      this.dataObj = {
        title: "",
        with: "",
        description: "",
        time: {
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
        location: "",
      };
    }
  },
  data() {
    return {
      arrowBackOutline,
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
      editMode: false,
      trashOutline,
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
            this.deleteReminder();
          },
        },
      ],
    };
  },

  methods: {
    cancelReminder() {
      if (this.$route.query.id) {
        this.getDetails();
        this.editMode = false;
      } else {
        this.$router.push("/calendar");
      }
    },
    async deleteReminder() {
      try {
        const docId = this.$route.query.id; // Get document ID from query params
        if (!docId) {
          console.error("No document ID provided");
          return;
        }

        const docRef = doc(db, "events", docId); // Reference to the document

        await deleteDoc(docRef); // Delete the document

        this.$toast("Successfully deleted!", 3000, "success");
        this.$router.push("/");
      } catch (error) {
        this.$toast("Failed to delete!", 3000, "danger");
      }
    },
    async editReminder() {
      try {
        const docId = this.$route.query.id; // Get document ID from query params
        const docRef = doc(db, "events", docId); // Reference to the document

        await updateDoc(docRef, this.dataObj); // Update document with new data

        this.$toast("Successfully Updated!", 3000, "success");
        this.editMode = false;
        this.getDetails();
      } catch (error) {
        this.$toast("Unsuccessfully Updated!", 3000, "danger");
      }
    },

    async getDetails() {
      //inistialize firebase authentication
      const auth = getAuth();
      const docId = this.$route.query.id; // Get the ID from the route query
      const docRef = doc(db, "events", docId); // Reference to the document
      const docSnap = await getDoc(docRef); // Fetch the document

      if (docSnap.exists()) {
        this.dataObj = docSnap.data();
      } else {
        console.log("No such document!");
      }
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
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.$toast("Error!", 3000, "danger");
      }
    },
    formatDate(isoString) {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");

      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12; // Convert 0 (midnight) and 12 (noon) correctly

      return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
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
