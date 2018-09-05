<template>
<v-container >
        <v-layout align-center >
   <v-flex xs12 sm12 md12 lg12 xl12 id="resultList"> 
      
      <v-list three-line >
        
          <v-subheader>Recalls ({{recalls?recalls.length:0}})</v-subheader>
           <template v-for="(item,index) in recalls" >
            
           
           <v-card active-class="warning" hover raised v-bind:key="index">
            <v-list-tile  v-bind:size="thumbSize"  ripple  v-bind:key="index" >
                 <a v-bind:href="avatarUrl(item)" target="_blank">
                  <v-list-tile-avatar tile size="55"  >
        
                 <img   v-bind:src="avatarUrl(item)" alt=""/>
                       </v-list-tile-avatar>
                  </a>
             
                <v-list-tile-content>
                    
                    <v-list-tile-title v-text="item.recallDate" >
                    
                    </v-list-tile-title >
                    <a v-bind:href="item.url" target="_blank">
                    <v-list-tile-sub-title >
                     <span class='grey--text text--darken-2'>{{item.title}}</span> 
                    </v-list-tile-sub-title>
                    </a>
                     
                </v-list-tile-content>
                
            </v-list-tile>
            <v-expansion-panel  popout focusable>
    <v-expansion-panel-content inset >
      <div slot="header">View Details</div>
     
      <v-card ripple color="yelllow">
        <v-card-text class="grey lighten-3" >
          <h4>Description</h4>
          <p>{{item.description}}</p>
          
          <h4>Products</h4>
          
            <div v-for="p in item.products" :key="p.Name">
              <br/>
              <span><strong>Name: </strong> {{p.Name}}</span><br/>
              <span><strong>Type: </strong> {{p.Type}}</span><br/>
              <span><strong>Model: </strong> {{p.Model}}</span><br/>
              <span><strong>No Of Units: </strong> {{p.NumberOfUnits}}</span><br/>
            </div><br/>
            
            <h4>Injuries</h4>
             <span v-for="p in item.injuries" :key="p.Name">
              <p>{{p.Name}}</p>
            </span><br/>
          <h4>Manufacturers</h4>
            
             <span v-for="m in item.manufacturers" :key="m.Name">
             <p>{{m.Name}}</p>
            
            </span><br/>
            <h4>Manufacturer Countries</h4>
             <span v-for="mc in item.manufacturerCountries" :key="mc.Country">
              <p>{{mc.Country}}</p>
            </span><br/>
            <h4>ProductUpcs</h4>
            <span  v-for="upc in item.productUpcs" :key="upc.UPC">
              {{upc.UPC}}
              </span><br/>
            <h4>Hazards</h4>
             <span v-for="haz in item.hazards" :key="haz.Name">
              <p>{{haz.Name}}</p>
            </span>
            <h4>Remedies</h4>
             <span v-for="r in item.remedies" :key="r.Name">
              <p>{{r.Name}}</p>
            </span><br/>
            <h4>Retailers</h4>
            
             <span v-for="ret in item.retailers" :key="ret.Name">
              <p>{{ret.Name}}</p>
            </span><br/>

          </v-card-text>
      </v-card>
           </v-expansion-panel-content>
            </v-expansion-panel>
   
            </v-card>
            <v-divider inset light  @click=""></v-divider>
           </template>
      </v-list>
      
      
    
    </v-flex>
        </v-layout>
</v-container>
</template>

<script>
import { EventBus } from "../eventBus.js";
export default {
  name: "resultList",
  
 // props: {
 //   recalls: {
 //     required: true
 //   }
 // },
  methods: {
    avatarUrl: function(item) {
      var avatar = this.altImage;

      if (
        item.images !== undefined &&
        item.images !== null &&
        item.images.length > 0
      ) {
        return item.images[0] !== undefined
          ? item.images[0].URL
          : this.altImage;
      }
      return avatar;
    },
    setThumbSize() {
      this.thumbSize = "60";
    }
  },
  watch: {
    //recalls: function(data) {
    //  this.resultCount = data.length;
    //  this.hasResult = true;
    //}
  },
  mounted: function(){
     this.$vuetify.goTo(this.target, this.options)
      let vm = this
    EventBus.$on('searchResultFetched',results =>{
       vm.resultCount = results.resultCount
       vm.hasResult = true
       vm.recalls = results.recalls
    })
  },
 
  
  computed:{
    target(){
      let vm = this
      let value = vm.transitionSelector
      console.log('selector is ' + value)
      if(!isNaN(value)) return Number(value)
      else return value
    },
    options () {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing
        }
    }
  },
  data: function() {
    return {
      recalls:[],
      transitionSelector:"#resultList",
      duration:300,
      offset:15,
      easing: 'easeInOutCubic',
      thumbSize: "50",
      resultCount: 0,
      hasResult: false,
      altImage: "https://www.cpsc.gov/sites/all/themes/cpsc/images/logo.png"
    };
  }
};
</script>
<style scoped>
thumbwrap {
  margin: 75px auto;
  width: 252px;
  height: 252px;
}
.thumb {
  float: left; /* must be floated for same cross browser position of larger image */
  position: relative;
  margin: 3px;
}
.thumb img {
  border: 1px solid #000;
  vertical-align: bottom;
}
.thumb:hover {
  border: 0; /* IE6 needs this to show large image */
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
