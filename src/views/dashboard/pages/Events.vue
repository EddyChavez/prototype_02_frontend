<template>
  <v-container>
    <list-events />

    <!-- <detail-event /> -->
  </v-container>
</template>

<script>
import ListEvents from "@/components/events/ListEvents.vue";
//import DetailEvent from "@/components/events/DetailEvent.vue";

export default {
  name: "Events",
  components: {
    ListEvents
    // DetailEvent
  }
};
</script>

<style></style>
