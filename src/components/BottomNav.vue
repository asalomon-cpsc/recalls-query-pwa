<template>
  <v-card class="hide-overflow" height="50px">
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed color="grey lighten-4">
      <v-btn light flat @click.stop.prevent="showSearchComponents()">
        <span>{{tiles[0].title}}</span>
        <v-icon color="black">search</v-icon>
      </v-btn>
      <v-btn light flat to="/">
        <span>{{tiles[1].title}}</span>
        <v-icon color="black">home</v-icon>
      </v-btn>
      <v-btn light flat :value="help.title" to="help">
        <span>{{help.title}}</span>
        <v-icon color="black">help</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
<script>
import footerInfo from "./FooterInfo.vue";
import { EventBus } from "../eventBus.js";
export default {
  components: {
    footerInfo
  },
  name: "bottomNav",

  data: function() {
    return {
      help: { title: "Help Guide", url: "/docs" },
      bottomNav: "Home",
      drawer: null,
      selector: "#content",
      duration: 300,
      offset: 15,
      easing: "easeInOutCubic",
      tiles: [
        {
          icon: "search",
          title: "Search"
        },

        {
          icon: "home",
          title: "Home"
        }
      ]
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
    }
  },
  methods: {
    //emit click event
    //show resultlist route because users may want to navigate back to resultlist from home
    showSearchComponents() {
      EventBus.$emit("searchNavButtonClicked", true);
      //this.$router.push("resultList")
    },
    redirectToGuide() {
      window.location = this.help.url;
    }
  }
};
</script>
<style scoped>
</style>
