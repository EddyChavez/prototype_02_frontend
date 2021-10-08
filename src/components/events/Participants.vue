<template>
  <base-material-card>
    <template v-slot:heading>
      <div class="display-2 font-weight-light">
        Agrega participantes a tu evento
      </div>
    </template>

    <template v-slot:progress>
      <v-progress-linear
        absolute
        color="blue lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-tabs v-model="tab">
          <v-tab>Usuarios</v-tab>
          <v-tab>Grupos</v-tab>
          <v-tab>Emails</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-col cols="12">
              <v-autocomplete
                v-model="model_users"
                :items="items_users"
                :filter="customFilter"
                :search-input.sync="search_users"
                hide-details
                hide-selected
                item-text="email"
                label="Buscar participantes"
                solo
                prepend-icon="mdi-account-circle-outline"
                @change="reset_users"
              >
                <template v-slot:item="{ item }">
                  <v-list-item-avatar>
                    <v-img
                      v-if="item.avatar"
                      :alt="`${item.get_full_name} avatar`"
                      :src="item.avatar"
                    ></v-img>
                    <v-avatar color="indigo" v-else>
                      <span
                        v-if="item.get_initials"
                        class="white--text text-h5"
                        >{{ item.get_initials }}</span
                      >
                      <v-img v-else src="@/assets/user_group.png"></v-img>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.get_full_name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="item.email"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
          </v-tab-item>
          <v-tab-item>
            <v-col cols="12">
              <v-autocomplete
                v-model="model_groups"
                :items="items_groups"
                :search-input.sync="search_groups"
                hide-details
                hide-selected
                item-text="name"
                item-value="id"
                label="Buscar Grupos"
                solo
                prepend-icon="mdi-account-group"
                @change="reset_groups"
              >
                <template v-slot:item="{ item }">
                  <v-list-item-avatar>
                    <v-img
                      v-if="item.avatar"
                      :alt="`${item.name} avatar`"
                      :src="item.avatar"
                    ></v-img>
                    <img v-else alt="user" src="@/assets/groups.jpg" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.sum_members }}
                      participantes
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
          </v-tab-item>
          <v-tab-item>
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="email"
                  append-outer-icon="mdi-plus-circle"
                  prepend-icon="mdi-email-open-multiple-outline"
                  class=" purple-input"
                  clear-icon="mdi-close-circle"
                  clearable
                  label="Email"
                  type="text"
                  @click:append-outer="sendMessage"
                  @click:clear="clearMessage"
                  :rules="emailRules"
                  @keyup.enter.native="sendMessage"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h4>
          <strong>Participantes ({{ count_participants }})</strong>
        </h4>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="members" :search="search">
        <template v-slot:item.avatar="{ item }">
          <v-avatar left v-if="item.avatar">
            <v-img :src="item.avatar"></v-img>
          </v-avatar>
          <v-avatar color="indigo" v-else>
            <span v-if="item.get_initials" class="white--text text-h5">{{
              item.get_initials
            }}</span>
            <v-img v-else src="@/assets/user_group.png"></v-img>
          </v-avatar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="remove(item)">
            mdi-close
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-col cols="12" md="12" class="text-center">
      <div class="text-center flex">
        <v-btn
          :loading="loading"
          rounded
          color="blue"
          dark
          @click="dialogDelete = true"
        >
          <v-icon>
            mdi-share-variant-outline
          </v-icon>
          Compartir
        </v-btn>
      </div>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-container>
            <v-card-title>
              <strong
                >Se enviarán invitaciones por email para notificar.</strong
              >
            </v-card-title>

            <v-card-text>
              <v-row justify="center">
                <v-col cols="12">
                  <v-spacer></v-spacer>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title
                        >* Ahora el evento estará disponible, solo para los
                        Participantes.</v-list-item-title
                      >
                      <v-list-item-title
                        >* Podrán aceptar o rechazar el
                        evento.</v-list-item-title
                      >
                      <v-list-item-title
                        >* Generar sus pedidos. evento.</v-list-item-title
                      >
                      <v-list-item-title
                        >* cambiara Estatus:
                        <v-chip
                          class="ma-2"
                          color="orange"
                          label
                          text-color="white"
                          x-small
                        >
                          EN PROCESO
                        </v-chip></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <br />
                <v-spacer></v-spacer>
                <strong>({{ count_participants }}) Emails agregados</strong>.
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="blue darken-1" text @click="dialogDelete = false"
                >Cancelar</v-btn
              >
              <v-btn
                :loading="loading"
                rounded
                color="blue"
                dark
                @click="sendInvitations"
              >
                Enviar
                <v-icon right>
                  mdi-send
                </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
    </v-col>
  </base-material-card>
