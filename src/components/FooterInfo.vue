
<template>
    

       <div class="grey--text" >
       Consumer Product Safety Commission
        
    <v-btn icon
         round
         color="#ffff">
          <v-avatar size="25px" tile>
            <img
              src="https://www.cpsc.gov/sites/all/themes/cpsc/images/logo.png"
              alt="cpsc"
            >
          </v-avatar>
        </v-btn>
           <div>
            <span >Contact Us: 800-638-2772 (TTY 800-638-8270) Toll Free Consumer Hotline | Time: 8 a.m. - 5.30. p.m. ET</span><br>
            <span><a href="mailto:suggestions@cpsc.gov" >Website Feedback</a></span><br>
             This is an official website of the United States government.
            </div>
            <div>Version: 1.0.0</div>
            <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn slot="activator" top dark flat value="help">
            <v-icon  dark color="orange lighten-2">help</v-icon>
          </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="redirectToGuide(item)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
          </div>

           
          
    
</template>

<script>
export default {
  name:"footerInfo",
  data: () => ({
      items: [
        { title: 'Help Guide',url:'/docs'},
        { title: 'Search Overview',url:'/docs/#search-results-overview' },
        { title: 'Installation',url:'/docs/#installation' },
        
      ]
    }),
    methods:{
     redirectToGuide (item){
       console.log(item)
      window.location = item.url

      }
    }
}
</script>

<style>

</style>

