<!-- <template>
  <BaseLayout title="Playground">
    <template #content>
      <CustomCard title="Add Details">
        <template #buttons>
          <ion-icon :icon="add" size="large" color="secondary"></ion-icon>
        </template>
        <template #content>
          <div class="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </div>
        </template>
      </CustomCard>
    </template>
  </BaseLayout>
</template>
<script>
import BaseLayout from "@/components/templates/BaseLayout.vue";
import CustomCard from "@/components/templates/CustomCard.vue";
import { defineComponent } from "vue";
import { IonIcon } from "@ionic/vue";
import { logoIonic, home, add } from "ionicons/icons";

export default defineComponent({
  name: "Playground",
  components: {
    BaseLayout,
    CustomCard,
    IonIcon,
  },
  data() {
    return {
      logoIonic,
      home,
      add,
    };
  },
});
</script> -->

<template>
  <ion-card class="ion-padding">
    <ion-card-header>
      <ion-card-title>Upload File</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <input type="file" @change="handleFileUpload" id="fileInput" hidden />
      <ion-button color="primary" @click="openFilePicker">
        Choose File
      </ion-button>
      
      <p v-if="selectedFile">Selected: {{ selectedFile.name }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  },
  setup() {
    const selectedFile = ref<File | null>(null);

    const openFilePicker = () => {
      document.getElementById("fileInput")?.click();
    };

    const handleFileUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        selectedFile.value = file;
      }
    };

    return { selectedFile, openFilePicker, handleFileUpload };
  },
});
</script>

<style scoped>
/* Center the file input button */
ion-button {
  margin-top: 10px;
}
</style>

<!-- <template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Create New Folder</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content color="light">
    <ion-card class="ion-padding">
      <ion-card-content>
        <ion-list>
          <ion-item font-size="20px">
            <ion-input v-model="newFolder.title" label="Title" label-placement="stacked"></ion-input>
          </ion-item>
          <ion-item>
            <ion-textarea v-model="newFolder.description" label="Description" label-placement="stacked"></ion-textarea>
          </ion-item>
        </ion-list>
        <div class="ion-padding flex justify-end ">
          <ion-button color="danger" @click="closeModal">Cancel</ion-button>
          <ion-button color="primary"  @click="addFolder">Add</ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </ion-content>
  
</template>


<script>
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonNote,
  IonTextarea,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonNote,
    IonTextarea,
    IonToolbar,
    IonTitle,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  setup() {
    const newFolder = ref({ title: "", description: "" });

    const closeModal = () => {
      newFolder.value = { title: "", description: "" };
    };

    const addFolder = () => {
      if (!newFolder.value.title.trim()) {
        alert("Folder title is required!");
        return;
      }
      console.log("Folder Added:", newFolder.value);
      closeModal();
    };

    return {
      newFolder,
      closeModal,
      addFolder,
    };
  },
});
</script>

<style scoped>
ion-card {
  margin: 20px;
}
ion-note {
  display: block;
}

ion-item {
  --color: black;
  --font-size: 16px;
}

ion-input {
  --color: black;
  font-size: 20px;

}

ion-textarea {
  --color: black;
  font-size: 18px; }
</style> -->