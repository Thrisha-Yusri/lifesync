<template>
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
</script>
