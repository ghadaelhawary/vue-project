<template>
  <div id="app">
    <header-component ></header-component>
           
    <router-view></router-view>
    
   
  </div>
</template>

<script>

import headercomponent from "./components/header.vue"
export default {
  name: 'app',
  data(){
    return{

    }
  },
  components:{

    "header-component":headercomponent
  },
  methods: {
  
}}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
