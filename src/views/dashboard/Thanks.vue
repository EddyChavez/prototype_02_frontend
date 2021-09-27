<template>
  <v-container id="upgrade" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="display-2 font-weight-light" align="center">
              ¡ Gracias por tu donacion !
              <div class="subtitle-1">{{ EmailUser }}</div>
            </div>
          </template>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="8">
                <div>
                  <p class="text-center">
                      Tus ideas ayudan a ser una app mas completa
                  </p>
                </div>
              </v-col>
            </v-row>           
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiGroups from "@/api/groups/";

export default {
  name: "Thank",
  components: {
    
  },
  data() {
    return {
      //Email: this.EmailUser
    };
  },
  computed: {
    EmailUser() {
      return this.$route.params.email;
    },
  },
  mounted() {
    let formData = new FormData();

    formData.append("listEmails", this.EmailUser);
  /* this.list_users.forEach(item => {
    formData.append("listEmails", item.email);
  }); */
    console.log(this.EmailUser)
    apiGroups
        .sendEmailThank(formData)
        .then(() => {      
            window.location.href = "http://localhost:8080"
            /* this.$router.push('/'); */
            /* this.$router.push({
                name: "Home"
            }); */
        })
        .catch(error => {
            let notification = {
            snackbar: true,
            direction: "top center",
            msg: error,
            important: "",
            color: "error"
            };
            this.$store.dispatch("showNotification", notification);
            this.dialogDelete = false;
            this.$router.push({
                name: "/"
            });
        });
  },
  methods: {
  }
};
</script>
