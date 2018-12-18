<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 sm12 md12 lg12 xl12 id="noRecords">

        <v-card >
       

        <v-card-title primary-title >
          <div>
           
            <h4>Search Suggestions:</h4>
            <div v-for="(item,index) in searchSuggestions" v-bind:key="index"> 
                
               <ul >
                  <li >{{item}} </li>
               </ul>

            </div>
          </div>
        </v-card-title>

        
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    EventBus
  } from "../eventBus.js";
  export default {
    name: "noRecords",

   
    data: function () {
      return {
        noRecordsFoundTitle:"No Recalls Found",
        searchSuggestions:[
            'Check your spelling',
            'Use the filters to narrow the search results',
            'Try broadening the search date range'
        ]
      };
    }
  };

</script>
<style scoped>


</style>
