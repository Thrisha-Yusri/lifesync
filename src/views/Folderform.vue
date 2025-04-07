<template>
  <BaseLayout>
    <template #header>
      <ion-header>
        <ion-toolbar color="secondary">
          <ion-buttons slot="start">
            <ion-button @click="$router.go(-1)">
              <ion-icon :icon="arrowBackOutline" color="light"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title class="text-xl flex items-center"
            ><div class="pt-[25px]">Folder Details</div></ion-title
          >
          <ion-progress-bar
            type="indeterminate"
            v-if="isLoading"
          ></ion-progress-bar> </ion-toolbar
      ></ion-header>
    </template>

    <template #content>
      <div v-if="editMode">
        <div class="p-4 bg-gray-100 rounded-lg mb-2">
          <div class="text-xl font-bold pb-4">Folder Details</div>
          <div class="mb-4">
            <ion-input
              class="block w-full p-2"
              label="Title"
              label-placement="floating"
              placeholder="Enter Title"
              v-model="dataObj.title"
            ></ion-input>
          </div>
          <div class="mb-4">
            <ion-textarea
              autoGrow
              label="Description"
              label-placement="floating"
              placeholder="Enter Description"
              rows="10"
              v-model="dataObj.description"
            ></ion-textarea>
          </div>
        </div>
        <!-- Buttons Section -->
        <div class="flex justify-between mt-4">
          <ion-button
            fill="solid"
            color="danger"
            class="flex-1 mx-1"
            @click="cancelEdit()"
            >Cancel</ion-button
          >
          <ion-button
            v-if="!$route.query.id"
            fill="solid"
            color="secondary"
            class="flex-1 mx-1"
            @click="saveFolder()"
            >Submit</ion-button
          >
          <ion-button
            v-else
            fill="solid"
            color="secondary"
            class="flex-1 mx-1"
            @click="editFolder()"
            >Save</ion-button
          >
        </div>
      </div>

      <div v-else>
        <div class="p-4 bg-gray-100 rounded-lg mb-2">
          <div class="text-xl font-bold pb-4">
            Folder Details
            <div class="float-right" v-if="$route.query.id">
              <ion-icon
                slot="icon-only"
                :icon="createOutline"
                color="secondary"
                @click="editMode = true"
              ></ion-icon>
            </div>
          </div>
          <div class="pt-3">
            <div class="font-bold">Title</div>
            <div>{{ dataObj.title }}</div>
          </div>
          <div>
            <div class="font-bold">Description</div>
            <div>{{ dataObj.description }}</div>
          </div>
        </div>

        <div class="p-4 bg-gray-100 rounded-lg mb-2">
          <div class="text-xl font-bold pb-2">
            Attachments
            <div class="float-right">
              <ion-icon
                :icon="addCircleOutline"
                color="secondary"
                class="trash-icon"
                id="open-attachments-modal"
              />
            </div>
          </div>
          <div
            v-if="dataObj.links && dataObj.attachments.length > 0"
            class="py-4"
          >
            <div
              v-for="(attachment, index) in dataObj.attachments"
              :key="index"
              class="mb-2 p-2 rounded"
            >
              <div class="flex justify-between items-center">
                <a
                  @click="downloadAttachment(attachment)"
                  target="_blank"
                  class="truncate text-blue-600 hover:text-blue-800 hover:underline flex-1"
                  >{{ attachment.name }}</a
                >
                <ion-icon
                  :icon="trashOutline"
                  color="danger"
                  class="trash-icon cursor-pointer ml-2"
                  @click="removeAttachment(index)"
                />
              </div>
            </div>
          </div>
          <div class="text-gray-500 italic text-center py-4 text-sm" v-else>
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
                id="open-links-modal"
              />
            </div>
          </div>
          <div v-if="dataObj.links && dataObj.links.length > 0" class="py-4">
            <div
              v-for="(link, index) in dataObj.links"
              :key="index"
              class="mb-2 p-2 rounded"
            >
              <div class="flex justify-between items-center">
                <a
                  :href="link"
                  target="_blank"
                  class="truncate text-blue-600 hover:text-blue-800 hover:underline flex-1"
                  @click="openLink(link)"
                  >{{ link }}</a
                >
                <ion-icon
                  :icon="trashOutline"
                  color="danger"
                  class="trash-icon cursor-pointer ml-2"
                  @click="removeLink(index)"
                />
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500 italic text-center py-4 text-sm">
            No existing list
          </div>
        </div>

        <div class="p-4 bg-gray-100 rounded-lg mb-2">
          <div class="text-xl font-bold pb-2">
            Collaborators
            <div class="float-right">
              <ion-icon
                :icon="addCircleOutline"
                color="secondary"
                class="trash-icon"
                id="open-collaborators-modal"
              />
            </div>
          </div>
          <div
            v-if="dataObj.collaborators && dataObj.collaborators.length > 0"
            class="py-4"
          >
            <div
              v-for="(email, index) in dataObj.collaborators"
              :key="index"
              class="mb-2 p-2 rounded"
            >
              <div class="flex justify-between items-center">
                <div class="truncate flex-1">{{ email }}</div>
                <ion-icon
                  :icon="trashOutline"
                  color="danger"
                  class="trash-icon cursor-pointer"
                  @click="removeCollaborator(index)"
                />
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500 italic text-center py-4 text-sm">
            No existing list
          </div>
        </div>

        <!-- Attachments Modal -->
        <ion-modal
          trigger="open-attachments-modal"
          class="custom-modal"
          ref="attachmentsModal"
        >
          <div class="flex justify-center items-center h-full">
            <div class="custom-card">
              <div class="font-bold text-2xl pb-4">Attachments</div>
              <div class="mb-4">
                <div class="flex items-center justify-center w-full">
                  <label
                    for="file-upload"
                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div
                      class="flex flex-col items-center justify-center pt-5 pb-6"
                    >
                      <ion-icon
                        :icon="addCircleOutline"
                        class="text-3xl text-gray-500 mb-2"
                      ></ion-icon>
                      <p class="mb-2 text-sm text-gray-500">Click to upload</p>
                      <p class="text-xs text-gray-500">
                        Multiple files allowed
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      class="hidden"
                      multiple
                      @change="handleFileUpload"
                    />
                  </label>
                </div>
              </div>
              <div class="mb-4 max-h-60 overflow-y-auto">
                <div
                  v-for="(file, index) in attachments"
                  :key="index"
                  class="last:border-b-none border-gray-300 mb-2 p-3"
                >
                  <div class="flex justify-between items-center">
                    <div class="truncate">{{ file.name }}</div>
                    <div class="flex space-x-2">
                      <ion-icon
                        :icon="trashOutline"
                        color="danger"
                        class="trash-icon cursor-pointer"
                        @click="removeAttachment(index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-2 gap-2 pt-4">
                <ion-button
                  fill="solid"
                  color="danger"
                  class="flex-1"
                  @click="closeAttachmentsModal"
                  >Cancel</ion-button
                >
                <ion-button
                  fill="solid"
                  color="secondary"
                  class="flex-1"
                  @click="saveAttachments"
                  >Submit</ion-button
                >
              </div>
            </div>
          </div>
        </ion-modal>

        <!-- Links Modal -->
        <ion-modal
          trigger="open-links-modal"
          class="custom-modal"
          ref="linksModal"
        >
          <div class="flex justify-center items-center h-full">
            <div class="custom-card">
              <div class="font-bold text-2xl pb-4">Links</div>
              <div class="mb-4">
                <div class="flex items-center space-x-2 mb-4">
                  <ion-input
                    class="flex-1"
                    placeholder="Enter link URL"
                    v-model="newLink"
                  ></ion-input>
                </div>
              </div>
              <div class="flex justify-between mt-2 gap-2 pt-4">
                <ion-button
                  fill="solid"
                  color="danger"
                  class="flex-1"
                  @click="closeLinksModal"
                  >Cancel</ion-button
                >
                <ion-button
                  fill="solid"
                  color="secondary"
                  class="flex-1"
                  @click="saveLinks"
                  >Submit</ion-button
                >
              </div>
            </div>
          </div>
        </ion-modal>

        <!-- Collaborators Modal -->
        <ion-modal
          trigger="open-collaborators-modal"
          class="custom-modal"
          ref="collaboratorsModal"
        >
          <div class="flex justify-center items-center h-full">
            <div class="custom-card">
              <div class="font-bold text-2xl pb-4">Collaborators</div>
              <div class="mb-4">
                <div class="flex items-center space-x-2 mb-4">
                  <ion-input
                    class="flex-1"
                    type="email"
                    placeholder="Enter email address"
                    v-model="newEmail"
                  ></ion-input>
                </div>
              </div>
              <div class="flex justify-between mt-2 gap-2 pt-4">
                <ion-button
                  fill="solid"
                  color="danger"
                  class="flex-1"
                  @click="closeCollaboratorsModal"
                  >Cancel</ion-button
                >
                <ion-button
                  fill="solid"
                  color="secondary"
                  class="flex-1"
                  @click="saveCollaborators"
                  >Submit</ion-button
                >
              </div>
            </div>
          </div>
        </ion-modal>

        <div class="flex justify-between mt-2 gap-2">
          <ion-button
            fill="solid"
            color="danger"
            class="flex-1"
            @click="presentAlert"
            >Delete Folder</ion-button
          >
        </div>

        <ion-alert
          :is-open="showAlert"
          header="Delete Folder"
          sub-header="This action cannot be undone"
          message="Are you sure you want to delete this folder permanently?"
          :buttons="[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: () => deleteFolder(),
            },
          ]"
          @didDismiss="showAlert = false"
        ></ion-alert>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import db from "@/firebase/init.js";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import BaseLayout from "@/components/templates/BaseLayout.vue";
