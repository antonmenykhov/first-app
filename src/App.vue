<template>
<v-app>
  <v-app-bar app
      
      :color="color"
      dark
      
  >
  
      <v-spacer></v-spacer>
    <v-app-bar-title>Title</v-app-bar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
  <v-main app class="overflow-y-auto"
      max-height="100vh">
    
    <router-view ></router-view>
    
  </v-main>
  <v-footer app>
  <v-bottom-navigation id="bottom-menu"  app
    v-model="value"
    :background-color="color"
    dark
    shift
    
    
  >
    <v-btn v-on:click="$router.push({path: '/tests'})">
      <span>Тесты</span>

      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>

    <v-btn v-on:click="$router.push({path: '/profile'})"> 
      <span>Профиль</span>

      <v-icon>mdi-clipboard-account-outline </v-icon>
    </v-btn>

    <v-btn v-on:click="$router.push({path: '/top'})">
      <span>Рейтинг</span>
      
      <v-icon>mdi-playlist-star</v-icon>
    </v-btn>

    
  </v-bottom-navigation>
  </v-footer>
 
    
</v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({ value: 0 }),

    computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          default: return 'blue-grey'
        }
      },
    },
};
</script>
<style>
  #bottom-menu .theme--dark.v-btn.v-btn--has-bg{
    background: transparent!important;
  }
  #bottom-menu .v-item-group.v-bottom-navigation{
    align-items: center!important;
  }
  #bottom-menu .v-btn:not(.v-btn--round).v-size--default{
    height: 56px!important;
  }
  .v-footer{
    padding: 0!important;
  }
</style>
