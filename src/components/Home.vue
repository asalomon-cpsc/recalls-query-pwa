<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <h4 class="grey--text">Latest Recalls</h4>
        <v-layout>
          <v-flex xs12 sm12 class="centered" v-show="!latestLoaded">
            <v-progress-circular
              color="orange lighten-2"
              :width="6"
              :size="175"
              :indeterminate="true"
            >
              <img
                contain
                with="100"
                height="100"
                src="https://www.cpsc.gov/sites/all/themes/cpsc/images/logo.png"
                alt="cpsc"
              />
            </v-progress-circular>
          </v-flex>
        </v-layout>
        <div v-show="latestLoaded" class="section">
          <ul id="featured" class="d-flex">
            <li v-for="(item,index) in latestRecalls" v-bind:key="index" class="pr-15">
              <v-card flat hover class="mb-1">
                <v-container grid-list-lg>
                  <v-layout align-center>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                      <v-card color="grey lighten-4" raised ripple>
                        <v-img
                          contain
                          :src="item.images[0].url"
                          class="black--text"
                          height="240"
                          aspect-ratio="1"
                        ></v-img>
                        <v-divider light></v-divider>
                        <v-card>
                          <v-card-title>
                            <div>
                              <div class="text-truncate mb-1">
                                <strong>Title:</strong>
                                <br />
                                <span>{{item.title}}</span>
                              </div>
                              <div class="text-truncate mb-1">
                                <strong>Recall Date:</strong>
                                <br />
                                <span>{{item.recallDate}}</span>
                              </div>
                              <div class="text-truncate mb-1">
                                <strong>Products:</strong>
                                <br />
                                <span>{{item.products[0].name}}</span>
                              </div>
                            </div>
                          </v-card-title>
                        </v-card>
                        <v-card>
                          <v-card-actions>
                            <v-expansion-panel focusable>
                              <v-expansion-panel-content>
                                <div slot="header"></div>
                                <recall-details :item="item"></recall-details>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-card-actions>
                        </v-card>
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
import RecallDetails from "./RecallDetails.vue";
import { EventBus } from "../eventBus.js";
export default {
  name: "home",
  components: {
    RecallDetails
  },
  data: function() {
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
    latestRecalls: function() {
      return this.newRecalls;
    }
  },

  mounted: function() {
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
          vm.handleError("apiCallErrorOccured", error);
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
  width: calc(100% - 10px);
  margin-left: 10px;
  padding-left: 10px;
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
