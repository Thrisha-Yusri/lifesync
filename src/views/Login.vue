<template>
  <BaseLayout hideFooter>
    <template #content>
      <div
        class="banner min-h-screen w-full flex flex-col items-center justify-center px-6 bg-cover bg-center bg-no-repeat"
      >
        <h1 class="text-white" style="font-size: 60px; font-weight: 800">
          Organize your life with Life Sync
        </h1>
        <!-- <p class="text-white text-center" style="font-size: 28px; font-weight: 800">
      
    </p> -->
        <div class="mt-10 w-full space-y-2">
          <ion-button id="open-modallogin" expand="block" color="tertiary"
            ><span class="font-semibold">Log In</span></ion-button
          >
          <ion-button id="open-modalsignup" expand="block" color="tertiary"
            ><span class="font-semibold">Sign Me Up!</span></ion-button
          >
        </div>

        <ion-modal
          ref="modalLogin"
          trigger="open-modallogin"
          class="custom-modal"
        >
          <div class="flex justify-center items-center h-full">
            <div class="custom-card">
              <div class="relative">
                <ion-icon
                  :icon="close"
                  class="absolute top-0 right-0 text-gray-500 cursor-pointer hover:text-gray-700"
                  @click="dismissModal('modalLogin')"
                ></ion-icon>
                <div class="font-bold text-2xl mb-2 text-center">Log In</div>
                <form>
                  <ion-list class="space-y-3">
                    <div class="flex items-center space-x-2">
                      <ion-icon
                        slot="start"
                        :icon="mail"
                        aria-hidden="true"
                        color="primary"
                      ></ion-icon>
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
                        color="primary"
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
                  </ion-list>
                </form>
              </div>
            </div>
          </div>
        </ion-modal>

        <ion-modal
          ref="modalSignup"
          trigger="open-modalsignup"
          class="custom-modal"
        >
          <div class="flex justify-center items-center h-full">
            <div class="custom-card">
              <div class="relative">
                <ion-icon
                  :icon="close"
                  class="absolute top-0 right-0 text-gray-500 cursor-pointer hover:text-gray-700"
                  @click="dismissModal('modalSignup')"
                ></ion-icon>
                <div class="font-bold text-2xl mb-2 text-center">Sign Up</div>
                <ion-list class="space-y-3">
                  <div class="flex items-center space-x-2">
                    <ion-icon
                      slot="start"
                      :icon="person"
                      aria-hidden="true"
                      color="primary"
                    ></ion-icon>
                    <ion-input
                      label="Name"
                      type="text"
                      label-placement="floating"
                      fill="solid"
                      placeholder="John Doe"
                      v-model="dataObj.name"
                    ></ion-input>
                  </div>
                  <div class="flex items-center space-x-2">
                    <ion-icon
                      slot="start"
                      :icon="mail"
                      aria-hidden="true"
                      color="primary"
                    ></ion-icon>
                    <ion-input
                      label="Email"
                      type="email"
                      label-placement="floating"
                      fill="solid"
                      placeholder="john@mail.com"
                      v-model="dataObj.email"
                    ></ion-input>
                  </div>
                  <div class="flex items-center space-x-2">
                    <ion-icon
                      slot="start"
                      :icon="lockClosed"
                      aria-hidden="true"
                      color="primary"
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
                    @click="register()"
                    :disabled="isLoading"
                  >
                    <template v-if="isLoading">
                      <ion-spinner name="crescent" class="mr-2"></ion-spinner>
                      Signing Up...
                    </template>
                    <template v-else> Sign Up </template>
                  </ion-button>
                </ion-list>
              </div>
            </div>
          </div>
        </ion-modal>
      </div></template
    ></BaseLayout
  >
</template>

<script>
import { defineComponent } from "vue";
import {
  mail,
  lockClosed,
  syncCircleOutline,
  person,
  close,
} from "ionicons/icons";
import db from "@/firebase/init.js";
import BaseLayout from "@/components/templates/BaseLayout.vue";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  IonButtons,
  IonToolbar,
  IonTitle,
  IonModal,
  IonIcon,
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonSpinner,
} from "@ionic/vue";
export default defineComponent({
  components: {
    IonButtons,
    IonToolbar,
    IonTitle,
    IonModal,
    IonIcon,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonSpinner,
    BaseLayout,
  },
  data() {
    return {
      syncCircleOutline,
      mail,
      lockClosed,
      person,
      close,
      isLoading: false,
      dataObj: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    dismissModal(modalName) {
      this.$refs[modalName].$el.dismiss();
    },
    async register() {
      const auth = getAuth();
      this.isLoading = true;

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

        this.dismissModal("modalSignup");
        this.$router.push("/login");
      } catch (error) {
        this.$toast("Error during sign-up!", 3000, "danger");
      } finally {
        this.isLoading = false;
      }
    },

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
          this.dismissModal("modalLogin");
          this.$router.push("/");
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
<style>
.banner {
  background-image: url("@/assets/background_image.jpg");
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
}
.custom-modal::part(content) {
  background: transparent;
  box-shadow: none;
}

.custom-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
