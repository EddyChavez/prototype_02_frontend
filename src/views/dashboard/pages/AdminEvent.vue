<template>
  <v-container fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <participants v-if="showUsers" />
        <edit-event v-else />
      </v-col>
      <v-col cols="12" md="4">
        <card-event />

        <v-card-text>
          <div class="text-center flex">
            <v-btn rounded color="blue" dark @click="addParticipants()">
              {{ button_text }}
            </v-btn>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
    <v-dialog v-model="aviso" max-width="300px">
      <v-card elevation="24">
        <v-card-title class="text-h5">Aviso</v-card-title>
        <v-card-text align="center" justify="center"  class="red--text"
          >¡No puedes realizar esta acción!</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <!-- <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                > -->
          <v-btn color="blue darken-1" text @click="closeAviso()">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CardEvent from "@/components/events/CardEvent.vue";
import EditEvent from "@/components/events/EditEvent.vue";
import Participants from "@/components/events/Participants.vue";
import apiEvents from "@/api/events/";

export default {
  name: "AdminEvent",
  components: {
    CardEvent,
    EditEvent,
    Participants,
  },
  data() {
    return {
      aviso:false,
      showUsers: false,
      button_text: "Agregar Participantes",
    };
  },
  computed: {
    idEvent() {
      return this.$route.params.id;
    },
    getUser() {
      return this.$store.getters.getUser.id;
    },
  },
  /*  mounted() {
    let flag = false;
    apiEvents
      .validate_permission(this.idEvent, 1)
      .then((response) => {
        debugger;
        flag = response.data.data;
        if (flag === false) {
          debugger;
          console.log("No tienes permiso para editar este evento!");
          this.$router.push({
            name: "Mis Eventos",
          });
        }
      })
      .catch((error) => {
        flag = false;
      });
  }, */
  beforeMount() {
    let flag = false;
    apiEvents
      .validate_permission(this.idEvent, this.getUser)
      .then((response) => {
        flag = response.data.data;
        if (flag === false) {
          //console.log("No tienes permiso para editar este evento!");
          this.aviso = true;          
        }
      })
      .catch((error) => {
        flag = false;
      });
    /* console.log("preparando...");
   console.log(this.idEvent);
   console.log(this.getUser);
   let flag = false;
   apiEvents
     .validate_permission(this.idEvent, 1)
     .then(response => {
       flag = response.data;
     })
     .catch(error => {
       flag = false;
     });
   if (flag === false) {
     console.log("No tienes permiso para editar este evento!");
     this.$router.push({
       name: "Mis Eventos"
     });
   } */
  },
  methods: {
    addParticipants() {
      this.showUsers = !this.showUsers;

      this.button_text = this.showUsers
        ? "Editar Detalle"
        : "Agregar Participantes";
    },    
    closeAviso() {
      this.aviso = false;
      this.$router.push({
            name: "Mis Eventos",
          });
    },
  },
};
</script>

<style></style>
