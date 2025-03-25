<template>
  <ion-page>
    <BaseLayout>
      <template #header>
        <ion-toolbar color="light">
          <ion-button
           
            shape="round"
            fill="clear"
            @click="goBack"
            class="ml-2"
          >
            <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
          </ion-button>

          <ion-title class="text-xl">Life Sync</ion-title>
        </ion-toolbar>
      </template>

      <template #content>
        <ion-content class="ion-padding">
          <!-- Profile Header -->
          <div class="flex flex-col items-center mt-6">
            <ion-avatar class="w-24 h-24">
              <img
                :src="user.profileImage"
                alt="Profile Picture"
                class="rounded-full"
              />
            </ion-avatar>
            <h1 class="text-black p-5" style="font-size: px; font-weight: 800">
              {{ user.name }}
            </h1>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>

          <!-- Profile Details -->
          <ion-card class="mt-6">
            <ion-card-content>
              <ion-list>
                <ion-item>
                  <ion-label>Name</ion-label>
                  <ion-text>{{ user.name }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Email</ion-label>
                  <ion-text>{{ user.email }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Password</ion-label>
                  <ion-button
                    fill="outline"
                    color="warning"
                    @click="editPassword"
                    >Edit Password</ion-button
                  >
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- Add My Members -->
          <ion-card class="mt-4 p-6">
            <ion-card-header>
              <ion-card-title>My Members</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-card-content>
                <ion-list>
                  <!-- Input and Add Button Side by Side -->
                  <div class="flex items-center space-x-1 mb-4">
                    <ion-input
                      v-model="newMember"
                      class="flex-1 p-2"
                      label="Member Name"
                      label-placement="floating"
                      placeholder="Enter friend's name"
                    ></ion-input>
                    <ion-button @click="addMember" color="primary"
                      >Add</ion-button
                    >
                  </div>

                  <!-- Friend List Appears Below -->
                  <div v-if="members.length > 0">
                    <ion-item v-for="(member, index) in members" :key="index">
                      <ion-label>{{ member.name }}</ion-label>
                      <ion-button
                        fill="clear"
                        color="danger"
                        @click="removeMember(index)"
                        >Remove</ion-button
                      >
                    </ion-item>
                  </div>
                </ion-list>
              </ion-card-content>
            </ion-card-content>
          </ion-card>

          <!-- Edit Profile Button -->
          <div class="flex justify-center mt-4">
            <ion-button color="primary" @click="editProfile"
              >Edit Profile</ion-button
            >
          </div>
        </ion-content></template
      >

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
              <ion-label>Notes</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="profile" href="/profile">
              <ion-icon :icon="person" />
              <ion-label>Profile</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </template>
    </BaseLayout>
  </ion-page>
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
} from "@ionic/vue";

import { home, folderOpen, list, person, arrowBack } from "ionicons/icons";

import BaseLayout from "@/components/templates/BaseLayout.vue";

export default defineComponent({
  components: {
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
    BaseLayout,
  },
  setup() {
    const user = ref({
      profileImage: "https://via.placeholder.com/150", // Change to real image
      name: " Scoupsss",
      email: "scoupss@example.com",
    });

    const members = ref([]);
    const newMember = ref("");

    const editProfile = () => {
      console.log("Edit Profile Clicked");
    };

    const editPassword = () => {
      console.log("Edit Password Clicked");
    };

    const addMember = () => {
      if (newMember.value.trim() !== "") {
        members.value.push({ name: newMember.value });
        newMember.value = "";
      }
    };

    const removeMember = (index) => {
      members.value.splice(index, 1);
    };

    return {
      user,
      editProfile,
      editPassword,
      members,
      newMember,
      addMember,
      removeMember,
      home,
      folderOpen,
      list,
      person,
      arrowBack,
    };
  },
});
</script>

<style scoped>
/* Avatar styling */
ion-avatar {
  width: 96px;
  height: 96px;
  border: 3px solid #000000; /* Blue border */
  padding: 3px; /* Optional: Adds spacing between image and border */
  border-radius: 50%; /* Ensures it's always circular */
}

/* Profile name styling */
.text-xl {
  font-size: 1.25rem;
}

/* Profile email styling */
.text-gray-500 {
  color: gray;
}
</style>
