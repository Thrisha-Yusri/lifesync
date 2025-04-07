<template>
  <BaseLayout :hideFooter="false">
    <template #header>
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-button @click="$router.go(-1)">
              <ion-icon :icon="arrowBackOutline" color="secondary"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title class="text-xl">Life-Sync</ion-title>
        </ion-toolbar></ion-header
      >
    </template>

    <template #content>

      <!-- Profile Details -->
      <ion-card class="mt-2 bg-white-100">
        <ion-card-content
          ><div class="flex justify-center">
            <ion-avatar class="custom-avatar">
              <img
                :src="'https://picsum.photos/80/80?random=' + userData?.id"
                alt="avatar"
              />
            </ion-avatar>
          </div>
          <ion-list>
            <ion-item>
              <ion-label>Name</ion-label>
              <ion-text>{{ userData?.name }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Email</ion-label>
              <ion-text>{{ userData?.email }}</ion-text>
            </ion-item>
          </ion-list>
          <div @click="changePassword()" class="text-end text-cyan-600 pt-3">
            Change Password
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Change Password Modal -->
      <ion-modal
        :is-open="isChangePasswordModalOpen"
        class="custom-modal"
        @didDismiss="closeChangePasswordModal()"
      >
        <div class="flex justify-center items-center h-full">
          <div class="custom-card">
            <div class="font-bold text-2xl pb-4">Change Password</div>
            <div class="mb-4">
              <div class="mb-3">
                <ion-input
                  class="block w-full p-2"
                  label="Current Password"
                  label-placement="floating"
                  type="password"
                  placeholder="Enter current password"
                  v-model="user.currentPassword"
                ></ion-input>
              </div>

              <div class="mb-3">
                <ion-input
                  class="block w-full p-2"
                  label="New Password"
                  type="password"
                  label-placement="floating"
                  placeholder="Enter new password"
                  v-model="user.password"
                ></ion-input>
              </div>
            </div>
            <div class="flex justify-between mt-2 gap-2 pt-4">
              <ion-button
                fill="solid"
                color="danger"
                class="flex-1"
                @click="closeChangePasswordModal()"
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
          </div>
        </div>
      </ion-modal>
    </template>

    <template #footer>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="home" />
            <ion-label>Home</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="folder" href="/folder">
            <ion-icon :icon="folderOpen" />
            <ion-label>Folder</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tasks" href="/tasks">
            <ion-icon :icon="list" />
            <ion-label>Task</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="profile" href="/profile">
            <ion-icon :icon="person" />
            <ion-label>Profile</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </template>
  </BaseLayout>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  IonIcon,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonButton,
  IonButtons,
  IonModal,
  IonProgressBar,
} from "@ionic/vue";
import db from "@/firebase/init.js";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  home,
  folderOpen,
  list,
  person,
  arrowBackOutline,
  trashOutline,
  addCircleOutline,
} from "ionicons/icons";
import BaseLayout from "@/components/templates/BaseLayout.vue";

export default defineComponent({
  components: {
    IonIcon,
    IonButtons,
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonInput,
    IonButton,
    BaseLayout,
    IonModal,
    IonProgressBar,
  },
  ionViewWillEnter() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.user = {
      password: "",
      currentPassword: "",
    };
  },

  data() {
    return {
      users: [],
      home,
      folderOpen,
      list,
      person,
      arrowBackOutline,
      userData: null,
      trashOutline,
      addCircleOutline,
      editMode: false,
      user: {
        password: "",
        currentPassword: "",
      },
      isLoading: false,
      isChangePasswordModalOpen: false,
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
        
        // Close modal and reset form
        this.closeChangePasswordModal();
        this.$toast("Password updated successfully!", 3000, "success");
        
        // Refresh the page to show updated data
        window.location.reload();
      } catch (error) {
        console.error("Error updating user details:", error.message);
        this.$toast("Error updating password: " + error.message, 3000, "danger");
      } finally {
        this.isLoading = false;
      }
    },

    async getUser() {
      if (!this.userId) {
        console.error("User ID is missing!");
        return;
      }

      const queryRef = query(
        collection(db, "users"),
        where("userId", "==", this.userId)
      );

      const docSnap = await getDocs(queryRef);

      if (!docSnap.empty) {
        this.userData = docSnap.docs[0].data();
        console.log("User Data:", this.userData);
      } else {
        console.error("No such User!");
      }
    },

    changePassword() {
      this.isChangePasswordModalOpen = true;
    },

    closeChangePasswordModal() {
      this.isChangePasswordModalOpen = false;
      // Reset form
      this.user = {
        password: "",
        currentPassword: "",
      };
    },
  },
});
</script>

<style>
/* Avatar styling */
ion-avatar {
  width: 60px; /* Reduce the width */
  height: 60px; /* Reduce the height */
  padding: 3px; /* Optional: Adjust spacing */
  border-radius: 50%; /* Keeps it circular */
}

/* Profile name styling */
.text-xl {
  font-size: 1.25rem;
}

/* Profile email styling */
.text-gray-500 {
  color: gray;
}
.custom-avatar {
  --size: 120px; /* Adjust size as needed */
  width: var(--size);
  height: var(--size);
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
  max-width: 500px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
