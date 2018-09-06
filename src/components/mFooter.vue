<template>
    <v-footer
    class="blue-grey darken-4"
    height="auto"
    fixed
  >
    <v-card
      class="flex text-lg-center"
      flat
      tile

    >
      <bottom-nav  ></bottom-nav>
      
      
    
    </v-card>
  </v-footer>
</template>
<script>
import footerInfo from "./FooterInfo.vue"
import bottomNav from "./BottomNav.vue"
export default {
  name: "mfooter",
  components:{
    footerInfo,
    bottomNav
  }
};
</script>

