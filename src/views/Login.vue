<template>
  <ion-page>
    <!-- Main Content -->
    <!-- <ion-content :fullscreen="true" class="p-0 flex flex-col"> -->
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
        style="font-size: 28px; font-weight: 800"
      >
        Welcome to Life Sync
      </p>
      <form>
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-12">
          <ion-list class="space-y-3">
            <div class="flex items-center space-x-2">
              <ion-icon slot="start" :icon="mail" aria-hidden="true"></ion-icon>
              <ion-input
                label="Email"
                type="email"
                label-placement="floating"
                fill="solid"
                placeholder="jack@mail.com"
                v-model="dataObj.email"
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
                placeholder="**********"
                v-model="dataObj.password"
              ></ion-input>
              
            </div>

            <ion-button
              expand="full"
              class="mt-4"
              shape="round"
              @click="login()"
              >Log In</ion-button
            >

            <div class="text-center text-sm mt-4 text-gray-500">
              Don't have an account?
              <span class="border-b" @click="$router.push('/signup')"
                >Register Here!</span
              >
            </div>
          </ion-list>
        </div>
      </form>
    </div>
    <!-- </ion-content> -->
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { mail, lockClosed } from "ionicons/icons";
import db from "@/firebase/init.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
      dataObj: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const auth = getAuth();
      try {
        // Step 1: Sign in the user with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.dataObj.email,
          this.dataObj.password
        );

        const user = userCredential.user;
        // Step 2: Get the user data from Firestore
        const queryRef = query(
          collection(db, "users"),
          where("uid", "==", user.uid)
        );

        const docSnap = await getDocs(queryRef);

        if (!docSnap.empty) {
          let doc = docSnap.docs[0];
          localStorage.setItem("user", JSON.stringify(doc.data()));
          localStorage.setItem("isLoggedIn", true);
          this.$toast("Successfully logged in!", 3000, "success");
          this.$router.push("/home");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        this.$toast(
          "Error during log in! Please check your credentials",
          3000,
          "danger"
        );
      }
    },
  },
});
</script>
