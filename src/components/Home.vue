<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <h4 class="grey--text">Latest Recalls</h4>
        <v-layout>
          <v-flex xs12 sm12 class="centered" v-show="!latestLoaded">
            <v-progress-circular color="orange lighten-2" :width="6" :size="175" :indeterminate="true">
              <img contain with="100" height="100" src="https://www.cpsc.gov/sites/all/themes/cpsc/images/logo.png"
                alt="cpsc">
            </v-progress-circular>
          </v-flex>
        </v-layout>
        <div v-show="latestLoaded" class="section">
          <ul id="featured" class="d-flex">
            <li v-for="(item,index) in latestRecalls" v-bind:key="index">
              <v-card flat>
                <v-container grid-list-lg>
                  <v-layout>
                    <v-flex>
                      <v-card color="grey lighten-4" class="dark--text" ripple>
                        <v-img contain :src="item.images[0].url" class="black--text" height="240" aspect-ratio="1">
                        </v-img>
                        <v-divider light></v-divider>
                        <v-card-text>
                          <div>
                            <div class="text-truncate"><strong>Title:</strong>
                              <br>
                              <span>{{item.title}}</span>
                            </div>
                            <div class="text-truncate"><strong>Recall Date:</strong>
                              <br>
                              <span>{{item.recallDate}}</span>
                            </div>
                            <div class="text-truncate"><strong>Products: </strong>
                              <br>
                              <span>{{item.products[0].name}}</span></div>
                          </div>
                        </v-card-text>
                        <v-card-actions>

                          <v-btn large round raised ripple outline color="orange" @click="showDetails =!showDetails">
                            {{ !showDetails? 'View Details' : 'Hide Details' }}
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn large round raised ripple outline icon @click="showDetails =!showDetails">
                            <v-icon>{{ !showDetails? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                          </v-btn>
                        </v-card-actions>
                        <v-card-text v-if="showDetails">
                          <h4>Description</h4>
                          <p>{{item.description}}</p>
                          <br>

                          <br>
                          <h4>Recall Number</h4>
                          <p>{{item.recallNumber}}</p>
                          <br>

                          <br>
                          <h4>Consumer Contact</h4>
                          <p>{{item.consumerContact}}</p>
                          <br>

                          <br>
                          <h4>Products</h4>
                          <ul>
                            <li v-for="p in item.products" :key="p.name">
                              <span>
                                <strong>Name:</strong>
                                {{p.name}}
                              </span>
                              <br>
                              <span>
                                <strong>Type:</strong>
                                {{p.type}}
                              </span>
                              <br>
                              <span>
                                <strong>Units Sold:</strong>
                                {{p.numberOfUnits}}
                              </span>
                            </li>
                          </ul>
                          <br>

                          <br>
                          <h4>Injuries</h4>
                          <span v-for="i in item.injuries" :key="i.name">
                            <p>{{i.name}}</p>
                          </span>
                          <br>

                          <br>
                          <h4>Manufacturers</h4>
                          <ul>
                            <li v-for="m in item.manufacturers" :key="m.name">{{m.name}}</li>
                          </ul>
                          <br>

                          <br>
                          <h4>Manufacturer Countries</h4>
                          <ul>
                            <li v-for="mc in item.manufacturerCountries" :key="mc.country">{{mc.country}}</li>
                          </ul>
                          <br>

                          <br>
                          <h4>Hazards</h4>
                          <ul>
                            <li v-for="haz in item.hazards" :key="haz.name">{{haz.name}}</li>
                          </ul>
                          <br>

                          <br>
                          <h4>Remedies</h4>
                          <ul>
                            <li v-for="item in item.remedies" :key="item.name">{{item.name}}</li>
                          </ul>
                          <br>

                          <br>
                          <h4>Retailers</h4>
                          <ul>
                            <li v-for="ret in item.retailers" :key="ret.name">{{ret.name}}</li>
                          </ul>
                          <br>
                        </v-card-text>
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
  import {
    EventBus
  } from "../eventBus.js";
  export default {
    name: "home",
    data: function () {
      return {
        recalls: [],
        newRecalls: [],
        newChildrenRecalls: [],
        fireRecalls: [],
        show: false,
        showDetails: false,
        latestLoaded: false,
        latestChildrenLoaded: false
      };
    },
    computed: {
      latestRecalls: function () {
        return this.newRecalls;
      }

    },

    mounted: function () {
      let vm = this;
      vm.getRecalls();
      EventBus.$emit("homePageLoaded", true);
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
            if (response.data.resultCount > 0) {
              vm.handleResponse(response);
            }
          })
          .catch(error => {

            vm.handleError("apiCallErrorOccured", error)

          });
      },
      handleError(type, error) {
        EventBus.$emit(type, error);
        this.$routeitem.push("error");
      },

      handleResponse(response) {
        const vm = this;

        response.data.recalls.forEach(element => {
          let rec = {
            title: element.title,
            consumerContact: element.consumerContact,
            recallNumber: element.recallNumber,
            url: element.url,
            recallDate: moment(element.recallDate).format("MMM Do YYYY"),
            images: element.images, //use array functions to filter
            description: element.description,
            products: element.products,
            injuries: element.injuries,
            manufacturers: element.manufacturers ? element.manufacturers : [],
            manufacturerCountries: element.manufacturerCountries,
            productUpcs: element.productUPCs,
            hazards: element.hazards,
            remedies: element.remedies,
            retailers: element.retailers
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

  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
  }

</style>
