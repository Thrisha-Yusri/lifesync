<template>
  <ion-page>
    <!-- Main Content -->
    <ion-content :fullscreen="true" class="p-0 flex flex-col">
      <!-- Top Section: Titles & Gradient Background -->
      <div
        class="h-[100vh] w-full flex flex-col items-center justify-center px-6 bg-cover bg-center"
        style="background-image: url('/assets/background_image.jpg')"
      >
        <h1 class="text-white p-10" style="font-size: 60px; font-weight: 800">
          Hi there!
        </h1>
        <p
          class="text-white text-center"
          style="font-size: 24px; font-weight: 700"
        >
          Welcome to Life Sync
        </p>

        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-12">
          <ion-list class="space-y-3">
            <div class="flex items-center space-x-2">
              <ion-icon
                slot="start"
                :icon="person"
                aria-hidden="true"
              ></ion-icon>
              <ion-input
                label="Name"
                type="name"
                label-placement="floating"
                fill="solid"
                placeholder="Name"
                v-model="dataObj.name"
              ></ion-input>
            </div>
            <div class="flex items-center space-x-2">
              <ion-icon slot="start" :icon="mail" aria-hidden="true"></ion-icon>
              <ion-input
                label="Email"
                type="email"
                label-placement="floating"
                fill="solid"
                v-model="dataObj.email"
                placeholder="*****@gmail.com"
              ></ion-input>
            </div>
            <div class="flex items-center space-x-2">
              <ion-icon
                slot="start"
                :icon="lockClosed"
                aria-hidden="true"
              ></ion-icon>
              <ion-input
                label="Password"
                type="password"
                label-placement="floating"
                fill="outline"
                v-model="dataObj.password"
                placeholder="**********"
              ></ion-input>
            </div>

            <ion-button
              expand="full"
              class="mt-4"
              shape="round"
              @click="register()"
              >Sign Up</ion-button
            >
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { mail, lockClosed, person } from "ionicons/icons";
import db from "@/firebase/init.js";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  IonIcon,
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/vue";
export default defineComponent({
  components: {
    IonIcon,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
  },
  data() {
    return {
      mail,
      lockClosed,
      person,
      dataObj: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      const auth = getAuth();

      try {
        // Step 1: Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.dataObj.email,
          this.dataObj.password
        );
        const user = userCredential.user;
        console.log("User created:", user.uid);

        // Step 2: Store additional user information in Firestore
        const colRef = collection(db, "users");

        let dataObj = {
          name: this.dataObj.name,
          email: this.dataObj.email,
          uid: user.uid, // Store the user ID for reference
        };

        // Save user details in Firestore
        const docRef = await addDoc(colRef, dataObj);
        this.$toast(
          "Successfully registered! Please sign in to proceed",
          3000,
          "success"
        );

        this.$router.push("/login");
      } catch (error) {
        this.$toast("Error during sign-up!", 3000, "danger");
      }
    },
  },
});
</script>
