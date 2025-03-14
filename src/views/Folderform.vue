<template>
  <ion-page>
    <BaseLayout>
      <template #header
        ><ion-toolbar color="primary">
          <ion-title class="text-l">Folder</ion-title>
        </ion-toolbar></template
      >

      <template #content
        >
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
                  placeholder="Enter text"
                ></ion-input>
              </div>

              <!-- Description Input -->
              <div class="mb-4">
                <ion-label position="floating">Description</ion-label>
                <ion-textarea
                  autoGrow
                  placeholder="Enter description"
                  rows="10"
                  class="border p-3 w-full rounded-lg shadow-xs"
                ></ion-textarea>
              </div>

              <!-- Upload Files -->
              <div class="mb-4">
                <ion-label class="block font-medium mb-2"
                  >Upload Files</ion-label
                >
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
                <ion-item v-for="(file, index) in selectedFiles" :key="index">
                  <ion-icon
                    name="document-text-outline"
                    class="text-primary mr-2"
                  ></ion-icon>
                  <ion-label>{{ file.name }}</ion-label>
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
              <div class="flex justify-end mt-6 space-x-2">
                <ion-button color="danger">Cancel</ion-button>
                <ion-button color="primary">Add</ion-button>
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

    return { fileInput, openFilePicker, handleFileUpload, selectedFiles };
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
</style>
