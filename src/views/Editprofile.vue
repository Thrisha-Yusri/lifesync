<template>
  <ion-page>
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
  </ion-page>
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
  ionViewDidEnter() {
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
    async editProfile() {
      try {
        const docId = this.$route.query.id; // Get document ID from query params
        const docRef = doc(db, "user", docId); // Reference to the document

        await updateDoc(docRef, this.dataObj); // Update document with new data

        this.$toast("Successfully Updated!", 3000, "success");
        this.editMode = false;
        this.getDetails();
      } catch (error) {
        this.$toast("Unsuccessfully Updated!", 3000, "danger");
      }
    },
    async updateUserCredentials(user) {
      this.isLoading = true;
      const auth = getAuth();
      const currentUser = auth.currentUser;

      // Check if user is logged in via localStorage
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        this.$toast("Please log in first", 3000, "danger");
        this.$router.push("/login");
        return;
      }

      // Get user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        this.$toast("User data not found", 3000, "danger");
        this.$router.push("/login");
        return;
      }

      if (!currentUser) {
        this.$toast(
          "Authentication error. Please log in again",
          3000,
          "danger"
        );
        this.$router.push("/login");
        return;
      }

      try {
        // Re-authenticate the user before making any changes
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          user.currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);

        const userDocRef = doc(db, "users", currentUser.uid);
        let updateData = {}; // Object to store Firestore updates

        // Update password if provided
        if (user.password) {
          await updatePassword(currentUser, user.password);
        }

        // Retrieve updated user data from Firestore
        const updatedUserDoc = await getDoc(userDocRef);
        if (updatedUserDoc.exists()) {
          const updatedUserData = updatedUserDoc.data();
          console.log("Updated user data from Firestore:", updatedUserData);

          // Update local storage
          localStorage.setItem("user", JSON.stringify(updatedUserData));
          console.log("Local storage updated with new user data.");
        }
        this.$toast("Password updated successfully!", 3000, "success");
        this.$router.push("/profile");
      } catch (error) {
        console.error("Error updating user details:", error.message);
      }
      this.isLoading = false;
    },

    // async getUser() {
    //   if (!this.userId) {
    //     console.error("User ID is missing!");
    //     return;
    //   }

    //   const queryRef = query(
    //     collection(db, "users"),
    //     where("userId", "==", this.userId)
    //   );

    //   const docSnap = await getDocs(queryRef);

    //   if (!docSnap.empty) {
    //     this.userData = docSnap.docs[0].data();
    //     console.log("User Data:", this.userData);
    //   } else {
    //     console.error("No such User!");
    //   }
    // },
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
