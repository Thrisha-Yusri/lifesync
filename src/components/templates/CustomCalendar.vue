<template>
<div >
  <Qalendar :events="events" :config="config" />
</div>

</template>

<script>
import { Qalendar } from "qalendar";
import "qalendar/dist/style.css";


export default {
  components: {
    Qalendar,
  },
  props: {
    events: {
      type: Array,
      default: [{id:"", title:""}],
    },
  },

  data() {
    return {

      config: {
        defaultMode: "month", 
        week: {
          startDay: "monday",
        },
        isDark: false,
      },

      

    };
  },
};
</script>
