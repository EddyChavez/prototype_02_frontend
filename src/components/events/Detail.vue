<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8" v-if="showUsers">
        <Participants />
      </v-col>

      <v-col cols="12" md="8" v-else>
        <base-material-card>
          <template v-slot:heading>
            <div v-if="showForm" class="display-2 font-weight-light">
              {{ event.name }} (Agrega informacion detallada de tu evento)
            </div>
            <div v-else class="display-2 font-weight-light">
              {{ event.name }}
            </div>
          </template>

          <v-container class="py-0">
            <br />
            <v-row>
              <v-col cols="12" md="12">
                <!-- <ckeditor v-model="ck_content" :editor="editor"></ckeditor> -->
                <!-- <div v-html="model.content"></div> -->
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-row v-if="showForm" justify="center">
                  <v-avatar size="60">
                    <img alt="user" :src="loadImage1" />
                  </v-avatar>
                </v-row>
                <v-file-input
                  v-if="showForm"
                  accept="image/*"
                  label="Imagen Opcional"
                  prepend-icon="mdi-camera-image"
                  v-model="new_image1"
                  @change="loadImage_1()"
                ></v-file-input>
                <v-img
                  v-else
                  :src="loadImage1"
                  height="125"
                  class="grey darken-4"
                ></v-img>
              </v-col>

              <v-col cols="12" md="6">
                <v-row v-if="showForm" justify="center">
                  <v-avatar size="60">
                    <img alt="user" :src="loadImage2" />
                  </v-avatar>
                </v-row>
                <v-file-input
                  v-if="showForm"
                  accept="image/*"
                  label="Imagen Opcional"
                  prepend-icon="mdi-camera-image"
                  v-model="new_image2"
                  @change="loadImage_2()"
                ></v-file-input>
                <v-img
                  v-else
                  :src="loadImage2"
                  height="125"
                  class="grey darken-4"
                ></v-img>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-row v-if="showForm" justify="center">
                  <v-btn
                    class="ma-2"
                    color="blue"
                    :href="loadfile"
                    download
                    rounded
                    small
                  >
                    Descargar
                  </v-btn>
                </v-row>
                <br />
                <v-file-input
                  v-if="showForm"
                  label="Archivo Opcional"
                  outlined
                  dense
                  prepend-icon="mdi-file-pdf-box-outline"
                  v-model="model.file"
                ></v-file-input>
                <v-btn
                  v-else
                  class="ma-2"
                  color="blue"
                  :href="model.file"
                  download
                  rounded
                >
                  Descargar Archivo
                </v-btn>
              </v-col>
            </v-row>
            <div class="text-center flex">
              <v-btn
                v-if="showButton"
                rounded
                color="green"
                dark
                :loading="loading"
                @click="saveDetail()"
              >
                Guardar
              </v-btn>
              <v-btn
                v-else
                rounded
                color="green"
                dark
                :loading="loading"
                @click="editDetail()"
              >
                Editar
              </v-btn>
            </div>
          </v-container>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img max-height="150" height="250" :src="event.image"></v-img>

          <v-card-title>{{ event.name }}</v-card-title>

          <v-card-text>
            <v-chip class="ma-2" color="green" label text-color="white" x-small>
              {{ event.status }}
            </v-chip>

            <div class="my-4 text-subtitle-1">
              Creado por: {{ event.create_by }}
            </div>

            <div>{{ event.description }}</div>
          </v-card-text>

          <div class="text-center flex">
            <!-- <v-btn rounded color="primary" dark @click="showOrder(event.id)">
              Participar
            </v-btn> -->
            <v-btn rounded color="blue" dark @click="addParticipants()">
              Publicar
            </v-btn>
          </div>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <v-icon color="grey darken-2">
              mdi-clock
            </v-icon>

            <span class="body-2 grey--text text-right font-weight-light">
              {{ formatDate(event.date_start) }}</span
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API_URL } from "@/utils/constants.js";
import moment from "moment";
//import CKEditor from "@ckeditor/ckeditor5-vue2";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
//import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
//import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
//import { uploader } from "@/plugins/ckeditor";
import apiEvents from "@/api/events/";
import Participants from "@/components/events/Participants.vue";

export default {
  name: "Detail",
  components: {
    //ckeditor: CKEditor.component,
    Participants
  },
  data() {
    return {
      loading: false,
      event: [],
      detail: [],
      model: {
        id: 0,
        name: 0,
        content:
          "<p><strong>Buen día...</strong></p><p>Agrega información importante para tu evento...</p><ul><li>Listas de Precios</li><li>Menús de comida</li><li>Contactos</li><li>Notas</li></ul>",
        image1: null,
        image2: null,
        file: null
      },
      new_image1: null,
      new_image2: null,
      loadImage1: [],
      loadImage2: [],
      loadfile: null,
      showButton: true,
      showForm: true,
      showUsers: false
      //editor: ClassicEditor,
      // editorConfig: {
      //   extraPlugins: [uploader]
      // }
    };
  },
  computed: {
    idEvent() {
      return this.$route.params.id;
    }
  },
  mounted: function() {
    this.RetrieveEvent();
    this.RetrieveDetailEvent();
    //this.reserve();
  },
  methods: {
    loadImage_1() {
      this.model.image1 = this.new_image1;
    },
    loadImage_2() {
      this.model.image2 = this.new_image2;
    },
    // getImage1() {
    //   this.imageSelected1 = this.new_image1;
    // },
    // getImage2() {
    //   this.imageSelected = this.new_image2;
    // },
    // showOrder: function(idEvent) {
    //   this.$router.push({
    //     name: "Orden-Evento",
    //     params: { id: idEvent }
    //   });
    // },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    RetrieveEvent() {
      apiEvents.retrieve(this.idEvent).then(response => {
        this.event = response.data;
      });
    },
    RetrieveDetailEvent() {
      apiEvents
        .detail(this.idEvent)
        .then(response => {
          this.model.id = response.data[0].id;
          this.model.name = response.data[0].name;
          this.model.content = response.data[0].content;
          this.loadImage1 = response.data[0].image1;
          this.loadImage2 = response.data[0].image2;
          this.loadfile = response.data[0].file;
          this.model.file = response.data[0].file;
          this.showButton = !this.showButton;
          this.showForm = !this.showForm;
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatDate: function(date) {
      return moment(date).fromNow();
    },
    saveDetail() {
      this.loading = true;

      const formData = new FormData();
      this.model.name = this.idEvent;

      formData.append("name", this.model.name);
      formData.append("content", this.model.content);
      if (this.model.image1 !== null) {
        formData.append("image1", this.model.image1);
      }
      if (this.model.image2 !== null) {
        formData.append("image2", this.model.image2);
      }
      if (this.model.file !== null) {
        formData.append("file", this.model.file);
      }

      if (this.model.id !== 0) {
        apiEvents
          .updateDetail(this.model.id, formData)
          .then(response => {
            console.log(response.data);
            //this.RetrieveDetailEvent();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        apiEvents
          .createDetail(formData)
          .then(response => {
            this.RetrieveDetailEvent();
          })
          .catch(error => {
            console.log(error);
          });
      }

      this.model.image1 = null;
      this.model.image2 = null;
      this.model.file = null;

      setTimeout(() => (this.loading = false), 1500);
      this.showButton = !this.showButton;
      this.showForm = !this.showForm;
    },
    editDetail() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 1500);

      this.model.image1 = null;
      this.model.image2 = null;
      this.model.file = null;

      this.showButton = !this.showButton;
      this.showForm = !this.showForm;
    },
    addParticipants() {
      this.showUsers = !this.showUsers;
    }
  }
};
</script>

<style></style>
