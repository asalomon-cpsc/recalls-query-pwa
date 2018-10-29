<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher disable-route-watcher fixed light :clipped="$vuetify.breakpoint.lgAndUp"
      app width="310">
      <search></search>

    </v-navigation-drawer>
    <v-toolbar color="indigo darken-1" dark dense app fixed id="toolbar">
      <v-toolbar-title v-text="title" color="white">
      </v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <div class="d-flex align-center " style="margin-left: auto">
        <v-bottom-sheet v-if="!beforeinstallpromptfired" v-model="sheet" v-touch="{
              up: () => swipe('up'),
              down: () => swipe('down')
            }"
          lazy>

          <v-btn slot="activator" dark flat value="info">
            <v-icon color="orange lighten-2">info</v-icon>
          </v-btn>

          <v-card raised ripple class=" flex text-xs-center">
            <v-card-title primary-title class="justify-center">
              <footer-info> </footer-Info>
            </v-card-title>
          </v-card>


        </v-bottom-sheet>
        <v-btn small round color="orange darken-4" v-if="beforeinstallpromptfired" @click="showInstallPrompt($event)">
          <v-icon>add</v-icon>
          install
        </v-btn>
        <v-btn icon round color="white">
          <v-avatar size="32px" tile>
            <img src="https://www.cpsc.gov/sites/all/themes/cpsc/images/logo.png" alt="cpsc">
          </v-avatar>
        </v-btn>
      </div>
    </v-toolbar>

    <v-content id="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>

    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'"
      :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      {{ text }}
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>


    <bottom-nav v-if="showOnSmAndDown"></bottom-nav>
    <mfooter v-if="showOnMdAndUp"></mfooter>

  </v-app>
</template>
<script>
import bottomNav from "./components/BottomNav.vue";
import mfooter from "./components/mFooter.vue";
import footerInfo from "./components/FooterInfo.vue";
import search from "./components/Search.vue";
import axios from "axios";
import moment from "moment";
import {
  EventBus
} from "./eventBus.js";
export default {
  components: {
    mfooter,
    bottomNav,
    footerInfo,
    search
  },
  name: "App",
  data() {
    return {
      selector: "#content",
      duration: 300,
      offset: 15,
      easing: "easeInOutCubic",
      title: "CPSC Recalls",
      action: true,
      beforeinstallpromptfired: false,
      deferredPrompt: null,
      sheet: false,
      drawer: true,
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Installed Succesfully! The app is now available on your home screen"
    };
  },
  computed: {
    target() {
      let vm = this;
      let value = vm.selector;
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      };
    },
    showOnMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    showOnSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },

  mounted() {
    const vm = this;
    EventBus.$on("searchNavButtonClicked", val => {
      vm.drawer = true;
    });
    window.addEventListener("beforeinstallprompt", e => {
      // Prevent Chrome 67 and earlier from automatically showing the
      console.log('beforeinstallprompt event fired')
      e.preventDefault();

      // Stash the event so it can be triggered later.
      vm.deferredPrompt = e;
      //show install button
      vm.beforeinstallpromptfired = true;

      window.addEventListener("appinstalled", event => {
        vm.snackbar = true;
        const cpscapi = process.env.ROOT_STATS_API;
        const apiInstallInfoURL = cpscapi + "installinfo";
        let mobileOS = vm.getMobileOperatingSystem();
        axios
          .post(apiInstallInfoURL, {
            data: {
              Browser: "N/A",
              OS: mobileOS?mobileOS:"unknown",
              Device: "N/A",
              Date: moment().format("MMM Do YYYY"),
              InstallStatus: "Success"
            },
            withCredentials: false
          })
          .catch(error => {
            //DO handle error
            console.log(error)
          });
      });
    });
  },
  methods: {
   
    showInstallPrompt(e) {
      const vm = this;

      vm.beforeinstallpromptfired = false;
      vm.deferredPrompt.prompt();
      vm.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {} else {
          //TODO: what action to take if user dismissed prompt?
        }
        vm.deferredPrompt = null;
      });
    }
  }
};
</script>