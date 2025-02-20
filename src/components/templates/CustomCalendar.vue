<template>
  <Qalendar :events="events" :config="config" />
</template>

<script>
import { Qalendar } from "qalendar";
import "qalendar/dist/style.css";

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      events: [
        // ...
        {
          title: "Advanced algebra",
          with: "Chandler Bing",
          time: { start: "2025-02-16 12:05", end: "2025-02-16 13:35" },
          color: "yellow",
          isEditable: true,
          id: "753944708f0f",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
        },
        {
          title: "Ralph on holiday",
          with: "Rachel Greene",
          time: { start: "2025-02-10", end: "2025-02-22" },
          color: "green",
          isEditable: true,
          id: "5602b6f589fc",
        },
        // ...
      ],
      config: {
        // see configuration section
      },
    };
  },
};
</script>
