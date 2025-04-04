<template>
  <ion-page>
    <BaseLayout>
      <template #header
        ><ion-toolbar color="secondary">
          <ion-title class="text-xl">Profile</ion-title>
        </ion-toolbar></template
      >

      <template #content>
        <div class="bg-teal-50 rounded-lg">
          <ion-card-header>
            <ion-card-title class="card-title text-lg font-bold p-4"
              >Edit Profile</ion-card-title
            >
          </ion-card-header>

          <ion-card-content>
            <div class="mb-4 flex flex-col items-center justify-center gap-2">
              <ion-avatar class="custom-avatar">
                <img
                  :src="'https://picsum.photos/80/80?random='"
                  alt="avatar"
                />
              </ion-avatar>

              <ion-button color="secondary" @click="$refs.fileInput.click()">
                Choose Picture
              </ion-button>
              <input
                type="file"
                multiple
                ref="fileInput"
                hidden
                @change="handleFileUpload"
              />
            </div>

            <div class="mb-3 flex justify-between w-full">
              <div class="text-xl font-bold">{{ userData?.name }}</div>
              <ion-icon
                slot="icon-only"
                :icon="createOutline"
                color="secondary"
              />
            </div>

            <div class="mb-3 flex justify-between w-full">
              <ion-text>{{ userData?.email }}</ion-text>
              <ion-icon
                slot="icon-only"
                :icon="createOutline"
                color="secondary"
              />
            </div>

            <div class="mb-3">
              <ion-input
                class="block w-full p-2"
                label="Password"
                label-placement="floating"
                placeholder="Enter password"
              ></ion-input>
            </div>

            <div class="flex justify-between mt-2 gap-2">
              <ion-button fill="solid" color="danger" class="flex-1"
                >Cancel</ion-button
              >
              <ion-button fill="solid" color="secondary" class="flex-1"
                >Save</ion-button
              >
            </div>
          </ion-card-content>
        </div>
      </template>
    </BaseLayout>
  </ion-page>
</template>

<script>
import BaseLayout from "@/components/templates/BaseLayout.vue";
import {
  IonAvatar,
  IonText,
  IonList,
  IonIcon,
  IonPage,
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
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import db from "@/firebase/init.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { createOutline } from "ionicons/icons";

export default defineComponent({
  components: {
    IonAvatar,
    IonText,
    IonIcon,
    IonPage,
    IonList,
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
    BaseLayout,
  },
  ionViewDidEnter() {
    this.getUser();
    this.userData = JSON.parse(localStorage.getItem("user"));
  },
  data() {
    return {
      users: [],
      userData: null,
      createOutline,
    };
  },

  methods: {
    async getUser() {
      // Initialize Firebase authentication
      const auth = getAuth();
      // Get the user from local storage
      let user = JSON.parse(localStorage.getItem("user"));
      // Get the events from the database
      const queryRef = query(
        // Get the collection of events
        collection(db, "users"),
        // Get the events where the userId is equal to the user id
        where("userId", "==", user.uid)
      );

      // Get the documents from the query
      const docSnap = await getDocs(queryRef);

      // If the document is not empty
      if (!docSnap.empty) {
        // Map the documents to the data
        let result = [];
        result = docSnap.docs.map((doc) => doc.data());

        const updatedData = result.map((item, index) => ({
          ...item,
          id: index,
        }));
        this.tasks = updatedData;
      } else {
        console.log("No such User!");
      }
    },
  },
});
</script>

<style scoped>
/* Add spacing and styling for the card */
ion-card {
  margin: 12px;
  border-radius: 12px;
  padding: 0; /* Remove if not needed */
}
ion-card-content {
  max-width: 500px;
  margin: 0 auto;
}

/* Title styling */
.card-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

/* Improve spacing inside the list */
ion-item {
  --inner-padding-start: 10px;
  --inner-padding-end: 10px;
}

/* Button container styling */
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.custom-avatar {
  --size: 120px; /* Adjust size as needed */
  width: var(--size);
  height: var(--size);
}
</style>
