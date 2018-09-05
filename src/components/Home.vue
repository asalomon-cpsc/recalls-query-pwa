<template>

  <v-container>
    <v-layout>
      <v-flex>

        <div class="title mb-3">Check out our latest recalls</div>

        <ul id="featured" class="d-flex">
          <li v-for="(r,index) in latestRecalls" v-bind:key="index">
            <v-card flat>
              <v-container fluid grid-list-lg>
                <v-layout row wrap>
                  <v-flex>
                    <v-card color="white" class="dark--text">
                      <v-layout>
                        <v-flex xs12>
                          <v-card-media contain :src="r.images[0].URL" class="black--text" height="200" aspect-ratio="1">
                          </v-card-media>
                        </v-flex>
                      </v-layout>
                      <v-divider light></v-divider>
                      <v-layout row wrap>
                        <v-card-text>
                          <div>
                            <div class="text-truncate">{{r.title}}</div>
                            <div>{{r.recallDate}}</div>
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
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <hr>
    <div class="title mb-3">Check out our latest children recalls</div>

    <ul class="app-list-horizontal d-flex">
      <li v-for="(r,index) in childrensRecalls" v-bind:key="index">
        <v-card flat>
          <v-container fluid grid-list-xs>
            <v-layout row wrap>
              <v-flex>
                <v-card color="white" class="dark--text">
                  <v-layout>
                    <v-flex xs12>

                      <v-card-media position="left" contain :src="r.images[0].URL" class="black--text" height="120"
                        aspect-ratio="1">
                      </v-card-media>
                      <v-divider></v-divider>
                       <v-card-text >
                         <div  class="text-truncate">
                          {{r.productName}}
                        </div>
                        <div>Recall Date: {{r.recallDate}}</div>
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
        childrensRecalls: []
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
        const apiRecallURL =
          "https://pwarecallsapiwrapper.azurewebsites.net/api/recalls/latest";
        const thirdwebsiteurl = window.location.href;
        const thirdwebsitetitle = document.title;
        vm.resultCount = 0;
        vm.resultCount = 0;
        vm.recalls = [];
        let mappedRequest = vm.mapRequestParams();
        console.log(mappedRequest);
        let requestParams = axios
          .get(apiRecallURL, {
            params: mappedRequest
          })
          .then(response => {
            if (response.data.length > 0) {
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
        const apiRecallURL =
          "https://pwarecallsapiwrapper.azurewebsites.net/api/recalls/childrens";
        const thirdwebsiteurl = window.location.href;
        const thirdwebsitetitle = document.title;
        vm.resultCount = 0;
        vm.childrensRecalls = [];
        let mappedRequest = vm.mapRequestParams();
        console.log(mappedRequest);
        let requestParams = axios
          .get(apiRecallURL, {
            params: mappedRequest
          })
          .then(response => {
            if (response.data.length > 0) {
              vm.handleChildrensResponse(response);
            } else {
              //vm.showProgress = false;
              vm.childrensRecalls = [];
            }
          })
          .catch(error => {
            //vm.isError = true;
          });
      },
      mapRequestParams() {
        const vm = this;
        return {
          searchfor: vm.searchFor ? vm.searchFor : "",
          productname: vm.productName ? vm.productName : "",
          manufacturername: vm.manufacturer ? vm.manufacturer : "",
          producttype: vm.productType ? vm.productType : "",
          productModel: vm.productModel ? vm.productModel : "",
          recallDateEnd: moment().format("YYYY-MM-DD"),
          recallDateStart: moment(new Date(1970, 31, 12, 5, 0, 0)).format(
            "YYYY-MM-DD"
          ),
          thirdwebsiteurl: window.location.href
        };
      },
      handleChildrensResponse(response) {
        const vm = this;
        response.data.forEach(element => {
          console.log("handling children's");

          vm.childrensRecalls.push({
            title: element.Title,
            url: element.URL,
            recallDate: moment(element.RecallDate).format("MMM Do YYYY"),
            productName:element.Products[0].Name,
            images: element.Images, //use array functions to filter
            description: element.Description,
            manufacturerCountries: element.ManufacturerCountries
          });
          vm.resultCount = vm.recalls.length;
        });
      },
      handleResponse(response) {
        const vm = this;
        response.data.forEach(element => {
          console.log("handling latest");

          vm.newRecalls.push({
            title: element.Title,
            url: element.URL,
            recallDate: moment(element.RecallDate).format("MMM Do YYYY"),
            images: element.Images, //use array functions to filter
            description: element.Description,
            manufacturerCountries: element.ManufacturerCountries
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
