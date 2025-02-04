<template>
  <BaseLayout title="Playground">
    <template #content></template>
  </BaseLayout>
</template>
<script>
import BaseLayout from "@/components/templates/BaseLayout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    BaseLayout,
  },
});
</script>
