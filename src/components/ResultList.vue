<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 sm12 md12 lg12 xl12 id="resultList">
        <v-list three-line>
          <v-subheader>Recalls ({{recalls?recalls.length:0}})</v-subheader>
          <no-records v-if="recalls.length===0"></no-records>
          <div v-if="recalls.length> 0">
            <template v-for="(item,index) in recalls">
              <v-card
                active-class="warning"
                hover
                raised
                v-bind:key="item.recallNumber"
                class="mb-1"
              >
                <v-list-tile v-bind:size="thumbSize" ripple v-bind:key="index">
                  <a v-bind:href="avatarUrl(item)" target="_blank">
                    <v-list-tile-avatar tile size="55">
                      <img v-bind:src="avatarUrl(item)" alt />
                    </v-list-tile-avatar>
                  </a>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.recallDate"></v-list-tile-title>
                    <v-list-tile-sub-title>
                      <span class="grey--text text--darken-2">{{item.title}}</span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-expansion-panel popout focusable>
                  <v-expansion-panel-content inset>
                    <div slot="header"></div>
                    <recall-details :item="item"></recall-details>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card>
              <v-divider inset light @click></v-divider>
            </template>
          </div>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { EventBus } from "../eventBus.js";
import noRecords from "./NoRecords.vue";
import RecallDetails from "./RecallDetails.vue";
export default {
  name: "resultList",
  components: {
    noRecords,
    RecallDetails
  },
  methods: {
    avatarUrl: function(item) {
      var avatar = this.altImage;

      if (
        item.images !== undefined &&
        item.images !== null &&
        item.images.length > 0
      ) {
        return item.images[0] !== undefined
          ? item.images[0].url
          : this.altImage;
      }
      return avatar;
    },
    setThumbSize() {
      this.thumbSize = "60";
    }
  },
  watch: {},
  mounted: function() {
    this.$vuetify.goTo(this.target, this.options);
    let vm = this;
    EventBus.$on("searchResultFetched", results => {
      vm.resultCount = results.resultCount;
      vm.hasResult = true;
      vm.recalls = results.recalls;
    });
  },

  computed: {
    target() {
      let vm = this;
      let value = vm.transitionSelector;
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      };
    }
  },
  data: function() {
    return {
      recalls: [],
      transitionSelector: "#resultList",
      duration: 300,
      offset: 15,
      easing: "easeInOutCubic",
      thumbSize: "50",
      resultCount: 0,
      hasResult: false,
      showDetails: false,
      altImage: "https://www.cpsc.gov/sites/all/themes/cpsc/images/logo.png"
    };
  }
};
</script>
<style scoped>
.thumbwrap {
  margin: 75px auto;
  width: 252px;
  height: 252px;
}

.thumb {
  float: left;
  /* must be floated for same cross browser position of larger image */
  position: relative;
  margin: 3px;
}

.thumb img {
  border: 1px solid #000;
  vertical-align: bottom;
}

.thumb:hover {
  border: 0;
  /* IE6 needs this to show large image */
  z-index: 1;
}

.thumb span {
  position: absolute;
  visibility: hidden;
}

.thumb:hover span {
  visibility: visible;

  top: 37px;
  left: 37px;
}
</style>
