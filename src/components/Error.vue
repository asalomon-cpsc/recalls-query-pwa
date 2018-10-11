<template>
  <v-container grid-list-sm>
    <v-layout v-bind="binding">
      <v-flex>
        <v-card light >
          
          

        </v-card>
      </v-flex>
      <v-flex>
        <v-card >
             <v-card-media  contain :src="cpscLogo"  height="80"
                              :aspect-ratio="1">
        </v-card-media>
                           
          <v-card-title primary-title>
          <div>
            <h3>{{title}}</h3>
            <div>{{ErrorDescription}}</div>
          </div>
        </v-card-title>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card >
          <v-card-actions>
          <v-btn flat color="orange" href="https://www.cpsc.gov">Cpsc.gov</v-btn>
          <v-btn flat color="orange" href="https://www.saferproducts.gov">Saferproducts.gov</v-btn>
        </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {  EventBus } from "../eventBus.js"
  export default {
    name: "error",
    data: function () {
      return {
        title: "Error",
        ErrorDescription:"There was an error, please try again",
        cpscLogo:"https://www.cpsc.gov/sites/all/themes/cpsc/images/logo.png"
      };
    },
    computed: {
      binding () {
        const binding = {}

         binding.column = true

        return binding
      }
    },
    created(){
      let vm = this
      EventBus.$on("apiCallErrorOccured",err=>{
          vm.setErrorDescription("There was an a communication issue, please try again at a later time.")
          //log error
      })
    },
   methods:{
      setErrorDescription(message){
        this.ErrorDescription = message;
      }
  }
  };
  

</script>
<style scoped>

</style>
