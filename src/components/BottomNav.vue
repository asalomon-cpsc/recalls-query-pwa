<template>
     <v-card tile height="50px" flat >
    
    <v-bottom-nav class="bottomNavControls "
      active.sync="recent"
      :value="true"
      fixed
      color="blue-grey darken-4"
    >

   <v-icon @click.stop="drawer = !drawer"></v-icon>
     <v-btn 
        
        color="white"
        flat
        value="home"
         to="/"
        
      >
       <v-icon>home</v-icon>
      </v-btn>
       <v-btn 
       color="white"
        
        flat
        value="search"
        to="search"
        
      >
      <v-icon>search</v-icon>
   </v-btn>
   
  
     <v-btn 
        
         color="white"
         flat
         value="up"
         @click="$vuetify.goTo(target, options)"
        
      >
    <v-icon>arrow_upward</v-icon>
    
    <v-icon>home</v-icon>
      </v-btn>
 
    
   
  </v-bottom-nav>
    </v-card>
</template>
<script>
import footerInfo from "./FooterInfo.vue";
export default {
  components: {
    footerInfo
  },
  name: "bottomNav",

  data: function() {
    return {
      drawer:null,
      selector: "#content",
      duration: 300,
      offset: 15,
      easing: "easeInOutCubic",
      tiles: [
        { icon: "search", title: "Search" },
        { icon: "share", title: "Share" }
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
  }
};
</script>
<style scoped>

</style>


