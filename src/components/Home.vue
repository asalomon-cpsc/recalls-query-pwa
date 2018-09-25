<template>
  
  <v-container>
    <v-layout>
      <v-flex>
        <h4 class="grey--text">Latest Recalls</h4>
        <div class="section">
        <ul id="featured" class="d-flex">
          <li v-for="(r,index) in latestRecalls" v-bind:key="index">
            <v-card flat>
              <v-container fluid grid-list-lg>
                <v-layout row wrap>
                  <v-flex>
                    <v-card color="white" class="dark--text" :href="r.url" target="_blank" ripple>
                      <v-layout>
                        <v-flex xs12>
                          <v-card-media contain :src="r.images[0].url" class="black--text" height="180" aspect-ratio="1">
                          </v-card-media>
                        </v-flex>
                      </v-layout>
                      <v-divider light></v-divider>
                      <v-layout row wrap>
                        <v-card-text>
                          <div>
                            <div class="text-truncate">{{r.title}}</div>
                            <div class="grey--text">Recall Date:{{r.recallDate}}</div>
                          </div>
                        </v-card-text>
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
    </v-layout>
    
    <v-layout>
      <v-flex>
   
      <h4 class="grey--text">Latest Recalled Children Products</h4>
  
     <div class="section">
    <ul class="app-list-horizontal d-flex">
     
      <li v-for="(r,index) in childrensRecalls" v-bind:key="index">
        
        <v-card flat :href="r.url" target="_blank">
          <v-container fluid grid-list-xs>
            <v-layout row wrap>
              <v-flex>
                <v-card  class="dark--text"  raised tile ripple>
                  <v-layout>
                    <v-flex xs12>

                      <v-card-media position="left" contain :src="r.images[0].url" class="black--text" height="70"
                        aspect-ratio="1">
                      </v-card-media>
                      <v-divider></v-divider>
                       <v-card-text >
                         <div  class="text-truncate">
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
    </v-layout>
  
  </v-container>



</template>
<script>
  import axios from "axios";
  import moment from "moment";
  export default {
    name: "home",
    data: function () {
      return {
        recalls: [],
        newRecalls: [],
        childrensRecalls: [],
        show:false
      };
    },
    computed: {
      latestRecalls: function () {
        return this.newRecalls;
      },
      childrenRecalls: function () {
        return this.childrensRecalls.slice(0, 10);
      }
    },
    created: function () {
      //show loading
      let vm = this;
      axios
        .all([vm.getLatestRecalls(), vm.getChildrensRecalls()])
        .then(axios.spread());
      //request complete hide loading...
    },
    methods: {
      getLatestRecalls() {
        let vm = this;
        const cpscapi = process.env.ROOT_RECALLS_API;
        const apiRecallURL = cpscapi +
          "latest";
        const thirdwebsiteurl = window.location.href;
        const thirdwebsitetitle = document.title;
        vm.resultCount = 0;
        vm.recalls = [];
        console.log(apiRecallURL);
        let requestParams = axios
          .get(apiRecallURL)
          .then(response => {
            if (response.data.resultCount > 0) {
              vm.handleResponse(response);
            } else {
              //vm.showProgress = false;
              vm.newRecalls = [];
            }
          })
          .catch(error => {
            //vm.isError = true;
          });
      },
      getChildrensRecalls() {
        let vm = this;
        const cpscapi = process.env.ROOT_RECALLS_API;
        const apiRecallURL = cpscapi +
          "children"
        vm.resultCount = 0;
        vm.childrensRecalls = []
        console.log(apiRecallURL)
        let requestParams = axios
          .get(apiRecallURL)
          .then(response => {
            if (response.data.resultCount > 0) {
              vm.handleChildrensResponse(response)
            } else {
              //vm.showProgress = false;
              vm.childrensRecalls = [];
            }
          })
          .catch(error => {
            //vm.isError = true;
          });
      },
      handleChildrensResponse(response) {
        const vm = this;
        response.data.recalls.forEach(element => {
          console.log("handling children's");
          console.log(element.title);
          vm.childrensRecalls.push({
            title: element.title,
            url: element.url,
            recallDate: moment(element.recallDate).format("MMM Do YYYY"),
            productName:element.products[0].name,
            images: element.images, //use array functions to filter
            description: element.description,
            manufacturerCountries: element.manufacturerCountries
          });
          vm.resultCount = vm.recalls.length;
        });
      },
      handleResponse(response) {
        const vm = this;
        response.data.recalls.forEach(element => {
          console.log("handling latest");

          vm.newRecalls.push({
            title: element.title,
            url: element.url,
            recallDate: moment(element.recallDate).format("MMM Do YYYY"),
            images: element.images, //use array functions to filter
            description: element.description,
            manufacturerCountries: element.manufacturerCountries
          });
          vm.resultCount = vm.recalls.length;
        });
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
 .section{
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
