<<template>
  <div>
 
      <ul class="list-inline">
          <li class="list-inline-item"> <router-link to="/home">Home</router-link> </li>

        <li class="list-inline-item"> <router-link to="/SignUp">SignUp</router-link> </li>
        <li class="list-inline-item"> <router-link to="/Login">Login</router-link> </li>
        <li class="list-inline-item"> <router-link to="/Cart">Cart</router-link> </li>

      </ul>
   
   
  </div>
</template>

<script>


export default {
 
  data(){
    return{

    }
  },
}
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