import { storage } from "@/firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  IonProgressBar,
  IonButtons,
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
import {
  trashOutline,
  createOutline,
  addCircleOutline,
  arrowBackOutline,
} from "ionicons/icons";

export default defineComponent({
  components: {
    IonProgressBar,
    IonButtons,
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

  created() {
    this.attachments = [];
    this.userData = JSON.parse(localStorage.getItem("user"));
    if (this.$route.query.id) {
      this.editMode = false;
      this.getDetails();
    } else {
      this.editMode = true;
      this.dataObj = {
        title: "",
        description: "",
        attachments: [],
        links: [],
        collaborators: [],
      };
    }
  },
  data() {
    return {
      arrowBackOutline,
      isLoading: false,
      trashOutline,
      createOutline,
      addCircleOutline,
      editMode: false,
      dataObj: {
        title: "",
        description: "",
        attachments: [],
        links: [],
        collaborators: [],
      },
      attachments: [],
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
      modalRefs: {
        attachments: null,
        links: null,
        collaborators: null,
      },
      attachmentsModal: null,
      linksModal: null,
      collaboratorsModal: null,
      newLink: "",
      newEmail: "",
      showAlert: false,
    };
  },
  methods: {
    async getDetails() {
      const auth = getAuth();
      try {
        this.isLoading = true;
        const docId = this.$route.query.id;
        const docRef = doc(db, "folders", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.dataObj = {
            ...docSnap.data(),
            id: docSnap.id,
          };
          console.log(this.dataObj);
        } else {
          console.log("No such folder!");
          this.$toast("Folder not found!", 3000, "danger");
        }
      } catch (error) {
        console.error("Error getting folder details:", error);
        this.$toast("Error retrieving folder!", 3000, "danger");
      } finally {
        this.isLoading = false;
      }
    },

    async saveFolder() {
      try {
        this.isLoading = true;
        const auth = getAuth();
        const user = JSON.parse(localStorage.getItem("user"));

        const folderData = {
          title: this.dataObj.title,
          description: this.dataObj.description,
          userId: user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
          attachments: [],
          links: [],
          collaborators: [],
        };

        if (this.$route.query.id) {
          // Update existing folder
          const docRef = doc(db, "folders", this.$route.query.id);
          await updateDoc(docRef, folderData);
          this.$toast("Folder updated successfully!", 3000, "success");
        } else {
          // Create new folder
          const colRef = collection(db, "folders");
          await addDoc(colRef, folderData);
          this.$toast("Folder created successfully!", 3000, "success");
        }

        this.$router.push("/folder");
      } catch (error) {
        console.error("Error saving folder:", error);
        this.$toast("Error saving folder!", 3000, "danger");
      } finally {
        this.isLoading = false;
      }
    },

    async deleteFolder() {
      try {
        this.isLoading = true;
        const docId = this.$route.query.id;
        if (!docId) {
          this.$toast("No folder ID provided!", 3000, "danger");
          return;
        }

        const docRef = doc(db, "folders", docId);
        await deleteDoc(docRef);

        this.$toast("Folder deleted successfully!", 3000, "success");
        this.$router.push("/folder");
      } catch (error) {
        console.error("Error deleting folder:", error);
        this.$toast("Error deleting folder!", 3000, "danger");
      } finally {
        this.isLoading = false;
      }
    },

    async editFolder() {
      try {
        const docId = this.$route.query.id; // Get document ID from query params
        const docRef = doc(db, "folders", docId); // Reference to the document

        await updateDoc(docRef, this.dataObj); // Update document with new data

        this.$toast("Successfully Updated!", 3000, "success");
        this.editMode = false;
        this.getDetails();
      } catch (error) {
        this.$toast("Unsuccessfully Updated!", 3000, "danger");
      }
    },

    cancelEdit() {
      this.editMode = false;
      if (this.$route.query.id) {
        this.getDetails();
      } else {
        this.dataObj.title = "";
        this.dataObj.description = "";
      }
    },

    handleFileUpload(event) {
      const files = event.target.files;
      if (!files) return;

      console.log(files);

      Array.from(files).forEach((file) => {
        this.attachments.push(file);
      });

      // Reset the input
      event.target.value = "";
    },
    

    removeAttachment(index) {
      this.dataObj.attachments.splice(index, 1);
    },

    closeAttachmentsModal() {
      if (this.$refs.attachmentsModal) {
        this.$refs.attachmentsModal.$el.dismiss();
      }
    },

    async saveAttachments() {
      getAuth();
      try {
        if (!this.attachments.length) return;

        // Store uploaded file URLs

        // Loop through each file and upload it
        for (const file of this.attachments) {
          const fileRef = storageRef(storage, "uploads/" + file.name);
          await uploadBytes(fileRef, file);

          // Get the download URL of the uploaded file
          const downloadURL = await getDownloadURL(fileRef);

          // Save the file name and URL to Firestore under 'attachments'
          await this.saveFileToFirestore(file.name, downloadURL);
        }

        // Clear selected files and close modal
        this.attachments = [];
        this.getDetails();
        this.closeAttachmentsModal();
        this.$toast("Attachments saved successfully!", 3000, "success");
      } catch (error) {
        console.error("Error saving attachments:", error);
        this.$toast("Error saving attachments!", 3000, "danger");
      }
    },

  async removeAttachment(index) {
      try {
        if (!this.$route.query.id) {
          this.$toast("No folder ID found!", 3000, "danger");
          return;
        }

        // Remove from local array
        this.dataObj.attachments.splice(index, 1);

        // Update in database
        const docRef = doc(db, "folders", this.$route.query.id);
        await updateDoc(docRef, {
          attachments: this.dataObj.attachments,
          updatedAt: new Date(),
        });

        this.$toast("Attachment deleted successfully!", 3000, "success");
      } catch (error) {
        console.error("Error deleting attachment:", error);
        this.$toast("Error deleting attachment!", 3000, "danger");
      }
    },
    // Save file details (name and URL) to Firestore in 'folders' collection
    async saveFileToFirestore(fileName, fileUrl) {
      const folderRef = doc(db, "folders", this.$route.query.id); // Reference to folder document
      await setDoc(
        folderRef,
        {
          attachments: arrayUnion({
            name: fileName,
            url: fileUrl,
          }),
        },
        { merge: true } // Merge ensures existing data is preserved
      );
    },
    downloadAttachment(attachment) {
      window.open(attachment.url, "_blank");
    },

    closeLinksModal() {
      if (this.$refs.linksModal) {
        this.$refs.linksModal.$el.dismiss();
      }
    },

    closeCollaboratorsModal() {
      if (this.$refs.collaboratorsModal) {
        this.$refs.collaboratorsModal.$el.dismiss();
      }
    },

    addLink() {
      if (this.newLink && !this.dataObj.links.includes(this.newLink)) {
        this.dataObj.links.push(this.newLink);
        this.newLink = "";
      }
    },

    async removeLink(index) {
      try {
        if (!this.$route.query.id) {
          this.$toast("No folder ID found!", 3000, "danger");
          return;
        }

        // Remove from local array
        this.dataObj.links.splice(index, 1);

        // Update in database
        const docRef = doc(db, "folders", this.$route.query.id);
        await updateDoc(docRef, {
          links: this.dataObj.links,
          updatedAt: new Date(),
        });

        this.$toast("Link deleted successfully!", 3000, "success");
      } catch (error) {
        console.error("Error deleting link:", error);
        this.$toast("Error deleting link!", 3000, "danger");
      }
    },

    async saveLinks() {
      try {
        if (!this.$route.query.id) {
          this.$toast("No folder ID found!", 3000, "danger");
          return;
        }

        const docRef = doc(db, "folders", this.$route.query.id);
        await updateDoc(docRef, {
          links: [...this.dataObj.links, this.newLink],
          updatedAt: new Date(),
        });
        this.getDetails();
        this.closeLinksModal();
        this.$toast("Links saved successfully!", 3000, "success");
      } catch (error) {
        console.error("Error saving links:", error);
        this.$toast("Error saving links!", 3000, "danger");
      }
    },

    openLink(link) {
      // Add http:// if not present
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "http://" + link;
      }
      window.open(link, "_blank");
    },

    addCollaborator() {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.newEmail || !emailRegex.test(this.newEmail)) {
        this.$toast("Please enter a valid email address!", 3000, "danger");
        return;
      }

      if (!this.dataObj.collaborators.includes(this.newEmail)) {
        this.dataObj.collaborators.push(this.newEmail);
        this.newEmail = "";
      } else {
        this.$toast("Email already added!", 3000, "warning");
      }
    },

    async removeCollaborator(index) {
      try {
        if (!this.$route.query.id) {
          this.$toast("No folder ID found!", 3000, "danger");
          return;
        }

        // Remove from local array
        this.dataObj.collaborators.splice(index, 1);

        // Update in database
        const docRef = doc(db, "folders", this.$route.query.id);
        await updateDoc(docRef, {
          collaborators: this.dataObj.collaborators,
          updatedAt: new Date(),
        });

        this.$toast("Collaborator removed successfully!", 3000, "success");
      } catch (error) {
        console.error("Error removing collaborator:", error);
        this.$toast("Error removing collaborator!", 3000, "danger");
      }
    },

    async saveCollaborators() {
      try {
        if (!this.$route.query.id) {
          this.$toast("No folder ID found!", 3000, "danger");
          return;
        }

        const docRef = doc(db, "folders", this.$route.query.id);
        await updateDoc(docRef, {
          collaborators: [...this.dataObj.collaborators, this.newEmail],
          updatedAt: new Date(),
        });

        this.closeCollaboratorsModal();
        this.$toast("Collaborators saved successfully!", 3000, "success");
        this.getDetails();
      } catch (error) {
        console.error("Error saving collaborators:", error);
        this.$toast("Error saving collaborators!", 3000, "danger");
      }
    },

    presentAlert() {
      this.showAlert = true;
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
  color: var(--ion-color-danger);
  font-size: 20px;
  cursor: pointer;
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
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.max-h-60 {
  max-height: 15rem;
}

.overflow-y-auto {
  overflow-y: auto;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
