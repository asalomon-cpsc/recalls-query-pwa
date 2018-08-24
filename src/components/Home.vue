<template>
<v-container grid-list-xl text-xs-left>
    <v-layout 
        
        justify-center
        align-top 
        wrap>
            
<v-flex xs12 sm12 md8 lg8 x8>
    <v-text-field
        class="mx-3"
        flat
        label="Search"
        
        append-icon="search"
      >
     
      </v-text-field>
     
    <h3>Latest Recalls</h3>

     <ul id="featured">
       <li 
       v-for="(i, index) in recalls"
        :id="`tab-${index}`"
        :key="index"
       >
         <v-card 
        hover
        
        >
        <v-flex >
        <v-card-media
        contain
          :src="i.imageUrl"
          height="200px"
          
        ></v-card-media>
        
         <v-card-text >
          <div>
            <div ><h3>{{i.title}}</h3></div>
            <span class="grey--text">Recalled on: {{i.recallDate}}</span>
          </div>
        </v-card-text>
         </v-flex>
        </v-card>
       </li>

     </ul>
</v-flex>
        </v-layout>
</v-container>
</template>
<script>
export default {
    data () {
      return {
          swipeDirection: 'None',
        recalls:[
          {title:"Manhattan Toy Recalls Toy Planes Due to Choking Hazard",recallDate:'10-10-2018',imageUrl:'https://cpsc.gov/s3fs-public/1126_1.png?G_RLTM_TbtbPV30qQ06vcB_GuvvwLpBX'},
          {title:"Yamaha Recalls Snowmobiles Due to Injury Hazard",recallDate:'10-12-2018',imageUrl:'https://cpsc.gov/s3fs-public/1118_1.jpeg?FOka_cdzMrfESbXgYgBBq9k3f9TdqOxH'},
          {title:"Vornado Air Reannounces Recall of Electric Space Heaters Following Report of Death; Fire and Burn Hazards",recallDate:'10-14-2018',imageUrl:'https://cpsc.gov/s3fs-public/pic1_39.jpg?evkZ1Ng6v_RNhvXnBPqB4o4rWxzDpxh5'},
        ],
        model: 'tab-1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    methods:{
        swipe (direction) {
        this.swipeDirection = direction
      }
    }
}
</script>
<style  scoped>
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
</style>


