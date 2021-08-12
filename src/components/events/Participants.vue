<template>
  <base-material-card :loading="isUpdating">
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
                      <span class="white--text text-h5">{{
                        item.get_initials
                      }}</span>
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
                  v-on:keyup.enter.prevent="sendMessage"
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

    <!-- <v-row justify="center">
      <v-col cols="12" md="6"> </v-col>
      <v-col cols="12" md="6">
        <v-chip
          v-for="group in members"
          :key="group.name"
          close
          @click:close="removeItem(group)"
        >
          <v-avatar left v-if="group.avatar">
            <v-img :src="group.avatar"></v-img>
          </v-avatar>
          <v-avatar color="red" left v-else>
            <span class="white--text text-h5">{{ group.name }}</span>
          </v-avatar>
          {{ group.name }}
        </v-chip>

        <v-list-item v-for="group in groups" :key="group.id">
          <v-list-item-avatar>
            <v-img
              v-if="group.avatar"
              :alt="`${group.name} avatar`"
              :src="group.avatar"
            ></v-img>
            <v-avatar color="red" v-else>
              <span class="white--text text-h5">{{ user.sum_members }}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content @click="addMembers(group)">
            <v-list-item-title v-text="group.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="6" class="text-center"> </v-col>
    </v-row> -->

    <!-- <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="friends"
              :disabled="isUpdating"
              :items="people"
              filled
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.group"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <div class="text-center flex">
            <v-btn rounded color="blue" dark>
              <v-icon>
                mdi-share-variant-outline
              </v-icon>
              Compartir
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-form> -->
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
          <v-avatar size="56">
            <img v-if="item.avatar" alt="user" :src="item.avatar" />
            <img v-else alt="user" src="@/assets/groups.jpg" />
            <!-- <span v-if="" class="white--text text-h5">{{ item.get_initials }}</span> -->
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
        <v-btn rounded color="blue" dark @click="dialogDelete = true">
          <v-icon>
            mdi-share-variant-outline
          </v-icon>
          Compartir
        </v-btn>
      </div>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card class="mx-auto">
          <v-card-title>
            Se enviarán emails para notificar
          </v-card-title>

          <v-row justify="center">
            <v-card-text>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    >Ahora el evento estará disponible, solo para los
                    Participantes.</v-list-item-title
                  >
                  <v-list-item-title
                    >Podrán aceptar o rechazar el evento.</v-list-item-title
                  >
                  <v-list-item-title
                    >Generar sus pedidos, e interactuar con el
                    evento.</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <strong>({{ count_participants }}) Emails agregados</strong>.
            </v-card-text>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text @click="dialogDelete = false"
              >Cancelar</v-btn
            >
            <v-btn color="blue" dark @click="sendInvitations">
              Enviar
              <v-icon right>
                mdi-send
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <alerts />
  </base-material-card>
</template>

<script>
import apiGroups from "@/api/groups/";
import Participants from "@/components/events/Participants.vue";
import Alerts from "@/components/base/Alerts.vue";

export default {
  name: "Participants",
  components: {
    Alerts
  },
  data() {
    return {
      kword: "",
      groups: [],
      members: [],
      search: "",
      tab: null,
      isUpdating: false,
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
      dialogDelete: false
    };
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
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
          get_initials: "",
          id: this.email
        };

        if (this.members.indexOf(item) == -1) {
          this.members.push(item);
          this.count_participants = this.members.length;
        }

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
    reset_groups() {
      console.log(this.model_groups);

      apiGroups
        .getMembers(21)
        .then(response => {
          this.members = response.data[0].members;

          this.count_participants = this.members.length;
        })
        .catch(error => {
          console.log(error);
        });

      this.$nextTick(() => {
        this.model_groups = null;
      });
    },
    addMembers(item) {
      if (this.members.indexOf(item) == -1) {
        this.members.push(item);
        this.count_participants = this.members.length;
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

      formData.append("idEvent", 26);
      formData.append("listEmails", "rafalopezrl749@gmail.com");

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
        });

      this.dialogDelete = false;

      this.$router.push("Eventos");
    }
  }
};
</script>

<style></style>
