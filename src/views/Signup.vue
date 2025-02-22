<template>
  <ion-page>
    <!-- Main Content -->
    <ion-content :fullscreen="true" class="p-0 flex flex-col">
      <!-- Top Section: Titles & Gradient Background -->
      <div class="h-1/2 w-full bg-gradient-to-b from-blue-500 to-blue-300 flex flex-col items-center justify-center text-black px-6">
        <h1 class="text-3xl font-bold font-sans">Hi there!</h1>
        <p class="text-md mt-2 text-center font-bold font-mono">Welcome to Life Sync: All-in-One Organizer!</p>
      </div>

      <!-- Bottom Section: White Background with Sign-Up Form -->
      <div class="h-1/2 w-full bg-white flex flex-col items-center px-6">
        <!-- Form Container -->
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-6">
          <ion-list class="mt-4">
            <ion-item>
              <ion-input label="Full Name"  placeholder="Enter your name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-input label="Email" type="email" placeholder="email@domain.com"></ion-input>
            </ion-item>

            <ion-item>
              <ion-input label="Password" type="password" placeholder="********"></ion-input>
            </ion-item>

            <ion-button expand="full" class="mt-4" shape="round">Sign Up</ion-button>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
IonPage,
IonContent,
IonList,
IonItem,
IonInput,
IonButton
} from "@ionic/vue";
</script>
