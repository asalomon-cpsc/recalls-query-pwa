<template>
  <v-layout row justify-center>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" max-width="500" max-heigh="500" transition="dialog-bottom-transition" scrollable>
        <v-card>
          <v-toolbar color="grey lighten-3">
            <v-btn class="grey lighten-3" icon light @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title color="black">Install The Recall App</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card>
            <v-card-text>
              <img class="centered" contain with="40" height="35"
                src="https://www.cpsc.gov/sites/all/themes/cpsc/images/logo.png" alt="cpsc">
              <v-divider></v-divider>
              <span>Install this app on your home screen for convenient access when you're on the go.</span>
            </v-card-text>
            <v-divider dark></v-divider>
            <v-card-actions class=" grey lighten-3">
              <p class="text-xs-center"><span>Just tap the share
                </span> <img contain with="20" height="25" src="/static/img/IOS/share_icon_ios.png" alt="iso share">
                <span> button then 'Add to Home Screen'</span></p>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-dialog>
    </div>
  </v-layout>
</template>
<script>
  export default {
    name: "installPrompt",

    data() {
      return {
        dialog: false
      }
    },
    mounted() {
      const vm = this;
      vm.dialog = true

    }

  };

</script>
<style scoped>
  .centered {
    position: relative;

    left: 45%;
    top: 50%;
    /* bring your own prefixes */
    transform: translate(-30%, -30%);
  }

</style>
