
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
            <span><a href="mailto:suggestions@cpsc.gov" >App Feedback</a></span><br>
             This is an official app of the United States government.
            </div>
            <div>Version: {{appVersion}}</div>
            <div class="text-xs-center">
    
  </div>
          </div>

           
          
    
</template>

<script>
export default {
  name:"footerInfo",
  data: () => ({
      
      appVersion:"1.0.1"
    }),
    methods:{
    
    }
}
</script>

<style>

</style>

