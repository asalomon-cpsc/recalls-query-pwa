<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card shaped>
            <v-card-title class="headline">
              Recall Number :
              <span v-format-recall-num="item.recallNumber"></span>
            </v-card-title>
            <v-card-text>Recall Date: {{item.recallDate}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card shaped>
            <v-card-title class="headline">
              <v-icon large left color="black darken-2">description</v-icon>
              <span class="title font-weight-light">Description:</span>
            </v-card-title>
            <v-card-text>{{item.description}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title class="headline">
              <v-icon large left color="orange darken-2">watch</v-icon>
              <span class="title font-weight-light">Products:</span>
            </v-card-title>
            <v-card-text>
              <table height="Auto">
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Units Sold</th>
                    <th class="text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in item.products" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.numberOfUnits }}</td>
                    <td>{{ item.type}}</td>
                  </tr>
                </tbody>
              </table>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card shaped>
            <v-card-title class="headline">
              <v-icon large left color="brown darken-2">mood_bad</v-icon>
              <span class="title font-weight-light">Injuries</span>
            </v-card-title>
            <v-card-text>
              <div v-for="i in item.injuries">{{i.name}}</div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card shaped>
            <v-card-title class="headline">
              <v-icon large left color="red darken-2">warning</v-icon>
              <span class="title font-weight-light">Hazards:</span>
            </v-card-title>
            <v-card-text>
              <div v-for="h in item.hazards">{{h.name}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card shaped>
            <v-card-title class="headline">
              <v-icon large left color="green darken-2">build</v-icon>
              <span class="title font-weight-light">Remedies:</span>
            </v-card-title>
            <v-card-text>
              <div v-for="r in item.remedies">{{r.name}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card shaped>
            <v-card-title class="headline">
              <v-icon large left color="orange darken-2">call</v-icon>
              <span class="title font-weight-light">Consumer Contact:</span>
            </v-card-title>
            <v-card-text>{{item.consumerContact}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card shaped>
            <v-card-title class="headline">
              <v-icon large left color="green darken-2">store_front</v-icon>
              <span class="title font-weight-light">Companies Involved:</span>
            </v-card-title>
            <v-card-text>
              <v-card raised v-if="item.manufacturers.length>0">
                <v-card-title>Manufacturers:</v-card-title>
                <v-card-text>
                  <div v-for="(m,index) in item.manufacturers" v-bind:key="m.name">{{m.name}}</div>
                </v-card-text>
              </v-card>
              <v-card raised v-if="item.retailers.length>0">
                <v-card-title>Retailers:</v-card-title>
                <v-card-text>
                  <div v-for="m in item.retailers">{{m.name}}</div>
                </v-card-text>
              </v-card>
              <v-divider></v-divider>
              <v-card raised v-if="item.retailers.length>0">
                <v-card-title>Manufacturer Countries:</v-card-title>
                <v-card-text>
                  <div v-for="mc in item.manufacturerCountries">{{mc.country}}</div>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style>
</style>
