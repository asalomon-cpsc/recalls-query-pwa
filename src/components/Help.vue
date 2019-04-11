<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex>
        <v-card flat hover class="mb-1">
          <v-container grid-list-lg>
            <v-layout align-center>
              <v-flex xs12 sm12 md12 lg12 xl12>
                <h1>User Guide</h1>
                <v-card id="home" 
                color="grey lighten-4" 
                raised hover 
                class="dark--text mb-3" 
                ripple>
                  <div>
                    <v-card-title>
                      <h2>Home Page</h2>
                    </v-card-title>
                    <v-card-text>
                      The home page displays
                      the latest 15 recalls. Scroll or
                      swipe right/left to continue
                      viewing latest
                      recalls.
                    </v-card-text>
                    <v-img
                      src="/static/assets/latest_recalls.png"
                      contain
                      max-height="510"
                      max-width="510"
                    ></v-img>
                    <v-card-text>You can click on the dropdown arrow to view the recall description</v-card-text>
                  </div>
                </v-card>

                <v-card
                  id="navigation"
                  color="grey lighten-4"
                  raised
                  hover
                  class="dark--text mb-3"
                  ripple
                >
                  <div>
                    <v-card-title>
                      <h2>Navigation</h2>
                    </v-card-title>
                    <v-card-text>
                      <div>
                        1. Navigate back and forth between the search result and the latest recalls (Home/Landing page) with the bottom navigation bar.
                        </div>
                      </v-card-text>
                        <div >
                        <v-img src="/static/assets/navigation.png" contain max-height="500"
                        max-width="500"></v-img>
                       </div>
                       <v-card-text>
                       <div>
                       2. Click on the Home icon (
                        <v-icon color="black" >home</v-icon> to go to the landing page.
                      </div>
                      </v-card-text>
                      <v-card-text>
                      <div>
                        3. Click on the Search icon(<v-icon color="black" >search</v-icon> ) to go back to the search results page.
                      </div>
                    </v-card-text>
                  </div>
                </v-card>
                
                <v-card
                  id="searchOverview"
                  color="grey lighten-4"
                  raised
                  hover
                  class="dark--text mb-3"
                  ripple
                >
                  <div>
                    <v-card-title>
                      <h2>Search For Recalls</h2>
                    </v-card-title>
                    <v-card-text>
                      <div>
                        1. To perform a search start by clicking on the search icon.

                              <v-img max-height="510" contain
                      max-width="510" src="/static/assets/search_init.png" alt="search_init" > </v-img>
                      </div>
                       </v-card-text>
                        <v-card-text>
                      <div>
                        2. Any piece of text can be entered in the “Search For” field: a product type, a manufacturer/retailer/importer name, a product name ,a recall title or description.
                        (In the example below, a Product Model was entered in the Product Model field)
                      </div>
                       </v-card-text>
                       <v-card-text>
                      <div>
                        3. Then click on the “apply” button ( <v-img max-height="75" contain
                      max-width="75" src="/static/assets/apply.png" alt="apply" ></v-img> ) and if any records are found, the number of records will be displayed.
                      </div>
                       </v-card-text>
                        <v-card-text>
                     <div>
                        4. To view the results, dismiss the search drawer by click anywhere outside of the drawer or by swiping the drawer to the left.

                     </div>
                      </v-card-text>
                      <v-card-text>
                        <v-img max-height="500" contain
                      max-width="500" src="/static/assets/Product_Model.png" alt="apply" ></v-img>
                    </v-card-text>
                    <v-card-text>
                        5. To clear the search form, click on the reset button (<v-img max-width="75" max-height="75" src="/static/assets/reset_button.png" alt="reset" ></v-img> )
                    </v-card-text>
                     <div>
                         <v-alert
                            :value="true"
                            color="info"
                            icon="info"
                            outline
                         >
                        <strong> NOTE:</strong>
                        The initial fields available for search are
                        Search For, Product Name, Product Model and the relative date range up to a year from now.
                        The Company and the Product Type fields are only available as additional filters  to help narrow down the text search results
                         </v-alert>
                     </div>
                    
                    <v-img
                      src="/static/assets/filter.png"
                      contain
                      max-height="510"
                      max-width="510"
                    ></v-img>
                  </div>
                </v-card>
                 <v-card
                  id="searchResults"
                  color="grey lighten-4"
                  raised
                  hover
                  class="dark--text mb-3"
                  ripple
                >
                  <div>
                    <v-card-title>
                      <h2>Search Results Overview</h2>
                    </v-card-title>
                    <v-card-text>

                      <div>
                        To View Details of a recall while scrolling through the search results, expand the recall card by  clicking on the down arrow or by clicking on the view details button
                       <v-img max-height="510" contain
                      max-width="510" src="/static/assets/search_result_1.png" alt="search_result1!" > </v-img>
                      </div>
                      </v-card-text>
                      <v-card-text>
                      <div>
                      <v-img max-height="510" contain
                      max-width="510" src="/static/assets/search_result_detail.png" alt="search_result_2" > </v-img>
                     </div>
                    </v-card-text>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-container>
</template>
  <script>
export default {
  name: "help",
  data: function() {
    return {};
  }
};
</script>
<style scoped>
</style>
