<template>
<div>



    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">product name</th>
      <th scope="col">description </th>
      <th scope="col">Price</th>
     <th scope="col">in stock</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="product in websiteProducts" :key="product._id">
            <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}</td>
        <td>{{product.inStock}}</td>
        <td><img  id="img" :src="product.img"/></td>
        <td> <router-link :to="'/edit/product/'+product._id">
        <button class="btn btn-primary">
        
        Edit
        </button>
        </router-link>
        </td>
          <td><button class="btn btn-danger">Delete</button></td>

</tr>
   
  </tbody>
</table>

</div>

</template>


<script>
import Vue from "vue";
export default {
  data() {
    return {
      websiteProducts: []
    };
  },
  created: function() {
    Vue.axios.get("http://localhost:8080/products/list").then(response => {
      console.log(response.data);
    let copy = this.convert( response.data);
    console.log(copy)
    this.websiteProducts = copy
      
      
    });
  },
  methods:{
      convert:function(arr){
          let copy =[];
           for(let i=0; i<arr.length; i++){
                var base64Flag = 'data:image/jpeg;base64,';
                    var binary = '';
        var bytes = [].slice.call(new Uint8Array(arr[i].img.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let p = window.btoa(binary);
        let image = base64Flag+p;
        arr[i].img=image;
        copy[i] = arr[i]
           }
           return copy ;
      }
  }
};
</script>
<style  scoped>
#img{
    width: 100px;
    height: 100px;
}
</style>

