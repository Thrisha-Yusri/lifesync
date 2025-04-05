<template>
  <ion-page>
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
        <!-- Profile Header -->

        <div class="flex justify-center">
          <ion-avatar class="custom-avatar">
            <img
              :src="'https://picsum.photos/80/80?random=' + userData?.id"
              alt="avatar"
            />
          </ion-avatar>
        </div>

        <!-- Profile Details -->
        <ion-card class="mt-2 bg-rose-100">
          <ion-card-content>
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
  IonButtons,
} from "@ionic/vue";

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
  },
  ionViewDidEnter() {
    this.userData = JSON.parse(localStorage.getItem("user"));
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
    };
  },
  methods: {
   
    changePassword() {
      this.$router.push("/editprofile");
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
</style>
