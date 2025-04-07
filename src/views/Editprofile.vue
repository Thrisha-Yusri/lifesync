<template>
    <BaseLayout>
      <template #header>
        <ion-header>
          <ion-toolbar color="secondary">
            <ion-buttons slot="start">
              <ion-button @click="$router.go(-1)">
                <ion-icon :icon="arrowBackOutline" color="light"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title class="text-xl">Change Password</ion-title>
            <ion-progress-bar
              type="indeterminate"
              v-if="isLoading"
            ></ion-progress-bar></ion-toolbar
        ></ion-header>
      </template>

      <template #content>
        <div class="bg-rose-50 rounded-lg">
          <ion-card-header>
            <ion-card-title class="card-title text-lg font-bold p-4"
              >Change Password</ion-card-title
            >
          </ion-card-header>

          <ion-card-content>
            <!-- <div class="mb-4 flex flex-col items-center justify-center gap-2">
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
            </div> -->
            <form>
              <div class="mb-3">
                <ion-input
                  class="block w-full p-2"
                  label="Current Password"
                  label-placement="floating"
                  type="password"
                  placeholder="Enter password"
                  v-model="user.currentPassword"
                ></ion-input>
              </div>

              <div class="mb-3">
                <ion-input
                  class="block w-full p-2"
                  label="New Password"
                  type="password"
                  label-placement="floating"
                  placeholder="Enter password"
                  v-model="user.password"
                ></ion-input>
              </div>

              <div class="flex justify-between mt-2 gap-2">
                <ion-button
                  fill="solid"
                  color="danger"
                  class="flex-1"
                  @click="$router.back()"
                  >Cancel</ion-button
                >
                <ion-button
                  fill="solid"
                  color="secondary"
                  class="flex-1"
                  @click="updateUserCredentials(user)"
                  >Save</ion-button
                >
              </div>
            </form>
          </ion-card-content>
        </div>
      </template>
    </BaseLayout>
</template>

<script>
import BaseLayout from "@/components/templates/BaseLayout.vue";
import {
  IonButtons,
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
  IonProgressBar,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import db from "@/firebase/init.js";
import { createOutline, arrowBackOutline } from "ionicons/icons";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default defineComponent({
  components: {
    IonButtons,
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
    IonProgressBar,
  },
  ionViewWillEnter() {
    this.isLoading = false;
    this.userData = JSON.parse(localStorage.getItem("user"));

    this.user = {
      password: "",
      currentPassword: "",
    };
  },
  data() {
    return {
      arrowBackOutline,
      isLoading: false,
      users: [],
      userData: null,
      createOutline,
      editMode: false,
      user: {
        password: "",
        currentPassword: "",
      },
    };
  },

  methods: {
   
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
