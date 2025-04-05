<template>
  <ion-page>
    <BaseLayout>
      <template #header
        ><ion-toolbar color="secondary">
          <ion-title class="text-xl">Create New Folder</ion-title>
        </ion-toolbar></template
      >

      <template #content>
        <div class="p-4 bg-gray-100 rounded-lg mb-2">
          <div class="text-xl font-bold pb-4">
            Folder Details
            <div class="float-right">
              <ion-icon
                slot="icon-only"
                :icon="createOutline"
                color="secondary"
                @click="editMode = true"
              ></ion-icon>
            </div>
          </div>
          <ion-alert
            trigger="present-alert"
            header="Are you sure you want to delete this whole folder?"
            :buttons="alertButtons"
          ></ion-alert>

          <div v-if="editMode">
            <div class="mb-4">
              <ion-input
                class="block w-full p-2"
                label="Title"
                label-placement="floating"
                placeholder="Enter Title"
              ></ion-input>
            </div>
            <div class="mb-4">
              <ion-textarea
                autoGrow
                label="Description"
                label-placement="floating"
                placeholder="Enter Description"
                rows="10"
              ></ion-textarea>
            </div>
          </div>
          <div v-else>
            <div class="pt-3">
              <div class="font-bold">Title</div>
              <div>{{ dataObj.title }}</div>
            </div>
            <div>
              <div class="font-bold">Description</div>
              <div>{{ dataObj.description }}</div>
            </div>
          </div>
        </div>
        <!-- Buttons Section -->
        <div class="flex justify-between py-5" v-if="editMode">
          <ion-button fill="solid" color="danger" class="flex-1 mx-1"
            >Cancel</ion-button
          >
          <ion-button fill="solid" color="secondary" class="flex-1 mx-1"
            >Save</ion-button
          >
        </div>
        <div v-if="!editMode">
          <div class="p-4 bg-gray-100 rounded-lg mb-2">
            <div class="text-xl font-bold pb-2">
              Attachments
              <div class="float-right">
                <ion-icon
                  :icon="addCircleOutline"
                  color="secondary"
                  class="trash-icon"
                />
              </div>
            </div>
            <div class="mb-4">
              <div class="last:border-b-none border-gray-300 mb-2 p-3">
                File/Audio/Video
                <div class="float-left pr-2">
                  <ion-icon
                    :icon="trashOutline"
                    color="danger"
                    class="trash-icon"
                  />
                </div>
              </div>
            </div>
            <div class="text-gray-500 italic text-center py-4 text-sm">
              No existing list
            </div>

          </div>

          <div class="p-4 bg-gray-100 rounded-lg mb-2">
            <div class="text-xl font-bold pb-2">
              Links
              <div class="float-right">
                <ion-icon
                  :icon="addCircleOutline"
                  color="secondary"
                  class="trash-icon"
                  id="open-modal"
                />
              </div>
            </div>
            <div class="mb-4">
              <div class="last:border-b-none border-gray-300 mb-2 p-3">
                https
                <div class="float-left pr-2">
                  <ion-icon
                    :icon="trashOutline"
                    color="danger"
                    class="trash-icon"
                  />
                </div>
              </div>
            </div>
            <div class="text-gray-500 italic text-center py-4 text-sm">
              No existing list
            </div>

          </div>

          <ion-modal class="custom-modal" ref="modal" trigger="open-modal">
            <div class="flex justify-center items-center h-full">
              <div class="custom-card">
                <div>
                  <div class="font-bold text-2xl pb-4">Add Link</div>
                  <ion-input
                    class="block w-full p-2"
                    label="Links"
                    label-placement="floating"
                    placeholder="Enter Link"
                  ></ion-input>
                </div>
                <div class="flex justify-between mt-2 gap-2 pt-4">
                  <ion-button fill="solid" color="danger" class="flex-1"
                    >Cancel</ion-button
                  >
                  <ion-button fill="solid" color="secondary" class="flex-1"
                    >Submit</ion-button
                  >
                </div>
              </div>
            </div>
          </ion-modal>

          <div class="p-4 bg-gray-100 rounded-lg mb-2">
            <div class="text-xl font-bold pb-2">
              Collaborators
              <div class="float-right">
                <ion-icon
                  :icon="addCircleOutline"
                  color="secondary"
                  class="trash-icon"
                  id="open-collaborator"
                />
              </div>
            </div>
            <div class="mb-4">
              <div class="last:border-b-none border-gray-300 mb-2 p-3">
                Email
                <div class="float-left pr-2">
                  <ion-icon
                    :icon="trashOutline"
                    color="danger"
                    class="trash-icon"
                  />
                </div>
              </div>
              <div class="text-gray-500 italic text-center py-4 text-sm">
              No existing list
            </div>

            </div>
          </div>
          <div class="flex justify-between mt-2 gap-2">
            <ion-button
              fill="solid"
              color="danger"
              class="flex-1"
              id="present-alert"
              >Delete Folder</ion-button
            >
          </div>

          <ion-modal
            class="custom-modal"
            ref="modal"
            trigger="open-collaborator"
          >
            <div class="flex justify-center items-center h-full">
              <div class="custom-card">
                <div>
                  <div class="font-bold text-2xl pb-4">Add Collaborator</div>
                  <ion-input
                    class="block w-full p-2"
                    label="Email"
                    label-placement="floating"
                    placeholder="Enter Email"
                  ></ion-input>
                </div>
                <div class="flex justify-between mt-2 gap-2 pt-4">
                  <ion-button fill="solid" color="danger" class="flex-1"
                    >Cancel</ion-button
                  >
                  <ion-button fill="solid" color="secondary" class="flex-1"
                    >Submit</ion-button
                  >
                </div>
              </div>
            </div>
          </ion-modal>
        </div>
      </template>
    </BaseLayout>
  </ion-page>
</template>

<script>
import BaseLayout from "@/components/templates/BaseLayout.vue";
import {
  IonAlert,
  IonModal,
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
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { trashOutline, createOutline, addCircleOutline } from "ionicons/icons";

export default defineComponent({
  components: {
    IonModal,
    IonAlert,
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
  },
  ionViewDidEnter() {
    this.editMode = true;
  },
  data() {
    return {
      trashOutline,
      createOutline,
      addCircleOutline,
      editMode: true,
      dataObj: {
        title: "",
        description: "",
      },
      alertButtons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            this.deleteFolder();
          },
        },
      ],
    };
  },
  methods: {
    deleteFolder() {
      console.log("delete folder");
    },
  },
});
</script>

<style scoped>
/* Add spacing and styling for the card */
ion-card {
  margin: 20px;
  border-radius: 12px;
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

.file-item {
  display: flex;
  align-items: center;
  min-height: 50px; /* Ensures all items have the same height */
  padding: 10px;
}

.trash-icon {
  font-size: 24px; /* Makes sure all trash icons are the same size */
  cursor: pointer;
  margin-left: auto; /* Pushes the trash icon to the right */
}

ion-label {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-modal::part(content) {
  background: transparent; /* Makes the modal background transparent */
  box-shadow: none; /* Removes any default shadow */
}
.custom-card {
  background-color: #ffffff; /* Amber-100 */
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
