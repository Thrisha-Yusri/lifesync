<template>
  <ion-page>
    <BaseLayout>
      <template #header
        ><ion-toolbar color="primary">
          <ion-title class="text-xl">Folder</ion-title>
        </ion-toolbar></template
      >

      <template #content>
        <ion-card class="ion-padding">
          <ion-card-header>
            <ion-card-title class="card-title text-lg font-bold p-4"
              >Create New Folder</ion-card-title
            >
          </ion-card-header>

          <ion-card-content>
            <!-- Title Input -->
            <div class="mb-4">
              <ion-input
                class="block w-full p-2"
                label="Title"
                label-placement="floating"
                placeholder="Enter Title"
              ></ion-input>
            </div>

            <!-- Description Input -->
            <div class="mb-4">
              <ion-textarea
                autoGrow
                label="Description"
                label-placement="floating"
                placeholder="Enter Description"
                rows="10"
              ></ion-textarea>
            </div>

            <!-- Upload Files -->

            <div class="mb-4">
              <ion-label class="block font-medium mb-2">Upload Files</ion-label>
              <ion-button @click="openFilePicker" color="primary"
                >Choose File</ion-button
              >
              <input
                type="file"
                multiple
                ref="fileInput"
                hidden
                @change="handleFileUpload"
              />
            </div>

            <!-- File Preview as a List -->
            <ion-list
              v-if="selectedFiles.length > 0"
              class="bg-white rounded-md shadow p-3"
            >
              <ion-item
                v-for="(file, index) in selectedFiles"
                :key="index"
                lines="full"
                class="file-item"
              >
                <ion-label class="truncate text-base">{{
                  file.name
                }}</ion-label>
                <ion-icon
                  :icon="trash"
                  color="danger"
                  class="trash-icon"
                  @click="removeFile(index)"
                />
              </ion-item>
            </ion-list>

            <!-- Add Link -->
            <div class="mt-4">
              <ion-input
                class="block w-full p-5"
                label="Add Link"
                label-placement="floating"
                placeholder="Enter link"
              ></ion-input>
            </div>

            <!-- Add Collaborators -->
            <div class="mt-4">
              <ion-input
                class="block w-full p-2"
                label="Add Collaborators"
                label-placement="floating"
                placeholder="Enter Collaborators"
              ></ion-input>
            </div>

            <!-- Buttons Section -->
            <div class="flex justify-between mt-4">
              <ion-button
                fill="solid"
                color="danger"
                class="flex-1 mx-1"
                @click="cancelNotes()"
                >Cancel</ion-button
              >
              <ion-button
                fill="solid"
                color="primary"
                class="flex-1 mx-1"
                @click="saverNotes()"
                >Save</ion-button
              >
            </div>
          </ion-card-content>
        </ion-card>
      </template>
    </BaseLayout>
  </ion-page>
</template>

<script>
import BaseLayout from "@/components/templates/BaseLayout.vue";
import {
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
import { trash } from "ionicons/icons";

export default defineComponent({
  components: {
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
  setup() {
    const fileInput = ref(null);
    const selectedFiles = ref([]);

    // Open file picker
    const openFilePicker = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    // Handle file upload
    const handleFileUpload = (event) => {
      const input = event.target;
      if (input && input.files) {
        selectedFiles.value = Array.from(input.files);
        console.log(
          "Selected files:",
          selectedFiles.value.map((f) => f.name)
        );
      }
    };

    // Remove file from list
    const removeFile = (index) => {
      selectedFiles.value.splice(index, 1);
      console.log("File removed:", selectedFiles.value);
    };

    return {
      fileInput,
      openFilePicker,
      handleFileUpload,
      selectedFiles,
      removeFile,
      trash,
    };
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
</style>
