<template>
  <v-container id="upgrade" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="9">
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Tutorial
            </div>

            <div class="subtitle-1 font-weight-light">
              Como funciona la app?
            </div>
          </template>

          <v-container class="py-0">
            <v-col cols="12" class="text-center">
              <youtube :video-id="videoId"></youtube>
            </v-col>
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Tutorial",
  // player-width="200" player-height="120"

  data() {
    return {
      loading: false,
      videoId: "",
      startTime: ""
    };
  },
  mounted() {
    this.loadVideo("https://www.youtube.com/watch?v=CD-E-LDc384");//video
  },
  methods: {
    loadVideo(url) {
      this.videoId = this.$youtube.getIdFromURL(url);
      this.startTime = this.$youtube.getTimeFromURL(url);
    }
  }
};
</script>

<style lang="sass">
#upgrade
  .v-data-table
    th, td
      border: none !important
</style>
