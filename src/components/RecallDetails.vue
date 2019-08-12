<template>
  <v-card ripple>
    <v-card-text class="grey lighten-3">
      <h4>Description</h4>
      <p>{{item.description}}</p>
      <h4>Recall Number</h4>
      <p v-format-recall-num="item.recallNumber">{{item.recallNumber}}</p>
      <h4>Consumer Contact</h4>
      <p>{{item.consumerContact}}</p>
      <h4>Products</h4>
      <ul>
        <li v-for="p in item.products" :key="p.name">
          <span>
            <strong>Name:</strong>
            {{p.name}}
          </span>
          <br />
          <span>
            <strong>Type:</strong>
            {{p.type}}
          </span>
          <br />
          <span>
            <strong>Units Sold:</strong>
            {{p.numberOfUnits}}
          </span>
        </li>
      </ul>
      <br />

      <h4>Injuries</h4>
      <span v-for="i in item.injuries" :key="i.name">
        <p>{{i.name}}</p>
      </span>
      <br />

      <h4>Manufacturers</h4>
      <ul>
        <li v-for="m in item.manufacturers" :key="m.name">{{m.name}}</li>
      </ul>
      <br />
      <h4>Manufacturer Countries</h4>
      <ul>
        <li v-for="mc in item.manufacturerCountries" :key="mc.country">{{mc.country}}</li>
      </ul>
      <br />
      <h4>ProductUpcs</h4>
      <ul>
        <li v-for="upc in item.productUpcs" :key="upc.upc">{{upc.upc}}</li>
      </ul>
      <br />
      <h4>Hazards</h4>
      <ul>
        <li v-for="haz in item.hazards" :key="haz.name">{{haz.name}}</li>
      </ul>
      <br />
      <h4>Remedies</h4>
      <ul>
        <li v-for="r in item.remedies" :key="r.name">{{r.name}}</li>
      </ul>
      <br />
      <h4>Retailers</h4>
      <ul>
        <li v-for="ret in item.retailers" :key="ret.name">{{ret.name}}</li>
      </ul>
    </v-card-text>
    <v-divider></v-divider>
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