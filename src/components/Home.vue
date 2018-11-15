<template>

  <v-container>
    <v-layout row wrap>
      <v-flex>
        <h4 class="grey--text">Latest Recalls</h4>
        <v-progress-linear v-if="!latestLoaded" :indeterminate="true"></v-progress-linear>
        <div v-show="latestLoaded" class="section">
          <ul id="featured" class="d-flex">
            <li v-for="(r,index) in latestRecalls" v-bind:key="index">
              <v-card flat>
                <v-container fluid grid-list-lg>
                  <v-layout >
                    <v-flex>
                      <v-card color="grey lighten-4" class="dark--text"  ripple>
                            <v-card-media contain :src="r.images[0].url" class="black--text" height="240" aspect-ratio="1">
                            </v-card-media>
                        <v-divider light></v-divider>
                       
                          <v-card-text >
                            <div>
                              <div class="text-truncate"><strong>Title:</strong>
                                  <br>
                              <span>{{r.title}}</span>
                           
                               </div>
                              <div class="text-truncate"><strong>Recall Date:</strong>
                                  <br>
                               <span>{{r.recallDate}}</span>
                              </div>
                              <div  class="text-truncate"><strong>Product: </strong>
                              <br>
                              <span>{{r.productName}}</span></div>
                             
                              
                            </div>
                          </v-card-text>
                          
                        
                        <v-card-actions>
                        <v-btn  round raised ripple outline flat dark color="orange" :href="r.url">View Details</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn large  round raised ripple outline   icon @click="showDetails =!showDetails">
                        <v-icon>{{ !showDetails? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        
                        </v-btn>
                        </v-card-actions>

                        <v-slide-y-transition>
                           <v-card-text v-show="showDetails">
                             {{r.description}}
                           </v-card-text>
                        </v-slide-y-transition>
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
      showDetails:false,
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
    let vm = this;
    vm.getRecalls();
  },
  methods: {
  
    getRecalls() {
      let vm = this;
      const cpscapi = process.env.ROOT_RECALLS_API;
      const apiRecallURL = cpscapi + "latest";
      vm.resultCount = 0;
      let requestParams = axios
        .get(apiRecallURL)
        .then(response => {
          console.log(response)
          if (response.data.resultCount > 0) {
            vm.handleResponse(response);
          }
        })
        .catch(error => {
          vm.handleError("apiCallErrorOccured", error);
        });
    },
    handleError(type, error) {
      EventBus.$emit(type, error);
      this.$router.push("error");
    },

    handleResponse(response) {
      const vm = this;

      response.data.recalls.forEach(element => {
        let rec = {
          title: element.title,
          url: element.url,
          recallDate: moment(element.recallDate).format("MMM Do YYYY"),
          productName: element.products[0].name,
          images: element.images, //use array functions to filter
          description: element.description
        };

        vm.latestRecalls.push(rec);
      });
      vm.latestLoaded = true;
      vm.resultCount = vm.recalls.length;
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
  white-space: wrap;
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
