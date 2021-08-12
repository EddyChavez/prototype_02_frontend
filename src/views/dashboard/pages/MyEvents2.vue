<template>
  <v-container>
    <my-list-events />
  </v-container>
</template>

<script>
import MyListEvents from "@/components/events/MyListEvents.vue";

export default {
  name: "MyEvents",
  components: {
    MyListEvents
  }
};
</script>

<style></style>
