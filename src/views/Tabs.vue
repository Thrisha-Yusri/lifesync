<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet />
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/tabs/">
            <ion-icon :icon="homeOutline" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab2" href="/tabs/profile">
            <ion-icon :icon="personOutline" />
            <ion-label>Profile</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab2" href="/tabs/profile">
            <ion-icon :icon="personOutline" />
            <ion-label>Profile</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab3" href="/tabs/tasks">
            <ion-icon :icon="listOutline" />
            <ion-label>To-Do</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script>
  import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage, IonRouterOutlet } from "@ionic/vue";
  import { homeOutline, personOutline, listOutline } from "ionicons/icons";
  
  export default {
    components: {
      IonTabs,
      IonTabBar,
      IonTabButton,
      IonIcon,
      IonLabel,
      IonPage,
      IonRouterOutlet,
    },
    data() {
      return {
        homeOutline,
        personOutline,
        listOutline,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Style the tab bar */
  ion-tab-bar {
    --background: #ffffff;
    --color-selected: #3880ff;
  }
  </style>
  