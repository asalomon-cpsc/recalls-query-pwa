<template>

  <v-container >
    <v-layout  >
     <v-flex >

        <div class="title mb-3">Check out our latest recalls</div>

        <ul id="featured" class="d-flex">
          <li v-for="(r,index) in latestRecalls" v-bind:key="index">
            <v-card
            flat
            >
               <v-container 
               fluid
              grid-list-lg
               >
               <v-layout row wrap>
              <v-flex  >
             <v-card color="white" class="dark--text">
              <v-layout>
                <v-flex xs12>
                  
                    <v-card-media
                    contain
                    :src="r.images[0].URL"
          class="black--text"
          height="200"
          aspect-ratio="1">
        </v-card-media>
                </v-flex>
                
              </v-layout>
              <v-divider light></v-divider>
               <v-layout row wrap>
              <v-card-text >
               


                    <div>
                      <div>{{r.title}}</div>
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

        <ul>
          <li v-for="(r,index) in childrenRecalls" v-bind:key="index">
            {{r.title}}
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
        newRecalls: []
      };
    },
    computed: {
      latestRecalls: function () {
        return this.newRecalls;
      },
      childrenRecalls: function () {
        let vm = this;
        let cRecalls = [];
        let childrenKeyWords = [
          "children",
          "toddler",
          "baby",
          "toys",
          "infant",
          "kids"
        ];
        var recall = null;
        this.latestRecalls.forEach(r => {
          recall = r;
          childrenKeyWords.forEach(k => {
            console.log("recall is" + recall);
            console.log("recall desc" + recall.description);
            if (recall.description) {
              if (recall.description.includes(k)) {
                cRecalls.push(r);
              }
            }
          });
        });
        return cRecalls.slice(0, 10);
      }
    },
    created: function () {
      this.getLatestRecalls();
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
      handleResponse(response) {
        const vm = this;
        response.data.forEach(element => {
          console.log("handling");

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

</style>
