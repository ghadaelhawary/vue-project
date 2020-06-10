import Vue from 'vue'
import App from './App3.vue'
import 'bootstrap'; import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);


import Router from 'vue-router'
Vue.use(Router);






import headercomponent from "./components/header.vue"
import signupcomponent from "./components/signupcomponent.vue"
import logincomponent from "./components/logincomponent.vue";
import cartcomponent from "./components/cartcomponent.vue"

import homecomponent from "./components/homecomponent"
import adminproductcomponent from "./components/AdminsComponent/adminproductcomponent.vue"
import addproductcopmponent from "./components/AdminsComponent/addproductcopmponent.vue"
import adminprofilecomponent from "./components/AdminsComponent/adminprofilecomponent.vue"
import editproductComponent from "./components/AdminsComponent/editproductComponent.vue"




///////////////// routing 
const router = new Router({
  routes: [
    { path: '/', component: headercomponent },
    { path: '/signup', component: signupcomponent },
    { path: '/login', component: logincomponent },
    { path: '/cart', component: cartcomponent },
    { path: "/home", component: homecomponent },
    { path: "/websiteproduct", component: adminproductcomponent },
     {path:"/add/product",component:addproductcopmponent}
     ,{path:"/adminProfile",component:adminprofilecomponent},
     {path:"/edit/product/:id",props:true,component:editproductComponent}
    // {path:'/products/:productid',props:true,component:productdetails},
    // {path:'*',component:handeler},

  ],
  mode: 'history'
});

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
  router,

}).$mount('#app')