</template>

<script>
import apiGroups from "@/api/groups/";
import Participants from "@/components/events/Participants.vue";

export default {
  name: "Participants",

  data() {
    return {
      kword: "",
      loading: false,
      groups: [],
      members: [],
      search: "",
      tab: null,
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "avatar"
        },
        { text: "Nombre", value: "get_full_name" },
        { text: "Email", value: "email" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      items_users: [],
      model_users: null,
      search_users: null,
      items_groups: [],
      model_groups: null,
      search_groups: null,
      count_participants: 0,
      email: "",
      emailRules: [
        v => !!v || "E-mail es requerido",
        v => /.+@.+\..+/.test(v) || "E-mail debe ser valido"
      ],
      valid: false,
      iconIndex: 0,
      dialogDelete: false,
      redirect: false
    };
  },
  computed: {
    idEvent() {
      return this.$route.params.id;
    }
  },
  watch: {
    search_users(val) {
      if (this.items_users.length > 0) return;

      apiGroups.getUsers().then(response => {
        this.items_users = response.data;
      });
    },
    search_groups(val) {
      if (this.items_groups.length > 0) return;

      apiGroups.getGroups(val).then(response => {
        this.items_groups = response.data;
      });
    }
  },

  methods: {
    sendMessage() {
      if (this.$refs.form.validate()) {
        let item = {
          avatar: null,
          email: this.email,
          get_full_name: "",
          get_initials: ""
          //id: 0
        };

        this.addMembers(item);

        this.clearMessage();
        this.$refs.form.reset();
      }
    },
    clearMessage() {
      this.email = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.email.toLowerCase();
      const textTwo = item.get_full_name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    reset_users() {
      let index = this.items_users.findIndex(
        item => item.email === this.model_users
      );
      this.addMembers(this.items_users[index]);

      this.$nextTick(() => {
        this.model_users = null;
      });
    },
    reset_groups(idGroup) {
      apiGroups
        .getMembers(idGroup)
        .then(response => {
           /* this.items_users= response.data[0].members; */

           response.data[0].members.forEach(item => {
            this.addMembers(item.user);
          });

          this.count_participants = this.members.length;
        })
        .catch(error => {
          console.log(error);
        });

      this.$nextTick(() => {
        this.model_groups = null;
      });
    },
    addMembers(user) {
      let index = this.members.findIndex(item => item.email === user.email);

      if (index == -1) {
        this.members.push(user);
        this.count_participants = this.members.length;
      } else {
        let notification = {
          snackbar: true,
          direction: "top center",
          important: "Ya agregado: ",
          msg: user.email,
          color: "info"
        };

        this.$store.dispatch("showNotification", notification);
      }
    },
    SearchGroups(kword) {
      apiGroups.getGroups(kword).then(response => {
        this.groups = response.data;
      });
    },
    remove(item) {
      const index = this.members.indexOf(item);
      if (index >= 0) {
        this.members.splice(index, 1);

        this.count_participants = this.members.length;
      }
    },
    sendInvitations() {
      let formData = new FormData();

      this.loading = true;
      setTimeout(() => (this.loading = false), 4000);

      formData.append("idEvent", this.idEvent);
      this.members.forEach(item => {
        formData.append("listEmails", item.email);
      });

      apiGroups
        .sendEmail(formData)
        .then(response => {
          let notification = {
            snackbar: true,
            direction: "top center",
            msg: response.data.message,
            important: "",
            color: "success"
          };
          this.$store.dispatch("showNotification", notification);

          this.$router.push({
            name: "Eventos"
          });

          this.dialogDelete = false;
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
        });
    }
  }
};
</script>

<style></style>
