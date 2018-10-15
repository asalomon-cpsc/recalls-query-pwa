<template>

  <v-container>
    <v-layout>
      <v-flex>
        <h4 class="grey--text">Latest Recalls</h4>
        <v-progress-linear v-if="!latestLoaded" :indeterminate="true"></v-progress-linear>
        <div v-show="latestLoaded" class="section">
          <ul id="featured" class="d-flex">
            <li v-for="(r,index) in latestRecalls" v-bind:key="index">
              <v-card flat>
                <v-container fluid grid-list-lg>
                  <v-layout row wrap>
                    <v-flex>
                      <v-card color="grey lighten-4" class="dark--text" :href="r.url" target="_blank" ripple height="480">
                        <v-layout>
                          <v-flex xs12>
                            <v-card-media contain :src="r.images[0].url" class="black--text" height="280" aspect-ratio="1">
                            </v-card-media>
                          </v-flex>
                        </v-layout>
                        <v-divider light></v-divider>
                        <v-layout row wrap>
                          <v-card-text >
                            <div>
                              <div class="grey--text"><strong>Recall Date:</strong>:{{r.recallDate}}</div>
                              <div class="text-truncate">{{r.title}}</div>
                              
                              <div class="text-truncate"><strong>Product: </strong>{{r.productName}}</div>
                              <div class="text-truncate"><strong>Manufacturer:</strong> {{r.manufacturer}}</div>
                              <div class="grey--text"><strong>Recall Date:</strong>:{{r.recallDate}}</div>
                            </div>
                          </v-card-text>
                          
                        </v-layout>
                        <v-card-actions>
                        <v-btn flat dark color="orange" :href="r.url">View Details</v-btn>
                        
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>

            </li>
          </ul>
        </div>
      </v-flex>
    </v-layout>

   <!-- <v-layout>
      <v-flex>

        <h4 class="grey--text">Latest Recalled Children Products</h4>
       <v-progress-linear v-if="!latestChildrenLoaded" :indeterminate="true"></v-progress-linear>
           
        <div class="section" v-show="latestChildrenLoaded">
          <ul class="d-flex app-list-horizontal">

            <li v-for="(r,index) in newChildrenRecalls" v-bind:key="index">

              <v-card flat :href="r.url" target="_blank">
                <v-container fluid grid-list-xs>
                  <v-layout row wrap>
                    <v-flex>
                      <v-card class="dark--text" raised tile ripple>
                        <v-layout>
                          <v-flex xs12>

                            <v-card-media position="left" contain :src="r.images[0].url" class="black--text" height="70"
                              :aspect-ratio="1">
                            </v-card-media>
                            <v-divider></v-divider>
                            <v-card-text>
                              <div class="text-truncate">
                                {{r.productName}}
                              </div>
                              <span class="grey--text">Recall Date: {{r.recallDate}}</span>

                            </v-card-text>

                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>

            </li>
          </ul>
        </div>
      </v-flex>
    </v-layout>-->

   

  </v-container>



</template>
<script>
import axios from "axios";
import moment from "moment";
import { EventBus } from "../eventBus.js";
export default {
  name: "home",
  data: function() {
    return {
      recalls: [],
      newRecalls: [],
      newChildrenRecalls: [],
      fireRecalls: [],
      show: false,
      latestLoaded: false,
      latestChildrenLoaded: false
      
    };
  },
  computed: {
    latestRecalls: function() {
      return this.newRecalls;
    }
    },
  
   
  mounted: function() {
    //show loading
    let vm = this;
    vm.getRecalls();
    
  },
  methods: {
     getChildrenRecalls() {
      let vm = this;
      let childrenKeyWords = [
        "toys",
        "baby",
        "infant",
        "children",
        "toddler",
        "kids"
      ];
      var recall = null;
      let recallsMap = new Map();
       console.log("latest recalls count is :" + this.latestRecalls.length)
      
        childrenKeyWords.forEach(k => {
          vm.latestRecalls.forEach(r => {
            recall = r;
          if (recall.description) {
            if (recall.description.includes(k)&& !recallsMap.has(recall.Number) && recallsMap.size< 15) {
              recallsMap.set(recall.recallNumber,recall)
            }else{
              console.log(recall.description + "does not contain " + k)
            }
          }
        });
      });
      recallsMap.forEach((value,key,map)=>{
        vm.newChildrenRecalls.push(value)
      })
      console.log("children recalls count is :" + vm.newChildrenRecalls.length)
      return vm.newChildrenRecalls.slice(0, 10);
    },
  
    getRecalls() {
      let vm = this;
      const cpscapi = process.env.ROOT_RECALLS_API;
      const apiRecallURL = cpscapi + "latest";
      vm.resultCount = 0;

      console.log(apiRecallURL);
      let requestParams = axios
        .get(apiRecallURL)
        .then(response => {
          if (response.data.resultCount > 0) {
            vm.handleResponse(response);
          }
        })
        .catch(error => {
          vm.handleError("apiCallErrorOccured", error);
          console.log(error)
        });
    },
    handleError(type, error) {
      EventBus.$emit(type, error);
      this.$router.push("error");
    },

    handleResponse(response) {
      const vm = this;
      
      response.data.recalls.forEach(element => {
        console.log(element.manufacturers)
        let rec = {
          title: element.title,
          url: element.url,
          recallDate: moment(element.recallDate).format("MMM Do YYYY"),
          productName: element.products[0].name,
          manufacturer: element.manufacturers.length>0?element.manufacturers[0].name:"view details",
          images: element.images, //use array functions to filter
          description: element.description
        };

        vm.latestRecalls.push(rec);
      });
      vm.latestLoaded = true;
      vm.resultCount = vm.recalls.length;
      //vm.getChildrenRecalls();
      //vm.latestChildrenLoaded = true;
      
    }
  }
};
</script>
<style scoped>
ul#featured {
  -webkit-scroll-snap-type: mandatory;
  scroll-snap-type: x mandatory;
  -webkit-scroll-snap-points-x: repeat(100%);
  scroll-snap-points-x: repeat(100%);
  white-space: nowrap;
  list-style: none;
  margin: 0 -20px 0 -20px;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 0px 30px 0px 0px;
}

ul#featured li {
  display: inline-block;
  width: calc(100% - 10px);
  padding-left: 20px;
  margin-right: -10px;
  -webkit-scroll-snap-align: start;
  scroll-snap-align: start;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
}

ul.app-list-horizontal {
  -webkit-scroll-snap-type: mandatory;
  scroll-snap-type: x mandatory;
  -webkit-scroll-snap-points-x: repeat(100%);
  scroll-snap-points-x: repeat(100%);
  list-style: none;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding: 0 15px 20px 35px;
  margin: 0px -20px;
}

.section {
  margin: 0px;
  padding: 0px;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* overflow-x: hidden; */
}
</style>
