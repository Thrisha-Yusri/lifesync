<template>
  <ion-page>
    <!-- Main Page Layout -->
    <BaseLayout>
      <template #header>
        <ion-header>
          <ion-toolbar color="light">
            <ion-buttons slot="start">
              <ion-button @click="$router.go(-1)">
                <ion-icon :icon="arrowBackOutline" color="secondary"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title class="text-xl">Life-Sync</ion-title>
            <ion-progress-bar
            type="indeterminate"
            v-if="isLoading"
          ></ion-progress-bar>
          </ion-toolbar></ion-header
        >
      </template>

      <template #content>
        <div class="flex justify-between items-center p-4">
          <ion-card-title class="card-title text-left text-l"
            >My Calendar</ion-card-title
          >
          <div>
            <ion-icon
              :icon="addCircleOutline"
              size="large"
              color="secondary"
              @click="reminder()"
            ></ion-icon>
          </div>
        </div>
        <CustomCalendar :events="events" />
      </template>
    </BaseLayout>
  </ion-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import { addCircleOutline, arrowBackOutline } from "ionicons/icons";
import {
  IonProgressBar,
  IonHeader,
  IonRouterOutlet,
  IonToolbar,
  IonTabBar,
  IonTitle,
  IonIcon,
  IonPage,
  IonCard,
  IonCardTitle,
  IonButton,
  IonBackButton,
  IonButtons,
} from "@ionic/vue";
import BaseLayout from "@/components/templates/BaseLayout.vue";
import CustomCalendar from "@/components/templates/CustomCalendar.vue";
import db from "@/firebase/init.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineComponent({
  name: "Calendar",
  components: {
    IonProgressBar,
    IonHeader,
    IonCard,
    IonRouterOutlet,
    IonToolbar,
    IonTabBar,
    IonTitle,
    IonIcon,
    IonPage,
    BaseLayout,
    CustomCalendar,
    IonCardTitle,
    IonButton,
    IonBackButton,
    IonButtons,
  },

  //run everytime this page is open
  ionViewDidEnter() {
    this.isLoading = false;
    this.getEvents();
    this.userData = JSON.parse(localStorage.getItem("user"));
  },

  data() {
    return {
      addCircleOutline,
      arrowBackOutline,
      isAddFolderModalOpen: false,
      isLoading: false,
      folders: [],
      newFolder: {
        title: "",
        description: "",
        files: [],
        link: "",
        friends: "",
      },
      events: [],
      userData: null,
    };
  },

  methods: {
    openAddFolderModal() {
      this.isAddFolderModalOpen = true;
    },
    closeAddFolderModal() {
      this.isAddFolderModalOpen = false;
      this.newFolder = {
        title: "",
        description: "",
        files: [],
        link: "",
        friends: "",
      };
    },
    reminder() {
      this.$router.push("/reminder");
    },
    addList() {
      this.$router.push("/todolistform");
    },
    addfolder() {
      this.$router.push("/folderform");
    },

    async getEvents() {
      this.isLoading = true;
      //inistialize firebase authentication
      const auth = getAuth();
      //get the user from local storage
      let user = JSON.parse(localStorage.getItem("user"));
      //get the events from the database
      const queryRef = query(
        //get the collection of events
        collection(db, "events"),
        //get the events where the userId is equal to the user id
        where("userId", "==", user.uid)
      );

      //get the documents from the query
      const docSnap = await getDocs(queryRef);

      //if the document is not empty
      if (!docSnap.empty) {
        //map the documents to the data
        let result = [];
        //get the data from the documents
        result = docSnap.docs.map((doc) => doc.data());

        const updatedData = result.map((item, index) => ({
          ...item,
          id: index,
          time: {
            start: this.formatDate(item.time.start),
            end: this.formatDate(item.time.end),
          },
        }));
        //set the events to the result
        this.events = updatedData;
      } else {
        console.log("No such document!");
      }
      this.isLoading = false;
    },

    formatDate(isoString) {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
});
</script>

<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
