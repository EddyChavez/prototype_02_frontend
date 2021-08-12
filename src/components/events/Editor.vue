<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <!-- <ckeditor
          :editor="editor"
          v-model="editorData"
          :config="editorConfig" 
          :editor-toolbar="customToolbar"
        ></ckeditor> -->
          <vue-editor v-model="editor" :editorOptions="editorSettings" />
        </base-material-card>
      </v-col>
      <v-col cols="12" md="8">
        <base-material-card>
          <br />
          <!-- <div v-html="editor"></div> -->
          <v-card v-html="editor"> </v-card>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-icon @click="show()">
        mdi-plus
      </v-icon>
    </v-row>
  </v-container>
</template>

<script>
//const Quill = require("quill");
import { VueEditor, Quill } from "vue2-editor";

import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
//import VQuill from "quill";
//const Quill = window.Quill || VQuill;

// const Parchment = window.Quill.imports.parchment;
//const Parchment = Quill.imports.parchment;
//const ImageResize = require("quill-image-resize-module").default;

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

//import ClassicEditor from "@ckeditor/ckeditor5-build-classic/";
//import Image from "@ckeditor/ckeditor5-image/src/image";
//import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";

// import ImageResizeEditing from "@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting";
// import ImageResizeHandles from "@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles";

//import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
//import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
//import { uploader } from "@/plugins/ckeditor";

export default {
  name: "Editor",
  components: { VueEditor },
  data() {
    return {
      //editor: ClassicEditor,
      editor: "<p>Content of the editor.</p>",
      //   customModulesForEditor: [
      //     { alias: "imageDrop", module: ImageDrop },
      //     { alias: "imageResize", module: ImageResize }
      //   ],
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["link", "image", "video"],
        ["clean"] // remove formatting button
      ],

      editorSettings: {
        modules: {
          //imageResize: true
          imageDrop: true,
          imageResize: {}
        }
      }
      //   editorConfig: {
      //     //plugins: [SimpleUploadAdapter],
      //     //plugins: [Image, ImageResizeEditing, ImageResizeHandles],
      //     //plugins: [ImageResize],
      //     extraPlugins: [uploader],
      //     language: "es"
      //   }
    };
  },
  mounted: function() {
    // this.$loadScript(
    //   "/node_modules/quill-image-resize-module/image-resize.min.js"
    // ).then(() => {
    //   //console.log("listo");
    // });
    // ClassicEditor.create(document.querySelector("#editor"), {
    //   plugins: [SimpleUploadAdapter]
    //   simpleUpload: {
    //     // The URL that the images are uploaded to.
    //     uploadUrl: "http://127.0.0.1:8000/media/uploads/2021/",
    //     // Enable the XMLHttpRequest.withCredentials property.
    //     withCredentials: false,
    //     // Headers sent along with the XMLHttpRequest to the upload server.
    //     headers: {
    //       //   'X-CSRF-TOKEN': 'CSRF-Token',
    //       //   Authorization: 'Bearer <JSON Web Token>'
    //     }
    //   }
    // })
    //   .then(console.log("listo"))
    //   .catch(console.log("valio barriga señor vrg.."));
  },
  methods: {
    show() {
      console.log(this.editor);
    }
  }
};
</script>

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>
