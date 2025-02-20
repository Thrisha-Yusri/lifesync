<template>
  <BaseLayout>
    <template #header>
      <div class="h-[40px]">Logo</div>
    </template>
    <template #content>
      <!-- Add Details Card -->
      <CustomCard title="Calendar">
        <template #buttons>
          <ion-icon :icon="add" size="large" color="secondary"></ion-icon>
        </template>
        <template #content>
          <CustomCalendar />
        </template>
      </CustomCard>
      <div class="py-6">
        <div class="flex justify-between items-center pr-2 pb-4">
          <div class="pb-3 font-bold">Folders</div>
          <ion-button color="secondary">
            <div class="flex space-x-2 px-2">
              <div><ion-icon slot="icon-only" :icon="add"></ion-icon></div>
              <div class="text-xs">Add Folder</div>
            </div>
          </ion-button>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <CustomCard
            cp-6
            class="w-[100px] h-[130px]"
            v-for="(item, index) in list"
            :key="index"
          >
            <template #content>{{ item }}</template></CustomCard
          >
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
// import packages
import BaseLayout from "@/components/templates/BaseLayout.vue";
import CustomCard from "@/components/templates/CustomCard.vue";
import { defineComponent } from "vue";
import { IonButton, IonIcon } from "@ionic/vue";
import { logoIonic, home, add } from "ionicons/icons";
import CustomCalendar from "@/components/templates/CustomCalendar.vue";

export default defineComponent({
  name: "Home",
  components: {
    BaseLayout,
    CustomCard,
    IonIcon,
    IonButton,
    CustomCalendar,
  },
  data() {
    return {
      logoIonic,
      home,
      add,
      list: [1, 2, 3],
    };
  },
});
</script>
